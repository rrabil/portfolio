#!/usr/bin/env node
/**
 * Post-build step for the machine-readable content layer (AGENTS.md ->
 * "Machine-readable content layer"). For every page whose HTML is built
 * from a Markdown source under docs/ or src/pages/, this script:
 *
 *   1. Copies the raw Markdown source to <route>/index.md in the build
 *      output, alongside the generated <route>/index.html.
 *   2. Injects a `<link rel="alternate" type="text/markdown">` tag into
 *      that page's HTML <head> pointing at its Markdown twin.
 *   3. Regenerates llms.txt at the site root from page frontmatter.
 *
 * The homepage is a special case: index.js has no Markdown source, so
 * src/pages/home.md is a hand-authored twin (excluded from Docusaurus's
 * own page routing via the `pages.exclude` option in
 * docusaurus.config.js, so it does not also render as a real /home
 * page). It still gets steps 1 and 2 above, and its llms.txt entry is
 * hardcoded below rather than read from frontmatter, since there's no
 * "real" source page to attribute it to.
 *
 * Run automatically via `postbuild` in package.json. See also
 * checks/md-twin-checker and checks/llms-txt-checker, which verify this
 * step's output independently.
 */

import {readFileSync, writeFileSync} from 'node:fs';
import path from 'node:path';
import {
  BASE_URL,
  BUILD_DIR,
  HOME_ROUTE,
  HOME_SOURCE,
  collectPages,
  existsSync,
  mdTwinPublicHref,
  mkdirSync,
  routeToBuildDir,
} from './lib/pages.mjs';

const HOME_ENTRY = {
  title: 'Richard Rabil — Principal Technical Writer & AI Knowledge Management',
  description:
    "Portfolio homepage: dual identity in technical writing and AI knowledge management, selected published work, and the pipeline that builds this site.",
};

function injectAlternateLink(htmlFile, mdHref) {
  if (!existsSync(htmlFile)) {
    throw new Error(
      `Expected generated HTML at ${path.relative(BUILD_DIR, htmlFile)} but it does not exist. Run \`docusaurus build\` first.`
    );
  }
  const html = readFileSync(htmlFile, 'utf8');
  const tag = `<link rel="alternate" type="text/markdown" href="${mdHref}">`;
  if (html.includes(tag)) return;
  if (!html.includes('</head>')) {
    throw new Error(`No </head> tag found in ${htmlFile}.`);
  }
  writeFileSync(htmlFile, html.replace('</head>', `${tag}</head>`));
}

function publishTwin(route, raw) {
  const buildDir = routeToBuildDir(route);
  mkdirSync(buildDir, {recursive: true});
  writeFileSync(path.join(buildDir, 'index.md'), raw);
  injectAlternateLink(path.join(buildDir, 'index.html'), mdTwinPublicHref(route));
}

function main() {
  const pages = collectPages();
  for (const page of pages) {
    publishTwin(page.route, page.raw);
  }

  if (!existsSync(HOME_SOURCE)) {
    throw new Error(`Expected the homepage's hand-authored Markdown twin at ${HOME_SOURCE}.`);
  }
  publishTwin(HOME_ROUTE, readFileSync(HOME_SOURCE, 'utf8'));

  pages.sort((a, b) => a.route.localeCompare(b.route));

  const lines = [];
  lines.push('# Richard Rabil — Portfolio');
  lines.push('');
  lines.push(
    '> Principal Technical Writer & AI Knowledge Management. Technical writing samples, AI knowledge management practice, and a self-checking Docusaurus docs-as-code pipeline. Every page listed here has a plain-Markdown twin at its linked URL (append `index.md` to the page path, or follow the page\'s `<link rel="alternate" type="text/markdown">` tag).'
  );
  lines.push('');
  lines.push('## Pages');
  lines.push('');
  lines.push(`- [${HOME_ENTRY.title}](${BASE_URL}): ${HOME_ENTRY.description}`);
  for (const page of pages) {
    const title = page.title || page.route;
    const description = page.description || '';
    const url = BASE_URL + page.route.replace(/^\//, '');
    lines.push(`- [${title}](${url}): ${description}`);
  }
  lines.push('');

  writeFileSync(path.join(BUILD_DIR, 'llms.txt'), lines.join('\n'));

  console.log(
    `[generate-llm-content] Published Markdown twins + alternate links for ${pages.length + 1} page(s); wrote build/llms.txt.`
  );
}

main();

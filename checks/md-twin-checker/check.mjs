#!/usr/bin/env node
/**
 * Check: every published HTML page built from a Markdown source has a
 * matching Markdown twin (<route>/index.md) and an
 * `<link rel="alternate" type="text/markdown">` tag pointing at it.
 *
 * Run against a completed `build/` (i.e. after `npm run build`, which
 * also runs the `postbuild` generator at scripts/generate-llm-content.mjs
 * that this check verifies).
 *
 * The homepage is handled as a separate, simpler assertion below: it has
 * no Markdown source page (index.js is hand-written React, not generated
 * from Markdown), so it can't be walked the same way as the rest of
 * docs/ and src/pages/. Its twin, src/pages/home.md, is hand-authored —
 * this check just confirms build/index.md and its alternate-link tag
 * exist, the same as it would for a generated page. This split is
 * intentional, not an oversight: see AGENTS.md "Machine-readable content
 * layer" and scripts/generate-llm-content.mjs's own header comment.
 */

import {readFileSync} from 'node:fs';
import path from 'node:path';
import {
  BUILD_DIR,
  HOME_ROUTE,
  collectPages,
  existsSync,
  mdTwinPublicHref,
  routeToBuildDir,
} from '../../scripts/lib/pages.mjs';

function checkRoute(route, label, failures) {
  const buildDir = routeToBuildDir(route);
  const htmlFile = path.join(buildDir, 'index.html');
  const mdFile = path.join(buildDir, 'index.md');

  if (!existsSync(htmlFile)) {
    failures.push(`${label}: expected built HTML at ${path.relative(BUILD_DIR, htmlFile)} but it's missing.`);
    return;
  }
  if (!existsSync(mdFile)) {
    failures.push(`${label}: missing Markdown twin at ${path.relative(BUILD_DIR, mdFile)}.`);
    return;
  }
  const html = readFileSync(htmlFile, 'utf8');
  const expectedTag = `<link rel="alternate" type="text/markdown" href="${mdTwinPublicHref(route)}">`;
  if (!html.includes(expectedTag)) {
    failures.push(`${label}: ${path.relative(BUILD_DIR, htmlFile)} is missing the tag ${expectedTag}`);
  }
}

function main() {
  if (!existsSync(BUILD_DIR)) {
    console.error(`[md-twin-checker] build/ not found — run \`npm run build\` first.`);
    process.exit(1);
  }

  const failures = [];
  const pages = collectPages();
  for (const page of pages) {
    checkRoute(page.route, `Page ${page.route}`, failures);
  }
  checkRoute(HOME_ROUTE, 'Homepage', failures);

  const checkedCount = pages.length + 1;
  if (failures.length > 0) {
    console.error(`[md-twin-checker] FAIL — ${failures.length} of ${checkedCount} page(s) missing a Markdown twin:\n`);
    for (const failure of failures) console.error(`  - ${failure}`);
    process.exit(1);
  }

  console.log(`[md-twin-checker] PASS — all ${checkedCount} page(s) have a Markdown twin and alternate-link tag.`);
}

main();

/**
 * Shared route/frontmatter logic for the machine-readable content layer:
 * used by scripts/generate-llm-content.mjs (the build step that produces
 * the Markdown twins, alternate-link tags, and llms.txt) and by the
 * checks/md-twin-checker and checks/llms-txt-checker modules that verify
 * that output. Keeping this in one place means the checks can't drift
 * from what the generator actually does.
 */

import {readFileSync, mkdirSync, existsSync, readdirSync} from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const ROOT = path.join(__dirname, '..', '..');
export const BUILD_DIR = path.join(ROOT, 'build');

// Must match `baseUrl` in docusaurus.config.js.
export const BASE_URL = '/portfolio/';

export const PAGE_SOURCE_ROOTS = [
  {dir: path.join(ROOT, 'src', 'pages'), routePrefix: ''},
  {dir: path.join(ROOT, 'docs'), routePrefix: 'docs'},
];

export const HOME_SOURCE = path.join(ROOT, 'src', 'pages', 'home.md');
export const HOME_ROUTE = '/';

export function walkMarkdownFiles(dir) {
  const results = [];
  for (const entry of readdirSync(dir, {withFileTypes: true})) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...walkMarkdownFiles(full));
    } else if (entry.isFile() && /\.mdx?$/.test(entry.name) && !entry.name.startsWith('_')) {
      results.push(full);
    }
  }
  return results;
}

// This repo's frontmatter is a flat list of `key: value` strings (see
// docs/*.md, src/pages/*.md) — no nested YAML — so a hand-rolled parser
// avoids adding a dependency just for this.
export function parseFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!match) return {};
  const data = {};
  for (const line of match[1].split(/\r?\n/)) {
    const kv = line.match(/^([A-Za-z0-9_]+):\s*(.*)$/);
    if (!kv) continue;
    let value = kv[2].trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    data[kv[1]] = value;
  }
  return data;
}

export function sourceToRoute(sourceFile, root) {
  const rel = path
    .relative(root.dir, sourceFile)
    .replace(/\\/g, '/')
    .replace(/\.mdx?$/, '');
  const segments = [root.routePrefix, rel].filter(Boolean);
  return '/' + segments.join('/');
}

export function routeToBuildDir(route) {
  return route === '/' ? BUILD_DIR : path.join(BUILD_DIR, ...route.split('/').filter(Boolean));
}

// /about -> /portfolio/about/index.md ; / -> /portfolio/index.md
export function mdTwinPublicHref(route) {
  const trimmed = route === '/' ? '' : `${route.replace(/^\//, '')}/`;
  return `${BASE_URL}${trimmed}index.md`;
}

/**
 * All content pages generated from a Markdown source, excluding the
 * homepage (src/pages/home.md is a hand-authored twin of index.js, not a
 * generated page — see docusaurus.config.js `pages.exclude` and
 * AGENTS.md "Machine-readable content layer").
 */
export function collectPages() {
  const pages = [];
  for (const root of PAGE_SOURCE_ROOTS) {
    if (!existsSync(root.dir)) continue;
    for (const sourceFile of walkMarkdownFiles(root.dir)) {
      if (sourceFile === HOME_SOURCE) continue;
      const raw = readFileSync(sourceFile, 'utf8');
      const route = sourceToRoute(sourceFile, root);
      const frontmatter = parseFrontmatter(raw);
      pages.push({
        route,
        sourceFile,
        raw,
        title: frontmatter.title || null,
        description: frontmatter.description || null,
      });
    }
  }
  return pages;
}

export {mkdirSync, existsSync};

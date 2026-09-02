#!/usr/bin/env node
/**
 * Check: build/llms.txt is current and accurate, defined as a two-way
 * set comparison between the pages linked in llms.txt and the pages
 * that actually exist in the build output:
 *
 *   1. Every page in the content source (docs/, src/pages/, plus the
 *      homepage) has a corresponding entry in llms.txt.
 *   2. Every entry in llms.txt points to a page that still exists in
 *      the build output.
 *
 * This is a safety net on top of the automatic regeneration in
 * scripts/generate-llm-content.mjs (run via `postbuild`) — it exists to
 * catch llms.txt going stale, e.g. a manual/partial deploy that skipped
 * the build step, not to replace the generator.
 */

import {readFileSync} from 'node:fs';
import path from 'node:path';
import {BASE_URL, BUILD_DIR, HOME_ROUTE, collectPages, existsSync, routeToBuildDir} from '../../scripts/lib/pages.mjs';

function expectedUrl(route) {
  return BASE_URL + route.replace(/^\//, '');
}

function parseLlmsTxtUrls(llmsTxt) {
  const urls = new Set();
  const linkPattern = /\[[^\]]*\]\(([^)]+)\)/g;
  let match;
  while ((match = linkPattern.exec(llmsTxt)) !== null) {
    urls.add(match[1]);
  }
  return urls;
}

function main() {
  const llmsTxtPath = path.join(BUILD_DIR, 'llms.txt');
  if (!existsSync(llmsTxtPath)) {
    console.error(`[llms-txt-checker] FAIL — ${path.relative(BUILD_DIR, llmsTxtPath) || 'llms.txt'} not found. Run \`npm run build\` first.`);
    process.exit(1);
  }

  const expectedRoutes = [HOME_ROUTE, ...collectPages().map((page) => page.route)];
  const expectedUrls = new Set(expectedRoutes.map(expectedUrl));

  const llmsTxt = readFileSync(llmsTxtPath, 'utf8');
  const actualUrls = parseLlmsTxtUrls(llmsTxt);

  const missingFromLlmsTxt = [...expectedUrls].filter((url) => !actualUrls.has(url));
  const staleInLlmsTxt = [...actualUrls].filter((url) => {
    // A page exists in the build output at <url minus BASE_URL>/index.html.
    if (!url.startsWith(BASE_URL)) return false; // not a page link (e.g. an external URL) — not our concern
    const route = '/' + url.slice(BASE_URL.length);
    const htmlFile = path.join(routeToBuildDir(route), 'index.html');
    return !existsSync(htmlFile);
  });

  if (missingFromLlmsTxt.length > 0 || staleInLlmsTxt.length > 0) {
    console.error('[llms-txt-checker] FAIL — llms.txt is out of sync with the site content:\n');
    if (missingFromLlmsTxt.length > 0) {
      console.error('  Pages with no llms.txt entry:');
      for (const url of missingFromLlmsTxt) console.error(`    - ${url}`);
    }
    if (staleInLlmsTxt.length > 0) {
      console.error('  llms.txt entries pointing to pages that no longer exist:');
      for (const url of staleInLlmsTxt) console.error(`    - ${url}`);
    }
    console.error('\n  Run `npm run build` (which regenerates llms.txt) and commit the result.');
    process.exit(1);
  }

  console.log(`[llms-txt-checker] PASS — llms.txt matches all ${expectedUrls.size} page(s) in the build output.`);
}

main();

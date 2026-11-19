// Prints the site's own Resume page to richard-rabil-resume.pdf, the file
// behind every "Download Resume" button.
//
// Why from the page: /resume is already the approved public version of the
// resume (no phone, email, or street address — see AGENTS.md, "Allowed
// differences from the master"), so the PDF can never say more than the page.
//
// Runs automatically as part of `npm run build` (postbuild), writing
// build/files/richard-rabil-resume.pdf, so the deployed PDF always matches
// the deployed page. If printing fails there (no browser), it warns and the
// committed fallback copy in static/files/ ships instead.
//
// `npm run resume:pdf` (after a build) refreshes that committed fallback copy.
//
// Uses Puppeteer, which is already installed as a dependency of pa11y. If
// Puppeteer has no browser of its own, point it at one with
// PUPPETEER_EXECUTABLE_PATH=/path/to/chrome.

import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import puppeteer from 'puppeteer';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const buildDir = path.join(root, 'build');
const intoBuild = process.argv.includes('--build');
const outFile = intoBuild
  ? path.join(buildDir, 'files', 'richard-rabil-resume.pdf')
  : path.join(root, 'static', 'files', 'richard-rabil-resume.pdf');

if (!fs.existsSync(path.join(buildDir, 'resume', 'index.html'))) {
  console.error('[resume-pdf] build/resume/index.html not found. Run `npm run build` first.');
  process.exit(1);
}

const types = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.ico': 'image/x-icon', '.woff2': 'font/woff2', '.json': 'application/json',
};

// Tiny static server: the built pages use root-relative asset paths, which
// don't resolve when opened straight from disk.
const server = http.createServer((req, res) => {
  let p = path.join(buildDir, decodeURIComponent(new URL(req.url, 'http://x').pathname));
  if (fs.existsSync(p) && fs.statSync(p).isDirectory()) p = path.join(p, 'index.html');
  if (!p.startsWith(buildDir) || !fs.existsSync(p)) {
    res.writeHead(404).end();
    return;
  }
  res.writeHead(200, {'Content-Type': types[path.extname(p)] || 'application/octet-stream'});
  fs.createReadStream(p).pipe(res);
});
await new Promise((r) => server.listen(0, '127.0.0.1', r));
const {port} = server.address();

let browser;
try {
  browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox'],
    executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || undefined,
  });
} catch (err) {
  server.close();
  const msg = `[resume-pdf] Could not start a browser: ${err.message.split('\n')[0]}`;
  if (intoBuild) {
    // Don't block a deploy over this: the committed copy is already in build/.
    console.warn(`${msg}\n[resume-pdf] WARNING: shipping the committed static/files copy instead.`);
    process.exit(0);
  }
  console.error(msg);
  process.exit(1);
}
try {
  const page = await browser.newPage();
  await page.emulateMediaFeatures([{name: 'prefers-color-scheme', value: 'light'}]);
  await page.goto(`http://127.0.0.1:${port}/resume/`, {waitUntil: 'networkidle0'});
  // Links inside the PDF must point at the live site, not this local server.
  await page.evaluate((site) => {
    for (const a of document.querySelectorAll('a[href]')) {
      const u = new URL(a.href);
      if (u.hostname === '127.0.0.1') a.href = site + u.pathname + u.hash;
    }
  }, 'https://portfolio.richardrabil.com');
  // Keep only the resume itself: no site chrome, no "edit this page" footer.
  await page.addStyleTag({
    content: `
      .navbar, .footer, .theme-doc-footer, .pagination-nav, .theme-back-to-top-button,
      .theme-doc-toc-desktop, .theme-doc-toc-mobile, [class*="skipToContent"] { display: none !important; }
      html { font-size: 12px !important; }
      html, body { background: #fff !important; }
      main, .container, .row, .col, article, .markdown {
        max-width: none !important; width: 100% !important; flex: none !important;
        padding: 0 !important; margin: 0 !important;
      }
      .markdown { --ifm-leading: 0.6rem; line-height: 1.4; }
      .markdown h1 { font-size: 2rem; margin-bottom: 0.4rem !important; }
      .markdown h2 { font-size: 1.35rem; margin-top: 1.1rem !important; border-bottom: 1px solid #d2dad7; padding-bottom: 2px; }
      .markdown h3 { font-size: 1.1rem; margin-top: 0.8rem !important; margin-bottom: 0 !important; }
      .markdown p, .markdown ul { margin-bottom: 0.45rem !important; }
      .markdown li + li { margin-top: 0.15rem !important; }
      .markdown table { font-size: 0.9rem; }
      .markdown td, .markdown th { padding: 4px 8px !important; }
      a { color: #0b6e63 !important; }
      h2, h3 { break-after: avoid; }
      li, tr { break-inside: avoid; }
    `,
  });
  fs.mkdirSync(path.dirname(outFile), {recursive: true});
  await page.pdf({
    path: outFile,
    format: 'Letter',
    printBackground: true,
    margin: {top: "0.5in", bottom: "0.5in", left: "0.6in", right: "0.6in"},
  });
  console.log(`[resume-pdf] Wrote ${path.relative(root, outFile)}`);
} finally {
  await browser.close();
  server.close();
}

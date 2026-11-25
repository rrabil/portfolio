// Runs Pa11y (WCAG 2 AA, HTML CodeSniffer + axe) against each live page URL
// passed on the command line. Writes a Markdown report and exits 1 if any
// page has a confirmed error-level finding. Warnings and notices are not
// counted, matching the error-only threshold used by Vale and the Doc
// Detective a11y spec.
//
// axe also returns "needs review" results: places it could not measure, such
// as text drawn inside an SVG or text cut off by the bottom of the test
// window. Pa11y labels these as errors too. They are listed separately in the
// report for a person to check, but they do not fail the run.
import { readFileSync, writeFileSync } from 'node:fs';
import pa11y from 'pa11y';

const urls = process.argv.slice(2);
const options = JSON.parse(readFileSync(new URL('./pa11y.json', import.meta.url)));
const lines = [];
let failed = false;
const review = [];

// Group findings by rule so one repeated problem reads as one line, not dozens.
function describe(issues, indent) {
  const byRule = new Map();
  for (const issue of issues) {
    const entry = byRule.get(issue.code) ?? { message: issue.message, examples: [] };
    entry.examples.push(issue.context);
    byRule.set(issue.code, entry);
  }
  const out = [];
  for (const [code, { message, examples }] of byRule) {
    out.push(`${indent}- **${code}** (${examples.length}×): ${message}`);
    out.push(`${indent}  - Example: \`${examples[0].replace(/`/g, "'").slice(0, 150)}\``);
  }
  return out;
}

for (const url of urls) {
  try {
    const result = await pa11y(url, options);
    const all = result.issues.filter((i) => i.type === 'error');
    const errors = all.filter((i) => !i.runnerExtras?.needsFurtherReview);
    const unsure = all.filter((i) => i.runnerExtras?.needsFurtherReview);
    if (unsure.length > 0) {
      review.push(`- ${url}: ${unsure.length} item(s)`);
      review.push(...describe(unsure, '  '));
    }
    if (errors.length === 0) {
      lines.push(`- ✅ ${url}: no errors`);
      continue;
    }
    failed = true;
    lines.push(`- ❌ ${url}: ${errors.length} error(s)`);
    lines.push(...describe(errors, '  '));
  } catch (err) {
    failed = true;
    lines.push(`- ❌ ${url}: Pa11y could not test this page (${err.message})`);
  }
}

if (review.length > 0) {
  lines.push(
    '',
    '### Needs a human look (not counted as failures)',
    '',
    'The checker could not measure these, so it cannot say whether they pass. ' +
      'Common causes: text inside an SVG drawing, or text cut off by the bottom ' +
      'of the test window. Open the page and check that the text is easy to read.',
    '',
    ...review,
  );
}

writeFileSync('pa11y-report.md', lines.join('\n') + '\n');
console.log(lines.join('\n'));
process.exit(failed ? 1 : 0);

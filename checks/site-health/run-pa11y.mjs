// Runs Pa11y (WCAG 2 AA, HTML CodeSniffer + axe) against each live page URL
// passed on the command line. Writes a Markdown report and exits 1 if any
// page has an error-level finding. Warnings and notices are not counted,
// matching the error-only threshold used by Vale and the Doc Detective a11y spec.
import { readFileSync, writeFileSync } from 'node:fs';
import pa11y from 'pa11y';

const urls = process.argv.slice(2);
const options = JSON.parse(readFileSync(new URL('./pa11y.json', import.meta.url)));
const lines = [];
let failed = false;

for (const url of urls) {
  try {
    const result = await pa11y(url, options);
    const errors = result.issues.filter((i) => i.type === 'error');
    if (errors.length === 0) {
      lines.push(`- ✅ ${url}: no errors`);
      continue;
    }
    failed = true;
    // Group by rule so one repeated problem reads as one line, not dozens.
    const byRule = new Map();
    for (const issue of errors) {
      const entry = byRule.get(issue.code) ?? { message: issue.message, examples: [] };
      entry.examples.push(issue.context);
      byRule.set(issue.code, entry);
    }
    lines.push(`- ❌ ${url}: ${errors.length} error(s)`);
    for (const [code, { message, examples }] of byRule) {
      lines.push(`  - **${code}** (${examples.length}×): ${message}`);
      lines.push(`    - Example: \`${examples[0].replace(/`/g, "'").slice(0, 150)}\``);
    }
  } catch (err) {
    failed = true;
    lines.push(`- ❌ ${url}: Pa11y could not test this page (${err.message})`);
  }
}

writeFileSync('pa11y-report.md', lines.join('\n') + '\n');
console.log(lines.join('\n'));
process.exit(failed ? 1 : 0);

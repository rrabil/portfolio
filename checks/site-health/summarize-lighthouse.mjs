// Turns Lighthouse CI output into a Markdown table of median scores per page,
// plus any failed thresholds from lighthouserc.json. Reads
// lighthouse-results/manifest.json and .lighthouseci/assertion-results.json.
import { existsSync, readFileSync, writeFileSync } from 'node:fs';

const lines = [];
if (!existsSync('lighthouse-results/manifest.json')) {
  lines.push('Lighthouse did not produce results. See the run log.');
} else {
  const manifest = JSON.parse(readFileSync('lighthouse-results/manifest.json'));
  const pct = (n) => (typeof n === 'number' ? Math.round(n * 100) : '–');
  lines.push('| Page | Performance | Best practices | SEO |', '| --- | --- | --- | --- |');
  for (const run of manifest.filter((m) => m.isRepresentativeRun)) {
    const s = run.summary;
    lines.push(`| ${run.url} | ${pct(s.performance)} | ${pct(s['best-practices'])} | ${pct(s.seo)} |`);
  }
  lines.push('', 'Scores are out of 100, the middle of three runs per page.');
}

const assertionsFile = '.lighthouseci/assertion-results.json';
const failures = existsSync(assertionsFile)
  ? JSON.parse(readFileSync(assertionsFile)).filter((a) => a.level === 'error')
  : [];
if (failures.length) {
  lines.push('', 'Below the minimum set in `checks/site-health/lighthouserc.json`:');
  for (const f of failures) {
    lines.push(`- ❌ ${f.url}: ${f.auditProperty ?? f.auditId} is ${Math.round(f.actual * 100)}, minimum ${Math.round(f.expected * 100)}`);
  }
}

writeFileSync('lighthouse-report.md', lines.join('\n') + '\n');
console.log(lines.join('\n'));

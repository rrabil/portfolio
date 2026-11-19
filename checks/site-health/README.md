# Live Site Health Check

Checks the **published** site at `portfolio.richardrabil.com` once a day,
the way a visitor sees it. The other checks in this folder look at the
source files or the build before deploy. This one catches what only shows
up after publishing: the site going down, a link that died since the last
deploy, an accessibility problem in the rendered page, or a slow page.

Runs from `.github/workflows/site-health.yml`:

| Step | Tool | Fails when |
| --- | --- | --- |
| Site is up | `curl` on `/sitemap.xml` | The sitemap does not load after three tries |
| Broken links | Lychee, with the root `lychee.toml` | Any link on any live page is broken |
| Accessibility | Pa11y (`run-pa11y.mjs`, `pa11y.json`) | Any WCAG 2 AA **error** (warnings and notices are ignored) |
| Speed and basics | Lighthouse CI (`lighthouserc.json`, `summarize-lighthouse.mjs`) | Median performance below 70, or best practices or SEO below 80 |

The page list comes from the live `sitemap.xml`, so new pages are checked
automatically.

**Reporting:** every run writes a summary on its run page. A scheduled or
manual run with a problem opens one GitHub issue labeled `site-health`
(or updates the open one), and closes it on the next run where everything
passes. GitHub emails the repository owner about new issues. A pull
request that changes this check runs it too, as a test, but opens no issue.

**Changing thresholds:** edit the `minScore` values in `lighthouserc.json`
(0.7 means 70 out of 100). To change how often it runs, edit the `cron`
line in the workflow.

**Running it now:** Actions tab → "Live site health check" → Run workflow.

Pa11y here runs both HTML CodeSniffer and axe, so it is stricter than the
Doc Detective accessibility spec (`tests/doc-detective/a11y.spec.json`),
which uses Pa11y's default HTML CodeSniffer only.

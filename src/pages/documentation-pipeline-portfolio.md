---
title: Documentation Pipeline Portfolio
description: A closer look at the lint, link-check, build, and deploy pipeline that gates this site.
---

# Documentation Pipeline Portfolio

[How I Built This](/how-i-built-this) tells the narrative version of this site's pipeline—the judgment calls, the near-misses. This page is the mechanical version: what's actually configured, why each piece is shaped the way it is, and what each stage does and doesn't catch.

## The four gated jobs

Everything lives in one GitHub Actions workflow, `.github/workflows/pages.yml`, with four jobs chained by `needs`: `lint` → `link-check` → `build` → `deploy`. Each job only starts if the one before it succeeds, so a failing lint run never reaches a build, and a failing build never reaches a deploy.

`deploy` carries an extra condition beyond `needs`: `if: github.ref == 'refs/heads/main' && github.event_name == 'push'`. That means every pull request runs lint, link-check, and build—so a PR shows whether it's safe to merge—but only a push to `main` can publish. A concurrency group (`group: "pages"`, `cancel-in-progress: false`) means overlapping runs queue instead of racing each other or getting killed mid-deploy.

## Lint: Vale

```bash
vale sync
vale docs/ src/pages/
```

Vale runs directly in CI as an installed binary, not through a third-party GitHub Action—see [How I Built This](/how-i-built-this) for why that distinction mattered. Configuration lives in `.vale.ini`:

- **Base style:** Google's style guide, with `Google.FirstPerson` and `Google.Passive` turned off—this site's first-person, active-voice narrative style intentionally breaks from a strict technical-docs register.
- **Project vocabulary:** `styles/config/vocabularies/Portfolio/accept.txt` allowlists proper nouns and domain terms (company names, product names, acronyms) so they don't get flagged as spelling errors.
- **File-scoped overrides:** one exception, `Google.Exclamation = NO` scoped to `docs/portfolio/samples.md`, because that page quotes a real published article title—"Technical Writing Is Dead. Long Live Technical Writing!"—verbatim. Editing the punctuation to satisfy a linter would misquote the source.

## Link-check: Lychee

```yaml
args: --no-progress --config lychee.toml 'docs/**/*.md' 'src/pages/**/*.md' '*.md'
fail: false
```

Lychee checks every link in Markdown source (not the built HTML) across `docs/`, `src/pages/`, and root-level files. `lychee.toml` excludes two domains outright—`document360.com` and `researchgate.net`—because both intermittently or permanently 403 automated clients regardless of user agent, which would otherwise produce false-positive failures on links that are actually fine.

`fail: false` is a deliberate choice: broken links get reported in the job output, but don't block the pipeline. External link rot is inevitable on a site that cites other people's published work—failing the whole deploy over a URL some third party changed would hold healthy content hostage to something outside this repo's control.

## Build

Standard Docusaurus build: `npm ci` for a clean, lockfile-exact install, then `npm run build`. The `build/` output is uploaded as a workflow artifact so the `deploy` job can consume it without rebuilding.

## Deploy

`deploy` downloads that same `build/` artifact (guaranteeing deploy ships exactly what build produced, not a fresh rebuild that could drift), configures GitHub Pages, uploads the artifact in the Pages-specific format, and publishes via `actions/deploy-pages`.

## What this pipeline doesn't catch—yet

Vale and Lychee both work on *source*, checking prose style and that links resolve. Neither one opens a browser. Neither one knows whether a heading that's supposed to render actually renders, whether a page's own internal navigation link actually navigates when clicked, or whether an MDX component silently failed to render its data while the page still returned a clean 200.

That gap is what [Doc Detective Examples](/doc-detective-examples) covers: a small, real Doc Detective test suite that drives an actual browser against this site and checks rendered output and in-browser interaction, not just source text. It runs locally today (`npm run test:docs`), not yet as a fifth gated CI stage—see that page for the honest state of it, including a real bug the process caught.

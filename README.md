# Richard Rabil Portfolio

Technical writing and AI knowledge systems portfolio, built with [Docusaurus](https://docusaurus.io/). See [AGENTS.md](AGENTS.md) for full project context, architecture decisions, and content plan — this file only covers running the site locally.

## Local development

```bash
npm start
```

Starts a dev server at `http://localhost:3000/` with hot reload.

## Build

```bash
npm run build
```

Outputs static files to `/build`.

## Lint

Style/spelling checks run via [Vale](https://vale.sh/), configured in `.vale.ini`. Style packages under `styles/` (except `styles/config/`) are fetched with `vale sync` and are not tracked in git.

```bash
vale sync
vale docs
```

## Deploy

Deploys to GitHub Pages via the workflow in `.github/workflows/`, gated on lint, link-check, and build passing.

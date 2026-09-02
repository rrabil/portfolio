# Markdown Twin Checker

Verifies that every published HTML page built from a Markdown source has
a matching plain-Markdown twin (`<route>/index.md`) and an
`<link rel="alternate" type="text/markdown">` tag in its `<head>`. Part
of the machine-readable content layer described in AGENTS.md.

Run via `npm run check:md-twins`, against a completed `build/` (i.e.
after `npm run build`, which runs the twin/link generator at
`scripts/generate-llm-content.mjs` as its `postbuild` step). Exits
non-zero and lists every missing twin or tag if anything is out of sync.

The homepage is checked too, but as a simpler, separate assertion: it
has no Markdown source page to walk the way docs/ and src/pages/ pages
are walked (`index.js` is hand-written React), so its twin
(`src/pages/home.md`) is hand-authored rather than generated. See
`check.mjs`'s header comment and `scripts/generate-llm-content.mjs` for
why that split is intentional.

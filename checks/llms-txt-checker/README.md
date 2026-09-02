# llms.txt Checker

Verifies that `build/llms.txt` is current and accurate: a two-way set
comparison between the pages in the content source (docs/, src/pages/,
plus the hardcoded homepage entry) and the page links inside
`llms.txt`. Fails if either side has an entry the other doesn't.

Run via `npm run check:llms-txt`, against a completed `build/`. This is
a safety net on top of the automatic regeneration in
`scripts/generate-llm-content.mjs` (the `postbuild` step) — it exists to
catch `llms.txt` drifting out of sync, e.g. a manual or partial deploy
that skipped the build step, not to replace the generator.

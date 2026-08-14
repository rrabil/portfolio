# Link Checker

Currently runs via [Lychee](https://lychee.cli.rs/) as the proven baseline
(wired into `.github/workflows/pages.yml`), per AGENTS.md's note that
Lychee can serve as a baseline to extend rather than starting from a
hand-written checker.

Open design question, not yet decided: whether this should check raw
Markdown source or the built HTML output — the built-HTML option is more
accurate for anchor links but only catches breakage after a full build.

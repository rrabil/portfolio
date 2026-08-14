# Self-Healing Docs Checks

Modular checker system: each check is a self-contained module under this
directory with a shared runner interface — input is the site build output
(or source, per the open question below), output is pass/fail plus a
report. Adding a new check means adding a new module, not rewriting the
runner or existing checks.

Current modules:

- `link-checker/` — stale/broken link detection.

Backlog (not yet built): broken image references, heading-anchor drift,
front-matter/metadata validation.

See `AGENTS.md` → "Self-healing docs principle" for full context.

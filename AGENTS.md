# AGENTS.md

Tool-agnostic project context for AI coding agents (Claude Code, Codex, or others) working on this repository. This file is the source of truth — update it as decisions change, and keep any tool-specific file (e.g., `CLAUDE.md`) as a thin pointer to this one rather than a duplicate.

## Project overview

Personal portfolio site for Richard Rabil, Principal Technical Writer & AI Knowledge Systems Architect. The site itself is a demonstration artifact: it embodies a scalable docs-as-code implementation, not just describes one. Purpose is to show mastery of technical writing at a senior level and establish credibility in AI-assisted knowledge systems architecture, for external job search positioning.

Follows common docs-as-code portfolio conventions: a Markdown/MDX static site generator, automated prose linting, automated link checking, and a transparent "how this was built" narrative page — general best practices for demonstrating technical-writing and AI-collaboration credibility, not modeled on any single existing site.

## Site architecture decisions

**Static site generator:** Docusaurus — chosen for solid Markdown/MDX support, an active plugin ecosystem, and native GitHub Pages compatibility.

**Hosting:** GitHub Pages, free tier.

**Navigation (flat, top-level, six items max):**

- Home
- About Me
- Portfolio (tech doc samples)
- Skills & Agents
- API Sample (fictional)
- How I Built This
- Blog → external link to richardrabil.com (not hosted on this site)
- Resume → HTML page + downloadable PDF

## Repo structure

```
/docs                  → portfolio content, samples, skills pages
/api                    → OpenAPI spec + Scalar (or Redoc) render config
/agents or /.claude     → AGENTS.md, CLAUDE.md, custom commands/skills
/checks                 → self-healing docs components, one module per check
  /checks/link-checker
  /checks/[future check]
/.github/workflows       → CI pipeline definitions
```

## CI pipeline (GitHub Actions)

Runs on every push/PR, in order:

1. **Lint** — style/spelling checks (Vale or similar)
2. **Link check** — custom stale-link checker module from `/checks` (or Lychee as a proven baseline to extend)
3. **Build** — static site generator compiles Markdown/MDX to static HTML
4. **Deploy** — publish to GitHub Pages, only if all prior steps pass

Open design question: whether the link checker runs against raw Markdown source or against built HTML output (affects anchor-link accuracy). Decide when building the `/checks/link-checker` module.

## Self-healing docs principle

`/checks` is designed as a modular, scalable checker system, not a single-purpose script:

- Each check is a self-contained module with a shared runner interface: input = site build output (or source, per the open question above), output = pass/fail + report.
- First check: stale/broken link detection.
- Future checks (backlog, not yet built): broken image references, heading-anchor drift, front-matter/metadata validation.
- Adding a new check should mean adding a new module, not rewriting the runner or existing checks.

## Page content notes

**About Me:** States the dual identity in prose — one paragraph on core tech writing background (15+ years, DITA/Oxygen migration, Opower→Oracle methodology continuity), one on AI knowledge systems architecture (governance frameworks, custom GPT architecture, this site as proof). Not a resume-bullet dump.

**Portfolio:** Existing tech doc samples (PDFs), grouped by artifact type (how-to guides, migration/governance docs, SOP frameworks) rather than by employer.

**Skills & Agents:** Showcases the distinction between:

- Human-authored standing rules — this AGENTS.md file, plus any tool-specific config
- AI-generated/accumulated memory — e.g., Claude Code's auto memory / MEMORY.md, which the agent writes itself across sessions
This distinction maps directly to the governance-framework language already used in Richard's resume and should be made explicit on this page, not just implied.

**API Sample:** Fictional OpenAPI 3.1 spec, utilities-domain (usage data, billing, meter readings) to leverage Oracle Utilities background, rendered via Scalar. Server is not real — "Try it" requests will fail; example responses carry the demonstration.

- Open constraint: real authenticated data access isn't feasible for a fictional/public demo. Current plan (static example responses, no live backend) is confirmed workable for now. Revisit only if a more dynamic demo becomes worthwhile later.

**How I Built This:** Follows a build-transparency structure common to technical portfolios: vision → what was built → 2–3 concrete moments of overriding or correcting AI output → conclusion. The specific disagreements/judgment calls are the point; do not skip to only the polished outcome.

**Resume:** HTML page (better for SEO/scannability) plus a downloadable, ATS-parseable PDF (plain structure, no tables/columns/graphics). Keep both in sync but not identical — the HTML version can be more expansive with inline portfolio links.

## Career positioning context (for content generation, not code)

- Dual identity: Principal Technical Writer + AI Knowledge Systems Architect.
- Differentiator to emphasize throughout the site: judgment over tool-fluency — documented evidence of knowing when and why to override AI output, not just AI tool use itself.
- Resume stays broad/high-level; specific narrow evidence (e.g., wiki retirement SOP methodology continuity from Opower to Oracle, Codex plugin details) is reserved for cover letters, interviews, and site narrative pages like "How I Built This" — not for resume bullets.
- Domain expertise to leverage: DITA/Oxygen migrations, docs-as-code, Confluence governance, Oracle Utilities domain knowledge (usage data, billing, meter readings).

## Standing rules for agents working in this repo

- Verify the installed/current version of any library or framework before writing code against its API or schema — do not assume from training knowledge.
- Write test instructions (e.g., for Doc Detective or similar tools) for the tool's parser, not as prose a human would read.
- Flag side effects of any suggested change before making it (e.g., file-type conversions that alter framework behavior), rather than surfacing them only after something breaks.
- When a repeated correction happens twice, it belongs in this file, not just in session memory.

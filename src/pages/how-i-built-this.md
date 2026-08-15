---
title: How I Built This
description: Vision, what was built, and the moments of overriding AI output along the way.
---

# How I Built This

In this portfolio site, I wanted to demonstrate two credentials together: deep technical writing craft, and the governance discipline to keep AI-assisted content trustworthy at scale. I also wanted to present evidence of the pipeline, standards, and judgment calls that produced them. That's what this page is all about.

## The system

This is a Docusaurus (Markdown/MDX) site deployed to GitHub Pages through a four-stage pipeline that gates on itself:

1. Vale (prose linting)
2. Lychee (link checking)
3. Build
4. Deploy

Each stage blocks the next, defined as four jobs in a single GitHub Actions workflow, each depending on the one before it. Deploy only runs on pushes to `main`, not on pull requests, so nothing publishes without someone actually merging it.

**Vale** enforces prose style: a base Google style guide, plus rules layered on for this site specifically—an em-dash spacing rule, a project vocabulary file so proper nouns and jargon (company names, product names, acronyms) don't get flagged as typos, and file-scoped rule overrides for the rare case where a rule shouldn't apply, like a quoted title that can't be edited just to satisfy a linter. Only error-level findings block a deploy; warnings and suggestions surface without stalling one over a subjective style call.

**Lychee** checks every link in the content before it ships. That matters past the obvious case of a typo'd URL: links that are valid when written can rot months later, and a portfolio site with stale citations is a credibility problem, not just an inconvenience.

A single `AGENTS.md` file holds project context, content structure decisions, and standing rules for any AI agent working in this repository, so decisions stay consistent across sessions instead of being re-litigated every time. Claude Code did the implementation work: scaffolding, content drafting, CI configuration, and lint/vocabulary maintenance, under direction and review.

## Where judgment mattered

**A monitoring gap that made a broken check look healthy.** The CI pipeline originally used a third-party GitHub Action for prose linting, running in a local-reporter mode. It looked correct, but the Action's own exit code silently overrode the pass/fail signal regardless of severity—meaning content could fail every rule and the pipeline would still report success. Catching this required tracing through the Action's internals rather than accepting the first green checkmark. The fix: drop the Action, install the linter directly in CI, and run it as a plain shell command that trusts its own exit code.

**A fix that broke the thing it was supposed to protect.** While building the Work Samples page, a linked article title—"Technical Writing Is Dead. Long Live Technical Writing!"—tripped a style rule against exclamation points. The title is real and published verbatim; it isn't something to edit to satisfy a linter. Claude's first suggestion was an inline HTML comment to suppress the rule for that one line. It broke the site's build immediately, because this Docusaurus setup compiles content as MDX, which doesn't accept raw HTML comments anywhere in a file. The follow-up fix—switching to MDX's own comment syntax—solved the build error but silently broke the original goal, since the linter doesn't recognize that syntax as a directive at all. The actual fix was a scoped rule override added directly to the linter's own config file, which only surfaced from checking the rendered page and the linter output, not from trusting that a plausible-looking fix had worked.

**Editorial calls that AI defaults wouldn't have made.** Structuring the Work Samples page meant rejecting as much as accepting. "Technical Editing" was a reasonable candidate category, backed by real experience with internal style guides—but nothing existed to link to, so it stayed out rather than becoming a bullet list, which isn't what a samples page is for. Category naming—pairing "Information Architecture" with "Knowledge Management" rather than "Content Strategy"—was chosen specifically to avoid overlapping language with the AI-focused section elsewhere on the same page, so a recruiter scanning quickly wouldn't wonder if the two sections meant the same thing.

## What this proves

The differentiator isn't AI tool fluency—plenty of people can prompt a model to generate content. What this site demonstrates is judgment: catching a monitoring gap that made a broken check look healthy, catching a fix that solved the wrong problem, and making deliberate editorial calls about what does and doesn't belong on a page. That's the same discipline behind the governance frameworks described in the [About](/about) and [Skills & Agents](/docs/skills-agents/standing-rules-vs-memory) pages, applied here, in public, to itself.

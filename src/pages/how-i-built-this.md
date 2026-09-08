---
title: How I Built This
description: Vision, what was built, and the moments of overriding AI output along the way.
---

# How I Built This

In this portfolio site my goal is to demonstrate a few things together: deep expertise in technical writing paired with techniques in AI-assisted content engineering and knowledge management. As part of this goal, I wrote this page to explain the system behind this site, the content pipeline, and the judgment calls I made along the way to produce it.

## The system

This is a Docusaurus (Markdown/MDX) site deployed to GitHub Pages through a five-stage pipeline that gates on itself:

1. Vale (prose linting)
2. Lychee (link checking)
3. Build
4. Machine-readable checks (Markdown twins, `llms.txt`)
5. Deploy

Each stage blocks the next one, defined as five jobs in a single GitHub Actions workflow, with each depending on the one before it. Deploy only runs on pushes to `main`. I review all pull requests. This means nothing publishes without me actually merging it.

**Vale** enforces prose style. I configured it to use a base Google style guide, plus rules layered on top for this site specifically, such as grammar exceptions, a project vocabulary file for proper nouns and jargon, and overrides for the rare cases where a rule shouldn't apply just to satisfy a linter. Only error-level findings block a deploy. Warnings and suggestions are flagged without stalling a deploy.

**Lychee** checks every link in the content before it ships. That matters past the obvious case of a URL with typos: links that are valid when written can rot months later, and present a credibility problem.

**Machine-readable checks** verify the build's own self-healing-docs guarantees: that every page has a Markdown twin and an `<link rel="alternate">` tag pointing at it, and that `llms.txt` actually matches the site's real pages. See [Documentation Pipeline Portfolio](/documentation-pipeline-portfolio) for how those checks work.

A single `AGENTS.md` file holds project context, content structure decisions, and standing rules for any AI agent working in this repository, so decisions stay consistent across sessions. I used Claude Code for the implementation work: scaffolding, initial content drafting, CI configuration, and lint/vocabulary maintenance, under my direction and review. Down with AI slop. (And yes, I did install an AI de-slopping skill.)

For a closer look at the pipeline's actual configuration, see [Documentation Pipeline Portfolio](/documentation-pipeline-portfolio).

Moreover, I used the Doc Detective browser-based testing suite to run checks on things that Vale and Lychee can't, such as rendered content and navigation. See [Doc Detective Examples](/doc-detective-examples), which describes a real browser-based test suite that catches what Vale and Lychee can't—rendered content and in-browser navigation, and other things.

## Editorial judgment

I am amazed at how powerful AI has been in helping me scaffold and stand up this site. But I also quickly learned that the process is not seamless, and I found several areas in need of critical hands-on direction. Some examples of that were:

**A monitoring gap that made a broken check look healthy.** The CI pipeline originally used a third-party GitHub Action for prose linting, running in a local-reporter mode. It looked correct, but the Action's own exit code silently overrode the pass/fail signal regardless of severity—meaning content could fail every rule and the pipeline would still report success. Catching this required tracing through the Action's internals rather than accepting the first green checkmark. The fix: drop the Action, install the linter directly in CI, and run it as a plain shell command that trusts its own exit code.

**A fix that broke the thing it was supposed to protect.** While building the Work Samples page, a linked article title—"Technical Writing Is Dead. Long Live Technical Writing!"—tripped a style rule against exclamation points. The title is real and published verbatim; it isn't something to edit to satisfy a linter. Claude's first suggestion was an inline HTML comment to suppress the rule for that one line. It broke the site's build immediately, because this Docusaurus setup compiles content as MDX, which doesn't accept raw HTML comments anywhere in a file. The follow-up fix—switching to MDX's own comment syntax—solved the build error but silently broke the original goal, since the linter doesn't recognize that syntax as a directive at all. The actual fix was a scoped rule override added directly to the linter's own config file, which only surfaced from checking the rendered page and the linter output, not from trusting that a plausible-looking fix had worked.

**Editorial calls that AI defaults wouldn't have made.** Structuring the Work Samples page meant rejecting as much as accepting. "Technical Editing" was a reasonable candidate category, backed by real experience with internal style guides—but nothing existed to link to, so it stayed out rather than becoming a bullet list, which isn't what a samples page is for. Category naming—pairing "Information Architecture" with "Knowledge Management" rather than "Content Strategy"—was chosen specifically to avoid overlapping language with the AI-focused section elsewhere on the same page, so a recruiter scanning quickly wouldn't wonder if the two sections meant the same thing.

## What this proves

Of course, plenty of people can prompt a model to generate content. What this site demonstrates is judgment: catching a monitoring gap that made a broken check look healthy, catching a fix that solved the wrong problem, and making deliberate editorial calls about what does and doesn't belong on a page. That's the same discipline behind the governance frameworks described in the [About](/about) and [Resume](/resume) pages, applied here, in public, to itself.

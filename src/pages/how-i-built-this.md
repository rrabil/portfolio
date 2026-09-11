---
title: How I Built This
description: The system, content pipeline, automated checks, skills, and agent context behind this site.
---

# How I Built This

My goal in this portfolio is to demonstrate my deep experience in AI-assisted technical writing, content engineering, and knowledge systems management. To that end, I worked with Claude over many iterations and editorial reviews to develop this page and showcase the underlying system, content pipeline, skills, and agents I used to produce the site.

## System Overview

This site is a [Docusaurus](https://docusaurus.io/) (Markdown/MDX) static site, hosted on [GitHub Pages](https://docs.github.com/en/pages) and deployed through a single GitHub Actions workflow. Every push runs the same lint, link-check, and build jobs, and a pull request (PR) shows whether it's safe to merge the changes. Only pushes to main trigger deployments. I review all PRs before merging them.

## Content Pipeline

**Vale:** Vale enforces prose style. I configured it to use the [Google developer documentation style guide](https://developers.google.com/style) as a base and layered a few rules on top that are specific to this site, such as grammar exceptions, a project vocabulary file for proper nouns and jargon, and overrides for cases where a rule shouldn't apply just to satisfy a linter. Only error-level findings block a deploy, whereas warnings and suggestions are flagged without stalling anything.

**Lychee:** Lychee checks every link in the content before shipping it, which is important beyond merely catching URL typos. Links that are valid now can rot months later and pose a credibility problem. That said, I configured broken links to be reported in the results rather than block the pipeline. The reason is that I don't want to fail a whole deploy over a URL changed by some third party, thus blocking otherwise healthy content due to edits outside of my control.

**Markdown Twin Checker (md-twin-checker):** This pipeline step is inspired by the [AcceptMarkdown](https://acceptmarkdown.com/) solution. However, I couldn't implement AcceptMarkdown because GitHub Pages is a static site that doesn't have a server-side ability to interpret content requests and decide what to serve. So I went with a slightly different implementation. Every page built from a Markdown source file gets a plain-text twin, plus a `<link rel="alternate" type="text/markdown">` tag pointing at it. This enables an AI agent or crawler to get the raw Markdown version of an HTML page from a static host that has no server-side content negotiation. The md-twin-checker verifies that the pairing actually happened after a build so that every HTML page has its twin and its alternate-link tag. It runs against the build output and is checked automatically before anything publishes. A failure here blocks deploy the same as a failed build.

**LLMS.txt (llms-txt-checker):** An llms.txt file is automatically regenerated at the site root on every build, listing every page's title, description, and URL.

The exception to this is the homepage, which is an index.js file with React components. Because there is no Markdown source for it, the home.md file is a hand-authored twin, excluded from Docusaurus's own routing so it doesn't also render as a real page, with its llms.txt entry hardcoded in the generator rather than read from frontmatter.

The llms-txt-checker verifies that the generated llms.txt file actually matches the site's real pages. It fails if either side has an entry the other doesn't, similar to how the md-twin-checker looks for page twins.

## Doc Detective Checks

Although both Vale and Lychee check content in the source, neither opens a browser to check that things are working as expected. Doc Detective drives a real browser against the live site and checks rendered output and in-browser interaction directly. I have the open-source [Doc Detective](https://github.com/doc-detective/doc-detective) testing framework to thank for this one.

**a11y.spec.json:** This spec runs an automated testing process using [Pa11y](https://github.com/pa11y/pa11y) against the Web Content Accessibility Guidelines (WCAG2AA). The process audits the home, resume, and work-samples pages to ensure each comes back with zero WCAG2AA errors.

This is a different layer than the rest of my Doc Detective suite. While the other specs confirm that content renders and navigation works, this one confirms that the HTML page's actual structure is usable by assistive technology for users with disabilities, checking things like alt text, contrast, landmarks, ARIA (Accessible Rich Internet Applications)—things which none of the other specs can see.

**home.spec.json:** This spec checks two things beyond what Vale and Lychee can check:

1. The homepage actually renders a hero headline and at least one "Selected Work" card (not just that the URL returns 200 OK response from the web server).
2. The primary work call-to-action (CTA) actually navigates to the Work samples page when clicked. The check targets the CTA's structural class and href rather than its visible label so that editing the button text doesn't break the test.

**resume.spec.json:** This spec checks that the resume renders its name, headline, and Work Experience heading, and that its LinkedIn link resolves via Doc Detective's own checkLink step. (The latter is distinct from Lychee's check of the same URL, since Lychee only confirms the string is a valid link in source, not that a resolved DOM href on the live page actually works.)

**work-samples.spec.json:** This spec confirms that all category sections on the Work page actually render. A link checker sees a clean 200 OK response even if an MDX component's data silently failed to populate a section.

Curious whether it actually passes? The specs live in [tests/doc-detective/](https://github.com/rrabil/portfolio/tree/main/tests/doc-detective)—skim them to see exactly what's checked, or run `npm run test:docs` yourself if you've got the repo cloned.

## Skills

I worked with Claude to build several skills to accelerate different aspects of the portfolio development process. Some of the skills are related to preparing samples, while others are designed to facilitate updates to the website.

**deck-builder:** This skill regenerates and re-publishes slide-deck work samples so that they are more generic and stylistically consistent. It started as a builder for two specific workshop decks and grew to cover case studies, project readouts, proposals, and retros, all of which share a catalog of reusable slide layouts. The slide-deck work samples are generated from code rather than built manually in PowerPoint, with editable .pptx sources kept outside the repo. Only PDF exports are published to the site, and I keep a log of what's live so as to avoid republishing anything by accident.

**de-slop:** For this one, I evaluated two open-source Claude Code skills built for the same problem: modifying AI-drafted prose so it doesn't sound robotic and terrible. The first one, [no-ai-slop](https://github.com/petergyang/no-ai-slop), is engineered better and removes bad patterns, but doesn't go beyond that. The second one, [unslop](https://github.com/theclaymethod/unslop), is a plainer file, but it has an interesting four-step method that treats stripped-down text as insufficient (meaning the text may be grammatically correct but still pretty boring), and so it includes an explicit "add personality" and self-audit pass. Instead of choosing one over the other, I had Claude evaluate and merge them into one local skill (while crediting both source repositories directly).

**guide-doc-builder:** This skill builds and updates document writing samples that are styled to match the portfolio's visual theme. It started as a single guide builder and grew to cover three shapes (user guides, troubleshooting guides, and comparison/decision docs) that all share the same design system and toolchain. For example, if I have a writing sample that I need to transform or genericize so it can be shared, this skill helps me style it in a consistent way after the editing is done.

Right now, each new document type starts from copying an existing example rather than filling in one generic template. I'm holding off on building a generic template system until I've made about five documents and can see what they have in common rather than designing a one-size-fits-all model prematurely.

**portfolio-page-review:** Copyediting my own pages solo means the same three mistakes slip through repeatedly—a fact that's drifted from what the code actually does, a term that assumes more technical background than a reader has, or a section that undersells work that's genuinely more interesting than the sentence describing it. So I built a skill that runs all three checks—technical accuracy against the live repo, plain-language clarity, and a "would a hiring manager actually notice this" pass—every time I revise a page. Unlike the others above, it isn't a Claude Code skill living in this repo; it runs in a separate Claude session that reviews pages against this repo from the outside.

**portfolio-precheck:** This skill mirrors the repository's CI pipeline—lint, build, and an optional link-check—so I can catch a failure locally before pushing anything and having GitHub Actions tell me later what went wrong. It runs the same steps in the same order, stops at the first failure, and follows Vale's own exit code as the source of truth.

**sample-card-manager:** As I designed the work-sample cards, I found myself repeating the same steps to refine them. So I created this skill to add, update, reorder, or re-image the work-sample cards on the home page and the Work/samples page—the two things that actually change per card (the thumbnail and the data entry)—without re-deriving the responsive card layout or image-sourcing logic each time. The skill encodes decisions like thumbnail-sourcing priority (local file, then blog featured image, then PDF render, then live screenshot) so that the logic doesn't need to loop again card by card.

## AGENTS.md

I added a single AGENTS.md file at the repo root to contain tool-agnostic project context for any AI coding agent working here (Claude, Codex, or otherwise). This keeps decisions consistent across sessions instead of needing to be explained again each time. The file contains site architecture decisions, the full repo structure, the CI pipeline stages, the self-healing docs principle, and other bits of context. It's yet another example of the "serve two audiences" philosophy: a file that both humans and agents can read.

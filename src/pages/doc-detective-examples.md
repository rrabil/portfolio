---
title: Doc Detective Examples
description: A real, working Doc Detective test suite for this site—what it checks, its actual results, and a bug the process caught.
---

# Doc Detective Examples

The [pipeline](/documentation-pipeline-portfolio) lints prose and checks that links resolve, but neither Vale nor Lychee opens a browser. Neither can tell you whether a heading that's supposed to render actually renders, or whether clicking a link on the live page actually navigates. [Doc Detective](https://doc-detective.com) fills that gap: it drives a real browser against the site and checks rendered output and in-browser interaction directly, the same way a user would experience it.

This page documents a small, real test suite against this site—not a fictional demo. It runs locally today via `npm run test:docs`; it isn't yet wired into the GitHub Actions pipeline as a fifth gated stage (see [Documentation Pipeline Portfolio](/documentation-pipeline-portfolio) for what is gated today).

## What's tested

Three specs, six tests, in [`tests/doc-detective/`](https://github.com/rrabil/portfolio/tree/main/tests/doc-detective):

**`home.spec.json`**—the homepage renders its hero headline and Selected Work section, and clicking "View My Work" actually navigates to the Work samples page (not just that `/docs/portfolio/samples` resolves as a URL—Lychee already confirms that; this confirms the click itself works).

**`work-samples.spec.json`**—all four category sections on the Work page render (a link-checker sees a 200 even if an MDX component's data silently failed to populate a section), and the page's own link to this Doc Detective Examples page is live and clickable.

**`resume.spec.json`**—the resume renders its name, headline, and Work Experience heading, and its LinkedIn link resolves via `checkLink`.

A representative step, from `home.spec.json`:

```json
{
  "testId": "View My Work navigates from the homepage to the Work samples page",
  "steps": [
    { "goTo": { "url": "/" } },
    { "find": { "elementText": "/View My Work/", "click": true } },
    { "wait": 1500 },
    { "find": { "elementText": "/This page represents a sample of my published, production work/" } }
  ]
}
```

## Results

```
===== Doc Detective Results Summary =====

Specs:   Total: 3   Passed: 3   Failed: 0
Tests:   Total: 6   Passed: 6   Failed: 0
Steps:   Total: 24  Passed: 24  Failed: 0

🎉 All items passed! 🎉
```

## Where judgment mattered

The first full run wasn't clean, and two of the three failures were genuinely informative rather than just typos.

**Heading matches were failing on exact text.** `elementText` does an exact match against an element's full visible text by default. Every heading-level check (`Work Experience`, `Technical Writing & Documentation`, and others) failed with "Element not found within timeout," while plain paragraph text matched fine. The cause: Docusaurus renders a hash-link anchor alongside every H2/H3 for permalinking, and the element's computed text no longer equals the bare heading string. The fix was switching those checks to Doc Detective's substring-match syntax (wrapping the value in `/slashes/`) instead of assuming exact text would work—same lesson as the MDX-comment fix on [How I Built This](/how-i-built-this): the first plausible-looking fix isn't automatically the right one until you check what actually changed.

**A click that reported success but didn't navigate.** The Work page's link to this very page—"Doc Detective examples"—matched by text and reported `Clicked element`, but the following assertion on the destination page still failed. A screenshot taken immediately after the click showed the browser hadn't moved at all; it was still on the Work page. Text-based element matching inside a paragraph can locate and register a click on an element without it being scrolled into an actionable position, so the click event fires but doesn't land where the browser thinks it's landing. The fix: target the link by its actual `href` with a CSS selector instead of its display text, and add an explicit `moveTo: true` scroll-into-view immediately before the click. After that change, the same test passed cleanly on the first try.

That second one is the more useful finding: a green "Clicked element" result was, on its own, a false signal. The test suite's own log said the step succeeded; the actual browser state said otherwise. Screenshotting the failure rather than trusting the reported step status is what caught it—the same discipline the CI pipeline needed when a linting Action's exit code silently overrode a real failure.

## Running it yourself

```bash
npm run test:docs
```

Runs headless Chrome against `http://localhost:3000/portfolio` (configured via `origin` in [`.doc-detective.json`](https://github.com/rrabil/portfolio/blob/main/.doc-detective.json))—start the dev server first with `npm start`. Results land in `tests/doc-detective-results/` (gitignored; regenerated per run), including a JUnit report if this ever becomes a CI stage.

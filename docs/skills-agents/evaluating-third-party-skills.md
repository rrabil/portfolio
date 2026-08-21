---
sidebar_position: 2
---

# Evaluating and merging third-party skills

A short case study in judgment applied to off-the-shelf AI tooling, rather than a claim of authorship over any of it.

## The question

Two open source Claude Code skills exist for the same problem: editing AI-drafted prose so it doesn't read as AI-drafted.

- [petergyang/no-ai-slop](https://github.com/petergyang/no-ai-slop): a maintained package with Edit, Detect, and Generate modes, a quality-check file (`eval.md`), and installers for multiple platforms.
- [cursor/plugins, pstack/skills/unslop](https://github.com/cursor/plugins/blob/main/pstack/skills/unslop/SKILL.md): a single-file guide built around a four-step method (identify, rewrite, add personality, self-audit).

The question wasn't which one is better in the abstract. It was which one, or which combination, actually earns a place in a daily editing workflow.

## What the comparison found

The two skills overlap heavily on the subtraction side. Both maintain similar banned-word lists (leverage, delve, robust, paradigm shift) and flag the same structural tells, such as colon-reveal sentences, fake-profound endings, and formulaic triads.

They diverge on what happens after the subtraction. `no-ai-slop` is better engineered: it ships with a quality-check file to grade output and an installer for reuse across tools, but its guidance stops at cutting the bad patterns. `unslop` is a plainer file with no tooling around it, but its four-step method treats stripped-down text as a failure state on its own. Step three is explicitly "add personality": take a stance, vary sentence length, keep first person, tolerate imperfection, then run a self-audit pass.

Running both independently on the same draft confirmed the pattern. `no-ai-slop` alone produced clean but flat prose. `unslop` alone caught fewer of the specific banned phrases but left a more distinct voice behind.

## The decision

Neither skill was adopted as-is. The two were merged into a single local skill, using `no-ai-slop`'s structure and pattern list as the base, with `unslop`'s "add personality" and self-audit steps folded in as an explicit third and fourth stage. Both source repositories are credited directly in the merged file rather than presented as original work.

That merge, not the individual skills, is the actual artifact of this exercise: recognizing that a subtraction-only tool and an addition-aware tool solve different halves of the same problem, and that neither author needed to write the other half for this to be usable.

## Why this is a write-up, not a skill listing

It would be a poor signal to drop either skill's files into this repo and present them as tools built here. They weren't, and doing so would misattribute another person's prompt engineering. What's shown here instead is the evaluation: what was compared, what the tradeoff actually was, and the reasoning behind combining rather than picking one. That's the same judgment-over-tool-fluency positioning as the rest of this site, applied here to a smaller, self-contained decision instead of a full pipeline.

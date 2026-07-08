# Youth AI Build Lab

Youth AI Build Lab helps students turn rough ideas into business assets, project pages, outreach materials, and portfolio-ready case studies.

## Mission

A guided AI studio for young creators, athletes, and entrepreneurs.

## Demo

- Live system: https://knoxkiminou1-byte.github.io/youth-ai-build-lab/
- GitHub: https://github.com/knoxkiminou1-byte/youth-ai-build-lab

## Core Features

- **Idea clarification:** Turns vague goals into audiences, offers, risks, and next questions.
- **Asset generation:** Drafts outreach copy, landing sections, captions, flyers, and case-study pages.
- **Rubric coaching:** Scores clarity, audience fit, truthfulness, feasibility, and polish.
- **Portfolio export:** Packages the project with reflection and mentor notes.

## Claude Architecture

This MVP is Claude-ready without requiring a public API key. Deterministic TypeScript handles facts, scores, scans, approval gates, and metrics. Claude is reserved for narrative explanation, coaching, report drafting, risk interpretation, and nontechnical translation.

## Human Review Workflow

Outputs that could affect real people are treated as drafts until reviewed. The UI, docs, and eval cases all reinforce human approval before export.

## Evaluation Strategy

Eval fixtures live in `evals/cases`. Unit tests cover deterministic logic in `src/lib`.

## Tech Stack

- React + Vite
- TypeScript
- Zod-ready architecture
- Vitest
- GitHub Pages

## Local Setup

```bash
npm install
npm run dev
```

## Verify

```bash
npm run test
npm run build
```

## Documentation

- [Product brief](docs/product-brief.md)
- [Architecture](docs/architecture.md)
- [Evaluation plan](docs/evaluation-plan.md)
- [Security](docs/security.md)
- [Runbook](docs/runbook.md)
- [Training guide](docs/training-guide.md)
- [Handoff checklist](docs/handoff-checklist.md)
- [Limitations](docs/limitations.md)

## What I Would Improve Next

Add authenticated workspaces, real Claude API execution behind server-side routes, persistent Postgres storage, and a browser-based eval runner that records regression history.

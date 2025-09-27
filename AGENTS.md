# Knowledge-Graph Agent Guide

> This instruction hierarchy follows the practices described in *AGENTS.md & Agent-Native Development (2025)* for multi-level agent coordination. Root guidance provides shared defaults; consult nested `AGENTS.md` files for folder-specific overrides.

## Repository Overview
- React + TypeScript knowledge graph explorer located under `app/`.
- Front-end build powered by Vite with Tailwind CSS and Framer Motion.
- CSV ingestion utilities live in `app/src/utils/` and demo assets under `app/public/`.
- Planning artifacts and lifecycle records live under `docs/`.

## Workflow Expectations
1. **Prefer working within scoped subdirectories.** Always read the nearest `AGENTS.md` before editing files.
2. **Node & npm versions:** Use Node.js 18.x (or newer LTS) with npm 10+. If a version mismatch is detected, surface it instead of forcing installation.
3. **Dependency management:** Run commands from inside the `app/` directory. Do not commit lockfile changes unless dependencies were intentionally updated.
4. **Git hygiene:** Keep commits focused; include human-readable messages explaining *what* and *why*.

## Core Commands
Run these before submitting any code changes unless a more specific subdirectory instructs otherwise:
- `npm install` *(inside `app/`)* — install dependencies.
- `npm run lint` — ensure ESLint passes.
- `npm run build` — compile the Vite project to verify TypeScript correctness.

If any command fails, stop and report the failure with logs rather than attempting ad-hoc fixes.

## Coding & Documentation Standards
- Follow TypeScript strictness and React functional component patterns; prefer hooks and composition.
- Keep repository documentation (README, setup guides) consistent and updated when workflows change.
- Ensure prose edits remain clear and concise. For new markdown, include meaningful headings and avoid trailing whitespace.

## Pull Request Guidance
When preparing a PR (per the 2025 research guidance on programmatic verification):
- Summarize major changes and their motivation.
- Attach output from required commands (`npm run lint`, `npm run build`).
- Highlight any data migrations or manual steps testers must perform.
- Note security-sensitive impacts explicitly.

## Security & Data Handling
- Never commit secrets or personal data. Use `.env` files locally and keep them out of Git.
- Treat CSV uploads as potentially untrusted input; validate parsing paths when altering loader logic.
- Document any new network calls or external integrations before merging.

## Files & Areas to Avoid
- Do **not** edit generated artifacts (`app/dist`, build outputs) or vendored modules (`app/node_modules`).
- Preserve historical analyses such as `AGENTS_SETUP_EVALUATION.md` for context unless instructed otherwise.

## Support
If encountering missing instructions, propose updates to the relevant `AGENTS.md` instead of guessing. Coordinate with maintainers for architectural shifts.

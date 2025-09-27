# Assets Agent Guide

> Asset handling guidance per the hierarchical pattern in *AGENTS.md & Agent-Native Development (2025)*.

## Scope
Static files under `app/src/assets/` (SVGs, images, etc.).

## Rules
- Optimize assets before committing. For SVGs, prefer clean vector markup without unnecessary metadata.
- Do not inline large SVGs into TypeScript files; import them as modules to leverage Vite’s asset handling.
- When replacing an asset, ensure references in components are updated and verify rendering via `npm run dev`.
- Document licensing or attribution requirements for third-party assets in the nearest README.

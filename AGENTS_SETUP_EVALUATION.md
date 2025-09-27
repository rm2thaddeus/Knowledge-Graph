# Evaluation of Proposed `AGENTS.md` Hierarchy

This document evaluates the proposal to introduce a hierarchy of `AGENTS.md` (or vendor-compatible
`agents!.md`) files for the Knowledge Graph Explorer project. The assessment is grounded in the
recommendations outlined in *AGENTS.md & Agent‑Native Development (2025)*, which documents how
industry tooling (Codex, Jules, Factory, Cursor, etc.) consume `AGENTS.md` instructions across
repository scopes.

## Project Context

- **Tech stack**: React 19 + TypeScript 5.8 + Vite 7, Tailwind CSS 4, Framer Motion, Lucide icons, Canvas rendering (`app/package.json`).
- **Repository structure**: root metadata, `app/` web client with Vite configuration, `app/src/` broken into `components/`, `utils/`, and asset directories (`README.md`).
- **Automation gaps**: no existing `AGENTS.md` files, no automated tests, linting available via `npm run lint`.

Given the lack of existing agent guidance, introducing a layered `AGENTS.md` structure would
improve reproducibility and ensure that any coding agent adheres to our build, lint, and review
processes as described in the 2025 report.

## Recommended File Hierarchy

| Scope | Location | Primary Audience | Key Instructions | Rationale from Research |
| --- | --- | --- | --- | --- |
| Global defaults | `./AGENTS.md` | Any agent entering the repo | Project overview, prerequisites (Node 18+), workspace safety rules, shared commands (`cd app && npm install`, `npm run lint`, `npm run build`), PR expectations (tests, screenshots for UI updates). | The report emphasises that root files act as a "universal instruction manual" for repository-wide norms and that agents merge instructions from root downwards for predictable behaviour (Codex, Factory workflows). |
| Front-end workspace | `./app/AGENTS.md` | Agents working inside the Vite app | Detailed dev workflow (`npm run dev`, `npm run preview`), environment variables (`.env.example`), Tailwind-specific conventions (class ordering), asset pipeline notes, expected lint fixes (`npm run lint -- --fix`). | Nested files override root defaults, letting monorepos capture package-specific instructions. Factory’s templates show package-level files for apps and services to list commands, lint tools, and security caveats. |
| Component craftsmanship | `./app/src/components/AGENTS.md` | UI agents editing React components | React/TypeScript style guide (function components, hooks), Tailwind usage rules, testing placeholder (encourage Storybook/Playwright adoption), accessibility checklist (ARIA labels, keyboard support). | The research highlights how subdirectory `AGENTS.md` files encode folder-specific conventions like style rules and testing protocols, ensuring consistent outputs for UI-heavy areas. |
| Data utilities | `./app/src/utils/AGENTS.md` | Agents manipulating shared logic | Pure function preference, TypeScript strictness, error handling patterns, unit-test stubs (Vitest). | The report notes that teams use nested files to express domain vocabulary and testing expectations for specialised modules; this keeps logic utilities deterministic and testable. |

> **Note:** If a partner tool still requires vendor-specific filenames (`AGENT.md`, `agents!.md`),
> the top-level file can explain symlink or duplication strategy, but the canonical source of truth
> should remain `AGENTS.md` to align with the 2025 standardisation push.

## Implementation Considerations

1. **Instruction merging order**: Codex and Factory agents merge user-level, root, and nested
   `AGENTS.md` files top-down. Therefore each deeper file should only document overrides or
   additions, minimising duplication and lowering maintenance overhead.
2. **Programmatic checks**: Where feasible, include commands that an agent must run and confirm.
   Even though automated tests are not yet implemented, the files should state that `npm run lint`
   must pass before task completion, and note future expansion to Vitest/Playwright suites.
3. **Security and secrets**: Explicitly tell agents not to commit `.env` files, to use
   `.env.template`, and to request sensitive values interactively. The research paper stresses that
   security guardrails are part of the recommended sections for `AGENTS.md` documents.
4. **PR workflow guidance**: Agents should include screenshots for UI-visible changes and attach
   lint/build output to PR descriptions—mirroring best practices called out in Factory’s PR
   templates and the broader industry survey.
5. **Compatibility with other standards**: Some ecosystems (Sourcegraph’s `AGENT.md`, Octofriend’s
   `OCTO.md`) still coexist. Document the policy (e.g., maintain a symlink or pointer note) in the
   root file so agents know how to reconcile instructions without duplicating conflicting rules.

## Evaluation Summary

- **Feasibility**: High—creating these four Markdown files requires minimal effort and dramatically
  improves agent reliability. The hierarchy matches the repository’s existing structure.
- **Maintenance impact**: Moderate—the team must keep command references up to date when scripts
  change, but consolidating rules in `AGENTS.md` avoids the fragmentation problem that existed with
  `CLAUDE.md`, `GEMINI.md`, etc., highlighted in the research paper.
- **Expected benefits**: Consistent agent behaviour, clearer onboarding for new contributors, and
  readiness for future automation (CI checks, storybook, testing). Aligning with the 2025 standard
  ensures compatibility with Codex CLI, Google Jules, Factory Droid, Cursor CLI, and other tools.
- **Risks**: Without accompanying automated tests, agents may rely solely on lint/build checks.
  Prioritise adding Vitest or Playwright suites so that future updates to the `AGENTS.md` files can
  enforce stronger validation, as encouraged in the research.

By following this rollout plan, the project will mirror the industry best practices detailed in the
*AGENTS.md & Agent‑Native Development (2025)* report while tailoring instructions to the Knowledge
Graph Explorer’s structure and workflows.

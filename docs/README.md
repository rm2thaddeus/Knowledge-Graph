# Knowledge Graph Documentation Hub

This `docs/` directory provides the structured "memory system" that coordinates planning agents across the product lifecycle described in *AGENTS.md & Agent-Native Development (2025)*. Use these folders to capture decisions, prompts, and checklists that guide the project from proof of concept toward MVP and production readiness.

## Directory Layout
- `ideation-room/` – Archived discovery research, user problems, and strategy prompts.
- `poc-room/` – Rapid experimentation logs and validation checklists for the prototype phase.
- `mvp-room/` – Feature priorities, UX decisions, and success criteria for the first releasable version.
- `production-room/` – Operational runbooks, observability plans, and compliance notes.
- `templates/` – Reusable YAML prompt and scope templates for cross-phase coordination.

## How to Use These Notes
1. **Keep thought and execution separated.** Planning artifacts stay in `docs/` while implementational work happens under `app/` (or future code packages).
2. **Log every major decision.** Summaries should include rationale, alternatives considered, and links to related tasks or pull requests.
3. **Update phase-specific AGENTS.md files.** Each room contains tailored instructions that influence how coding agents collaborate when operating inside that folder.
4. **Cross-link liberally.** Reference prior decisions to build institutional memory and avoid re-solving closed questions.

## Suggested Workflow
1. Start new initiatives by drafting a scope using `templates/feature-scope.yaml`.
2. Record research or ideation output with `templates/research-prompt.yaml` and attach relevant transcripts.
3. Promote work to the next phase by cloning the previous room's summary and highlighting gaps.
4. Keep `ask-context.yaml` aligned with the information new collaborators should review first.

Maintain this documentation as a living artifact so future agents and contributors can quickly understand the state of the Knowledge Graph initiative.

# Docs-Level Agent Guidance

This directory contains planning collateral that complements the coding workflows captured in the repository root `AGENTS.md`. Instructions below tailor agent behavior when writing or updating documentation artifacts.

## Mission
- Maintain an auditable knowledge trail that supports the lifecycle described in *AGENTS.md & Agent-Native Development (2025)*.
- Keep phase-specific folders synchronized with the state of the product (Proof of Concept → MVP → Production).

## Operating Guidelines
1. **Preserve chronology.** Append new findings with timestamps or release tags instead of rewriting history.
2. **Respect separation of concerns.** Do not store executable code or secrets here.
3. **Cross-reference** related decisions, pull requests, or issues whenever possible.
4. **Ensure accessibility.** Use semantic Markdown headings, descriptive link text, and tables only when they improve clarity.
5. **Programmatic outputs** (YAML templates, scripts) must remain parseable; validate YAML syntax if modified.

## Required Metadata
When capturing new documentation, include:
- Author or agent ID.
- Date (ISO 8601).
- Phase (Ideation, PoC, MVP, Production).
- Decision status (Proposed, In Progress, Accepted, Rejected).

## Quality Checks
- Run `yamllint` locally when editing YAML files if available; otherwise validate structure manually.
- For Markdown, ensure there are no trailing spaces and headings increment consistently.

## Escalation
If documentation reveals blockers or unresolved architectural questions, alert the maintainers via the contact listed in `ask-context.yaml`.

# Production Room Operations Guide

## Purpose
Ensure the product is reliable, observable, and compliant once released. Aligns with the "make it scalable" expectations referenced in the 2025 agent-native development research.

## Core Focus Areas
- Deployment strategy, infrastructure diagrams, and rollback plans.
- Monitoring/alerting requirements, SLOs, and incident response procedures.
- Security reviews, data governance, and privacy considerations.
- Support playbooks for customer-facing teams.

## Documentation Standards
- Every runbook must include metadata (author, date, phase: Production, status) and last validation date.
- Link to actual infrastructure-as-code or configuration repositories where applicable.
- Include command snippets for diagnostics, but do not store secrets.

## Guardrails
- Validate that operational steps are testable in staging before production rollout.
- Record any external vendor dependencies and contact paths.
- Escalate unresolved reliability risks to the maintainers noted in `docs/ask-context.yaml`.

## Readiness Checklist
Before green-lighting a release:
1. `operational-readiness.md` reflects up-to-date SLOs and incident contacts.
2. Monitoring and alerting dashboards are linked with owners.
3. Security audits and compliance checkpoints are complete.

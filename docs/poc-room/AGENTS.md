# Proof of Concept Room Protocol

## Purpose
Transform prioritized ideas into tangible experiments. Aligns with the "make it run once" guidance highlighted in the 2025 agent-native development research.

## Core Activities
- Draft thin vertical prototypes validating data ingestion, visualization, or interaction risks.
- Capture experiment hypotheses, inputs, expected outputs, and validation signals.
- Track technical decisions (libraries, architecture spikes) and note reversibility.

## Documentation Requirements
Each experiment entry should include:
1. Metadata block (author, date, phase: PoC, status).
2. Hypothesis and measurable success criteria.
3. Prototype plan or pseudo-code references (link to `app/` code when available).
4. Test notes, metrics, or reasons for pivoting.

## Guardrails
- Stay lightweight—avoid over-engineering or building production-only features.
- When experiments fail, record the rationale and lessons learned for future agents.
- Escalate security or compliance concerns immediately to maintainers.

## Handover Checklist
Before elevating work to the MVP room, ensure:
- Critical risks have at least one validated experiment.
- Data ingestion paths and key UI flows are demonstrated end-to-end.
- Remaining gaps are logged in `transition-log.md`.

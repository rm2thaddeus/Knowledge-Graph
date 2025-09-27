# Utilities Agent Guide

> Utility instructions extend `app/src/AGENTS.md` for data helpers, following the layered conventions outlined in *AGENTS.md & Agent-Native Development (2025)*.

## Scope
Covers TypeScript modules inside `app/src/utils/` such as `dataLoader.ts`.

## Design Principles
- Keep utility functions pure and side-effect free. They should not depend on browser globals unless explicitly documented.
- Export TypeScript interfaces (`GraphData`, `GraphNode`, etc.) for reuse. Update them when CSV schemas evolve and ensure all callers are updated simultaneously.
- Validate inputs defensively: null-check external data, normalize strings, and preserve backward compatibility with existing CSV headers.

## CSV Parsing Guidance
- Maintain delimiter auto-detection and quote handling; add tests or documentation when extending parsing heuristics.
- Document assumptions about required columns in the file header using comments near the parsing logic.
- Avoid introducing heavy dependencies; keep parsing logic lightweight to preserve bundle size.

## Testing Requirements
- After modifying utilities, run:
  1. `npm run lint`
  2. `npm run build`
- Exercise the HTML harnesses in `public/` (e.g., `test_csv_upload.html`, `debug_column_detection.html`) to confirm CSV changes behave correctly; note outcomes in PR descriptions.

## Documentation
- Update CSV usage guides (`public/README_CSV.md`, `public/README_YOUR_DATA.md`) when adjusting expected fields or workflows.
- Describe any new helper function in code comments, including expected inputs/outputs and performance characteristics.

# Public Assets Agent Guide

> These directives govern static debugging and documentation assets, extending the hierarchy noted in *AGENTS.md & Agent-Native Development (2025)*.

## Scope
All files inside `app/public/`, including HTML harnesses, CSV documentation, and images served directly by Vite.

## Maintenance Rules
- Keep HTML debugging tools (`test_csv_upload.html`, `debug_column_detection.html`, etc.) in sync with the current CSV parser. Update instructions in their headers when behavior changes.
- Ensure any new HTML file is self-contained (no external CDN dependencies) so it loads within local builds and offline reviews.
- Markdown guides (`README_CSV.md`, `README_YOUR_DATA.md`, `TEST_INSTRUCTIONS.md`) must remain accurate when workflows or expected schemas change.

## Testing Expectations
- When modifying these files, run `npm run build` to confirm they copy correctly to the production bundle.
- Manually open updated HTML harnesses in a browser (via `npm run dev` or direct file path) and record notable results in PR descriptions.

## Security & Privacy
- Do not embed real personal data in sample CSVs or HTML snippets. Use anonymized or synthetic data.
- Avoid adding scripts that reach out to external domains without prior approval and documentation.

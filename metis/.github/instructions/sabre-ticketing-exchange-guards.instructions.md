---
description: "Use when editing Sabre ticketing/exchange code in api-aerial/src/utils/SABRE to enforce retrieve guards, issuance validation, and non-breaking traveler/payload integrity rules."
name: "Sabre Ticketing Exchange Guards"
applyTo: "api-aerial/src/utils/SABRE/**"
---

# Sabre Ticketing And Exchange Guardrails

Apply these rules for every change in this folder.

- Block issuance flow if pre-ticket retrieve fails.
- After ticket issuance, require final retrieve confirmation: booking is ticketed and at least one ticket number is present.
- Keep traveler objects complete in before/after payload snapshots; do not reduce traveler shape to partial diffs unless endpoint contract explicitly supports it.
- Preserve backward compatibility of mapped payload contracts consumed by downstream handlers.
- Avoid redundant retrieve calls in the same orchestration path; prefer a single authoritative retrieve save point.
- On exchange pricing and ticketing errors, fail fast with explicit context (operation, supplier, record locator when available).
- Add or update targeted tests when introducing a new guard or modifying existing guard behavior.

## Validation Expectations
- Prefer focused Node tests for SABRE utility changes:
  - node --test utils/SABRE/__tests__/*.test.js
- If tests cannot run locally, document what was not executed and why.

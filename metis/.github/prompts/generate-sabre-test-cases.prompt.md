---
description: "Generate focused Node --test scenarios for Sabre GDS/NDC flows, including XML/JSON mapping, ticketing/exchange guards, schema drift, and fare edge cases."
name: "Generate Sabre Test Cases"
argument-hint: "Module path, scenario, or function to test"
agent: "Travel Technology & Integration Specialist"
model: ["GPT-5 (copilot)", "Claude Sonnet 4.5 (copilot)"]
tools: [read, search, edit, execute]
---

Generate high-value Node test cases for the requested Sabre scope.

## Inputs To Infer Or Ask
- Target module/function under api-aerial/src/utils/SABRE.
- Flow type: GDS, NDC, or mixed orchestration.
- Operation: retrieve, exchange, ticketing, modify booking, ancillary handling.

## Requirements
- Create tests using Node built-in test runner style.
- Prefer deterministic fixtures for SOAP/XML and JSON payloads.
- Cover both happy path and failure guards.
- Include schema drift and namespace variants when payload mapping is involved.
- Keep assertions explicit on business-critical outcomes.

## Mandatory Scenario Matrix
1. Happy path with valid retrieve and expected mapped output.
2. Pre-ticket retrieve failure blocks issuance.
3. Post-issuance retrieve missing ticket number fails validation.
4. Zero-amount ancillary does not force ticketed status transition.
5. Traveler completeness preserved in before/after payload snapshots.
6. Schema drift variant handled by fallback mapping.
7. Namespace variant parsed without false positives.

## Output Format
1. Test plan summary (scenario to risk mapping).
2. Proposed test file path(s).
3. Full test code blocks ready to paste.
4. Command(s) to run:
   - node --test utils/SABRE/__tests__/*.test.js
5. Notes on assumptions and missing fixtures.

If relevant fixtures or helper utilities are missing, propose minimal additions before writing tests.

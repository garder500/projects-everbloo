---
description: "Diagnose a failing Sabre SOAP/XML or REST/JSON payload: identify namespace issues, schema drift, missing fields, and map to internal Metis contracts."
argument-hint: "Paste the failing payload or describe the error"
agent: "Travel Technology & Integration Specialist"
model: ["Claude Opus 4.6 (copilot)", "GPT-5.3-Codex (copilot)"]
tools: [read, search, edit, execute]
---

Diagnose the provided Sabre payload or error.

## Procedure
1. Identify the operation type (shopping, retrieve, exchange, ticketing, refund, order change).
2. Locate the corresponding handler in `api-aerial/src/utils/SABRE/`.
3. Check XML namespace correctness (envelope + operation namespaces both present).
4. Detect schema drift: renamed nodes, missing mandatory fields, unexpected array/object shapes.
5. Validate fare/ticketing guards per `.github/instructions/sabre-ticketing-exchange-guards.instructions.md`.
6. Map source fields to internal Metis contract and highlight mismatches.

## Output
- Root cause classification: namespace error | schema drift | missing guard | mapping bug | supplier change.
- Affected file(s) and line range.
- Suggested fix with code diff.
- Test command: `node --test utils/SABRE/__tests__/*.test.js`.

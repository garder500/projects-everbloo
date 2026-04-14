---
name: sabre-payload-transforms
description: "Use when transforming Sabre SOAP/XML and REST/JSON payloads, validating XML namespaces, managing schema drift, and implementing fare/ticketing edge-case guards for GDS/NDC workflows."
argument-hint: "Payload transform objective or scenario"
user-invocable: true
---

# Sabre Payload Transforms

Use this skill for high-fidelity mapping and guard design in Sabre integrations.

## When To Use
- XML SOAP to JSON internal model transformations.
- JSON to SOAP request body generation for Sabre flows.
- Namespace mismatch, missing node, or parser drift debugging.
- Pricing, exchange, and ticketing edge-case handling.

## Procedure
1. Identify source payload type and operation context (shopping, retrieve, exchange, ticketing).
2. Normalize parsing and namespaces before applying business mapping.
3. Detect schema drift and apply non-breaking fallback mapping.
4. Add fare/ticketing guards before side effects (issuance, commit, response finalize).
5. Validate with focused Node tests and representative fixtures.

## XML Namespace Checklist
- Confirm envelope namespace and operation namespace are both present.
- Match parser selectors with namespace-aware paths, not brittle local-name-only shortcuts.
- Validate repeated nodes with namespace prefixes (segment, passenger, ticket coupon).
- Handle optional namespace prefixes and default namespace variants safely.
- Fail with explicit error when mandatory namespaced nodes are absent.

## Schema Drift Checklist
- Treat unknown fields as additive unless contract says strict mode.
- Guard for renamed or moved nodes with fallback selectors.
- Keep mapping backward-compatible for existing internal contract.
- Capture drift signals in logs with operation and path metadata.
- Add regression fixture for each observed drift variant.

## Fare And Ticketing Edge Cases Checklist
- Zero-amount ancillary should not auto-promote status to ticketed state.
- Exchange flow must stop if pre-ticket retrieve fails.
- Post-issuance retrieve must confirm ticketed state and at least one issued ticket number.
- Preserve traveler completeness in before/after snapshots for modify/exchange APIs.
- Avoid duplicate retrieve calls in orchestration unless a guard requires fresh state.

## Output Requirements
- Provide mapping table: source path, target path, transform rule, fallback rule.
- List guard conditions with fail-fast behavior and user-visible error intent.
- Include minimal Node test matrix for happy path plus edge cases.

## Quick Test Command
- node --test utils/SABRE/__tests__/*.test.js

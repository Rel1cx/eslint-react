# ADR 0001: Choice between "useless", "unnecessary", and "redundant" in Rule Naming

Date: 2025-03-20

Status: Proposed

## Context

In rule naming, the terms "useless", "unnecessary", and "redundant" have been used inconsistently to describe rules that identify code patterns with no functional value. However, practical experience and external precedent (e.g., Their use on <https://react.dev>) indicate that these terms have nuanced differences in meaning:

- **Useless**: Code that serves no purpose and can be safely removed without substitution (e.g., a `fragment` with no children).
- **Unnecessary**: Code that introduces extra complexity and can be simplified without changing the expected behavior (e.g., a `template literal` with no dynamic expressions).
- **Redundant**: Code that repeats functionality already provided elsewhere (e.g., a redundant _state variable_ that can be derived from the existing _state variables_).

The current naming convention of defaulting to `no-useless-*` for many rules risks misalignment with the specificity of the issue being addressed, leading to confusion for users and maintainers.

## Decision

1. **Terminology Guidelines**:
   - Use `useless` for code that is **entirely devoid of purpose** and should be deleted.
     Example: `no-useless-fragment` (a fragment with no children).
   - Use `unnecessary` for code that **can be simplified** without changing behavior.
     Example: `no-unnecessary-use-memo` ([an `useMemo` call on a value that is rarely changed](https://react.dev/reference/react/useMemo#should-you-add-usememo-everywhere)).
   - Use `redundant` for code that **duplicates existing functionality**.
     Example: `no-redundant-state` ([a state variable that can be calculated during render](https://react.dev/learn/choosing-the-state-structure#avoid-redundant-state)).

2. **Alignment with Existing Conventions**:
   Follow patterns from <https://react.dev> to ensure familiarity and consistency.

## Consequences

- **Improved Clarity**: Rule names will more accurately signal the nature of the issue, aiding developers in understanding and addressing violations.
- **Consistency**: Alignment with the official React documentation will reduce confusion.
- **Migration Cost**: Existing rules with misaligned names will require updates to documentation, configurations, and potentially codemods for users.

## Alternatives Considered

1. **Uniform Use of one Term**: Using a single term (e.g., `useless`) for all rules. This would simplify naming but would lead to ambiguity and miscommunication about the specific nature of the issues.

## Related ADRs

- None at this time.

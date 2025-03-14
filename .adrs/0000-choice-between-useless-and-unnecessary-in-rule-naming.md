# ADR 0000: Choice between "useless" and "unnecessary" in rule naming

## Status

Accepted

## Context

When naming rules related to identifying redundant or non-functional code (e.g., in linting or static analysis), the terms "useless" and "unnecessary" both convey a sense of superfluity. However, their nuanced semantic differences could lead to ambiguity if misapplied. For example, a `forwardRef` call with no `ref` usage is entirely without purpose, but other scenarios might involve optional code that is only redundant in specific contexts. A consistent naming convention is needed to ensure clarity and accuracy in rule documentation and error messaging.

## Decision

Use "useless" to describe code that has no functional purpose under any circumstances (e.g., a `forwardRef` call with no `ref` usage).

Use "unnecessary" to describe code that is contextually redundant but not strictly non-functional (e.g., an `useEffect` that runs event-specific logic).

## Consequences

- Improved clarity: Developers can better discern whether code is strictly non-functional ("useless") or situationally redundant ("unnecessary").

- Consistency: Rules and error messages will align with precise semantic definitions.

- Potential learning curve: Teams may need documentation to understand the distinction initially.

## Alternatives Considered

1. Using only "unnecessary" for all cases:
   - Rejected because it conflates fundamentally distinct scenarios (strictly non-functional vs. contextually redundant), reducing diagnostic precision.

2. Using only "useless" for all cases:
   - Rejected because it could mislabel code that is optional but valid in other contexts, leading to confusion or dismissal of valid feedback.

## Related ADRs

N/A

## Links

N/A

# ADR 0001: Rename ensure-forward-ref-using-ref to no-useless-forward-ref

## Status

Accepted

## Context

Renaming the `ensure-forward-ref-using-ref` rule to align with the existing rule naming conventions and accurately reflect the rule's focus on non-functional code.

## Decision

Rename the rule to **`no-useless-forward-ref`** to the `no-<category>-<term>` pattern used in similar rules (e.g., `no-useless-fragment`).

## Consequences

- The rule name will be more consistent with other rules in the project.
- The rule name will more accurately reflect the rule's focus on non-functional code.

## Alternatives Considered

Using `no-unnecessary-forward-ref`:

- Rejected because "unnecessary" implies optional redundancy, in this case, the `forwardRef` call is always redundant.

## Related ADRs

- [ADR 0000: Choice between "useless" and "unnecessary" in rule naming](./0000-choice-between-useless-and-unnecessary-in-rule-naming.md)

## Links

N/A

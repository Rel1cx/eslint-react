# ADR 0001: Rename ensure-forward-ref-using-ref to no-useless-forward-ref

## Status

Accepted

## Context

The rule `ensure-forward-ref-using-ref` detects React `forwardRef`-wrapped components that never receive a `ref` prop. This matches the "useless" criteria defined in ADR 0000, as such components serve no functional purpose. The current name lacks alignment with our established `no-<category>-<term>` naming convention and semantic categorization.

## Decision

Rename the rule to **`no-useless-forward-ref`** to:

1. Adhere to the `no-<category>-<term>` pattern used in similar rules (e.g., `no-useless-state`).
2. Reflect the strict "useless" classification per ADR 0000, since unreferenced `forwardRef` components are functionally inert.

## Consequences

- **Consistency**: Aligns with existing rule taxonomy and terminology.
- **Clarity**: Clearly signals the rule's focus on non-functional code.
- **Documentation updates**: Requires migration guides and rule metadata changes.

## Alternatives Considered

Using `no-unnecessary-forward-ref`:

- Rejected because "unnecessary" implies optional redundancy, whereas unreferenced `forwardRef` has zero runtime utility.

## Related ADRs

- [ADR 0000: Choice between "useless" and "unnecessary" in rule naming](./0000-choice-between-useless-and-unnecessary-in-rule-naming.md)

## Links

N/A

[@eslint-react/var](../README.md) / isValueEqual

# Function: isValueEqual()

```ts
function isValueEqual(context: RuleContext, a: Node, b: Node): boolean;
```

Check if two nodes have equal values.

Identifiers are compared by variable identity through the scope manager:
identical names in different scopes are different values, and two distinct
variables holding the same literal are not equal.

This function does not apply provenance heuristics. Use
[isProvenanceEqual](isProvenanceEqual.md) when bindings that share provenance (for example
callback parameters or loop variables over the same source) should also be
treated as equal.

## Parameters

| Parameter | Type          | Description                 |
| --------- | ------------- | --------------------------- |
| `context` | `RuleContext` | The ESLint rule context.    |
| `a`       | `Node`        | The first node to compare.  |
| `b`       | `Node`        | The second node to compare. |

## Returns

`boolean`

`true` if the two nodes have equal values.

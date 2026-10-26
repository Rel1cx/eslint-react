[@eslint-react/var](../README.md) / isProvenanceEqual

# Function: isProvenanceEqual()

```ts
function isProvenanceEqual(context: RuleContext, a: Node, b: Node): boolean;
```

Check if two nodes refer to the same value or share provenance.

This extends [isValueEqual](isValueEqual.md) with two rules for identifiers:

- Parameters at the same position of callbacks passed to structurally equal
  callees are equal (e.g. `xs.forEach((a) => ...)` and `xs.forEach((b) => ...)`).
- Variables bound by different `for-of` statements iterating over the same
  source are equal (e.g. `for (const event of xs)` and `for (const evt of xs)`).
  Variables from the same `for-of` statement remain distinct.

Use this to match a value at its use site against the site that tears it
down (event listeners, timers, observers, and similar resources).

## Parameters

| Parameter | Type          | Description                 |
| --------- | ------------- | --------------------------- |
| `context` | `RuleContext` | The ESLint rule context.    |
| `a`       | `Node`        | The first node to compare.  |
| `b`       | `Node`        | The second node to compare. |

## Returns

`boolean`

`true` if the two nodes refer to the same value or share provenance.

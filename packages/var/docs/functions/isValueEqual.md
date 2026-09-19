[@eslint-react/var](../README.md) / isValueEqual

# Function: isValueEqual()

```ts
function isValueEqual(
  context: RuleContext,
  a: Node,
  b: Node,
): boolean;
```

Check if two nodes have equal values.

## Parameters

| Parameter | Type          | Description                 |
| --------- | ------------- | --------------------------- |
| `context` | `RuleContext` | The ESLint rule context.    |
| `a`       | `Node`        | The first node to compare.  |
| `b`       | `Node`        | The second node to compare. |

## Returns

`boolean`

`true` if the two nodes have equal values.

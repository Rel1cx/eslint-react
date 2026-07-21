[@eslint-react/var](../README.md) / isValueEqual

# Function: isValueEqual()

```ts
function isValueEqual(
  context: RuleContext,
  a: Node,
  b: Node,
): boolean;
```

Check if the value of a node equals the value of another node.

## Parameters

| Parameter | Type          | Description                 |
| --------- | ------------- | --------------------------- |
| `context` | `RuleContext` | The rule context.           |
| `a`       | `Node`        | The first node to compare.  |
| `b`       | `Node`        | The second node to compare. |

## Returns

`boolean`

`true` if the node values are equal.

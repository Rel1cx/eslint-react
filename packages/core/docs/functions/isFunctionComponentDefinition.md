[@eslint-react/core](../README.md) / isFunctionComponentDefinition

# Function: isFunctionComponentDefinition()

```ts
function isFunctionComponentDefinition(
  context: RuleContext,
  node: TSESTreeFunction,
  hint: bigint,
): boolean;
```

Check if the function node is a valid React component definition.

## Parameters

| Parameter | Type               | Description                                                         |
| --------- | ------------------ | ------------------------------------------------------------------- |
| `context` | `RuleContext`      | The rule context.                                                   |
| `node`    | `TSESTreeFunction` | The function node to analyze.                                       |
| `hint`    | `bigint`           | Component detection hints (bit flags) to customize detection logic. |

## Returns

`boolean`

`true` if the node is considered a component definition.

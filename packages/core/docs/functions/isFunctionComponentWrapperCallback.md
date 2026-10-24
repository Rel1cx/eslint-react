[@eslint-react/core](../README.md) / isFunctionComponentWrapperCallback

# Function: isFunctionComponentWrapperCallback()

```ts
function isFunctionComponentWrapperCallback(context: RuleContext, node: TSESTreeFunction): boolean;
```

Check if the node is a callback function passed to a component wrapper.

## Parameters

| Parameter | Type               | Description              |
| --------- | ------------------ | ------------------------ |
| `context` | `RuleContext`      | The ESLint rule context. |
| `node`    | `TSESTreeFunction` | The node to check.       |

## Returns

`boolean`

`true` if the node is a callback function passed to a component wrapper.

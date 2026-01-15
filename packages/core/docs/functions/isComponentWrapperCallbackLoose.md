[@eslint-react/core](../README.md) / isComponentWrapperCallbackLoose

# Function: isComponentWrapperCallbackLoose()

```ts
function isComponentWrapperCallbackLoose(context: RuleContext, node: Node): boolean;
```

Check if the node is a callback function passed to a component wrapper loosely

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `context` | `RuleContext` | The ESLint rule context |
| `node` | `Node` | The node to check |

## Returns

`boolean`

`true` if the node is a callback function passed to a component wrapper loosely

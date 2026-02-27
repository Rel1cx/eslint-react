[@eslint-react/core](../README.md) / isComponentWrapperCall

# Function: isComponentWrapperCall()

```ts
function isComponentWrapperCall(context: RuleContext, node: Node): boolean;
```

Check if the node is a call expression for a component wrapper

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `context` | `RuleContext` | The ESLint rule context |
| `node` | `Node` | The node to check |

## Returns

`boolean`

`true` if the node is a call expression for a component wrapper

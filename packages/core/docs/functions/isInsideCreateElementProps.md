[@eslint-react/core](../README.md) / isInsideCreateElementProps

# Function: isInsideCreateElementProps()

```ts
function isInsideCreateElementProps(context: RuleContext, node: Node): boolean;
```

Check if the node is inside the props object (the second argument) of a `createElement` call.

## Parameters

| Parameter | Type          | Description              |
| --------- | ------------- | ------------------------ |
| `context` | `RuleContext` | The ESLint rule context. |
| `node`    | `Node`        | The node to check.       |

## Returns

`boolean`

`true` if the node is inside `createElement`'s props object.

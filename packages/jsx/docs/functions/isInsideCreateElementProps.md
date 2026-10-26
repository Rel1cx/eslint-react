[@eslint-react/jsx](../README.md) / isInsideCreateElementProps

# Function: isInsideCreateElementProps()

```ts
function isInsideCreateElementProps(context: RuleContext, node: Node | null | undefined): boolean;
```

Check if the node is directly inside the props object (the second argument) of a `createElement` call,
that is, its closest `ObjectExpression` ancestor is the props object itself. Nodes nested deeper
(ex: inside an object nested in the props object) are not considered inside.

## Parameters

| Parameter | Type                            | Description              |
| --------- | ------------------------------- | ------------------------ |
| `context` | `RuleContext`                   | The ESLint rule context. |
| `node`    | `Node` \| `null` \| `undefined` | The node to check.       |

## Returns

`boolean`

`true` if the node is directly inside `createElement`'s props object.

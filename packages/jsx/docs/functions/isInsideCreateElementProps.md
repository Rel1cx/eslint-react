[@eslint-react/jsx](../README.md) / isInsideCreateElementProps

# Function: isInsideCreateElementProps()

```ts
function isInsideCreateElementProps(context: RuleContext, node: Node | null | undefined): boolean;
```

Check if the node's closest `ObjectExpression` ancestor is the props object
(the second argument) of its nearest enclosing `createElement` call. The
second argument is unwrapped when it is a type or chain expression. Nodes that
cross another object literal (ex: a value inside an object nested in the props
object) are not considered inside.

## Parameters

| Parameter | Type                            | Description                                       |
| --------- | ------------------------------- | ------------------------------------------------- |
| `context` | `RuleContext`                   | The ESLint rule context.                          |
| `node`    | `Node` \| `null` \| `undefined` | The node to check; nullish values return `false`. |

## Returns

`boolean`

`true` if the node's closest object literal is `createElement`'s props object.

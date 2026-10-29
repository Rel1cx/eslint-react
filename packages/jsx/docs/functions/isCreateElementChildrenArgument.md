[@eslint-react/jsx](../README.md) / isCreateElementChildrenArgument

# Function: isCreateElementChildrenArgument()

```ts
function isCreateElementChildrenArgument(context: RuleContext, node: Node | null | undefined): boolean;
```

Check if the node itself is passed as a children argument (the third argument
or later) of a `createElement` call. Contiguous TypeScript type-expression
and chain-expression ancestors are skipped, and the node is unwrapped before
the comparison; expressions nested inside an argument are not considered.

## Parameters

| Parameter | Type                            | Description                                       |
| --------- | ------------------------------- | ------------------------------------------------- |
| `context` | `RuleContext`                   | The ESLint rule context.                          |
| `node`    | `Node` \| `null` \| `undefined` | The node to check; nullish values return `false`. |

## Returns

`boolean`

`true` if the node is a direct children argument of a `createElement` call.

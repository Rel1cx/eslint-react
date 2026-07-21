[@eslint-react/ast](../../../../README.md) / [Check](../README.md) / isJSXTagNameExpression

# Variable: isJSXTagNameExpression

```ts
const isJSXTagNameExpression: (node: Node | null | undefined) => node is JSXIdentifier | JSXMemberExpression | JSXNamespacedName;
```

Check if a node can appear as a JSX tag name.

## Parameters

| Parameter | Type                            |
| --------- | ------------------------------- |
| `node`    | `Node` \| `null` \| `undefined` |

## Returns

node is JSXIdentifier \| JSXMemberExpression \| JSXNamespacedName

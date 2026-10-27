[@eslint-react/ast](../../../../README.md) / [Extract](../README.md) / getJSXName

# Function: getJSXName()

```ts
function getJSXName(node: JSXIdentifier | JSXMemberExpression | JSXNamespacedName): string;
```

Get the flattened name of a JSX identifier, namespaced name, or member expression.

## Parameters

| Parameter | Type                                                            | Description        |
| --------- | --------------------------------------------------------------- | ------------------ |
| `node`    | `JSXIdentifier` \| `JSXMemberExpression` \| `JSXNamespacedName` | The JSX name node. |

## Returns

`string`

The flattened JSX name (ex: `"Foo.Bar"`, `"xml:space"`).

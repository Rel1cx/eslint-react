[@eslint-react/ast](../../../../README.md) / [Check](../README.md) / isFunction

# Variable: isFunction

```ts
const isFunction: (
  node: Node | null | undefined,
) => node is
  | ArrowFunctionExpressionWithBlockBody
  | ArrowFunctionExpressionWithExpressionBody
  | FunctionDeclarationWithName
  | FunctionDeclarationWithOptionalName
  | FunctionExpression;
```

Check if a node is a function declaration, function expression, or arrow function expression.

## Parameters

| Parameter | Type                            |
| --------- | ------------------------------- |
| `node`    | `Node` \| `null` \| `undefined` |

## Returns

node is ArrowFunctionExpressionWithBlockBody \| ArrowFunctionExpressionWithExpressionBody \| FunctionDeclarationWithName \| FunctionDeclarationWithOptionalName \| FunctionExpression

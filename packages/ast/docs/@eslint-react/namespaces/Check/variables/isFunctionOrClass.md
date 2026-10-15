[@eslint-react/ast](../../../../README.md) / [Check](../README.md) / isFunctionOrClass

# Variable: isFunctionOrClass

```ts
const isFunctionOrClass: (node: Node | null | undefined) => node is
  | ArrowFunctionExpressionWithBlockBody
  | ArrowFunctionExpressionWithExpressionBody
  | ClassDeclarationWithName
  | ClassDeclarationWithOptionalName
  | ClassExpression
  | FunctionDeclarationWithName
  | FunctionDeclarationWithOptionalName
  | FunctionExpression;
```

Check if a node is a function declaration, function expression, arrow function expression, class declaration, or class expression.

## Parameters

| Parameter | Type                            |
| --------- | ------------------------------- |
| `node`    | `Node` \| `null` \| `undefined` |

## Returns

node is ArrowFunctionExpressionWithBlockBody \| ArrowFunctionExpressionWithExpressionBody \| ClassDeclarationWithName \| ClassDeclarationWithOptionalName \| ClassExpression \| FunctionDeclarationWithName \| FunctionDeclarationWithOptionalName \| FunctionExpression

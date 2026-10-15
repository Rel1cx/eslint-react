[@eslint-react/ast](../../../../README.md) / [Check](../README.md) / isTypeOrChainExpression

# Variable: isTypeOrChainExpression

```ts
const isTypeOrChainExpression: (
  node: Node | null | undefined,
) => node is ChainExpression | TSAsExpression | TSInstantiationExpression | TSNonNullExpression | TSSatisfiesExpression | TSTypeAssertion;
```

Check if a node is a TypeScript type expression or a chain expression (i.e. a transparent wrapper around an inner expression).

## Parameters

| Parameter | Type                            |
| --------- | ------------------------------- |
| `node`    | `Node` \| `null` \| `undefined` |

## Returns

node is ChainExpression \| TSAsExpression \| TSInstantiationExpression \| TSNonNullExpression \| TSSatisfiesExpression \| TSTypeAssertion

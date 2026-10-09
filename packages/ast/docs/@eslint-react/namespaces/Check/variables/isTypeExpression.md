[@eslint-react/ast](../../../../README.md) / [Check](../README.md) / isTypeExpression

# Variable: isTypeExpression

```ts
const isTypeExpression: (
  node: Node | null | undefined,
) => node is TSAsExpression | TSInstantiationExpression | TSNonNullExpression | TSSatisfiesExpression | TSTypeAssertion;
```

Check if a node is a TypeScript type expression (assertion, non-null, satisfies, or instantiation).

## Parameters

| Parameter | Type                            |
| --------- | ------------------------------- |
| `node`    | `Node` \| `null` \| `undefined` |

## Returns

node is TSAsExpression \| TSInstantiationExpression \| TSNonNullExpression \| TSSatisfiesExpression \| TSTypeAssertion

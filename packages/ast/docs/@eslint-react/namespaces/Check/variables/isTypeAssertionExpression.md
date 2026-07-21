[@eslint-react/ast](../../../../README.md) / [Check](../README.md) / isTypeAssertionExpression

# Variable: isTypeAssertionExpression

```ts
const isTypeAssertionExpression: (node: Node | null | undefined) => node is TSAsExpression | TSNonNullExpression | TSSatisfiesExpression | TSTypeAssertion;
```

Check if a node is a TypeScript type assertion-like expression (as, assertion, non-null, or satisfies).

## Parameters

| Parameter | Type                            |
| --------- | ------------------------------- |
| `node`    | `Node` \| `null` \| `undefined` |

## Returns

node is TSAsExpression \| TSNonNullExpression \| TSSatisfiesExpression \| TSTypeAssertion

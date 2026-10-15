[@eslint-react/ast](../README.md) / TSESTreeTypeOrChainExpression

# Type Alias: TSESTreeTypeOrChainExpression

```ts
type TSESTreeTypeOrChainExpression =
  | TSESTreeTypeExpression
  | TSESTree.ChainExpression;
```

Union of expression node types that wrap another expression (TypeScript type expressions and chain expressions) — the nodes `Extract.unwrap` strips.

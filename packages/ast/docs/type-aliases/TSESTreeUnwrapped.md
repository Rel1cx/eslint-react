[@eslint-react/ast](../README.md) / TSESTreeUnwrapped

# Type Alias: TSESTreeUnwrapped\<T _extends_ `TSESTree.Node`\>

```ts
type TSESTreeUnwrapped<T extends TSESTree.Node> = Exclude<T, TSESTreeTypeExpression>;
```

Node type `T` with TypeScript type expressions excluded — the static result shape of `Extract.unwrap`.

## Type Parameters

| Type Parameter                |
| ----------------------------- |
| `T` _extends_ `TSESTree.Node` |

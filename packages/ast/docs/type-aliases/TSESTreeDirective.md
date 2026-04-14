[@eslint-react/ast](../README.md) / TSESTreeDirective

# Type Alias: TSESTreeDirective

```ts
type TSESTreeDirective = TSESTree.ExpressionStatement & {
  directive: string;
  expression: TSESTree.StringLiteral;
};
```

## Type Declaration

| Name | Type |
| ------ | ------ |
| `directive` | `string` |
| `expression` | `TSESTree.StringLiteral` |

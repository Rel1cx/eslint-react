[@eslint-react/ast](../README.md) / Directive

# Type Alias: Directive

```ts
type Directive = TSESTree.ExpressionStatement & {
  directive: string;
  expression: TSESTree.StringLiteral;
};
```

## Type Declaration

| Name | Type |
| ------ | ------ |
| `directive` | `string` |
| `expression` | `TSESTree.StringLiteral` |

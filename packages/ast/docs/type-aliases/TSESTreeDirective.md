[@eslint-react/ast](../README.md) / TSESTreeDirective

# Type Alias: TSESTreeDirective

```ts
type TSESTreeDirective = TSESTree.ExpressionStatement & {
  directive: string;
  expression: TSESTree.StringLiteral;
};
```

An expression statement that is a directive (ex: `"use strict"`).

## Type Declaration

| Name         | Type                     |
| ------------ | ------------------------ |
| `directive`  | `string`                 |
| `expression` | `TSESTree.StringLiteral` |

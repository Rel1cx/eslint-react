[@eslint-react/ast](../../../../README.md) / [Select](../README.md) / DisplayNameAssignment

# Type Alias: DisplayNameAssignment

```ts
type DisplayNameAssignment = TSESTree.AssignmentExpression & {
  left: TSESTree.MemberExpression & {
     property: TSESTree.Identifier & {
        name: "displayName";
     };
  };
  operator: "=";
  right: TSESTree.Literal;
};
```

## Type Declaration

| Name | Type |
| ------ | ------ |
| `left` | `TSESTree.MemberExpression` & \{ `property`: `TSESTree.Identifier` & \{ `name`: `"displayName"`; \}; \} |
| `operator` | `"="` |
| `right` | `TSESTree.Literal` |

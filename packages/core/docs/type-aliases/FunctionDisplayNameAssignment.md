[@eslint-react/core](../README.md) / FunctionDisplayNameAssignment

# Type Alias: FunctionDisplayNameAssignment

```ts
type FunctionDisplayNameAssignment = TSESTree.AssignmentExpression & {
  left: TSESTree.MemberExpression & {
    property: TSESTree.Identifier & {
      name: "displayName";
    };
  };
  operator: "=";
  right: TSESTree.Literal;
};
```

Represents a `displayName` assignment expression (ex: `Component.displayName = "MyComponent"`).

## Type Declaration

| Name       | Type                                                                                                    |
| ---------- | ------------------------------------------------------------------------------------------------------- |
| `left`     | `TSESTree.MemberExpression` & \{ `property`: `TSESTree.Identifier` & \{ `name`: `"displayName"`; \}; \} |
| `operator` | `"="`                                                                                                   |
| `right`    | `TSESTree.Literal`                                                                                      |

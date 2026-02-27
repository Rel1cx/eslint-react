[@eslint-react/core](../../../../README.md) / [useComponentCollectorLegacy](../README.md) / ReturnType

# Type Alias: ReturnType

```ts
type ReturnType = {
  ctx: {
     getAllComponents: (node: TSESTree.Program) => ClassComponentSemanticNode[];
  };
  visitor: ESLintUtils.RuleListener;
};
```

## Properties

| Property | Type |
| ------ | ------ |
| <a id="property-ctx"></a> `ctx` | \{ `getAllComponents`: (`node`: `TSESTree.Program`) => [`ClassComponentSemanticNode`](../../../../interfaces/ClassComponentSemanticNode.md)[]; \} |
| `ctx.getAllComponents` | (`node`: `TSESTree.Program`) => [`ClassComponentSemanticNode`](../../../../interfaces/ClassComponentSemanticNode.md)[] |
| <a id="property-visitor"></a> `visitor` | `ESLintUtils.RuleListener` |

[@eslint-react/core](../../../../README.md) / [useComponentCollector](../README.md) / ReturnType

# Type Alias: ReturnType

```ts
type ReturnType = {
  ctx: {
     getAllComponents: (node: TSESTree.Program) => FunctionComponentSemanticNode[];
     getCurrentEntries: () => FunctionEntry[];
     getCurrentEntry: () => FunctionEntry | null;
  };
  visitor: ESLintUtils.RuleListener;
};
```

## Properties

| Property | Type |
| ------ | ------ |
| <a id="property-ctx"></a> `ctx` | \{ `getAllComponents`: (`node`: `TSESTree.Program`) => [`FunctionComponentSemanticNode`](../../../../interfaces/FunctionComponentSemanticNode.md)[]; `getCurrentEntries`: () => `FunctionEntry`[]; `getCurrentEntry`: () => `FunctionEntry` \| `null`; \} |
| `ctx.getAllComponents` | (`node`: `TSESTree.Program`) => [`FunctionComponentSemanticNode`](../../../../interfaces/FunctionComponentSemanticNode.md)[] |
| `ctx.getCurrentEntries` | () => `FunctionEntry`[] |
| `ctx.getCurrentEntry` | () => `FunctionEntry` \| `null` |
| <a id="property-visitor"></a> `visitor` | `ESLintUtils.RuleListener` |

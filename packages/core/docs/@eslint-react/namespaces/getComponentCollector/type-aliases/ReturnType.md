[@eslint-react/core](../../../../README.md) / [getComponentCollector](../README.md) / ReturnType

# Type Alias: ReturnType

```ts
type ReturnType = {
  api: {
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
| <a id="property-api"></a> `api` | \{ `getAllComponents`: (`node`: `TSESTree.Program`) => [`FunctionComponentSemanticNode`](../../../../interfaces/FunctionComponentSemanticNode.md)[]; `getCurrentEntries`: () => `FunctionEntry`[]; `getCurrentEntry`: () => `FunctionEntry` \| `null`; \} |
| `api.getAllComponents` | (`node`: `TSESTree.Program`) => [`FunctionComponentSemanticNode`](../../../../interfaces/FunctionComponentSemanticNode.md)[] |
| `api.getCurrentEntries` | () => `FunctionEntry`[] |
| `api.getCurrentEntry` | () => `FunctionEntry` \| `null` |
| <a id="property-visitor"></a> `visitor` | `ESLintUtils.RuleListener` |

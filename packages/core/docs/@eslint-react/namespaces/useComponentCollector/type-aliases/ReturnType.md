[@eslint-react/core](../../../../README.md) / [useComponentCollector](../README.md) / ReturnType

# Type Alias: ReturnType

```ts
type ReturnType = {
  ctx: {
     getAllComponents: (node: TSESTree.Program) => FunctionComponent[];
     getCurrentEntries: () => FunctionEntry[];
     getCurrentEntry: () => FunctionEntry | unit;
  };
  visitors: ESLintUtils.RuleListener;
};
```

## Properties

| Property | Type |
| ------ | ------ |
| <a id="ctx"></a> `ctx` | \{ `getAllComponents`: (`node`: `TSESTree.Program`) => [`FunctionComponent`](../../../../interfaces/FunctionComponent.md)[]; `getCurrentEntries`: () => `FunctionEntry`[]; `getCurrentEntry`: () => `FunctionEntry` \| `unit`; \} |
| `ctx.getAllComponents` | (`node`: `TSESTree.Program`) => [`FunctionComponent`](../../../../interfaces/FunctionComponent.md)[] |
| `ctx.getCurrentEntries` | () => `FunctionEntry`[] |
| `ctx.getCurrentEntry` | () => `FunctionEntry` \| `unit` |
| <a id="visitors"></a> `visitors` | `ESLintUtils.RuleListener` |

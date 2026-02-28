[@eslint-react/core](../../../../README.md) / [useHookCollector](../README.md) / ReturnType

# Type Alias: ReturnType

```ts
type ReturnType = {
  ctx: {
     getAllHooks: HookSemanticNode[];
     getCurrentEntries: FunctionEntry[];
     getCurrentEntry: FunctionEntry | null;
  };
  visitor: ESLintUtils.RuleListener;
};
```

## Properties

| Property | Type |
| ------ | ------ |
| <a id="property-ctx"></a> `ctx` | \{ `getAllHooks`: [`HookSemanticNode`](../../../../interfaces/HookSemanticNode.md)[]; `getCurrentEntries`: `FunctionEntry`[]; `getCurrentEntry`: `FunctionEntry` \| `null`; \} |
| `ctx.getAllHooks` | [`HookSemanticNode`](../../../../interfaces/HookSemanticNode.md)[] |
| `ctx.getCurrentEntries` | `FunctionEntry`[] |
| `ctx.getCurrentEntry` | `FunctionEntry` \| `null` |
| <a id="property-visitor"></a> `visitor` | `ESLintUtils.RuleListener` |

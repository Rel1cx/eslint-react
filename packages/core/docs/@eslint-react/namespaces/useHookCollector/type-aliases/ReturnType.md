[@eslint-react/core](../../../../README.md) / [useHookCollector](../README.md) / ReturnType

# Type Alias: ReturnType

```ts
type ReturnType = {
  ctx: {
     getAllHooks: HookSemanticNode[];
     getCurrentEntries: FunctionEntry[];
     getCurrentEntry: FunctionEntry | undefined;
  };
  visitor: ESLintUtils.RuleListener;
};
```

## Properties

| Property | Type |
| ------ | ------ |
| <a id="ctx"></a> `ctx` | \{ `getAllHooks`: [`HookSemanticNode`](../../../../interfaces/HookSemanticNode.md)[]; `getCurrentEntries`: `FunctionEntry`[]; `getCurrentEntry`: `FunctionEntry` \| `undefined`; \} |
| `ctx.getAllHooks` | [`HookSemanticNode`](../../../../interfaces/HookSemanticNode.md)[] |
| `ctx.getCurrentEntries` | `FunctionEntry`[] |
| `ctx.getCurrentEntry` | `FunctionEntry` \| `undefined` |
| <a id="visitor"></a> `visitor` | `ESLintUtils.RuleListener` |

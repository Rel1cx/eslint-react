[@eslint-react/core](../../../../README.md) / [getHookCollector](../README.md) / ReturnType

# Type Alias: ReturnType

```ts
type ReturnType = {
  api: {
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
| <a id="property-api"></a> `api` | \{ `getAllHooks`: [`HookSemanticNode`](../../../../interfaces/HookSemanticNode.md)[]; `getCurrentEntries`: `FunctionEntry`[]; `getCurrentEntry`: `FunctionEntry` \| `null`; \} |
| `api.getAllHooks` | [`HookSemanticNode`](../../../../interfaces/HookSemanticNode.md)[] |
| `api.getCurrentEntries` | `FunctionEntry`[] |
| `api.getCurrentEntry` | `FunctionEntry` \| `null` |
| <a id="property-visitor"></a> `visitor` | `ESLintUtils.RuleListener` |

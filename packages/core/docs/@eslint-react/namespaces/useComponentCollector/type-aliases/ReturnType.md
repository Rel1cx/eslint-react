[@eslint-react/core](../../../../README.md) / [useComponentCollector](../README.md) / ReturnType

# Type Alias: ReturnType

```ts
type ReturnType = {
  ctx: {
     getAllComponents: (node: TSESTree.Program) => Map<string, FunctionComponent>;
     getCurrentEntries: () => FunctionEntry[];
     getCurrentEntry: () => FunctionEntry | unit;
  };
  listeners: ESLintUtils.RuleListener;
};
```

## Properties

| Property | Type |
| ------ | ------ |
| <a id="ctx"></a> `ctx` | \{ `getAllComponents`: (`node`: `TSESTree.Program`) => [`Map`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Map)\<`string`, [`FunctionComponent`](../../../../interfaces/FunctionComponent.md)\>; `getCurrentEntries`: () => `FunctionEntry`[]; `getCurrentEntry`: () => `FunctionEntry` \| `unit`; \} |
| `ctx.getAllComponents` | (`node`: `TSESTree.Program`) => [`Map`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Map)\<`string`, [`FunctionComponent`](../../../../interfaces/FunctionComponent.md)\> |
| `ctx.getCurrentEntries` | () => `FunctionEntry`[] |
| `ctx.getCurrentEntry` | () => `FunctionEntry` \| `unit` |
| <a id="listeners"></a> `listeners` | `ESLintUtils.RuleListener` |

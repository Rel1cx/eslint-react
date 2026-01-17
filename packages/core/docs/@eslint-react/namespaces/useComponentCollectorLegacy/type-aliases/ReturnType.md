[@eslint-react/core](../../../../README.md) / [useComponentCollectorLegacy](../README.md) / ReturnType

# Type Alias: ReturnType

```ts
type ReturnType = {
  ctx: {
     getAllComponents: (node: TSESTree.Program) => ClassComponent[];
  };
  visitors: ESLintUtils.RuleListener;
};
```

## Properties

| Property | Type |
| ------ | ------ |
| <a id="ctx"></a> `ctx` | \{ `getAllComponents`: (`node`: `TSESTree.Program`) => [`ClassComponent`](../../../../interfaces/ClassComponent.md)[]; \} |
| `ctx.getAllComponents` | (`node`: `TSESTree.Program`) => [`ClassComponent`](../../../../interfaces/ClassComponent.md)[] |
| <a id="visitors"></a> `visitors` | `ESLintUtils.RuleListener` |

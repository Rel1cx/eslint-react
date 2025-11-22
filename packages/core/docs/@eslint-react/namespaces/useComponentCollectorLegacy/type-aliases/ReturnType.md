[@eslint-react/core](../../../../README.md) / [useComponentCollectorLegacy](../README.md) / ReturnType

# Type Alias: ReturnType

```ts
type ReturnType = {
  ctx: {
     getAllComponents: (node: TSESTree.Program) => Map<string, ClassComponent>;
  };
  listeners: ESLintUtils.RuleListener;
};
```

## Properties

| Property | Type |
| ------ | ------ |
| <a id="ctx"></a> `ctx` | \{ `getAllComponents`: (`node`: `TSESTree.Program`) => [`Map`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Map)\<`string`, [`ClassComponent`](../../../../interfaces/ClassComponent.md)\>; \} |
| `ctx.getAllComponents` | (`node`: `TSESTree.Program`) => [`Map`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Map)\<`string`, [`ClassComponent`](../../../../interfaces/ClassComponent.md)\> |
| <a id="listeners"></a> `listeners` | `ESLintUtils.RuleListener` |

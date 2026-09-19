[@eslint-react/core](../../../../README.md) / [getHookCollector](../README.md) / ReturnType

# Type Alias: ReturnType

```ts
type ReturnType = {
  api: {
    getAllHooks: (node: TSESTree.Program) => HookSemanticNode[];
  };
  visitor: ESLintUtils.RuleListener;
};
```

The api and visitor pair returned by [getHookCollector](../../../../functions/getHookCollector.md).

## Properties

| Property                                | Type                                                                                                                     |
| --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| <a id="property-api"></a> `api`         | \{ `getAllHooks`: (`node`: `TSESTree.Program`) => [`HookSemanticNode`](../../../../interfaces/HookSemanticNode.md)[]; \} |
| `api.getAllHooks`                       | (`node`: `TSESTree.Program`) => [`HookSemanticNode`](../../../../interfaces/HookSemanticNode.md)[]                       |
| <a id="property-visitor"></a> `visitor` | `ESLintUtils.RuleListener`                                                                                               |

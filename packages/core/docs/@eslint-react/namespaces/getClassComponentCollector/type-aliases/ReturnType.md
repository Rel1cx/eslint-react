[@eslint-react/core](../../../../README.md) / [getClassComponentCollector](../README.md) / ReturnType

# ~~Type Alias: ReturnType~~

```ts
type ReturnType = {
  api: {
    getAllComponents: (node: TSESTree.Program) => ClassComponentSemanticNode[];
  };
  visitor: ESLintUtils.RuleListener;
};
```

The api and visitor pair returned by [getClassComponentCollector](../../../../functions/getClassComponentCollector.md).

## Properties

| Property                                    | Type                                                                                                                                              |
| ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| <a id="property-api"></a> ~~`api`~~         | \{ `getAllComponents`: (`node`: `TSESTree.Program`) => [`ClassComponentSemanticNode`](../../../../interfaces/ClassComponentSemanticNode.md)[]; \} |
| `api.getAllComponents`                      | (`node`: `TSESTree.Program`) => [`ClassComponentSemanticNode`](../../../../interfaces/ClassComponentSemanticNode.md)[]                            |
| <a id="property-visitor"></a> ~~`visitor`~~ | `ESLintUtils.RuleListener`                                                                                                                        |

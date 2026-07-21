[@eslint-react/core](../../../../README.md) / [getFunctionComponentCollector](../README.md) / ReturnType

# Type Alias: ReturnType

```ts
type ReturnType = {
  api: {
    getAllComponents: (node: TSESTree.Program) => FunctionComponentSemanticNode[];
  };
  visitor: ESLintUtils.RuleListener;
};
```

The api and visitor pair returned by [getFunctionComponentCollector](../../../../functions/getFunctionComponentCollector.md).

## Properties

| Property                                | Type                                                                                                                                                    |
| --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <a id="property-api"></a> `api`         | \{ `getAllComponents`: (`node`: `TSESTree.Program`) => [`FunctionComponentSemanticNode`](../../../../interfaces/FunctionComponentSemanticNode.md)[]; \} |
| `api.getAllComponents`                  | (`node`: `TSESTree.Program`) => [`FunctionComponentSemanticNode`](../../../../interfaces/FunctionComponentSemanticNode.md)[]                            |
| <a id="property-visitor"></a> `visitor` | `ESLintUtils.RuleListener`                                                                                                                              |

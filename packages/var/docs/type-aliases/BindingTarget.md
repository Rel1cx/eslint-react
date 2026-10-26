[@eslint-react/var](../README.md) / BindingTarget

# Type Alias: BindingTarget\<T _extends_ `null` \| `TSESTree.Node`\>

```ts
type BindingTarget<T extends null | TSESTree.Node> = T extends null ? null : T extends TSESTree.AssignmentPattern ? TSESTree.BindingName : T;
```

The result of [resolveBindingTarget](../functions/resolveBindingTarget.md): an `AssignmentPattern` unwraps to its
binding, while every other node is returned as is; `null` stays `null`.

## Type Parameters

| Type Parameter                                                        |
| --------------------------------------------------------------------- |
| <a id="type-parameter-t"></a> `T` _extends_ `null` \| `TSESTree.Node` |

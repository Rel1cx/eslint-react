[@eslint-react/ast](../../../../README.md) / [Traverse](../README.md) / SimpleTraverseOptions

# Type Alias: SimpleTraverseOptions

```ts
type SimpleTraverseOptions = {
  enter?: (node: TSESTree.Node, parent: TSESTree.Node | undefined) => void;
  leave?: (node: TSESTree.Node, parent: TSESTree.Node | undefined) => void;
  setParentPointers?: boolean;
  visitorKeys?: VisitorKeys;
};
```

Options for `simpleTraverse`.

## Properties

| Property                                                     | Type                                                                          | Description                                                                     |
| ------------------------------------------------------------ | ----------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| <a id="property-enter"></a> `enter?`                         | (`node`: `TSESTree.Node`, `parent`: `TSESTree.Node` \| `undefined`) => `void` | Called for each visited node before its children are visited.                   |
| <a id="property-leave"></a> `leave?`                         | (`node`: `TSESTree.Node`, `parent`: `TSESTree.Node` \| `undefined`) => `void` | Called for each visited node after its children are visited.                    |
| <a id="property-setparentpointers"></a> `setParentPointers?` | `boolean`                                                                     | Attach parent pointers to every visited node; the root's parent is removed.     |
| <a id="property-visitorkeys"></a> `visitorKeys?`             | `VisitorKeys`                                                                 | Visitor keys to use instead of the default ESTree keys (ex: to prune subtrees). |

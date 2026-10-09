[@eslint-react/ast](../../../../README.md) / [View](../README.md) / View

# Interface: View\<N _extends_ `TSESTree.Node` = `TSESTree.Node`\>

The contract shared by all node views, consumed as `View.View`.

Declared separately from the base `Class` (consumed as `View.Class`) so
consumers can depend on the contract alone, or provide their own
implementations, without extending the class.

## Type Parameters

| Type Parameter                | Default type    |
| ----------------------------- | --------------- |
| `N` _extends_ `TSESTree.Node` | `TSESTree.Node` |

## Properties

| Property                              | Modifier   | Type                            | Description                                                                                                                                                     |
| ------------------------------------- | ---------- | ------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <a id="property-node"></a> `node`     | `readonly` | `N`                             | The original node, as delivered by ESLint.                                                                                                                      |
| <a id="property-parent"></a> `parent` | `readonly` | `View`\<`Node`\> \| `undefined` | A view over the parent node. Deliberately NOT unwrapped: upward walks must see the tree as it is, including any type expression wrappers enclosing this node.   |
| <a id="property-type"></a> `type`     | `readonly` | `N`\[`"type"`\]                 | The node type, identical to ``node.type`` (ex: ``"CallExpression"``). Exposed on the view itself so it reads like the wrapped node and can discriminate a `View | AbsentView``union without touching``.node`. |

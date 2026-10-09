[@eslint-react/ast](../../../../README.md) / [View](../README.md) / NodeViewJSON

# Interface: NodeViewJSON

The structured, non-circular representation of a view used for logging,
serialization, and Node.js inspection. Unlike the wrapped node, it is always
safe to `JSON.stringify` — TSESTree nodes are circular via `parent`.

## Properties

| Property                            | Modifier   | Type             | Description                                                            |
| ----------------------------------- | ---------- | ---------------- | ---------------------------------------------------------------------- |
| <a id="property-_tag"></a> `_tag`   | `readonly` | `string`         | The view class name (ex: `"CallExpressionView"`).                      |
| <a id="property-range"></a> `range` | `readonly` | `Range`          | The node range in the source.                                          |
| <a id="property-text"></a> `text?`  | `readonly` | `string`         | The source text of the node, present only when a context was provided. |
| <a id="property-type"></a> `type`   | `readonly` | `AST_NODE_TYPES` | The node type (ex: `"CallExpression"`).                                |

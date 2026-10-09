[@eslint-react/ast](../../../../README.md) / [View](../README.md) / BinaryLikeView

# Class: BinaryLikeView\<N _extends_ `TSESTree.BinaryExpression` \| `TSESTree.LogicalExpression`\>

Base view over binary-like expressions sharing `left`/`right` operands.

## Extends

- [`NodeView`](NodeView.md)\<`N`\>

## Extended by

- [`BinaryExpressionView`](BinaryExpressionView.md)
- [`LogicalExpressionView`](LogicalExpressionView.md)

## Type Parameters

| Type Parameter                                                            |
| ------------------------------------------------------------------------- |
| `N` _extends_ `TSESTree.BinaryExpression` \| `TSESTree.LogicalExpression` |

## Constructors

### Constructor

```ts
new BinaryLikeView<N extends BinaryExpression | LogicalExpression>(node: N, context?: NodeViewContext): BinaryLikeView<N>;
```

#### Parameters

| Parameter  | Type                                                  |
| ---------- | ----------------------------------------------------- |
| `node`     | `N`                                                   |
| `context?` | [`NodeViewContext`](../interfaces/NodeViewContext.md) |

#### Returns

`BinaryLikeView`\<`N`\>

#### Inherited from

[`NodeView`](NodeView.md).[`constructor`](NodeView.md#constructor)

## Properties

| Property                                | Modifier   | Type                                                                 | Description                                              | Inherited from                                                      |
| --------------------------------------- | ---------- | -------------------------------------------------------------------- | -------------------------------------------------------- | ------------------------------------------------------------------- |
| <a id="property-context"></a> `context` | `readonly` | [`NodeViewContext`](../interfaces/NodeViewContext.md) \| `undefined` | Optional rule context for getters that need source text. | [`NodeView`](NodeView.md).[`context`](NodeView.md#property-context) |
| <a id="property-node"></a> `node`       | `readonly` | `N`                                                                  | The original node, as delivered by ESLint.               | [`NodeView`](NodeView.md).[`node`](NodeView.md#property-node)       |

## Methods

### getLeft()

```ts
getLeft(): TSESTreeUnwrapped<PrivateIdentifier | Expression>;
```

Get the left operand with type and chain expressions unwrapped.

#### Returns

[`TSESTreeUnwrapped`](../../../../type-aliases/TSESTreeUnwrapped.md)\<`PrivateIdentifier` \| `Expression`\>

---

### getParent()

```ts
getParent(): Node | undefined;
```

Get the parent node.
Deliberately NOT unwrapped: upward walks must see the tree as it is,
including any type expression wrappers enclosing this node.

#### Returns

`Node` \| `undefined`

#### Inherited from

[`NodeView`](NodeView.md).[`getParent`](NodeView.md#getparent)

---

### getRight()

```ts
getRight(): TSESTreeUnwrapped<Expression>;
```

Get the right operand with type and chain expressions unwrapped.

#### Returns

[`TSESTreeUnwrapped`](../../../../type-aliases/TSESTreeUnwrapped.md)\<`Expression`\>

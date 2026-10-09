[@eslint-react/ast](../../../../README.md) / [View](../README.md) / UnaryExpressionView

# Class: UnaryExpressionView

View over a unary expression.

## Extends

- [`NodeView`](NodeView.md)\<`TSESTree.UnaryExpression`\>

## Constructors

### Constructor

```ts
new UnaryExpressionView(node: UnaryExpression, context?: NodeViewContext): UnaryExpressionView;
```

#### Parameters

| Parameter  | Type                                                  |
| ---------- | ----------------------------------------------------- |
| `node`     | `UnaryExpression`                                     |
| `context?` | [`NodeViewContext`](../interfaces/NodeViewContext.md) |

#### Returns

`UnaryExpressionView`

#### Inherited from

[`NodeView`](NodeView.md).[`constructor`](NodeView.md#constructor)

## Properties

| Property                                | Modifier   | Type                                                                 | Description                                              | Inherited from                                                      |
| --------------------------------------- | ---------- | -------------------------------------------------------------------- | -------------------------------------------------------- | ------------------------------------------------------------------- |
| <a id="property-context"></a> `context` | `readonly` | [`NodeViewContext`](../interfaces/NodeViewContext.md) \| `undefined` | Optional rule context for getters that need source text. | [`NodeView`](NodeView.md).[`context`](NodeView.md#property-context) |
| <a id="property-node"></a> `node`       | `readonly` | `UnaryExpression`                                                    | The original node, as delivered by ESLint.               | [`NodeView`](NodeView.md).[`node`](NodeView.md#property-node)       |

## Methods

### getArgument()

```ts
getArgument(): TSESTreeUnwrapped<Expression>;
```

Get the argument with type and chain expressions unwrapped.

#### Returns

[`TSESTreeUnwrapped`](../../../../type-aliases/TSESTreeUnwrapped.md)\<`Expression`\>

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

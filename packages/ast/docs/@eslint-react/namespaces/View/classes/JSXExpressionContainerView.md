[@eslint-react/ast](../../../../README.md) / [View](../README.md) / JSXExpressionContainerView

# Class: JSXExpressionContainerView

View over a JSX expression container.

## Extends

- [`NodeView`](NodeView.md)\<`TSESTree.JSXExpressionContainer`\>

## Constructors

### Constructor

```ts
new JSXExpressionContainerView(node: JSXExpressionContainer, context?: NodeViewContext): JSXExpressionContainerView;
```

#### Parameters

| Parameter  | Type                                                  |
| ---------- | ----------------------------------------------------- |
| `node`     | `JSXExpressionContainer`                              |
| `context?` | [`NodeViewContext`](../interfaces/NodeViewContext.md) |

#### Returns

`JSXExpressionContainerView`

#### Inherited from

[`NodeView`](NodeView.md).[`constructor`](NodeView.md#constructor)

## Properties

| Property                                | Modifier   | Type                                                                 | Description                                              | Inherited from                                                      |
| --------------------------------------- | ---------- | -------------------------------------------------------------------- | -------------------------------------------------------- | ------------------------------------------------------------------- |
| <a id="property-context"></a> `context` | `readonly` | [`NodeViewContext`](../interfaces/NodeViewContext.md) \| `undefined` | Optional rule context for getters that need source text. | [`NodeView`](NodeView.md).[`context`](NodeView.md#property-context) |
| <a id="property-node"></a> `node`       | `readonly` | `JSXExpressionContainer`                                             | The original node, as delivered by ESLint.               | [`NodeView`](NodeView.md).[`node`](NodeView.md#property-node)       |

## Methods

### getExpression()

```ts
getExpression(): TSESTreeUnwrapped<JSXEmptyExpression | Expression>;
```

Get the expression with type and chain expressions unwrapped.

#### Returns

[`TSESTreeUnwrapped`](../../../../type-aliases/TSESTreeUnwrapped.md)\<`JSXEmptyExpression` \| `Expression`\>

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

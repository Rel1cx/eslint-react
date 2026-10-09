[@eslint-react/ast](../../../../README.md) / [View](../README.md) / AssignmentExpressionView

# Class: AssignmentExpressionView

View over an assignment expression.

## Extends

- [`NodeView`](NodeView.md)\<`TSESTree.AssignmentExpression`\>

## Constructors

### Constructor

```ts
new AssignmentExpressionView(node: AssignmentExpression, context?: NodeViewContext): AssignmentExpressionView;
```

#### Parameters

| Parameter  | Type                                                  |
| ---------- | ----------------------------------------------------- |
| `node`     | `AssignmentExpression`                                |
| `context?` | [`NodeViewContext`](../interfaces/NodeViewContext.md) |

#### Returns

`AssignmentExpressionView`

#### Inherited from

[`NodeView`](NodeView.md).[`constructor`](NodeView.md#constructor)

## Properties

| Property                                | Modifier   | Type                                                                 | Description                                              | Inherited from                                                      |
| --------------------------------------- | ---------- | -------------------------------------------------------------------- | -------------------------------------------------------- | ------------------------------------------------------------------- |
| <a id="property-context"></a> `context` | `readonly` | [`NodeViewContext`](../interfaces/NodeViewContext.md) \| `undefined` | Optional rule context for getters that need source text. | [`NodeView`](NodeView.md).[`context`](NodeView.md#property-context) |
| <a id="property-node"></a> `node`       | `readonly` | `AssignmentExpression`                                               | The original node, as delivered by ESLint.               | [`NodeView`](NodeView.md).[`node`](NodeView.md#property-node)       |

## Methods

### getLeft()

```ts
getLeft(): TSESTreeUnwrapped<Expression>;
```

Get the assignment target with type and chain expressions unwrapped.

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

---

### getRight()

```ts
getRight(): TSESTreeUnwrapped<Expression>;
```

Get the assigned value with type and chain expressions unwrapped.

#### Returns

[`TSESTreeUnwrapped`](../../../../type-aliases/TSESTreeUnwrapped.md)\<`Expression`\>

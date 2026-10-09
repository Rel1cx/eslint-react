[@eslint-react/ast](../../../../README.md) / [View](../README.md) / ConditionalExpressionView

# Class: ConditionalExpressionView

View over a conditional expression.

## Extends

- [`NodeView`](NodeView.md)\<`TSESTree.ConditionalExpression`\>

## Constructors

### Constructor

```ts
new ConditionalExpressionView(node: ConditionalExpression, context?: NodeViewContext): ConditionalExpressionView;
```

#### Parameters

| Parameter  | Type                                                  |
| ---------- | ----------------------------------------------------- |
| `node`     | `ConditionalExpression`                               |
| `context?` | [`NodeViewContext`](../interfaces/NodeViewContext.md) |

#### Returns

`ConditionalExpressionView`

#### Inherited from

[`NodeView`](NodeView.md).[`constructor`](NodeView.md#constructor)

## Properties

| Property                                | Modifier   | Type                                                                 | Description                                              | Inherited from                                                      |
| --------------------------------------- | ---------- | -------------------------------------------------------------------- | -------------------------------------------------------- | ------------------------------------------------------------------- |
| <a id="property-context"></a> `context` | `readonly` | [`NodeViewContext`](../interfaces/NodeViewContext.md) \| `undefined` | Optional rule context for getters that need source text. | [`NodeView`](NodeView.md).[`context`](NodeView.md#property-context) |
| <a id="property-node"></a> `node`       | `readonly` | `ConditionalExpression`                                              | The original node, as delivered by ESLint.               | [`NodeView`](NodeView.md).[`node`](NodeView.md#property-node)       |

## Methods

### getAlternate()

```ts
getAlternate(): TSESTreeUnwrapped<Expression>;
```

Get the alternate with type and chain expressions unwrapped.

#### Returns

[`TSESTreeUnwrapped`](../../../../type-aliases/TSESTreeUnwrapped.md)\<`Expression`\>

---

### getConsequent()

```ts
getConsequent(): TSESTreeUnwrapped<Expression>;
```

Get the consequent with type and chain expressions unwrapped.

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

### getTest()

```ts
getTest(): TSESTreeUnwrapped<Expression>;
```

Get the test with type and chain expressions unwrapped.

#### Returns

[`TSESTreeUnwrapped`](../../../../type-aliases/TSESTreeUnwrapped.md)\<`Expression`\>

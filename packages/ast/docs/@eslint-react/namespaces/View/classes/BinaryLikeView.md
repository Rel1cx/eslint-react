[@eslint-react/ast](../../../../README.md) / [View](../README.md) / BinaryLikeView

# Class: BinaryLikeView\<N _extends_ `TSESTree.BinaryExpression` \| `TSESTree.LogicalExpression`\>

Base view over binary-like expressions sharing `left`/`right` operands.

## Extends

- [`NodeViewBase`](NodeViewBase.md)\<`N`\>

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

[`NodeViewBase`](NodeViewBase.md).[`constructor`](NodeViewBase.md#constructor)

## Properties

| Property                                | Modifier   | Type                                                                 | Description                                              | Inherited from                                                                  |
| --------------------------------------- | ---------- | -------------------------------------------------------------------- | -------------------------------------------------------- | ------------------------------------------------------------------------------- |
| <a id="property-context"></a> `context` | `readonly` | [`NodeViewContext`](../interfaces/NodeViewContext.md) \| `undefined` | Optional rule context for getters that need source text. | [`NodeViewBase`](NodeViewBase.md).[`context`](NodeViewBase.md#property-context) |
| <a id="property-node"></a> `node`       | `readonly` | `N`                                                                  | The original node, as delivered by ESLint.               | [`NodeViewBase`](NodeViewBase.md).[`node`](NodeViewBase.md#property-node)       |

## Methods

### \[NodeInspectSymbol\]()

```ts
NodeInspectSymbol: unknown;
```

Node.js custom inspection method.

#### Returns

`unknown`

#### Since

2.0.0

#### Inherited from

[`NodeViewBase`](NodeViewBase.md).[`[NodeInspectSymbol]`](NodeViewBase.md#nodeinspectsymbol)

---

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

[`NodeViewBase`](NodeViewBase.md).[`getParent`](NodeViewBase.md#getparent)

---

### getRight()

```ts
getRight(): TSESTreeUnwrapped<Expression>;
```

Get the right operand with type and chain expressions unwrapped.

#### Returns

[`TSESTreeUnwrapped`](../../../../type-aliases/TSESTreeUnwrapped.md)\<`Expression`\>

---

### toJSON()

```ts
toJSON(): NodeViewJSON;
```

Return the structured, non-circular representation of this view.

#### Returns

[`NodeViewJSON`](../interfaces/NodeViewJSON.md)

#### Inherited from

[`NodeViewBase`](NodeViewBase.md).[`toJSON`](NodeViewBase.md#tojson)

---

### toString()

```ts
toString(): string;
```

Returns a formatted string representation of this object.

#### Returns

`string`

#### Since

2.0.0

#### Inherited from

[`NodeViewBase`](NodeViewBase.md).[`toString`](NodeViewBase.md#tostring)

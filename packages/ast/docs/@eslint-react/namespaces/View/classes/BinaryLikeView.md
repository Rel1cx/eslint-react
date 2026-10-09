[@eslint-react/ast](../../../../README.md) / [View](../README.md) / BinaryLikeView

# Class: BinaryLikeView\<N _extends_ `TSESTree.BinaryExpression` \| `TSESTree.LogicalExpression`\>

Base view over binary-like expressions sharing `left`/`right` operands.

## Extends

- [`Class`](Class.md)\<`N`\>

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
new BinaryLikeView<N extends BinaryExpression | LogicalExpression>(node: N, context?: ViewContext): BinaryLikeView<N>;
```

#### Parameters

| Parameter  | Type                                          |
| ---------- | --------------------------------------------- |
| `node`     | `N`                                           |
| `context?` | [`ViewContext`](../interfaces/ViewContext.md) |

#### Returns

`BinaryLikeView`\<`N`\>

#### Inherited from

[`Class`](Class.md).[`constructor`](Class.md#constructor)

## Properties

| Property                                | Modifier   | Type                                                         | Description                                              | Inherited from                                             |
| --------------------------------------- | ---------- | ------------------------------------------------------------ | -------------------------------------------------------- | ---------------------------------------------------------- |
| <a id="property-context"></a> `context` | `readonly` | [`ViewContext`](../interfaces/ViewContext.md) \| `undefined` | Optional rule context for getters that need source text. | [`Class`](Class.md).[`context`](Class.md#property-context) |
| <a id="property-node"></a> `node`       | `readonly` | `N`                                                          | The original node, as delivered by ESLint.               | [`Class`](Class.md).[`node`](Class.md#property-node)       |

## Accessors

### left

#### Get Signature

```ts
get left(): View<TSESTreeUnwrapped<PrivateIdentifier | Expression>>;
```

A view over the left operand with type and chain expressions unwrapped.

##### Returns

[`View`](../interfaces/View.md)\<[`TSESTreeUnwrapped`](../../../../type-aliases/TSESTreeUnwrapped.md)\<`PrivateIdentifier` \| `Expression`\>\>

---

### parent

#### Get Signature

```ts
get parent(): View<Node> | undefined;
```

A view over the parent node.
Deliberately NOT unwrapped: upward walks must see the tree as it is,
including any type expression wrappers enclosing this node.

##### Returns

[`View`](../interfaces/View.md)\<`Node`\> \| `undefined`

A view over the parent node.
Deliberately NOT unwrapped: upward walks must see the tree as it is,
including any type expression wrappers enclosing this node.

#### Inherited from

[`Class`](Class.md).[`parent`](Class.md#parent)

---

### right

#### Get Signature

```ts
get right(): View<TSESTreeUnwrapped<Expression>>;
```

A view over the right operand with type and chain expressions unwrapped.

##### Returns

[`View`](../interfaces/View.md)\<[`TSESTreeUnwrapped`](../../../../type-aliases/TSESTreeUnwrapped.md)\<`Expression`\>\>

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

[`Class`](Class.md).[`[NodeInspectSymbol]`](Class.md#nodeinspectsymbol)

---

### toJSON()

```ts
toJSON(): ViewJSON;
```

Return the structured, non-circular representation of this view.

#### Returns

[`ViewJSON`](../interfaces/ViewJSON.md)

#### Inherited from

[`Class`](Class.md).[`toJSON`](Class.md#tojson)

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

[`Class`](Class.md).[`toString`](Class.md#tostring)

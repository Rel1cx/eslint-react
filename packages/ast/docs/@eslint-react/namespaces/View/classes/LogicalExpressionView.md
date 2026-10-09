[@eslint-react/ast](../../../../README.md) / [View](../README.md) / LogicalExpressionView

# Class: LogicalExpressionView

View over a logical expression.

## Extends

- [`BinaryLikeView`](BinaryLikeView.md)\<`TSESTree.LogicalExpression`\>

## Constructors

### Constructor

```ts
new LogicalExpressionView(node: LogicalExpression, context?: ViewContext): LogicalExpressionView;
```

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `node` | `LogicalExpression` |
| `context?` | [`ViewContext`](../interfaces/ViewContext.md) |

#### Returns

`LogicalExpressionView`

#### Inherited from

[`BinaryLikeView`](BinaryLikeView.md).[`constructor`](BinaryLikeView.md#constructor)

## Properties

| Property | Modifier | Type | Description | Inherited from |
| ------ | ------ | ------ | ------ | ------ |
| <a id="property-context"></a> `context` | `readonly` | [`ViewContext`](../interfaces/ViewContext.md) \| `undefined` | Optional rule context for getters that need source text. | [`BinaryLikeView`](BinaryLikeView.md).[`context`](BinaryLikeView.md#property-context) |
| <a id="property-node"></a> `node` | `readonly` | `LogicalExpression` | The original node, as delivered by ESLint. | [`BinaryLikeView`](BinaryLikeView.md).[`node`](BinaryLikeView.md#property-node) |

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

[`BinaryLikeView`](BinaryLikeView.md).[`[NodeInspectSymbol]`](BinaryLikeView.md#nodeinspectsymbol)

***

### getLeft()

```ts
getLeft(): TSESTreeUnwrapped<PrivateIdentifier | Expression>;
```

Get the left operand with type and chain expressions unwrapped.

#### Returns

[`TSESTreeUnwrapped`](../../../../type-aliases/TSESTreeUnwrapped.md)\<`PrivateIdentifier` \| `Expression`\>

#### Inherited from

[`BinaryLikeView`](BinaryLikeView.md).[`getLeft`](BinaryLikeView.md#getleft)

***

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

[`BinaryLikeView`](BinaryLikeView.md).[`getParent`](BinaryLikeView.md#getparent)

***

### getRight()

```ts
getRight(): TSESTreeUnwrapped<Expression>;
```

Get the right operand with type and chain expressions unwrapped.

#### Returns

[`TSESTreeUnwrapped`](../../../../type-aliases/TSESTreeUnwrapped.md)\<`Expression`\>

#### Inherited from

[`BinaryLikeView`](BinaryLikeView.md).[`getRight`](BinaryLikeView.md#getright)

***

### toJSON()

```ts
toJSON(): ViewJSON;
```

Return the structured, non-circular representation of this view.

#### Returns

[`ViewJSON`](../interfaces/ViewJSON.md)

#### Inherited from

[`BinaryLikeView`](BinaryLikeView.md).[`toJSON`](BinaryLikeView.md#tojson)

***

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

[`BinaryLikeView`](BinaryLikeView.md).[`toString`](BinaryLikeView.md#tostring)

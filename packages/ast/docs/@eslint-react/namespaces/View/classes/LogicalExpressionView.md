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

| Parameter  | Type                                          |
| ---------- | --------------------------------------------- |
| `node`     | `LogicalExpression`                           |
| `context?` | [`ViewContext`](../interfaces/ViewContext.md) |

#### Returns

`LogicalExpressionView`

#### Inherited from

[`BinaryLikeView`](BinaryLikeView.md).[`constructor`](BinaryLikeView.md#constructor)

## Properties

| Property                                | Modifier   | Type                                                         | Description                                              | Inherited from                                                                        |
| --------------------------------------- | ---------- | ------------------------------------------------------------ | -------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| <a id="property-context"></a> `context` | `readonly` | [`ViewContext`](../interfaces/ViewContext.md) \| `undefined` | Optional rule context for getters that need source text. | [`BinaryLikeView`](BinaryLikeView.md).[`context`](BinaryLikeView.md#property-context) |
| <a id="property-node"></a> `node`       | `readonly` | `LogicalExpression`                                          | The original node, as delivered by ESLint.               | [`BinaryLikeView`](BinaryLikeView.md).[`node`](BinaryLikeView.md#property-node)       |

## Accessors

### left

#### Get Signature

```ts
get left(): View<TSESTreeUnwrapped<PrivateIdentifier | Expression>>;
```

A view over the left operand with type and chain expressions unwrapped.

##### Returns

[`View`](../interfaces/View.md)\<[`TSESTreeUnwrapped`](../../../../type-aliases/TSESTreeUnwrapped.md)\<`PrivateIdentifier` \| `Expression`\>\>

#### Inherited from

[`BinaryLikeView`](BinaryLikeView.md).[`left`](BinaryLikeView.md#left)

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

[`BinaryLikeView`](BinaryLikeView.md).[`parent`](BinaryLikeView.md#parent)

---

### right

#### Get Signature

```ts
get right(): View<TSESTreeUnwrapped<Expression>>;
```

A view over the right operand with type and chain expressions unwrapped.

##### Returns

[`View`](../interfaces/View.md)\<[`TSESTreeUnwrapped`](../../../../type-aliases/TSESTreeUnwrapped.md)\<`Expression`\>\>

#### Inherited from

[`BinaryLikeView`](BinaryLikeView.md).[`right`](BinaryLikeView.md#right)

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

---

### toJSON()

```ts
toJSON(): ViewJSON;
```

Return the structured, non-circular representation of this view.

#### Returns

[`ViewJSON`](../interfaces/ViewJSON.md)

#### Inherited from

[`BinaryLikeView`](BinaryLikeView.md).[`toJSON`](BinaryLikeView.md#tojson)

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

[`BinaryLikeView`](BinaryLikeView.md).[`toString`](BinaryLikeView.md#tostring)

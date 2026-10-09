[@eslint-react/ast](../../../../README.md) / [View](../README.md) / CallExpressionView

# Class: CallExpressionView

View over a call expression.

## Extends

- [`Class`](Class.md)\<`TSESTree.CallExpression`\>

## Constructors

### Constructor

```ts
new CallExpressionView(node: CallExpression, context?: ViewContext): CallExpressionView;
```

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `node` | `CallExpression` |
| `context?` | [`ViewContext`](../interfaces/ViewContext.md) |

#### Returns

`CallExpressionView`

#### Inherited from

[`Class`](Class.md).[`constructor`](Class.md#constructor)

## Properties

| Property | Modifier | Type | Description | Inherited from |
| ------ | ------ | ------ | ------ | ------ |
| <a id="property-context"></a> `context` | `readonly` | [`ViewContext`](../interfaces/ViewContext.md) \| `undefined` | Optional rule context for getters that need source text. | [`Class`](Class.md).[`context`](Class.md#property-context) |
| <a id="property-node"></a> `node` | `readonly` | `CallExpression` | The original node, as delivered by ESLint. | [`Class`](Class.md).[`node`](Class.md#property-node) |

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

***

### getArguments()

```ts
getArguments(): TSESTreeUnwrapped<CallExpressionArgument>[];
```

Get the arguments with type and chain expressions unwrapped.

#### Returns

[`TSESTreeUnwrapped`](../../../../type-aliases/TSESTreeUnwrapped.md)\<`CallExpressionArgument`\>[]

***

### getCallee()

```ts
getCallee(): TSESTreeUnwrapped<Expression>;
```

Get the callee with type and chain expressions unwrapped.

#### Returns

[`TSESTreeUnwrapped`](../../../../type-aliases/TSESTreeUnwrapped.md)\<`Expression`\>

***

### getCalleeName()

```ts
getCalleeName(): string | null;
```

Get the statically determinable callee name (ex: `"useState"`), or `null`.

#### Returns

`string` \| `null`

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

[`Class`](Class.md).[`getParent`](Class.md#getparent)

***

### toJSON()

```ts
toJSON(): ViewJSON;
```

Return the structured, non-circular representation of this view.

#### Returns

[`ViewJSON`](../interfaces/ViewJSON.md)

#### Inherited from

[`Class`](Class.md).[`toJSON`](Class.md#tojson)

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

[`Class`](Class.md).[`toString`](Class.md#tostring)

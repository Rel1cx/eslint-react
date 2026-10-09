[@eslint-react/ast](../../../../README.md) / [View](../README.md) / ThrowStatementView

# Class: ThrowStatementView

View over a throw statement.

## Extends

- [`Class`](Class.md)\<`TSESTree.ThrowStatement`\>

## Constructors

### Constructor

```ts
new ThrowStatementView(node: ThrowStatement, context?: ViewContext): ThrowStatementView;
```

#### Parameters

| Parameter  | Type                                          |
| ---------- | --------------------------------------------- |
| `node`     | `ThrowStatement`                              |
| `context?` | [`ViewContext`](../interfaces/ViewContext.md) |

#### Returns

`ThrowStatementView`

#### Inherited from

[`Class`](Class.md).[`constructor`](Class.md#constructor)

## Properties

| Property                                | Modifier   | Type                                                         | Description                                              | Inherited from                                             |
| --------------------------------------- | ---------- | ------------------------------------------------------------ | -------------------------------------------------------- | ---------------------------------------------------------- |
| <a id="property-context"></a> `context` | `readonly` | [`ViewContext`](../interfaces/ViewContext.md) \| `undefined` | Optional rule context for getters that need source text. | [`Class`](Class.md).[`context`](Class.md#property-context) |
| <a id="property-node"></a> `node`       | `readonly` | `ThrowStatement`                                             | The original node, as delivered by ESLint.               | [`Class`](Class.md).[`node`](Class.md#property-node)       |

## Accessors

### argument

#### Get Signature

```ts
get argument(): View<TSESTreeUnwrapped<Expression>>;
```

A view over the argument with type and chain expressions unwrapped.

##### Returns

[`View`](../interfaces/View.md)\<[`TSESTreeUnwrapped`](../../../../type-aliases/TSESTreeUnwrapped.md)\<`Expression`\>\>

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

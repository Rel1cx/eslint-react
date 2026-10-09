[@eslint-react/ast](../../../../README.md) / [View](../README.md) / ExpressionStatementView

# Class: ExpressionStatementView

View over an expression statement.

## Extends

- [`NodeViewBase`](NodeViewBase.md)\<`TSESTree.ExpressionStatement`\>

## Constructors

### Constructor

```ts
new ExpressionStatementView(node: ExpressionStatement, context?: NodeViewContext): ExpressionStatementView;
```

#### Parameters

| Parameter  | Type                                                  |
| ---------- | ----------------------------------------------------- |
| `node`     | `ExpressionStatement`                                 |
| `context?` | [`NodeViewContext`](../interfaces/NodeViewContext.md) |

#### Returns

`ExpressionStatementView`

#### Inherited from

[`NodeViewBase`](NodeViewBase.md).[`constructor`](NodeViewBase.md#constructor)

## Properties

| Property                                | Modifier   | Type                                                                 | Description                                              | Inherited from                                                                  |
| --------------------------------------- | ---------- | -------------------------------------------------------------------- | -------------------------------------------------------- | ------------------------------------------------------------------------------- |
| <a id="property-context"></a> `context` | `readonly` | [`NodeViewContext`](../interfaces/NodeViewContext.md) \| `undefined` | Optional rule context for getters that need source text. | [`NodeViewBase`](NodeViewBase.md).[`context`](NodeViewBase.md#property-context) |
| <a id="property-node"></a> `node`       | `readonly` | `ExpressionStatement`                                                | The original node, as delivered by ESLint.               | [`NodeViewBase`](NodeViewBase.md).[`node`](NodeViewBase.md#property-node)       |

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

### getExpression()

```ts
getExpression(): TSESTreeUnwrapped<Expression>;
```

Get the expression with type and chain expressions unwrapped.

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

[`NodeViewBase`](NodeViewBase.md).[`getParent`](NodeViewBase.md#getparent)

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

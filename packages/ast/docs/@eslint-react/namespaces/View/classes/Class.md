[@eslint-react/ast](../../../../README.md) / [View](../README.md) / Class

# Class: Class\<N _extends_ `TSESTree.Node` = `TSESTree.Node`\>

Base class of all node views, consumed as `View.Class`.

Serves both as the base class of the specialized views and as the concrete
fallback returned by `from()` for node types without a dedicated view.

Experimental read-only facade over a `TSESTree` node.

Views expose only getter accessors. Accessors that read a child node return
a view over that node, created via `from()` with the view's context passed
down, and with type and chain expressions unwrapped where the accessor's
semantics call for it. Accessors whose child may be absent (ex: the argument
of a bare `return`) return an `EmptyView` instead of `null`. Views never
modify or copy the tree, so the
underlying nodes keep their identity and remain usable with `===`
comparisons, scope analysis, WeakMap caches, and `context.report`; the
original node stays reachable via `.node`.

## Extends

- `Class`

## Extended by

- [`CallExpressionView`](CallExpressionView.md)
- [`NewExpressionView`](NewExpressionView.md)
- [`MemberExpressionView`](MemberExpressionView.md)
- [`AssignmentExpressionView`](AssignmentExpressionView.md)
- [`BinaryLikeView`](BinaryLikeView.md)
- [`ConditionalExpressionView`](ConditionalExpressionView.md)
- [`ExpressionStatementView`](ExpressionStatementView.md)
- [`ReturnStatementView`](ReturnStatementView.md)
- [`ThrowStatementView`](ThrowStatementView.md)
- [`UnaryExpressionView`](UnaryExpressionView.md)
- [`AwaitExpressionView`](AwaitExpressionView.md)
- [`VariableDeclaratorView`](VariableDeclaratorView.md)
- [`PropertyView`](PropertyView.md)
- [`JSXExpressionContainerView`](JSXExpressionContainerView.md)

## Type Parameters

| Type Parameter                | Default type    |
| ----------------------------- | --------------- |
| `N` _extends_ `TSESTree.Node` | `TSESTree.Node` |

## Implements

- [`View`](../interfaces/View.md)\<`N`\>

## Constructors

### Constructor

```ts
new Class<N extends Node = Node>(node: N, context?: ViewContext): Class<N>;
```

#### Parameters

| Parameter  | Type                                          |
| ---------- | --------------------------------------------- |
| `node`     | `N`                                           |
| `context?` | [`ViewContext`](../interfaces/ViewContext.md) |

#### Returns

`Class`\<`N`\>

#### Overrides

```ts
InspectableClass.constructor;
```

## Properties

| Property                                | Modifier   | Type                                                         | Description                                              |
| --------------------------------------- | ---------- | ------------------------------------------------------------ | -------------------------------------------------------- |
| <a id="property-context"></a> `context` | `readonly` | [`ViewContext`](../interfaces/ViewContext.md) \| `undefined` | Optional rule context for getters that need source text. |
| <a id="property-node"></a> `node`       | `readonly` | `N`                                                          | The original node, as delivered by ESLint.               |

## Accessors

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

#### Implementation of

[`View`](../interfaces/View.md).[`parent`](../interfaces/View.md#property-parent)

---

### type

#### Get Signature

```ts
get type(): N["type"];
```

The node type, identical to `node.type` (ex: `"CallExpression"`).
Exposed on the view itself so it reads like the wrapped node and can
discriminate a `View | EmptyView` union without touching `.node`.

##### Returns

`N`\[`"type"`\]

The node type, identical to `node.type` (ex: `"CallExpression"`).
Exposed on the view itself so it reads like the wrapped node and can
discriminate a `View | EmptyView` union without touching `.node`.

#### Implementation of

[`View`](../interfaces/View.md).[`type`](../interfaces/View.md#property-type)

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

#### Implementation of

[`View`](../interfaces/View.md).[`[NodeInspectSymbol]`](../interfaces/View.md#nodeinspectsymbol)

#### Inherited from

```ts
InspectableClass.[NodeInspectSymbol]
```

---

### toJSON()

```ts
toJSON(): ViewJSON;
```

Return the structured, non-circular representation of this view.

#### Returns

[`ViewJSON`](../interfaces/ViewJSON.md)

#### Implementation of

[`View`](../interfaces/View.md).[`toJSON`](../interfaces/View.md#tojson)

#### Overrides

```ts
InspectableClass.toJSON;
```

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

#### Implementation of

[`View`](../interfaces/View.md).[`toString`](../interfaces/View.md#tostring)

#### Inherited from

```ts
InspectableClass.toString;
```

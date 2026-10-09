[@eslint-react/ast](../../../../README.md) / [View](../README.md) / Class

# Class: Class\<N *extends* `TSESTree.Node` = `TSESTree.Node`\>

Base class of all node views, consumed as `View.Class`.

Serves both as the base class of the specialized views and as the concrete
fallback returned by `of()` for node types without a dedicated view.

Experimental read-only facade over a `TSESTree` node.

Views expose only `get*` accessors that return references into the original
tree with type and chain expressions unwrapped where the accessor's semantics
call for it. They never modify or copy the tree, so returned nodes keep their
identity and remain usable with `===` comparisons, scope analysis, WeakMap
caches, and `context.report`.

Views are an alternative to calling `Extract.unwrap` at each analysis site,
not a replacement; the original node stays reachable via `.node`.

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

| Type Parameter | Default type |
| ------ | ------ |
| `N` *extends* `TSESTree.Node` | `TSESTree.Node` |

## Implements

- [`View`](../interfaces/View.md)\<`N`\>

## Constructors

### Constructor

```ts
new Class<N extends Node = Node>(node: N, context?: ViewContext): Class<N>;
```

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `node` | `N` |
| `context?` | [`ViewContext`](../interfaces/ViewContext.md) |

#### Returns

`Class`\<`N`\>

#### Overrides

```ts
InspectableClass.constructor
```

## Properties

| Property | Modifier | Type | Description |
| ------ | ------ | ------ | ------ |
| <a id="property-context"></a> `context` | `readonly` | [`ViewContext`](../interfaces/ViewContext.md) \| `undefined` | Optional rule context for getters that need source text. |
| <a id="property-node"></a> `node` | `readonly` | `N` | The original node, as delivered by ESLint. |

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

#### Implementation of

[`View`](../interfaces/View.md).[`getParent`](../interfaces/View.md#getparent)

***

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
InspectableClass.toJSON
```

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

#### Implementation of

[`View`](../interfaces/View.md).[`toString`](../interfaces/View.md#tostring)

#### Inherited from

```ts
InspectableClass.toString
```

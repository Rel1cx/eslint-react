[@eslint-react/ast](../../../../README.md) / [View](../README.md) / NodeViewBase

# Class: NodeViewBase\<N _extends_ `TSESTree.Node` = `TSESTree.Node`\>

Experimental read-only facade over a `TSESTree` node.

Views expose only `get*` accessors that return references into the original
tree with type and chain expressions unwrapped where the accessor's semantics
call for it. They never modify or copy the tree, so returned nodes keep their
identity and remain usable with `===` comparisons, scope analysis, WeakMap
caches, and `context.report`.

Views are an alternative to calling `Extract.unwrap` at each analysis site,
not a replacement; the original node stays reachable via `.node`.

## Extends

- `InspectableClass`

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

- [`NodeView`](../interfaces/NodeView.md)\<`N`\>

## Constructors

### Constructor

```ts
new NodeViewBase<N extends Node = Node>(node: N, context?: NodeViewContext): NodeViewBase<N>;
```

#### Parameters

| Parameter  | Type                                                  |
| ---------- | ----------------------------------------------------- |
| `node`     | `N`                                                   |
| `context?` | [`NodeViewContext`](../interfaces/NodeViewContext.md) |

#### Returns

`NodeViewBase`\<`N`\>

#### Overrides

```ts
InspectableClass.constructor;
```

## Properties

| Property                                | Modifier   | Type                                                                 | Description                                              |
| --------------------------------------- | ---------- | -------------------------------------------------------------------- | -------------------------------------------------------- |
| <a id="property-context"></a> `context` | `readonly` | [`NodeViewContext`](../interfaces/NodeViewContext.md) \| `undefined` | Optional rule context for getters that need source text. |
| <a id="property-node"></a> `node`       | `readonly` | `N`                                                                  | The original node, as delivered by ESLint.               |

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

[`NodeView`](../interfaces/NodeView.md).[`[NodeInspectSymbol]`](../interfaces/NodeView.md#nodeinspectsymbol)

#### Inherited from

```ts
InspectableClass.[NodeInspectSymbol]
```

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

#### Implementation of

[`NodeView`](../interfaces/NodeView.md).[`getParent`](../interfaces/NodeView.md#getparent)

---

### toJSON()

```ts
toJSON(): NodeViewJSON;
```

Return the structured, non-circular representation of this view.

#### Returns

[`NodeViewJSON`](../interfaces/NodeViewJSON.md)

#### Implementation of

[`NodeView`](../interfaces/NodeView.md).[`toJSON`](../interfaces/NodeView.md#tojson)

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

[`NodeView`](../interfaces/NodeView.md).[`toString`](../interfaces/NodeView.md#tostring)

#### Inherited from

```ts
InspectableClass.toString;
```

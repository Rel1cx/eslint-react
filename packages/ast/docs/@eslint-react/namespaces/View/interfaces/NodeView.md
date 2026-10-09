[@eslint-react/ast](../../../../README.md) / [View](../README.md) / NodeView

# Interface: NodeView\<N _extends_ `TSESTree.Node` = `TSESTree.Node`\>

The contract shared by all node views.

Declared separately from the `NodeViewBase` class so consumers can depend
on the contract alone, or provide their own implementations, without
extending the class. Inspection behavior (`toJSON`, `toString`, Node.js
custom inspection) is inherited from the `Inspectable` contract.

## Extends

- `Inspectable`

## Type Parameters

| Type Parameter                | Default type    |
| ----------------------------- | --------------- |
| `N` _extends_ `TSESTree.Node` | `TSESTree.Node` |

## Properties

| Property                                | Modifier   | Type                                                   | Description                                              |
| --------------------------------------- | ---------- | ------------------------------------------------------ | -------------------------------------------------------- |
| <a id="property-context"></a> `context` | `readonly` | [`NodeViewContext`](NodeViewContext.md) \| `undefined` | Optional rule context for getters that need source text. |
| <a id="property-node"></a> `node`       | `readonly` | `N`                                                    | The original node, as delivered by ESLint.               |

## Methods

### \[NodeInspectSymbol\]()

```ts
NodeInspectSymbol: unknown;
```

#### Returns

`unknown`

#### Inherited from

```ts
Inspectable.[NodeInspectSymbol]
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

---

### toJSON()

```ts
toJSON(): NodeViewJSON;
```

Return the structured, non-circular representation of this view.

#### Returns

[`NodeViewJSON`](NodeViewJSON.md)

#### Overrides

```ts
Inspectable.toJSON;
```

---

### toString()

```ts
toString(): string;
```

#### Returns

`string`

#### Inherited from

```ts
Inspectable.toString;
```

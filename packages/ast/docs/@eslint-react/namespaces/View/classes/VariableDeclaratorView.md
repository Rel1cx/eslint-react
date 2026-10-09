[@eslint-react/ast](../../../../README.md) / [View](../README.md) / VariableDeclaratorView

# Class: VariableDeclaratorView

View over a variable declarator.

## Extends

- [`NodeView`](NodeView.md)\<`TSESTree.VariableDeclarator`\>

## Constructors

### Constructor

```ts
new VariableDeclaratorView(node: VariableDeclarator, context?: NodeViewContext): VariableDeclaratorView;
```

#### Parameters

| Parameter  | Type                                                  |
| ---------- | ----------------------------------------------------- |
| `node`     | `VariableDeclarator`                                  |
| `context?` | [`NodeViewContext`](../interfaces/NodeViewContext.md) |

#### Returns

`VariableDeclaratorView`

#### Inherited from

[`NodeView`](NodeView.md).[`constructor`](NodeView.md#constructor)

## Properties

| Property                                | Modifier   | Type                                                                 | Description                                              | Inherited from                                                      |
| --------------------------------------- | ---------- | -------------------------------------------------------------------- | -------------------------------------------------------- | ------------------------------------------------------------------- |
| <a id="property-context"></a> `context` | `readonly` | [`NodeViewContext`](../interfaces/NodeViewContext.md) \| `undefined` | Optional rule context for getters that need source text. | [`NodeView`](NodeView.md).[`context`](NodeView.md#property-context) |
| <a id="property-node"></a> `node`       | `readonly` | `VariableDeclarator`                                                 | The original node, as delivered by ESLint.               | [`NodeView`](NodeView.md).[`node`](NodeView.md#property-node)       |

## Methods

### getInit()

```ts
getInit(): 
  | TSESTreeUnwrapped<Expression>
  | null;
```

Get the initializer with type and chain expressions unwrapped, or `null` when absent.

#### Returns

\| [`TSESTreeUnwrapped`](../../../../type-aliases/TSESTreeUnwrapped.md)\<`Expression`\>
\| `null`

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

[`NodeView`](NodeView.md).[`getParent`](NodeView.md#getparent)

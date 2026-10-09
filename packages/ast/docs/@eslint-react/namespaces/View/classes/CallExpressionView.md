[@eslint-react/ast](../../../../README.md) / [View](../README.md) / CallExpressionView

# Class: CallExpressionView

View over a call expression.

## Extends

- [`NodeView`](NodeView.md)\<`TSESTree.CallExpression`\>

## Constructors

### Constructor

```ts
new CallExpressionView(node: CallExpression, context?: NodeViewContext): CallExpressionView;
```

#### Parameters

| Parameter  | Type                                                  |
| ---------- | ----------------------------------------------------- |
| `node`     | `CallExpression`                                      |
| `context?` | [`NodeViewContext`](../interfaces/NodeViewContext.md) |

#### Returns

`CallExpressionView`

#### Inherited from

[`NodeView`](NodeView.md).[`constructor`](NodeView.md#constructor)

## Properties

| Property                                | Modifier   | Type                                                                 | Description                                              | Inherited from                                                      |
| --------------------------------------- | ---------- | -------------------------------------------------------------------- | -------------------------------------------------------- | ------------------------------------------------------------------- |
| <a id="property-context"></a> `context` | `readonly` | [`NodeViewContext`](../interfaces/NodeViewContext.md) \| `undefined` | Optional rule context for getters that need source text. | [`NodeView`](NodeView.md).[`context`](NodeView.md#property-context) |
| <a id="property-node"></a> `node`       | `readonly` | `CallExpression`                                                     | The original node, as delivered by ESLint.               | [`NodeView`](NodeView.md).[`node`](NodeView.md#property-node)       |

## Methods

### getArguments()

```ts
getArguments(): TSESTreeUnwrapped<CallExpressionArgument>[];
```

Get the arguments with type and chain expressions unwrapped.

#### Returns

[`TSESTreeUnwrapped`](../../../../type-aliases/TSESTreeUnwrapped.md)\<`CallExpressionArgument`\>[]

---

### getCallee()

```ts
getCallee(): TSESTreeUnwrapped<Expression>;
```

Get the callee with type and chain expressions unwrapped.

#### Returns

[`TSESTreeUnwrapped`](../../../../type-aliases/TSESTreeUnwrapped.md)\<`Expression`\>

---

### getCalleeName()

```ts
getCalleeName(): string | null;
```

Get the statically determinable callee name (ex: `"useState"`), or `null`.

#### Returns

`string` \| `null`

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

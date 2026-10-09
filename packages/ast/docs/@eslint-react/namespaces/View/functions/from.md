[@eslint-react/ast](../../../../README.md) / [View](../README.md) / from

# Function: from()

## Call Signature

```ts
function from(node: null | undefined): AbsentView;
```

Create the most specific view for a node.
Node types without a dedicated view get an instance of the base `Class`;
`null` and `undefined` get an `AbsentView`.

The return type is a discriminated union over `type`: when the node's type
is a union (including `TSESTree.Node` itself), each constituent maps to its
own view, so a `view.type` check narrows both the view and its `.node`.

### Parameters

| Parameter | Type                  | Description                                             |
| --------- | --------------------- | ------------------------------------------------------- |
| `node`    | `null` \| `undefined` | The node to wrap. The tree is never modified or copied. |

### Returns

[`AbsentView`](../classes/AbsentView.md)

A view whose getters return views over the node's children.

## Call Signature

```ts
function from<N extends Node>(node: N): ViewOf<N>;
```

Create the most specific view for a node.
Node types without a dedicated view get an instance of the base `Class`;
`null` and `undefined` get an `AbsentView`.

The return type is a discriminated union over `type`: when the node's type
is a union (including `TSESTree.Node` itself), each constituent maps to its
own view, so a `view.type` check narrows both the view and its `.node`.

### Type Parameters

| Type Parameter       |
| -------------------- |
| `N` _extends_ `Node` |

### Parameters

| Parameter | Type | Description                                             |
| --------- | ---- | ------------------------------------------------------- |
| `node`    | `N`  | The node to wrap. The tree is never modified or copied. |

### Returns

[`ViewOf`](../type-aliases/ViewOf.md)\<`N`\>

A view whose getters return views over the node's children.

## Call Signature

```ts
function from<N extends Node>(node: N | null | undefined):
  | AbsentView
  | ViewOf<N>;
```

Create the most specific view for a node.
Node types without a dedicated view get an instance of the base `Class`;
`null` and `undefined` get an `AbsentView`.

The return type is a discriminated union over `type`: when the node's type
is a union (including `TSESTree.Node` itself), each constituent maps to its
own view, so a `view.type` check narrows both the view and its `.node`.

### Type Parameters

| Type Parameter       |
| -------------------- |
| `N` _extends_ `Node` |

### Parameters

| Parameter | Type                         | Description                                             |
| --------- | ---------------------------- | ------------------------------------------------------- |
| `node`    | `N` \| `null` \| `undefined` | The node to wrap. The tree is never modified or copied. |

### Returns

\| [`AbsentView`](../classes/AbsentView.md)
\| [`ViewOf`](../type-aliases/ViewOf.md)\<`N`\>

A view whose getters return views over the node's children.

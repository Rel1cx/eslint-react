[@eslint-react/jsx](../README.md) / isElement

# Function: isElement()

## Call Signature

```ts
function isElement(node: Node | null | undefined): node is TSESTreeJSXElementLike;
```

Check if the node is a `JSXElement` or `JSXFragment`.

### Parameters

| Parameter | Type                            | Description        |
| --------- | ------------------------------- | ------------------ |
| `node`    | `Node` \| `null` \| `undefined` | The node to check. |

### Returns

`node is TSESTreeJSXElementLike`

`true` if the node is a JSX element or fragment.

## Call Signature

```ts
function isElement(node: Node | null | undefined, test: ElementTest): boolean;
```

Check if the node is a `JSXElement` or `JSXFragment` matching the given test.

Modelled after [`hast-util-is-element`](https://github.com/syntax-tree/hast-util-is-element):
the `test` parameter controls what counts as a match.

### Parameters

| Parameter | Type                                            | Description                                  |
| --------- | ----------------------------------------------- | -------------------------------------------- |
| `node`    | `Node` \| `null` \| `undefined`                 | The node to check.                           |
| `test`    | [`ElementTest`](../type-aliases/ElementTest.md) | Test to match the full element type against. |

### Returns

`boolean`

`true` if the node is a matching JSX element or fragment.

### Remarks

This is a match predicate, not a type guard: a `false` result does not mean
the node is not a JSX element or fragment, only that it does not match the test.

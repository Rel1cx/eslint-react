[@eslint-react/jsx](../README.md) / isElement

# Function: isElement()

```ts
function isElement(node: Node | null | undefined, test?: ElementTest): node is TSESTreeJSXElementLike;
```

Check if the node is a `JSXElement` (or `JSXFragment`), optionally matching a given test.

Modelled after [`hast-util-is-element`](https://github.com/syntax-tree/hast-util-is-element):
the `test` parameter controls what counts as a match. When called without a test,
the function acts as a simple type guard for `JSXElement | JSXFragment`.

## Parameters

| Parameter | Type                                            | Description                                      |
| --------- | ----------------------------------------------- | ------------------------------------------------ |
| `node`    | `Node` \| `null` \| `undefined`                 | The node to check.                               |
| `test?`   | [`ElementTest`](../type-aliases/ElementTest.md) | Optional test to match the element type against. |

## Returns

`node is TSESTreeJSXElementLike`

`true` if the node is a matching JSX element.

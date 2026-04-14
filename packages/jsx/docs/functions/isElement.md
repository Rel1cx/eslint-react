[@eslint-react/jsx](../README.md) / isElement

# Function: isElement()

```ts
function isElement(node: Node | null | undefined, test?: ElementTest): node is TSESTreeJSXElementLike;
```

Check whether a node is a `JSXElement` (or `JSXFragment`) and optionally
matches a given test.

Modelled after
[`hast-util-is-element`](https://github.com/syntax-tree/hast-util-is-element):
the `test` parameter controls what counts as a match.

When called **without** a test, the function acts as a simple type-guard
for `JSXElement | JSXFragment`.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `node` | `Node` \| `null` \| `undefined` | The AST node to test. |
| `test?` | [`ElementTest`](../type-aliases/ElementTest.md) | Optional test to match the element type against. |

## Returns

`node is TSESTreeJSXElementLike`

`true` when the node is a matching JSX element.

## Example

```ts
import { isElement } from "@eslint-react/jsx";

// Type-guard only — any JSX element or fragment
if (isElement(node)) { … }

// Match a single tag name
if (isElement(node, "iframe")) { … }

// Match one of several tag names
if (isElement(node, ["button", "input", "select"])) { … }

// Custom predicate
if (isElement(node, (type) => type.endsWith(".Provider"))) { … }
```

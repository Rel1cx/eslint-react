[@eslint-react/jsx](../README.md) / getChildren

# Function: getChildren()

```ts
function getChildren(element: TSESTreeJSXElementLike): JSXChild[];
```

Get the **meaningful** children of a JSX element or fragment.

Filters out nodes that React will not render into the DOM:

1. "Padding spaces" — `JSXText` nodes that consist entirely of whitespace
   and contain at least one newline. These are code-formatting artefacts
   (indentation between tags). While React's client renderer preserves them
   as text nodes, browser HTML parsers may discard them during hydration,
   causing hydration mismatches.

2. Empty string expressions — `JSXExpressionContainer` nodes whose expression
   is a string literal with value `""`. React's reconciler and SSR renderer
   explicitly skip empty strings, producing no DOM node
   (see ReactChildFiber.js and ReactFizzConfigDOM.js).

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `element` | `TSESTreeJSXElementLike` | A `JSXElement` or `JSXFragment` node. |

## Returns

`JSXChild`[]

An array of children nodes that contribute to rendered output.

## Example

```ts
import { getChildren } from "@eslint-react/jsx";

// <div>
//   <span />
// </div>
//
// Raw children: [JSXText("\n  "), JSXElement(<span />), JSXText("\n")]
// getChildren:  [JSXElement(<span />)]

const meaningful = getChildren(node);
```

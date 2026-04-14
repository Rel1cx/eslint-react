[@eslint-react/jsx](../README.md) / getChildren

# Function: getChildren()

```ts
function getChildren(element: TSESTreeJSXElementLike): JSXChild[];
```

Get the **meaningful** children of a JSX element or fragment.

Filters out "padding spaces" — `JSXText` nodes that consist entirely of
whitespace and contain at least one newline.  These nodes are artefacts of
source formatting that React trims away during rendering and are therefore
not considered meaningful content.

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

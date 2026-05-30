[@eslint-react/jsx](../README.md) / hasChildren

# Function: hasChildren()

```ts
function hasChildren(element: TSESTreeJSXElementLike): boolean;
```

Check whether a JSX element (or fragment) has **meaningful** children —
that is, at least one child that is not purely whitespace text or an empty
string expression.

A `JSXText` child whose `raw` content is empty after trimming is considered
non-meaningful because it is typically a code-formatting artefact
(indentation between tags). While React's client renderer preserves these
nodes as text nodes, they rarely represent intentionally rendered content.

An empty string expression (`children={""}`) is also considered
non-meaningful because React's reconciler and SSR renderer explicitly skip
empty strings, producing no DOM node.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `element` | `TSESTreeJSXElementLike` | A `JSXElement` or `JSXFragment` node. |

## Returns

`boolean`

`true` when the element has at least one meaningful child.

## Example

```ts
import { hasChildren } from "@eslint-react/jsx";

// <div>hello</div>           -> true
// <div>  {expr}  </div>      -> true
// <div>   </div>             -> false  (whitespace-only)
// <div>                      -> false  (whitespace-only, with newlines)
// </div>
// <div></div>                -> false  (no children at all)
// <div>{""}</div>            -> false  (empty string expression)

if (hasChildren(node)) {
  // element renders visible content
}
```

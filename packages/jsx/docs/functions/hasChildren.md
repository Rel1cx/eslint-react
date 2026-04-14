[@eslint-react/jsx](../README.md) / hasChildren

# Function: hasChildren()

```ts
function hasChildren(element: TSESTreeJSXElementLike): boolean;
```

Check whether a JSX element (or fragment) has **meaningful** children —
that is, at least one child that is not purely whitespace text.

A `JSXText` child whose `raw` content is empty after trimming is
considered non-meaningful regardless of whether it contains a line break.
This matches React's rendering behaviour where whitespace-only text nodes
do not produce visible output.

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

if (hasChildren(node)) {
  // element renders visible content
}
```

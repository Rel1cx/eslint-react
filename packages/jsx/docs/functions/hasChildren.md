[@eslint-react/jsx](../README.md) / hasChildren

# Function: hasChildren()

```ts
function hasChildren(element: TSESTreeJSXElementLike): boolean;
```

Check whether a JSX element (or fragment) has meaningful children, that is,
at least one child that is not purely whitespace text or an empty string expression

A `JSXText` child whose `raw` content is empty after trimming is considered
non-meaningful because it is typically a code-formatting artifact
(indentation between tags). While React's client renderer preserves these
nodes as text nodes, they rarely represent intentionally rendered content.

An empty string expression (`children={""}`) is also considered
non-meaningful because React's reconciler and SSR renderer explicitly skip
empty strings, producing no DOM node.

Unlike [getChildren](getChildren.md) (which only filters whitespace that contains a
newline) this check treats any whitespace-only text as non-meaningful
(see [isWhitespaceText](isWhitespaceText.md)). As a result `hasChildren(node)` is not
always equal to `getChildren(node).length > 0`: they differ for
whitespace-only children that have no newline, such as `<div> </div>` or
`<div>\t\t</div>`. Choose the API that matches your rule's intent.

## Parameters

| Parameter | Type                     | Description                          |
| --------- | ------------------------ | ------------------------------------ |
| `element` | `TSESTreeJSXElementLike` | A `JSXElement` or `JSXFragment` node |

## Returns

`boolean`

`true` when the element has at least one meaningful child

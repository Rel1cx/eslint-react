[@eslint-react/jsx](../README.md) / isWhitespace

# Function: isWhitespace()

```ts
function isWhitespace(node: JSXChild): boolean;
```

Check whether a JSX child node is **whitespace padding** that React would
trim away during rendering.

A child is considered whitespace padding when it is a `JSXText` node whose
content is empty after applying React's whitespace normalization
(see [cleanJSXTextValue](cleanJSXTextValue.md), modelled after Babel's
`cleanJSXElementLiteralChild`). This is the whitespace that appears between
JSX tags purely for formatting:

```jsx
<div>
  <span />     ← the text between </span> and the next tag is padding
  <span />
</div>
```

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `node` | `JSXChild` | A JSX child node. |

## Returns

`boolean`

`true` when the node is purely formatting whitespace.

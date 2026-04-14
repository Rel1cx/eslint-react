[@eslint-react/jsx](../README.md) / isWhitespace

# Function: isWhitespace()

```ts
function isWhitespace(node: JSXChild): boolean;
```

Check whether a JSX child node is **whitespace padding** that React would
trim away during rendering.

A child is considered whitespace padding when it is a `JSXText` node whose
raw content is empty after trimming **and** contains at least one newline.
This is the whitespace that appears between JSX tags purely for formatting:

```jsx
<div>
  <span />     ← the text between </span> and the next tag is padding
  <span />
</div>
```

Use [isWhitespaceText](isWhitespaceText.md) for a looser check that also matches
whitespace‑only text that does **not** contain a newline.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `node` | `JSXChild` | A JSX child node. |

## Returns

`boolean`

`true` when the node is purely formatting whitespace.

## Example

```ts
import { isWhitespace } from "@eslint-react/jsx";

const meaningful = element.children.filter(
  (child) => !isWhitespace(child),
);
```

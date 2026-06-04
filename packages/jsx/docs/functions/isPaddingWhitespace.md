[@eslint-react/jsx](../README.md) / isPaddingWhitespace

# Function: isPaddingWhitespace()

```ts
function isPaddingWhitespace(node: JSXText): boolean;
```

Check whether a `JSXText` node is padding whitespace that React trims away.

Uses [cleanJSXTextValue](cleanJSXTextValue.md) to precisely determine whether the text
contributes any visible characters after React's whitespace normalization.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `node` | `JSXText` | The JSXText node to check. |

## Returns

`boolean`

`true` when the text is purely formatting whitespace.

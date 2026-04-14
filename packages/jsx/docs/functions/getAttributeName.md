[@eslint-react/jsx](../README.md) / getAttributeName

# Function: getAttributeName()

```ts
function getAttributeName(node: JSXAttribute): string;
```

Get the stringified name of a `JSXAttribute` node.

Handles both simple identifiers and namespaced names:

- `className`   -> `"className"`
- `aria-label`  -> `"aria-label"`
- `xml:space`   -> `"xml:space"`

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `node` | `JSXAttribute` | A `JSXAttribute` AST node. |

## Returns

`string`

The attribute name as a plain string.

## Example

```ts
import { getAttributeName } from "@eslint-react/jsx";

// Inside a rule visitor:
JSXAttribute(node) {
  const name = getAttributeName(node); // "className"
}
```

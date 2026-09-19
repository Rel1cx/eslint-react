[@eslint-react/jsx](../README.md) / getAttributeName

# Function: getAttributeName()

```ts
function getAttributeName(node: JSXAttribute): string;
```

Get the stringified name of a `JSXAttribute` node.

- `className` -> `"className"`
- `aria-label` -> `"aria-label"`
- `xml:space` -> `"xml:space"`.

## Parameters

| Parameter | Type           | Description                                   |
| --------- | -------------- | --------------------------------------------- |
| `node`    | `JSXAttribute` | The `JSXAttribute` node to get the name from. |

## Returns

`string`

The attribute name as a plain string.

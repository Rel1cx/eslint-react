[@eslint-react/jsx](../README.md) / getElementFullType

# Function: getElementFullType()

```ts
function getElementFullType(node: TSESTreeJSXElementLike): string;
```

Get the string representation of a JSX element's type.

- `<div>`              -> `"div"`
- `<Foo.Bar>`          -> `"Foo.Bar"`
- `<React.Fragment>`   -> `"React.Fragment"`
- `<></>`              -> `""`

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `node` | `TSESTreeJSXElementLike` | A `JSXElement` or `JSXFragment` node. |

## Returns

`string`

The fully-qualified element type string.

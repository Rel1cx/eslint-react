[@eslint-react/jsx](../README.md) / getElementSelfType

# Function: getElementSelfType()

```ts
function getElementSelfType(node: TSESTreeJSXElementLike): string;
```

Get the **self name** (last dot-separated segment) of a JSX element type.

- `<Foo.Bar.Baz>`  -> `"Baz"`
- `<div>`           -> `"div"`
- `<></>`           -> `""`

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `node` | `TSESTreeJSXElementLike` | A `JSXElement` or `JSXFragment` node. |

## Returns

`string`

The last segment of the element type, or `""` for fragments.

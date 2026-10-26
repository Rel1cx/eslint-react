[@eslint-react/jsx](../README.md) / isHostElement

# Function: isHostElement()

```ts
function isHostElement(node: Node | null | undefined): node is JSXElement;
```

Check if the node is a host (intrinsic / DOM) element, that is, a `JSXElement`
whose tag name starts with an ASCII lowercase letter (ex: `<div>` vs
`<MyComponent>`). For namespaced names, the local part is checked (ex: `rect`
in `<svg:rect>`). Member-expression names (ex: `<foo.Bar>`) are not host elements.

## Parameters

| Parameter | Type                            | Description        |
| --------- | ------------------------------- | ------------------ |
| `node`    | `Node` \| `null` \| `undefined` | The node to check. |

## Returns

`node is JSXElement`

`true` if the node is a `JSXElement` with a plain or namespaced tag
name starting with an ASCII lowercase letter.

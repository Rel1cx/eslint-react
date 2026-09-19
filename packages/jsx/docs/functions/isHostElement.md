[@eslint-react/jsx](../README.md) / isHostElement

# Function: isHostElement()

```ts
function isHostElement(node: Node): node is JSXElement;
```

Check if the node is a host (intrinsic / DOM) element, that is, a `JSXElement`
whose tag name starts with a lowercase letter (ex: `<div>` vs `<MyComponent>`).

## Parameters

| Parameter | Type   | Description        |
| --------- | ------ | ------------------ |
| `node`    | `Node` | The node to check. |

## Returns

`node is JSXElement`

`true` if the node is a `JSXElement` with a lowercase tag name.

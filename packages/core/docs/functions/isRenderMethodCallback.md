[@eslint-react/core](../README.md) / isRenderMethodCallback

# Function: isRenderMethodCallback()

```ts
function isRenderMethodCallback(node: TSESTreeFunction): boolean;
```

Check if the function is the implementation value of a class component's render method or property
(e.g. the function of `render() {}` or the arrow function of `render = () => {}` in a class component).

## Parameters

| Parameter | Type               | Description                 |
| --------- | ------------------ | --------------------------- |
| `node`    | `TSESTreeFunction` | The function node to check. |

## Returns

`boolean`

`true` if the function implements a class component's render method.

[@eslint-react/core](../README.md) / isRenderMethodLike

# ~~Function: isRenderMethodLike()~~

```ts
function isRenderMethodLike(node: Node): node is TSESTreeMethodOrPropertyDefinition;
```

Check if the node is a render-like method of a class component.

## Parameters

| Parameter | Type   | Description            |
| --------- | ------ | ---------------------- |
| `node`    | `Node` | The AST node to check. |

## Returns

`node is TSESTreeMethodOrPropertyDefinition`

`true` if the node is a render-like method.

## Deprecated

Class components are legacy. This function exists only to support legacy rules.

[@eslint-react/core](../README.md) / isRenderMethodLike

# ~~Function: isRenderMethodLike()~~

```ts
function isRenderMethodLike(node: Node): node is TSESTreeMethodOrPropertyDefinition;
```

Check if the node is a render-like method or property of a class.
Only requires the grandparent node to be a class; the class does not need to be a class component.

## Parameters

| Parameter | Type   | Description            |
| --------- | ------ | ---------------------- |
| `node`    | `Node` | The AST node to check. |

## Returns

`node is TSESTreeMethodOrPropertyDefinition`

`true` if the node is a render-like method.

## Deprecated

Class components are legacy. This function exists only to support legacy rules.

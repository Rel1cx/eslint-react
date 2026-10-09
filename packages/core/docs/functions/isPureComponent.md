[@eslint-react/core](../README.md) / isPureComponent

# ~~Function: isPureComponent()~~

```ts
function isPureComponent(node: Node): boolean;
```

Check if the node is a pure component (extends `PureComponent`).

## Parameters

| Parameter | Type   | Description            |
| --------- | ------ | ---------------------- |
| `node`    | `Node` | The AST node to check. |

## Returns

`boolean`

`true` if the node is a pure component.

## Deprecated

Class components are legacy. This function exists only to support legacy rules.

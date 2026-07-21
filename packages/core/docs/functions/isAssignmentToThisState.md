[@eslint-react/core](../README.md) / isAssignmentToThisState

# ~~Function: isAssignmentToThisState()~~

```ts
function isAssignmentToThisState(node: AssignmentExpression): boolean;
```

Check if the assignment expression assigns to `this.state`.

## Parameters

| Parameter | Type                   | Description                              |
| --------- | ---------------------- | ---------------------------------------- |
| `node`    | `AssignmentExpression` | The assignment expression node to check. |

## Returns

`boolean`

`true` if the node assigns to `this.state`.

## Deprecated

Class components are legacy. This function exists only to support legacy rules.

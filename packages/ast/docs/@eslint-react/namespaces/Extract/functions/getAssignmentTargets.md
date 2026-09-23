[@eslint-react/ast](../../../../README.md) / [Extract](../README.md) / getAssignmentTargets

# Function: getAssignmentTargets()

```ts
function getAssignmentTargets(node: Node): (Identifier | MemberExpression)[];
```

Collect every write target of an assignment or loop target, expanding
destructuring patterns such as `[local, globalValue] = source` or
`({ a: obj.x } = source)`. Defaults (`{ a = source }`) are not targets;
their left side is.

## Parameters

| Parameter | Type   | Description                                                   |
| --------- | ------ | ------------------------------------------------------------- |
| `node`    | `Node` | The assignment left side or for-in/of loop target to inspect. |

## Returns

(`Identifier` \| `MemberExpression`)[]

The identifier and member expression targets being written.

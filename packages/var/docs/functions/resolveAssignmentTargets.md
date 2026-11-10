[@eslint-react/var](../README.md) / resolveAssignmentTargets

# Function: resolveAssignmentTargets()

```ts
function resolveAssignmentTargets(node: Node): (Identifier | MemberExpression)[];
```

Resolve every write target of an assignment or loop target, expanding
destructuring patterns such as `[local, globalValue] = source` or
`({ a: obj.x } = source)`. Defaults (`{ a = source }`) are not targets;
their left side is.

## Parameters

| Parameter | Type   | Description                                                                                                                             |
| --------- | ------ | --------------------------------------------------------------------------------------------------------------------------------------- |
| `node`    | `Node` | The assignment left side or for-in/of loop target to inspect. Declaration-form loop targets are not expanded and return an empty array. |

## Returns

(`Identifier` \| `MemberExpression`)[]

The identifier and member expression targets being written.

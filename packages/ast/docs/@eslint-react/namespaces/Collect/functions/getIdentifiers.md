[@eslint-react/ast](../../../../README.md) / [Collect](../README.md) / getIdentifiers

# Function: getIdentifiers()

```ts
function getIdentifiers(node: Node): readonly Identifier[];
```

Get all identifiers occurring within a node, in source order.

This is a syntactic walk, not a scope-aware reference search: identifiers in patterns are
collected too when the pattern is traversed (ex: `a` in `[a] = value`). The root is collected
when it is an identifier. The property name of a non-computed member access is not a reference,
so `obj.prop` collects only `obj`; non-computed object property keys are skipped as well.
Function and class nodes are not traversed, and statement roots contribute only their listed
expression-bearing keys.

## Parameters

| Parameter | Type   | Description                           |
| --------- | ------ | ------------------------------------- |
| `node`    | `Node` | The node to collect identifiers from. |

## Returns

readonly `Identifier`[]

All identifiers occurring in the node.

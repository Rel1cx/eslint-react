[@eslint-react/ast](../../../../README.md) / [Check](../README.md) / isArrayPatternElementDefault

# Function: isArrayPatternElementDefault()

```ts
function isArrayPatternElementDefault(node: Node): node is AssignmentPattern;
```

Check if a node is the default value of an array pattern element, i.e. an
`AssignmentPattern` directly nested in an `ArrayPattern` (ex: `const [a = 1] = arr`).

## Parameters

| Parameter | Type   | Description        |
| --------- | ------ | ------------------ |
| `node`    | `Node` | The node to check. |

## Returns

`node is AssignmentPattern`

`true` if the node is an array pattern element default.

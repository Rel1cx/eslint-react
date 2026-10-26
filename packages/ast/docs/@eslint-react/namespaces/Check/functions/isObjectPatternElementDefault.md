[@eslint-react/ast](../../../../README.md) / [Check](../README.md) / isObjectPatternElementDefault

# Function: isObjectPatternElementDefault()

```ts
function isObjectPatternElementDefault(node: Node): node is AssignmentPattern;
```

Check if a node is the default value of an object pattern property, i.e. an
`AssignmentPattern` used as the `value` of a `Property` inside an `ObjectPattern`
(ex: `const { a = 1 } = obj`).

## Parameters

| Parameter | Type   | Description        |
| --------- | ------ | ------------------ |
| `node`    | `Node` | The node to check. |

## Returns

`node is AssignmentPattern`

`true` if the node is an object pattern element default.

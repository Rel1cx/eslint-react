[@eslint-react/core](../README.md) / isGetDefaultProps

# ~~Variable: isGetDefaultProps~~

```ts
const isGetDefaultProps: (node: Node) => node is TSESTreeMethodOrPropertyDefinition;
```

## Parameters

| Parameter | Type   |
| --------- | ------ |
| `node`    | `Node` |

## Returns

`node is TSESTreeMethodOrPropertyDefinition`

## Deprecated

Class components are legacy. Additionally, this predicate does not correspond to any
real React semantics: `getDefaultProps` is a `createReactClass` spec method (an instance-side
spec object member, not a static class member), while React class components use the static
`defaultProps` property — a `static getDefaultProps` class method is meaningless to React.
Retained only to preserve the published API; do not use.

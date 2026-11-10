[@eslint-react/ast](../../../../README.md) / [Check](../README.md) / isPropertyOrMethod

# Variable: isPropertyOrMethod

```ts
const isPropertyOrMethod: (
  node: Node | null | undefined,
) => node is MethodDefinitionComputedName | MethodDefinitionNonComputedName | PropertyDefinitionComputedName | PropertyDefinitionNonComputedName;
```

Check if a node is a `MethodDefinition` or `PropertyDefinition`.

Abstract and accessor member definitions (`TSAbstractMethodDefinition`, `TSAbstractPropertyDefinition`,
`AccessorProperty`, `TSAbstractAccessorProperty`) are not included.

## Parameters

| Parameter | Type                            |
| --------- | ------------------------------- |
| `node`    | `Node` \| `null` \| `undefined` |

## Returns

node is MethodDefinitionComputedName \| MethodDefinitionNonComputedName \| PropertyDefinitionComputedName \| PropertyDefinitionNonComputedName

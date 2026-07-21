[@eslint-react/ast](../../../../README.md) / [Check](../README.md) / isPropertyOrMethod

# Variable: isPropertyOrMethod

```ts
const isPropertyOrMethod: (
  node: Node | null | undefined,
) => node is MethodDefinitionComputedName | MethodDefinitionNonComputedName | PropertyDefinitionComputedName | PropertyDefinitionNonComputedName;
```

Check if a node is a property or method definition.

## Parameters

| Parameter | Type                            |
| --------- | ------------------------------- |
| `node`    | `Node` \| `null` \| `undefined` |

## Returns

node is MethodDefinitionComputedName \| MethodDefinitionNonComputedName \| PropertyDefinitionComputedName \| PropertyDefinitionNonComputedName

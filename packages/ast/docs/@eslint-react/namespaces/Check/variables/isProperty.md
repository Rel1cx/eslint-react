[@eslint-react/ast](../../../../README.md) / [Check](../README.md) / isProperty

# Variable: isProperty

```ts
const isProperty: (
  node: Node | null | undefined,
) => node is
  | PropertyDefinitionComputedName
  | PropertyDefinitionNonComputedName
  | TSIndexSignature
  | TSParameterProperty
  | TSPropertySignatureComputedName
  | TSPropertySignatureNonComputedName;
```

Check if a node is a property-like node (property definition, index signature, parameter property, or property signature).

## Parameters

| Parameter | Type                            |
| --------- | ------------------------------- |
| `node`    | `Node` \| `null` \| `undefined` |

## Returns

node is PropertyDefinitionComputedName \| PropertyDefinitionNonComputedName \| TSIndexSignature \| TSParameterProperty \| TSPropertySignatureComputedName \| TSPropertySignatureNonComputedName

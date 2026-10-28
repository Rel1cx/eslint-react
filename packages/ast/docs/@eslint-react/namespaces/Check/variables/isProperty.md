[@eslint-react/ast](../../../../README.md) / [Check](../README.md) / isProperty

# Variable: isProperty

```ts
const isProperty: (node: Node | null | undefined) => node is
  | PropertyDefinitionComputedName
  | PropertyDefinitionNonComputedName
  | TSIndexSignature
  | TSParameterProperty
  | TSPropertySignatureComputedName
  | TSPropertySignatureNonComputedName;
```

Check if a node is a `TSPropertySignature`, `PropertyDefinition`, `TSIndexSignature`, or `TSParameterProperty`.

Abstract and accessor property definitions (`TSAbstractPropertyDefinition`, `AccessorProperty`,
`TSAbstractAccessorProperty`) are not included.

## Parameters

| Parameter | Type                            |
| --------- | ------------------------------- |
| `node`    | `Node` \| `null` \| `undefined` |

## Returns

node is PropertyDefinitionComputedName \| PropertyDefinitionNonComputedName \| TSIndexSignature \| TSParameterProperty \| TSPropertySignatureComputedName \| TSPropertySignatureNonComputedName

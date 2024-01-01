[@eslint-react/core](../README.md) / ERClassComponent

# Interface: ERClassComponent

## Hierarchy

- [`ERAnalyzerNode`](ERAnalyzerNode.md)

  ↳ **`ERClassComponent`**

## Table of contents

### Properties

- [\_](ERClassComponent.md#_)
- [displayName](ERClassComponent.md#displayname)
- [flag](ERClassComponent.md#flag)
- [hint](ERClassComponent.md#hint)
- [id](ERClassComponent.md#id)
- [kind](ERClassComponent.md#kind)
- [methods](ERClassComponent.md#methods)
- [name](ERClassComponent.md#name)
- [node](ERClassComponent.md#node)

## Properties

### \_

• **\_**: `string`

#### Inherited from

[ERAnalyzerNode](ERAnalyzerNode.md).[_](ERAnalyzerNode.md#_)

___

### displayName

• **displayName**: `Option`\<`Expression`\>

___

### flag

• **flag**: `bigint`

#### Overrides

[ERAnalyzerNode](ERAnalyzerNode.md).[flag](ERAnalyzerNode.md#flag)

___

### hint

• **hint**: `bigint`

#### Overrides

[ERAnalyzerNode](ERAnalyzerNode.md).[hint](ERAnalyzerNode.md#hint)

___

### id

• **id**: `Option`\<`Identifier`\>

#### Overrides

[ERAnalyzerNode](ERAnalyzerNode.md).[id](ERAnalyzerNode.md#id)

___

### kind

• **kind**: ``"class"``

#### Overrides

[ERAnalyzerNode](ERAnalyzerNode.md).[kind](ERAnalyzerNode.md#kind)

___

### methods

• **methods**: (`MethodDefinitionComputedName` \| `MethodDefinitionNonComputedName` \| `PropertyDefinitionComputedName` \| `PropertyDefinitionNonComputedName`)[]

___

### name

• **name**: `Option`\<`string`\>

#### Inherited from

[ERAnalyzerNode](ERAnalyzerNode.md).[name](ERAnalyzerNode.md#name)

___

### node

• **node**: `TSESTreeClass`

#### Overrides

[ERAnalyzerNode](ERAnalyzerNode.md).[node](ERAnalyzerNode.md#node)

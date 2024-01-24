[@eslint-react/core](../README.md) / ERClassComponent

# Interface: ERClassComponent

## Hierarchy

- [`ERSemanticNode`](ERSemanticNode.md)

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

[ERSemanticNode](ERSemanticNode.md).[_](ERSemanticNode.md#_)

___

### displayName

• **displayName**: `Option`\<`Expression`\>

___

### flag

• **flag**: `bigint`

#### Overrides

[ERSemanticNode](ERSemanticNode.md).[flag](ERSemanticNode.md#flag)

___

### hint

• **hint**: `bigint`

#### Overrides

[ERSemanticNode](ERSemanticNode.md).[hint](ERSemanticNode.md#hint)

___

### id

• **id**: `Option`\<`Identifier`\>

#### Overrides

[ERSemanticNode](ERSemanticNode.md).[id](ERSemanticNode.md#id)

___

### kind

• **kind**: ``"class"``

#### Overrides

[ERSemanticNode](ERSemanticNode.md).[kind](ERSemanticNode.md#kind)

___

### methods

• **methods**: (`MethodDefinition` \| `PropertyDefinition`)[]

___

### name

• **name**: `Option`\<`string`\>

#### Inherited from

[ERSemanticNode](ERSemanticNode.md).[name](ERSemanticNode.md#name)

___

### node

• **node**: `TSESTreeClass`

#### Overrides

[ERSemanticNode](ERSemanticNode.md).[node](ERSemanticNode.md#node)

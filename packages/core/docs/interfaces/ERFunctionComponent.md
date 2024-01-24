[@eslint-react/core](../README.md) / ERFunctionComponent

# Interface: ERFunctionComponent

## Hierarchy

- [`ERSemanticNode`](ERSemanticNode.md)

  ↳ **`ERFunctionComponent`**

## Table of contents

### Properties

- [\_](ERFunctionComponent.md#_)
- [displayName](ERFunctionComponent.md#displayname)
- [flag](ERFunctionComponent.md#flag)
- [hint](ERFunctionComponent.md#hint)
- [hookCalls](ERFunctionComponent.md#hookcalls)
- [id](ERFunctionComponent.md#id)
- [initPath](ERFunctionComponent.md#initpath)
- [kind](ERFunctionComponent.md#kind)
- [name](ERFunctionComponent.md#name)
- [node](ERFunctionComponent.md#node)

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

### hookCalls

• **hookCalls**: `CallExpression`[]

___

### id

• **id**: `Option`\<`Identifier` \| `Identifier`[]\>

#### Overrides

[ERSemanticNode](ERSemanticNode.md).[id](ERSemanticNode.md#id)

___

### initPath

• **initPath**: `Option`\<[`ERComponentInitPath`](../README.md#ercomponentinitpath)\>

___

### kind

• **kind**: ``"function"``

#### Overrides

[ERSemanticNode](ERSemanticNode.md).[kind](ERSemanticNode.md#kind)

___

### name

• **name**: `Option`\<`string`\>

#### Inherited from

[ERSemanticNode](ERSemanticNode.md).[name](ERSemanticNode.md#name)

___

### node

• **node**: `TSESTreeFunction`

#### Overrides

[ERSemanticNode](ERSemanticNode.md).[node](ERSemanticNode.md#node)

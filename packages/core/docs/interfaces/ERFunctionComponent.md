[@eslint-react/core](../README.md) / ERFunctionComponent

# Interface: ERFunctionComponent

## Hierarchy

- [`ERAnalyzerNode`](ERAnalyzerNode.md)

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

### hookCalls

• **hookCalls**: `CallExpression`[]

___

### id

• **id**: `Option`\<`Identifier` \| `Identifier`[]\>

#### Overrides

[ERAnalyzerNode](ERAnalyzerNode.md).[id](ERAnalyzerNode.md#id)

___

### initPath

• **initPath**: `Option`\<[`ERComponentInitPath`](../README.md#ercomponentinitpath)\>

___

### kind

• **kind**: ``"function"``

#### Overrides

[ERAnalyzerNode](ERAnalyzerNode.md).[kind](ERAnalyzerNode.md#kind)

___

### name

• **name**: `Option`\<`string`\>

#### Inherited from

[ERAnalyzerNode](ERAnalyzerNode.md).[name](ERAnalyzerNode.md#name)

___

### node

• **node**: `TSESTreeFunction`

#### Overrides

[ERAnalyzerNode](ERAnalyzerNode.md).[node](ERAnalyzerNode.md#node)

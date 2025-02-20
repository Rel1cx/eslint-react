[**@eslint-react/core**](../../README.md)

***

[@eslint-react/core](../../README.md) / [\<internal\>](../README.md) / ParserServicesWithTypeInformation

# Interface: ParserServicesWithTypeInformation

## Extends

- [`ParserServicesNodeMaps`](ParserServicesNodeMaps.md).[`ParserServicesBase`](ParserServicesBase.md)

## Properties

### emitDecoratorMetadata

> **emitDecoratorMetadata**: `undefined` \| `boolean`

#### Inherited from

[`ParserServicesBase`](ParserServicesBase.md).[`emitDecoratorMetadata`](ParserServicesBase.md#emitdecoratormetadata)

***

### esTreeNodeToTSNodeMap

> **esTreeNodeToTSNodeMap**: [`ParserWeakMapESTreeToTSNode`](ParserWeakMapESTreeToTSNode.md)

#### Inherited from

[`ParserServicesNodeMaps`](ParserServicesNodeMaps.md).[`esTreeNodeToTSNodeMap`](ParserServicesNodeMaps.md#estreenodetotsnodemap)

***

### experimentalDecorators

> **experimentalDecorators**: `undefined` \| `boolean`

#### Inherited from

[`ParserServicesBase`](ParserServicesBase.md).[`experimentalDecorators`](ParserServicesBase.md#experimentaldecorators)

***

### getSymbolAtLocation()

> **getSymbolAtLocation**: (`node`) => `undefined` \| [`Symbol`](Symbol.md)

#### Parameters

##### node

[`Node`](../type-aliases/Node.md)

#### Returns

`undefined` \| [`Symbol`](Symbol.md)

***

### getTypeAtLocation()

> **getTypeAtLocation**: (`node`) => [`Type`](Type.md)

#### Parameters

##### node

[`Node`](../type-aliases/Node.md)

#### Returns

[`Type`](Type.md)

***

### isolatedDeclarations

> **isolatedDeclarations**: `undefined` \| `boolean`

#### Inherited from

[`ParserServicesBase`](ParserServicesBase.md).[`isolatedDeclarations`](ParserServicesBase.md#isolateddeclarations)

***

### program

> **program**: [`Program`](Program.md)

***

### tsNodeToESTreeNodeMap

> **tsNodeToESTreeNodeMap**: [`ParserWeakMap`](ParserWeakMap.md)\<[`TSNode`](../type-aliases/TSNode.md) \| [`TSToken`](../type-aliases/TSToken.md), [`Node`](../type-aliases/Node.md)\>

#### Inherited from

[`ParserServicesNodeMaps`](ParserServicesNodeMaps.md).[`tsNodeToESTreeNodeMap`](ParserServicesNodeMaps.md#tsnodetoestreenodemap)

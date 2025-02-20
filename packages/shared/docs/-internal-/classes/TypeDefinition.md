[**@eslint-react/shared**](../../README.md)

***

[@eslint-react/shared](../../README.md) / [\<internal\>](../README.md) / TypeDefinition

# Class: TypeDefinition

## Extends

- [`DefinitionBase`](DefinitionBase.md)\<[`Type`](../README.md#type-1), [`TSInterfaceDeclaration`](../interfaces/TSInterfaceDeclaration.md) \| [`TSMappedType`](../interfaces/TSMappedType.md) \| [`TSTypeAliasDeclaration`](../interfaces/TSTypeAliasDeclaration.md) \| `TSESTree.TSTypeParameter`, `null`, [`Identifier`](../interfaces/Identifier.md)\>

## Constructors

### new TypeDefinition()

> **new TypeDefinition**(`name`, `node`): [`TypeDefinition`](TypeDefinition.md)

#### Parameters

##### name

[`Identifier`](../interfaces/Identifier.md)

##### node

[`TSInterfaceDeclaration`](../interfaces/TSInterfaceDeclaration.md) | [`TSMappedType`](../interfaces/TSMappedType.md) | [`TSTypeAliasDeclaration`](../interfaces/TSTypeAliasDeclaration.md) | `TSTypeParameter`

#### Returns

[`TypeDefinition`](TypeDefinition.md)

#### Overrides

[`DefinitionBase`](DefinitionBase.md).[`constructor`](DefinitionBase.md#constructors)

## Properties

### $id

> `readonly` **$id**: `number`

A unique ID for this instance - primarily used to help debugging and testing

#### Inherited from

[`DefinitionBase`](DefinitionBase.md).[`$id`](DefinitionBase.md#$id)

***

### isTypeDefinition

> `readonly` **isTypeDefinition**: `true` = `true`

`true` if the variable is valid in a type context, false otherwise

#### Overrides

[`DefinitionBase`](DefinitionBase.md).[`isTypeDefinition`](DefinitionBase.md#istypedefinition)

***

### isVariableDefinition

> `readonly` **isVariableDefinition**: `false` = `false`

`true` if the variable is valid in a value context, false otherwise

#### Overrides

[`DefinitionBase`](DefinitionBase.md).[`isVariableDefinition`](DefinitionBase.md#isvariabledefinition)

***

### name

> `readonly` **name**: [`Identifier`](../interfaces/Identifier.md)

The `Identifier` node of this definition

#### Inherited from

[`DefinitionBase`](DefinitionBase.md).[`name`](DefinitionBase.md#name-1)

***

### node

> `readonly` **node**: [`TSInterfaceDeclaration`](../interfaces/TSInterfaceDeclaration.md) \| [`TSMappedType`](../interfaces/TSMappedType.md) \| [`TSTypeAliasDeclaration`](../interfaces/TSTypeAliasDeclaration.md) \| `TSTypeParameter`

The enclosing node of the name.

#### Inherited from

[`DefinitionBase`](DefinitionBase.md).[`node`](DefinitionBase.md#node-1)

***

### parent

> `readonly` **parent**: `null`

the enclosing statement node of the identifier.

#### Inherited from

[`DefinitionBase`](DefinitionBase.md).[`parent`](DefinitionBase.md#parent-1)

***

### type

> `readonly` **type**: [`Type`](../README.md#type-1)

#### Inherited from

[`DefinitionBase`](DefinitionBase.md).[`type`](DefinitionBase.md#type-1)

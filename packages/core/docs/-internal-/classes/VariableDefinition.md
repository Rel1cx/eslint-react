[**@eslint-react/core**](../../README.md)

***

[@eslint-react/core](../../README.md) / [\<internal\>](../README.md) / VariableDefinition

# Class: VariableDefinition

## Extends

- [`DefinitionBase`](DefinitionBase.md)\<[`Variable`](../README.md#variable), [`VariableDeclarator`](../type-aliases/VariableDeclarator.md), [`VariableDeclaration`](../type-aliases/VariableDeclaration.md), [`Identifier`](../interfaces/Identifier.md)\>

## Constructors

### new VariableDefinition()

> **new VariableDefinition**(`name`, `node`, `decl`): [`VariableDefinition`](VariableDefinition.md)

#### Parameters

##### name

[`Identifier`](../interfaces/Identifier.md)

##### node

[`VariableDeclarator`](../type-aliases/VariableDeclarator.md)

##### decl

[`VariableDeclaration`](../type-aliases/VariableDeclaration.md)

#### Returns

[`VariableDefinition`](VariableDefinition.md)

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

> `readonly` **isTypeDefinition**: `false` = `false`

`true` if the variable is valid in a type context, false otherwise

#### Overrides

[`DefinitionBase`](DefinitionBase.md).[`isTypeDefinition`](DefinitionBase.md#istypedefinition)

***

### isVariableDefinition

> `readonly` **isVariableDefinition**: `true` = `true`

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

> `readonly` **node**: [`VariableDeclarator`](../type-aliases/VariableDeclarator.md)

The enclosing node of the name.

#### Inherited from

[`DefinitionBase`](DefinitionBase.md).[`node`](DefinitionBase.md#node-1)

***

### parent

> `readonly` **parent**: [`VariableDeclaration`](../type-aliases/VariableDeclaration.md)

the enclosing statement node of the identifier.

#### Inherited from

[`DefinitionBase`](DefinitionBase.md).[`parent`](DefinitionBase.md#parent-1)

***

### type

> `readonly` **type**: [`Variable`](../README.md#variable)

#### Inherited from

[`DefinitionBase`](DefinitionBase.md).[`type`](DefinitionBase.md#type-1)

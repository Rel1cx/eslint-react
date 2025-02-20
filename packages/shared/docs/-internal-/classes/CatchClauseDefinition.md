[**@eslint-react/shared**](../../README.md)

***

[@eslint-react/shared](../../README.md) / [\<internal\>](../README.md) / CatchClauseDefinition

# Class: CatchClauseDefinition

## Extends

- [`DefinitionBase`](DefinitionBase.md)\<[`CatchClause`](../README.md#catchclause), `TSESTree.CatchClause`, `null`, [`BindingName`](../type-aliases/BindingName.md)\>

## Constructors

### new CatchClauseDefinition()

> **new CatchClauseDefinition**(`name`, `node`): [`CatchClauseDefinition`](CatchClauseDefinition.md)

#### Parameters

##### name

[`BindingName`](../type-aliases/BindingName.md)

##### node

`CatchClause`

#### Returns

[`CatchClauseDefinition`](CatchClauseDefinition.md)

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

> `readonly` **name**: [`BindingName`](../type-aliases/BindingName.md)

The `Identifier` node of this definition

#### Inherited from

[`DefinitionBase`](DefinitionBase.md).[`name`](DefinitionBase.md#name-1)

***

### node

> `readonly` **node**: `CatchClause`

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

> `readonly` **type**: [`CatchClause`](../README.md#catchclause)

#### Inherited from

[`DefinitionBase`](DefinitionBase.md).[`type`](DefinitionBase.md#type-1)

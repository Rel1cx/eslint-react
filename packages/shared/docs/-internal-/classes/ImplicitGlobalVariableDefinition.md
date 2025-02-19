[**@eslint-react/shared**](../../README.md)

***

[@eslint-react/shared](../../README.md) / [\<internal\>](../README.md) / ImplicitGlobalVariableDefinition

# Class: ImplicitGlobalVariableDefinition

## Extends

- [`DefinitionBase`](DefinitionBase.md)\<[`ImplicitGlobalVariable`](../README.md#implicitglobalvariable), [`Node`](../type-aliases/Node.md), `null`, [`BindingName`](../type-aliases/BindingName.md)\>

## Constructors

### new ImplicitGlobalVariableDefinition()

> **new ImplicitGlobalVariableDefinition**(`name`, `node`): [`ImplicitGlobalVariableDefinition`](ImplicitGlobalVariableDefinition.md)

#### Parameters

##### name

[`BindingName`](../type-aliases/BindingName.md)

##### node

[`Node`](../type-aliases/Node.md)

#### Returns

[`ImplicitGlobalVariableDefinition`](ImplicitGlobalVariableDefinition.md)

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

> `readonly` **node**: [`Node`](../type-aliases/Node.md)

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

> `readonly` **type**: [`ImplicitGlobalVariable`](../README.md#implicitglobalvariable)

#### Inherited from

[`DefinitionBase`](DefinitionBase.md).[`type`](DefinitionBase.md#type-1)

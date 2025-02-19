[**@eslint-react/core**](../../README.md)

***

[@eslint-react/core](../../README.md) / [\<internal\>](../README.md) / Variable

# Class: Variable

A Variable represents a locally scoped identifier. These include arguments to functions.

## Extends

- [`VariableBase`](VariableBase.md)

## Constructors

### new Variable()

> **new Variable**(`name`, `scope`): [`Variable`](Variable.md)

#### Parameters

##### name

`string`

##### scope

[`Scope`](../type-aliases/Scope.md)

#### Returns

[`Variable`](Variable.md)

#### Inherited from

[`VariableBase`](VariableBase.md).[`constructor`](VariableBase.md#constructors)

## Properties

### $id

> `readonly` **$id**: `number`

A unique ID for this instance - primarily used to help debugging and testing

#### Inherited from

[`VariableBase`](VariableBase.md).[`$id`](VariableBase.md#$id)

***

### defs

> `readonly` **defs**: [`Definition`](../type-aliases/Definition.md)[]

The array of the definitions of this variable.

#### Inherited from

[`VariableBase`](VariableBase.md).[`defs`](VariableBase.md#defs)

***

### eslintUsed

> **eslintUsed**: `boolean`

True if the variable is considered used for the purposes of `no-unused-vars`, false otherwise.

#### Inherited from

[`VariableBase`](VariableBase.md).[`eslintUsed`](VariableBase.md#eslintused)

***

### identifiers

> `readonly` **identifiers**: [`Identifier`](../interfaces/Identifier.md)[]

The array of `Identifier` nodes which define this variable.
If this variable is redeclared, this array includes two or more nodes.

#### Inherited from

[`VariableBase`](VariableBase.md).[`identifiers`](VariableBase.md#identifiers)

***

### name

> `readonly` **name**: `string`

The variable name, as given in the source code.

#### Inherited from

[`VariableBase`](VariableBase.md).[`name`](VariableBase.md#name-1)

***

### references

> `readonly` **references**: [`Reference`](Reference.md)[]

List of [Reference](Reference.md) of this variable (excluding parameter entries)  in its defining scope and all nested scopes.
For defining occurrences only see [Variable#defs](Variable.md#defs).

#### Inherited from

[`VariableBase`](VariableBase.md).[`references`](VariableBase.md#references)

***

### scope

> `readonly` **scope**: [`Scope`](../type-aliases/Scope.md)

Reference to the enclosing Scope.

#### Inherited from

[`VariableBase`](VariableBase.md).[`scope`](VariableBase.md#scope-1)

## Accessors

### isTypeVariable

#### Get Signature

> **get** **isTypeVariable**(): `boolean`

`true` if the variable is valid in a type context, false otherwise

##### Returns

`boolean`

***

### isValueVariable

#### Get Signature

> **get** **isValueVariable**(): `boolean`

`true` if the variable is valid in a value context, false otherwise

##### Returns

`boolean`

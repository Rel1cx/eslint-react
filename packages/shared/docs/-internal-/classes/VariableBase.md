[**@eslint-react/shared**](../../README.md)

***

[@eslint-react/shared](../../README.md) / [\<internal\>](../README.md) / VariableBase

# Class: VariableBase

## Extended by

- [`ESLintScopeVariable`](ESLintScopeVariable.md)
- [`Variable`](Variable.md)

## Constructors

### new VariableBase()

> **new VariableBase**(`name`, `scope`): [`VariableBase`](VariableBase.md)

#### Parameters

##### name

`string`

##### scope

[`Scope`](../type-aliases/Scope.md)

#### Returns

[`VariableBase`](VariableBase.md)

## Properties

### $id

> `readonly` **$id**: `number`

A unique ID for this instance - primarily used to help debugging and testing

***

### defs

> `readonly` **defs**: [`Definition`](../type-aliases/Definition.md)[]

The array of the definitions of this variable.

***

### eslintUsed

> **eslintUsed**: `boolean`

True if the variable is considered used for the purposes of `no-unused-vars`, false otherwise.

***

### identifiers

> `readonly` **identifiers**: [`Identifier`](../interfaces/Identifier.md)[]

The array of `Identifier` nodes which define this variable.
If this variable is redeclared, this array includes two or more nodes.

***

### name

> `readonly` **name**: `string`

The variable name, as given in the source code.

***

### references

> `readonly` **references**: [`Reference`](Reference.md)[]

List of [Reference](Reference.md) of this variable (excluding parameter entries)  in its defining scope and all nested scopes.
For defining occurrences only see [Variable#defs](Variable.md#defs).

***

### scope

> `readonly` **scope**: [`Scope`](../type-aliases/Scope.md)

Reference to the enclosing Scope.

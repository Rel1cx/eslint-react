[**@eslint-react/shared**](../../README.md)

***

[@eslint-react/shared](../../README.md) / [\<internal\>](../README.md) / ESLintScopeVariable

# Class: ESLintScopeVariable

ESLint defines global variables using the eslint-scope Variable class
This is declared here for consumers to use

## Extends

- [`VariableBase`](VariableBase.md)

## Constructors

### new ESLintScopeVariable()

> **new ESLintScopeVariable**(`name`, `scope`): [`ESLintScopeVariable`](ESLintScopeVariable.md)

#### Parameters

##### name

`string`

##### scope

[`Scope`](../type-aliases/Scope.md)

#### Returns

[`ESLintScopeVariable`](ESLintScopeVariable.md)

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

### eslintExplicitGlobal?

> `optional` **eslintExplicitGlobal**: `boolean`

Written to by ESLint.
This property is undefined if there are no globals directive comments.
The array of globals directive comments which defined this global variable in the source code file.

***

### eslintExplicitGlobalComments?

> `optional` **eslintExplicitGlobalComments**: [`Comment`](../type-aliases/Comment.md)[]

Written to by ESLint.
If this key exists, it is a global variable added by ESLint.
If `true`, this global variable was defined by a globals directive comment in the source code file.

***

### eslintImplicitGlobalSetting?

> `optional` **eslintImplicitGlobalSetting**: `"readonly"` \| `"writable"`

Written to by ESLint.
The configured value in config files. This can be different from `variable.writeable` if there are globals directive comments.

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

***

### writeable?

> `optional` **writeable**: `boolean`

Written to by ESLint.
If this key exists, this variable is a global variable added by ESLint.
If this is `true`, this variable can be assigned arbitrary values.
If this is `false`, this variable is readonly.

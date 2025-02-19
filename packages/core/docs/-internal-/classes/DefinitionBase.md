[**@eslint-react/core**](../../README.md)

***

[@eslint-react/core](../../README.md) / [\<internal\>](../README.md) / DefinitionBase

# Class: `abstract` DefinitionBase\<Type, Node, Parent, Name\>

## Extended by

- [`CatchClauseDefinition`](CatchClauseDefinition.md)
- [`ClassNameDefinition`](ClassNameDefinition.md)
- [`FunctionNameDefinition`](FunctionNameDefinition.md)
- [`ImplicitGlobalVariableDefinition`](ImplicitGlobalVariableDefinition.md)
- [`ImportBindingDefinition`](ImportBindingDefinition.md)
- [`ParameterDefinition`](ParameterDefinition.md)
- [`TSEnumMemberDefinition`](TSEnumMemberDefinition.md)
- [`TSEnumNameDefinition`](TSEnumNameDefinition.md)
- [`TSModuleNameDefinition`](TSModuleNameDefinition.md)
- [`TypeDefinition`](TypeDefinition.md)
- [`VariableDefinition`](VariableDefinition.md)

## Type Parameters

• **Type** *extends* [`DefinitionType`](../enumerations/DefinitionType.md)

• **Node** *extends* [`Node`](../type-aliases/Node.md)

• **Parent** *extends* [`Node`](../type-aliases/Node.md) \| `null`

• **Name** *extends* [`Node`](../type-aliases/Node.md)

## Constructors

### new DefinitionBase()

> **new DefinitionBase**\<`Type`, `Node`, `Parent`, `Name`\>(`type`, `name`, `node`, `parent`): [`DefinitionBase`](DefinitionBase.md)\<`Type`, `Node`, `Parent`, `Name`\>

#### Parameters

##### type

`Type`

##### name

`Name`

##### node

`Node`

##### parent

`Parent`

#### Returns

[`DefinitionBase`](DefinitionBase.md)\<`Type`, `Node`, `Parent`, `Name`\>

## Properties

### $id

> `readonly` **$id**: `number`

A unique ID for this instance - primarily used to help debugging and testing

***

### isTypeDefinition

> `abstract` `readonly` **isTypeDefinition**: `boolean`

`true` if the variable is valid in a type context, false otherwise

***

### isVariableDefinition

> `abstract` `readonly` **isVariableDefinition**: `boolean`

`true` if the variable is valid in a value context, false otherwise

***

### name

> `readonly` **name**: `Name`

The `Identifier` node of this definition

***

### node

> `readonly` **node**: `Node`

The enclosing node of the name.

***

### parent

> `readonly` **parent**: `Parent`

the enclosing statement node of the identifier.

***

### type

> `readonly` **type**: `Type`

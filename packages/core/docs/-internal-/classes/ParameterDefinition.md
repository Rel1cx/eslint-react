[**@eslint-react/core**](../../README.md)

***

[@eslint-react/core](../../README.md) / [\<internal\>](../README.md) / ParameterDefinition

# Class: ParameterDefinition

## Extends

- [`DefinitionBase`](DefinitionBase.md)\<[`Parameter`](../README.md#parameter), [`ArrowFunctionExpression`](../interfaces/ArrowFunctionExpression.md) \| [`FunctionDeclaration`](../type-aliases/FunctionDeclaration.md) \| [`FunctionExpression`](../interfaces/FunctionExpression.md) \| `TSESTree.TSCallSignatureDeclaration` \| [`TSConstructorType`](../interfaces/TSConstructorType.md) \| `TSESTree.TSConstructSignatureDeclaration` \| [`TSDeclareFunction`](../type-aliases/TSDeclareFunction.md) \| [`TSEmptyBodyFunctionExpression`](../interfaces/TSEmptyBodyFunctionExpression.md) \| [`TSFunctionType`](../interfaces/TSFunctionType.md) \| [`TSMethodSignature`](../type-aliases/TSMethodSignature.md), `null`, [`BindingName`](../type-aliases/BindingName.md)\>

## Constructors

### new ParameterDefinition()

> **new ParameterDefinition**(`name`, `node`, `rest`): [`ParameterDefinition`](ParameterDefinition.md)

#### Parameters

##### name

[`BindingName`](../type-aliases/BindingName.md)

##### node

[`ArrowFunctionExpression`](../interfaces/ArrowFunctionExpression.md) | [`FunctionDeclaration`](../type-aliases/FunctionDeclaration.md) | [`FunctionExpression`](../interfaces/FunctionExpression.md) | `TSCallSignatureDeclaration` | [`TSConstructorType`](../interfaces/TSConstructorType.md) | `TSConstructSignatureDeclaration` | [`TSDeclareFunction`](../type-aliases/TSDeclareFunction.md) | [`TSEmptyBodyFunctionExpression`](../interfaces/TSEmptyBodyFunctionExpression.md) | [`TSFunctionType`](../interfaces/TSFunctionType.md) | [`TSMethodSignature`](../type-aliases/TSMethodSignature.md)

##### rest

`boolean`

#### Returns

[`ParameterDefinition`](ParameterDefinition.md)

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

Whether the parameter definition is a part of a rest parameter.

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

> `readonly` **node**: [`ArrowFunctionExpression`](../interfaces/ArrowFunctionExpression.md) \| [`FunctionDeclaration`](../type-aliases/FunctionDeclaration.md) \| [`FunctionExpression`](../interfaces/FunctionExpression.md) \| `TSCallSignatureDeclaration` \| [`TSConstructorType`](../interfaces/TSConstructorType.md) \| `TSConstructSignatureDeclaration` \| [`TSDeclareFunction`](../type-aliases/TSDeclareFunction.md) \| [`TSEmptyBodyFunctionExpression`](../interfaces/TSEmptyBodyFunctionExpression.md) \| [`TSFunctionType`](../interfaces/TSFunctionType.md) \| [`TSMethodSignature`](../type-aliases/TSMethodSignature.md)

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

### rest

> `readonly` **rest**: `boolean`

***

### type

> `readonly` **type**: [`Parameter`](../README.md#parameter)

#### Inherited from

[`DefinitionBase`](DefinitionBase.md).[`type`](DefinitionBase.md#type-1)

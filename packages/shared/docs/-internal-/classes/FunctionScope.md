[**@eslint-react/shared**](../../README.md)

***

[@eslint-react/shared](../../README.md) / [\<internal\>](../README.md) / FunctionScope

# Class: FunctionScope

## Extends

- [`ScopeBase`](ScopeBase.md)\<[`function`](../README.md#function), [`ArrowFunctionExpression`](../interfaces/ArrowFunctionExpression.md) \| [`FunctionDeclaration`](../type-aliases/FunctionDeclaration.md) \| [`FunctionExpression`](../interfaces/FunctionExpression.md) \| `TSESTree.Program` \| [`TSDeclareFunction`](../type-aliases/TSDeclareFunction.md) \| [`TSEmptyBodyFunctionExpression`](../interfaces/TSEmptyBodyFunctionExpression.md), [`Scope`](../type-aliases/Scope.md)\>

## Constructors

### new FunctionScope()

> **new FunctionScope**(`scopeManager`, `upperScope`, `block`, `isMethodDefinition`): [`FunctionScope`](FunctionScope.md)

#### Parameters

##### scopeManager

[`ScopeManager`](ScopeManager.md)

##### upperScope

[`Scope`](../type-aliases/Scope.md)

##### block

[`ArrowFunctionExpression`](../interfaces/ArrowFunctionExpression.md) | [`FunctionDeclaration`](../type-aliases/FunctionDeclaration.md) | [`FunctionExpression`](../interfaces/FunctionExpression.md) | `Program` | [`TSDeclareFunction`](../type-aliases/TSDeclareFunction.md) | [`TSEmptyBodyFunctionExpression`](../interfaces/TSEmptyBodyFunctionExpression.md)

##### isMethodDefinition

`boolean`

#### Returns

[`FunctionScope`](FunctionScope.md)

#### Overrides

[`ScopeBase`](ScopeBase.md).[`constructor`](ScopeBase.md#constructors)

## Properties

### $id

> `readonly` **$id**: `number`

A unique ID for this instance - primarily used to help debugging and testing

#### Inherited from

[`ScopeBase`](ScopeBase.md).[`$id`](ScopeBase.md#$id)

***

### block

> `readonly` **block**: [`ArrowFunctionExpression`](../interfaces/ArrowFunctionExpression.md) \| [`FunctionDeclaration`](../type-aliases/FunctionDeclaration.md) \| [`FunctionExpression`](../interfaces/FunctionExpression.md) \| `Program` \| [`TSDeclareFunction`](../type-aliases/TSDeclareFunction.md) \| [`TSEmptyBodyFunctionExpression`](../interfaces/TSEmptyBodyFunctionExpression.md)

The AST node which created this scope.

#### Inherited from

[`ScopeBase`](ScopeBase.md).[`block`](ScopeBase.md#block-1)

***

### childScopes

> `readonly` **childScopes**: [`Scope`](../type-aliases/Scope.md)[]

The array of child scopes. This does not include grandchild scopes.

#### Inherited from

[`ScopeBase`](ScopeBase.md).[`childScopes`](ScopeBase.md#childscopes)

***

### functionExpressionScope

> `readonly` **functionExpressionScope**: `boolean`

Whether this scope is created by a FunctionExpression.

#### Inherited from

[`ScopeBase`](ScopeBase.md).[`functionExpressionScope`](ScopeBase.md#functionexpressionscope)

***

### isStrict

> **isStrict**: `boolean`

Whether 'use strict' is in effect in this scope.

#### Inherited from

[`ScopeBase`](ScopeBase.md).[`isStrict`](ScopeBase.md#isstrict)

***

### leftToResolve

> `protected` **leftToResolve**: `null` \| [`Reference`](Reference.md)[]

List of [Reference](Reference.md)s that are left to be resolved (i.e. which
need to be linked to the variable they refer to).

#### Inherited from

[`ScopeBase`](ScopeBase.md).[`leftToResolve`](ScopeBase.md#lefttoresolve)

***

### references

> `readonly` **references**: [`Reference`](Reference.md)[]

Any variable [Reference](Reference.md) found in this scope.
This includes occurrences of local variables as well as variables from parent scopes (including the global scope).
For local variables this also includes defining occurrences (like in a 'var' statement).
In a 'function' scope this does not include the occurrences of the formal parameter in the parameter list.

#### Inherited from

[`ScopeBase`](ScopeBase.md).[`references`](ScopeBase.md#references)

***

### set

> `readonly` **set**: [`Map`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Map)\<`string`, [`Variable`](Variable.md)\>

The map from variable names to variable objects.

#### Inherited from

[`ScopeBase`](ScopeBase.md).[`set`](ScopeBase.md#set)

***

### through

> `readonly` **through**: [`Reference`](Reference.md)[]

The [Reference](Reference.md)s that are not resolved with this scope.

#### Inherited from

[`ScopeBase`](ScopeBase.md).[`through`](ScopeBase.md#through)

***

### type

> `readonly` **type**: [`function`](../README.md#function)

#### Inherited from

[`ScopeBase`](ScopeBase.md).[`type`](ScopeBase.md#type-1)

***

### upper

> `readonly` **upper**: [`Scope`](../type-aliases/Scope.md)

Reference to the parent [Scope](../type-aliases/Scope.md).

#### Inherited from

[`ScopeBase`](ScopeBase.md).[`upper`](ScopeBase.md#upper)

***

### variables

> `readonly` **variables**: [`Variable`](Variable.md)[]

The scoped [Variable](Variable.md)s of this scope.
In the case of a 'function' scope this includes the automatic argument `arguments` as its first element, as well
as all further formal arguments.
This does not include variables which are defined in child scopes.

#### Inherited from

[`ScopeBase`](ScopeBase.md).[`variables`](ScopeBase.md#variables)

***

### variableScope

> `readonly` **variableScope**: [`VariableScope`](../type-aliases/VariableScope.md)

#### Inherited from

[`ScopeBase`](ScopeBase.md).[`variableScope`](ScopeBase.md#variablescope)

## Methods

### close()

> **close**(`scopeManager`): `null` \| [`Scope`](../type-aliases/Scope.md)

#### Parameters

##### scopeManager

[`ScopeManager`](ScopeManager.md)

#### Returns

`null` \| [`Scope`](../type-aliases/Scope.md)

#### Inherited from

[`ScopeBase`](ScopeBase.md).[`close`](ScopeBase.md#close)

***

### defineIdentifier()

> **defineIdentifier**(`node`, `def`): `void`

#### Parameters

##### node

[`Identifier`](../interfaces/Identifier.md)

##### def

[`Definition`](../type-aliases/Definition.md)

#### Returns

`void`

#### Inherited from

[`ScopeBase`](ScopeBase.md).[`defineIdentifier`](ScopeBase.md#defineidentifier)

***

### defineLiteralIdentifier()

> **defineLiteralIdentifier**(`node`, `def`): `void`

#### Parameters

##### node

[`StringLiteral`](../interfaces/StringLiteral.md)

##### def

[`Definition`](../type-aliases/Definition.md)

#### Returns

`void`

#### Inherited from

[`ScopeBase`](ScopeBase.md).[`defineLiteralIdentifier`](ScopeBase.md#defineliteralidentifier)

***

### defineVariable()

> `protected` **defineVariable**(`nameOrVariable`, `set`, `variables`, `node`, `def`): `void`

To override by function scopes.
References in default parameters isn't resolved to variables which are in their function body.

#### Parameters

##### nameOrVariable

`string` | [`Variable`](Variable.md)

##### set

[`Map`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Map)\<`string`, [`Variable`](Variable.md)\>

##### variables

[`Variable`](Variable.md)[]

##### node

`null` | [`Identifier`](../interfaces/Identifier.md)

##### def

`null` | [`Definition`](../type-aliases/Definition.md)

#### Returns

`void`

#### Inherited from

[`ScopeBase`](ScopeBase.md).[`defineVariable`](ScopeBase.md#definevariable)

***

### delegateToUpperScope()

> `protected` **delegateToUpperScope**(`ref`): `void`

#### Parameters

##### ref

[`Reference`](Reference.md)

#### Returns

`void`

#### Inherited from

[`ScopeBase`](ScopeBase.md).[`delegateToUpperScope`](ScopeBase.md#delegatetoupperscope)

***

### isValidResolution()

> `protected` **isValidResolution**(`ref`, `variable`): `boolean`

#### Parameters

##### ref

[`Reference`](Reference.md)

##### variable

[`Variable`](Variable.md)

#### Returns

`boolean`

#### Overrides

[`ScopeBase`](ScopeBase.md).[`isValidResolution`](ScopeBase.md#isvalidresolution)

***

### referenceDualValueType()

> **referenceDualValueType**(`node`): `void`

#### Parameters

##### node

[`Identifier`](../interfaces/Identifier.md)

#### Returns

`void`

#### Inherited from

[`ScopeBase`](ScopeBase.md).[`referenceDualValueType`](ScopeBase.md#referencedualvaluetype)

***

### referenceType()

> **referenceType**(`node`): `void`

#### Parameters

##### node

[`Identifier`](../interfaces/Identifier.md)

#### Returns

`void`

#### Inherited from

[`ScopeBase`](ScopeBase.md).[`referenceType`](ScopeBase.md#referencetype)

***

### referenceValue()

> **referenceValue**(`node`, `assign`?, `writeExpr`?, `maybeImplicitGlobal`?, `init`?): `void`

#### Parameters

##### node

[`Identifier`](../interfaces/Identifier.md) | [`JSXIdentifier`](../interfaces/JSXIdentifier.md)

##### assign?

[`ReferenceFlag`](../enumerations/ReferenceFlag.md)

##### writeExpr?

`null` | [`Expression`](../type-aliases/Expression.md)

##### maybeImplicitGlobal?

`null` | [`ReferenceImplicitGlobal`](../interfaces/ReferenceImplicitGlobal.md)

##### init?

`boolean`

#### Returns

`void`

#### Inherited from

[`ScopeBase`](ScopeBase.md).[`referenceValue`](ScopeBase.md#referencevalue)

***

### shouldStaticallyClose()

> **shouldStaticallyClose**(): `boolean`

#### Returns

`boolean`

#### Inherited from

[`ScopeBase`](ScopeBase.md).[`shouldStaticallyClose`](ScopeBase.md#shouldstaticallyclose)

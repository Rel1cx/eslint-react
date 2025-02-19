[**@eslint-react/core**](../../README.md)

***

[@eslint-react/core](../../README.md) / [\<internal\>](../README.md) / ScopeBase

# Class: `abstract` ScopeBase\<Type, Block, Upper\>

## Extended by

- [`BlockScope`](BlockScope.md)
- [`CatchScope`](CatchScope.md)
- [`ClassFieldInitializerScope`](ClassFieldInitializerScope.md)
- [`ClassScope`](ClassScope.md)
- [`ClassStaticBlockScope`](ClassStaticBlockScope.md)
- [`ConditionalTypeScope`](ConditionalTypeScope.md)
- [`ForScope`](ForScope.md)
- [`FunctionExpressionNameScope`](FunctionExpressionNameScope.md)
- [`FunctionScope`](FunctionScope.md)
- [`FunctionTypeScope`](FunctionTypeScope.md)
- [`GlobalScope`](GlobalScope.md)
- [`MappedTypeScope`](MappedTypeScope.md)
- [`ModuleScope`](ModuleScope.md)
- [`SwitchScope`](SwitchScope.md)
- [`TSEnumScope`](TSEnumScope.md)
- [`TSModuleScope`](TSModuleScope.md)
- [`TypeScope`](TypeScope.md)
- [`WithScope`](WithScope.md)

## Type Parameters

• **Type** *extends* [`ScopeType`](../enumerations/ScopeType.md)

• **Block** *extends* [`Node`](../type-aliases/Node.md)

• **Upper** *extends* [`Scope`](../type-aliases/Scope.md) \| `null`

## Constructors

### new ScopeBase()

> **new ScopeBase**\<`Type`, `Block`, `Upper`\>(`scopeManager`, `type`, `upperScope`, `block`, `isMethodDefinition`): [`ScopeBase`](ScopeBase.md)\<`Type`, `Block`, `Upper`\>

#### Parameters

##### scopeManager

[`ScopeManager`](ScopeManager.md)

##### type

`Type`

##### upperScope

`Upper`

##### block

`Block`

##### isMethodDefinition

`boolean`

#### Returns

[`ScopeBase`](ScopeBase.md)\<`Type`, `Block`, `Upper`\>

## Properties

### $id

> `readonly` **$id**: `number`

A unique ID for this instance - primarily used to help debugging and testing

***

### block

> `readonly` **block**: `Block`

The AST node which created this scope.

***

### childScopes

> `readonly` **childScopes**: [`Scope`](../type-aliases/Scope.md)[]

The array of child scopes. This does not include grandchild scopes.

***

### functionExpressionScope

> `readonly` **functionExpressionScope**: `boolean`

Whether this scope is created by a FunctionExpression.

***

### isStrict

> **isStrict**: `boolean`

Whether 'use strict' is in effect in this scope.

***

### leftToResolve

> `protected` **leftToResolve**: `null` \| [`Reference`](Reference.md)[]

List of [Reference](Reference.md)s that are left to be resolved (i.e. which
need to be linked to the variable they refer to).

***

### references

> `readonly` **references**: [`Reference`](Reference.md)[]

Any variable [Reference](Reference.md) found in this scope.
This includes occurrences of local variables as well as variables from parent scopes (including the global scope).
For local variables this also includes defining occurrences (like in a 'var' statement).
In a 'function' scope this does not include the occurrences of the formal parameter in the parameter list.

***

### set

> `readonly` **set**: [`Map`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Map)\<`string`, [`Variable`](Variable.md)\>

The map from variable names to variable objects.

***

### through

> `readonly` **through**: [`Reference`](Reference.md)[]

The [Reference](Reference.md)s that are not resolved with this scope.

***

### type

> `readonly` **type**: `Type`

***

### upper

> `readonly` **upper**: `Upper`

Reference to the parent [Scope](../type-aliases/Scope.md).

***

### variables

> `readonly` **variables**: [`Variable`](Variable.md)[]

The scoped [Variable](Variable.md)s of this scope.
In the case of a 'function' scope this includes the automatic argument `arguments` as its first element, as well
as all further formal arguments.
This does not include variables which are defined in child scopes.

***

### variableScope

> `readonly` **variableScope**: [`VariableScope`](../type-aliases/VariableScope.md)

## Methods

### close()

> **close**(`scopeManager`): `null` \| [`Scope`](../type-aliases/Scope.md)

#### Parameters

##### scopeManager

[`ScopeManager`](ScopeManager.md)

#### Returns

`null` \| [`Scope`](../type-aliases/Scope.md)

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

***

### delegateToUpperScope()

> `protected` **delegateToUpperScope**(`ref`): `void`

#### Parameters

##### ref

[`Reference`](Reference.md)

#### Returns

`void`

***

### isValidResolution()

> `protected` **isValidResolution**(`_ref`, `_variable`): `boolean`

#### Parameters

##### \_ref

[`Reference`](Reference.md)

##### \_variable

[`Variable`](Variable.md)

#### Returns

`boolean`

***

### referenceDualValueType()

> **referenceDualValueType**(`node`): `void`

#### Parameters

##### node

[`Identifier`](../interfaces/Identifier.md)

#### Returns

`void`

***

### referenceType()

> **referenceType**(`node`): `void`

#### Parameters

##### node

[`Identifier`](../interfaces/Identifier.md)

#### Returns

`void`

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

***

### shouldStaticallyClose()

> **shouldStaticallyClose**(): `boolean`

#### Returns

`boolean`

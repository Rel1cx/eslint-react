[**@eslint-react/shared**](../../README.md)

***

[@eslint-react/shared](../../README.md) / [\<internal\>](../README.md) / ScopeManager

# Class: ScopeManager

## See

https://eslint.org/docs/latest/developer-guide/scope-manager-interface#scopemanager-interface

## Constructors

### new ScopeManager()

> **new ScopeManager**(`options`): [`ScopeManager`](ScopeManager.md)

#### Parameters

##### options

[`ScopeManagerOptions`](../interfaces/ScopeManagerOptions.md)

#### Returns

[`ScopeManager`](ScopeManager.md)

## Properties

### currentScope

> **currentScope**: `null` \| [`Scope`](../type-aliases/Scope.md)

***

### declaredVariables

> `readonly` **declaredVariables**: [`WeakMap`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/WeakMap)\<[`Node`](../type-aliases/Node.md), [`Variable`](Variable.md)[]\>

***

### globalScope

> **globalScope**: `null` \| [`GlobalScope`](GlobalScope.md)

The root scope

***

### nodeToScope

> `readonly` **nodeToScope**: [`WeakMap`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/WeakMap)\<[`Node`](../type-aliases/Node.md), [`Scope`](../type-aliases/Scope.md)[]\>

***

### scopes

> `readonly` **scopes**: [`Scope`](../type-aliases/Scope.md)[]

All scopes

## Accessors

### variables

#### Get Signature

> **get** **variables**(): [`Variable`](Variable.md)[]

##### Returns

[`Variable`](Variable.md)[]

## Methods

### acquire()

> **acquire**(`node`, `inner`?): `null` \| [`Scope`](../type-aliases/Scope.md)

Get the scope of a given AST node. The gotten scope's `block` property is the node.
This method never returns `function-expression-name` scope. If the node does not have their scope, this returns `null`.

#### Parameters

##### node

[`Node`](../type-aliases/Node.md)

An AST node to get their scope.

##### inner?

`boolean`

If the node has multiple scopes, this returns the outermost scope normally.
               If `inner` is `true` then this returns the innermost scope.

#### Returns

`null` \| [`Scope`](../type-aliases/Scope.md)

***

### getDeclaredVariables()

> **getDeclaredVariables**(`node`): [`Variable`](Variable.md)[]

Get the variables that a given AST node defines. The gotten variables' `def[].node`/`def[].parent` property is the node.
If the node does not define any variable, this returns an empty array.

#### Parameters

##### node

[`Node`](../type-aliases/Node.md)

An AST node to get their variables.

#### Returns

[`Variable`](Variable.md)[]

***

### isES6()

> **isES6**(): `boolean`

#### Returns

`boolean`

***

### isGlobalReturn()

> **isGlobalReturn**(): `boolean`

#### Returns

`boolean`

***

### isImpliedStrict()

> **isImpliedStrict**(): `boolean`

#### Returns

`boolean`

***

### isModule()

> **isModule**(): `boolean`

#### Returns

`boolean`

***

### isStrictModeSupported()

> **isStrictModeSupported**(): `boolean`

#### Returns

`boolean`

***

### nestBlockScope()

> **nestBlockScope**(`node`): [`BlockScope`](BlockScope.md)

#### Parameters

##### node

[`BlockStatement`](../interfaces/BlockStatement.md)

#### Returns

[`BlockScope`](BlockScope.md)

***

### nestCatchScope()

> **nestCatchScope**(`node`): [`CatchScope`](CatchScope.md)

#### Parameters

##### node

`CatchClause`

#### Returns

[`CatchScope`](CatchScope.md)

***

### nestClassFieldInitializerScope()

> **nestClassFieldInitializerScope**(`node`): [`ClassFieldInitializerScope`](ClassFieldInitializerScope.md)

#### Parameters

##### node

[`Expression`](../type-aliases/Expression.md)

#### Returns

[`ClassFieldInitializerScope`](ClassFieldInitializerScope.md)

***

### nestClassScope()

> **nestClassScope**(`node`): [`ClassScope`](ClassScope.md)

#### Parameters

##### node

[`ClassDeclaration`](../type-aliases/ClassDeclaration.md) | [`ClassExpression`](../interfaces/ClassExpression.md)

#### Returns

[`ClassScope`](ClassScope.md)

***

### nestClassStaticBlockScope()

> **nestClassStaticBlockScope**(`node`): [`ClassStaticBlockScope`](ClassStaticBlockScope.md)

#### Parameters

##### node

`StaticBlock`

#### Returns

[`ClassStaticBlockScope`](ClassStaticBlockScope.md)

***

### nestConditionalTypeScope()

> **nestConditionalTypeScope**(`node`): [`ConditionalTypeScope`](ConditionalTypeScope.md)

#### Parameters

##### node

[`TSConditionalType`](../interfaces/TSConditionalType.md)

#### Returns

[`ConditionalTypeScope`](ConditionalTypeScope.md)

***

### nestForScope()

> **nestForScope**(`node`): [`ForScope`](ForScope.md)

#### Parameters

##### node

[`ForInStatement`](../interfaces/ForInStatement.md) | [`ForOfStatement`](../interfaces/ForOfStatement.md) | [`ForStatement`](../interfaces/ForStatement.md)

#### Returns

[`ForScope`](ForScope.md)

***

### nestFunctionExpressionNameScope()

> **nestFunctionExpressionNameScope**(`node`): [`FunctionExpressionNameScope`](FunctionExpressionNameScope.md)

#### Parameters

##### node

[`FunctionExpression`](../interfaces/FunctionExpression.md)

#### Returns

[`FunctionExpressionNameScope`](FunctionExpressionNameScope.md)

***

### nestFunctionScope()

> **nestFunctionScope**(`node`, `isMethodDefinition`): [`FunctionScope`](FunctionScope.md)

#### Parameters

##### node

[`ArrowFunctionExpression`](../interfaces/ArrowFunctionExpression.md) | [`FunctionDeclaration`](../type-aliases/FunctionDeclaration.md) | [`FunctionExpression`](../interfaces/FunctionExpression.md) | `Program` | [`TSDeclareFunction`](../type-aliases/TSDeclareFunction.md) | [`TSEmptyBodyFunctionExpression`](../interfaces/TSEmptyBodyFunctionExpression.md)

##### isMethodDefinition

`boolean`

#### Returns

[`FunctionScope`](FunctionScope.md)

***

### nestFunctionTypeScope()

> **nestFunctionTypeScope**(`node`): [`FunctionTypeScope`](FunctionTypeScope.md)

#### Parameters

##### node

`TSCallSignatureDeclaration` | [`TSConstructorType`](../interfaces/TSConstructorType.md) | `TSConstructSignatureDeclaration` | [`TSFunctionType`](../interfaces/TSFunctionType.md) | [`TSMethodSignature`](../type-aliases/TSMethodSignature.md)

#### Returns

[`FunctionTypeScope`](FunctionTypeScope.md)

***

### nestGlobalScope()

> **nestGlobalScope**(`node`): [`GlobalScope`](GlobalScope.md)

#### Parameters

##### node

`Program`

#### Returns

[`GlobalScope`](GlobalScope.md)

***

### nestMappedTypeScope()

> **nestMappedTypeScope**(`node`): [`MappedTypeScope`](MappedTypeScope.md)

#### Parameters

##### node

[`TSMappedType`](../interfaces/TSMappedType.md)

#### Returns

[`MappedTypeScope`](MappedTypeScope.md)

***

### nestModuleScope()

> **nestModuleScope**(`node`): [`ModuleScope`](ModuleScope.md)

#### Parameters

##### node

`Program`

#### Returns

[`ModuleScope`](ModuleScope.md)

***

### nestScope()

> `protected` **nestScope**\<`T`\>(`scope`): `T`

#### Type Parameters

• **T** *extends* [`Scope`](../type-aliases/Scope.md)

#### Parameters

##### scope

`T`

#### Returns

`T`

***

### nestSwitchScope()

> **nestSwitchScope**(`node`): [`SwitchScope`](SwitchScope.md)

#### Parameters

##### node

[`SwitchStatement`](../interfaces/SwitchStatement.md)

#### Returns

[`SwitchScope`](SwitchScope.md)

***

### nestTSEnumScope()

> **nestTSEnumScope**(`node`): [`TSEnumScope`](TSEnumScope.md)

#### Parameters

##### node

[`TSEnumDeclaration`](../interfaces/TSEnumDeclaration.md)

#### Returns

[`TSEnumScope`](TSEnumScope.md)

***

### nestTSModuleScope()

> **nestTSModuleScope**(`node`): [`TSModuleScope`](TSModuleScope.md)

#### Parameters

##### node

[`TSModuleDeclaration`](../type-aliases/TSModuleDeclaration.md)

#### Returns

[`TSModuleScope`](TSModuleScope.md)

***

### nestTypeScope()

> **nestTypeScope**(`node`): [`TypeScope`](TypeScope.md)

#### Parameters

##### node

[`TSInterfaceDeclaration`](../interfaces/TSInterfaceDeclaration.md) | [`TSTypeAliasDeclaration`](../interfaces/TSTypeAliasDeclaration.md)

#### Returns

[`TypeScope`](TypeScope.md)

***

### nestWithScope()

> **nestWithScope**(`node`): [`WithScope`](WithScope.md)

#### Parameters

##### node

[`WithStatement`](../interfaces/WithStatement.md)

#### Returns

[`WithScope`](WithScope.md)

[**@eslint-react/shared**](../../README.md)

***

[@eslint-react/shared](../../README.md) / [\<internal\>](../README.md) / TransformationContext

# Interface: TransformationContext

## Extends

- [`CoreTransformationContext`](CoreTransformationContext.md)

## Properties

### factory

> `readonly` **factory**: [`NodeFactory`](NodeFactory.md)

#### Inherited from

[`CoreTransformationContext`](CoreTransformationContext.md).[`factory`](CoreTransformationContext.md#factory)

***

### onEmitNode()

> **onEmitNode**: (`hint`, `node`, `emitCallback`) => `void`

Hook used to allow transformers to capture state before or after
the printer emits a node.

NOTE: Transformation hooks should only be modified during `Transformer` initialization,
before returning the `NodeTransformer` callback.

#### Parameters

##### hint

[`EmitHint`](../enumerations/EmitHint.md)

##### node

[`Node`](Node.md)

##### emitCallback

(`hint`, `node`) => `void`

#### Returns

`void`

***

### onSubstituteNode()

> **onSubstituteNode**: (`hint`, `node`) => [`Node`](Node.md)

Hook used by transformers to substitute expressions just before they
are emitted by the pretty printer.

NOTE: Transformation hooks should only be modified during `Transformer` initialization,
before returning the `NodeTransformer` callback.

#### Parameters

##### hint

[`EmitHint`](../enumerations/EmitHint.md)

##### node

[`Node`](Node.md)

#### Returns

[`Node`](Node.md)

## Methods

### enableEmitNotification()

> **enableEmitNotification**(`kind`): `void`

Enables before/after emit notifications in the pretty printer for the provided
SyntaxKind.

#### Parameters

##### kind

[`SyntaxKind`](../enumerations/SyntaxKind.md)

#### Returns

`void`

***

### enableSubstitution()

> **enableSubstitution**(`kind`): `void`

Enables expression substitutions in the pretty printer for the provided SyntaxKind.

#### Parameters

##### kind

[`SyntaxKind`](../enumerations/SyntaxKind.md)

#### Returns

`void`

***

### endLexicalEnvironment()

> **endLexicalEnvironment**(): `undefined` \| [`Statement`](Statement.md)[]

Ends a lexical environment, returning any declarations.

#### Returns

`undefined` \| [`Statement`](Statement.md)[]

#### Inherited from

[`CoreTransformationContext`](CoreTransformationContext.md).[`endLexicalEnvironment`](CoreTransformationContext.md#endlexicalenvironment)

***

### getCompilerOptions()

> **getCompilerOptions**(): [`CompilerOptions`](CompilerOptions.md)

Gets the compiler options supplied to the transformer.

#### Returns

[`CompilerOptions`](CompilerOptions.md)

#### Inherited from

[`CoreTransformationContext`](CoreTransformationContext.md).[`getCompilerOptions`](CoreTransformationContext.md#getcompileroptions)

***

### hoistFunctionDeclaration()

> **hoistFunctionDeclaration**(`node`): `void`

Hoists a function declaration to the containing scope.

#### Parameters

##### node

[`FunctionDeclaration`](FunctionDeclaration.md)

#### Returns

`void`

#### Inherited from

[`CoreTransformationContext`](CoreTransformationContext.md).[`hoistFunctionDeclaration`](CoreTransformationContext.md#hoistfunctiondeclaration)

***

### hoistVariableDeclaration()

> **hoistVariableDeclaration**(`node`): `void`

Hoists a variable declaration to the containing scope.

#### Parameters

##### node

[`Identifier`](Identifier.md)

#### Returns

`void`

#### Inherited from

[`CoreTransformationContext`](CoreTransformationContext.md).[`hoistVariableDeclaration`](CoreTransformationContext.md#hoistvariabledeclaration)

***

### isEmitNotificationEnabled()

> **isEmitNotificationEnabled**(`node`): `boolean`

Determines whether before/after emit notifications should be raised in the pretty
printer when it emits a node.

#### Parameters

##### node

[`Node`](Node.md)

#### Returns

`boolean`

***

### isSubstitutionEnabled()

> **isSubstitutionEnabled**(`node`): `boolean`

Determines whether expression substitutions are enabled for the provided node.

#### Parameters

##### node

[`Node`](Node.md)

#### Returns

`boolean`

***

### readEmitHelpers()

> **readEmitHelpers**(): `undefined` \| [`EmitHelper`](../type-aliases/EmitHelper.md)[]

Gets and resets the requested non-scoped emit helpers.

#### Returns

`undefined` \| [`EmitHelper`](../type-aliases/EmitHelper.md)[]

***

### requestEmitHelper()

> **requestEmitHelper**(`helper`): `void`

Records a request for a non-scoped emit helper in the current context.

#### Parameters

##### helper

[`EmitHelper`](../type-aliases/EmitHelper.md)

#### Returns

`void`

***

### resumeLexicalEnvironment()

> **resumeLexicalEnvironment**(): `void`

Resumes a suspended lexical environment, usually before visiting a function body.

#### Returns

`void`

#### Inherited from

[`CoreTransformationContext`](CoreTransformationContext.md).[`resumeLexicalEnvironment`](CoreTransformationContext.md#resumelexicalenvironment)

***

### startLexicalEnvironment()

> **startLexicalEnvironment**(): `void`

Starts a new lexical environment.

#### Returns

`void`

#### Inherited from

[`CoreTransformationContext`](CoreTransformationContext.md).[`startLexicalEnvironment`](CoreTransformationContext.md#startlexicalenvironment)

***

### suspendLexicalEnvironment()

> **suspendLexicalEnvironment**(): `void`

Suspends the current lexical environment, usually after visiting a parameter list.

#### Returns

`void`

#### Inherited from

[`CoreTransformationContext`](CoreTransformationContext.md).[`suspendLexicalEnvironment`](CoreTransformationContext.md#suspendlexicalenvironment)

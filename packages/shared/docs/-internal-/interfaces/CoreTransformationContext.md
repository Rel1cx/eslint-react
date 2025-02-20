[**@eslint-react/shared**](../../README.md)

***

[@eslint-react/shared](../../README.md) / [\<internal\>](../README.md) / CoreTransformationContext

# Interface: CoreTransformationContext

## Extended by

- [`TransformationContext`](TransformationContext.md)

## Properties

### factory

> `readonly` **factory**: [`NodeFactory`](NodeFactory.md)

## Methods

### endLexicalEnvironment()

> **endLexicalEnvironment**(): `undefined` \| [`Statement`](Statement.md)[]

Ends a lexical environment, returning any declarations.

#### Returns

`undefined` \| [`Statement`](Statement.md)[]

***

### getCompilerOptions()

> **getCompilerOptions**(): [`CompilerOptions`](CompilerOptions.md)

Gets the compiler options supplied to the transformer.

#### Returns

[`CompilerOptions`](CompilerOptions.md)

***

### hoistFunctionDeclaration()

> **hoistFunctionDeclaration**(`node`): `void`

Hoists a function declaration to the containing scope.

#### Parameters

##### node

[`FunctionDeclaration`](FunctionDeclaration.md)

#### Returns

`void`

***

### hoistVariableDeclaration()

> **hoistVariableDeclaration**(`node`): `void`

Hoists a variable declaration to the containing scope.

#### Parameters

##### node

[`Identifier`](Identifier.md)

#### Returns

`void`

***

### resumeLexicalEnvironment()

> **resumeLexicalEnvironment**(): `void`

Resumes a suspended lexical environment, usually before visiting a function body.

#### Returns

`void`

***

### startLexicalEnvironment()

> **startLexicalEnvironment**(): `void`

Starts a new lexical environment.

#### Returns

`void`

***

### suspendLexicalEnvironment()

> **suspendLexicalEnvironment**(): `void`

Suspends the current lexical environment, usually after visiting a parameter list.

#### Returns

`void`

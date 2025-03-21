[**@eslint-react/core**](../../README.md)

***

[@eslint-react/core](../../README.md) / [\<internal\>](../README.md) / TSDeclareFunctionWithDeclare

# Interface: TSDeclareFunctionWithDeclare

Function declaration with the `declare` keyword:
```
declare function foo(): void;
```

## Extends

- [`TSDeclareFunctionBase`](TSDeclareFunctionBase.md)

## Properties

### async

> **async**: `false`

TS1040: 'async' modifier cannot be used in an ambient context.

#### Overrides

[`TSDeclareFunctionBase`](TSDeclareFunctionBase.md).[`async`](TSDeclareFunctionBase.md#async)

***

### body

> **body**: `undefined`

TS1183: An implementation cannot be declared in ambient contexts.

#### Inherited from

[`TSDeclareFunctionBase`](TSDeclareFunctionBase.md).[`body`](TSDeclareFunctionBase.md#body)

***

### declare

> **declare**: `true`

Whether the declaration has `declare` modifier.

#### Overrides

[`TSDeclareFunctionBase`](TSDeclareFunctionBase.md).[`declare`](TSDeclareFunctionBase.md#declare)

***

### expression

> **expression**: `false`

This is only ever `true` if and only the node is an `ArrowFunctionExpression` and the body
is an expression:
```
(() => 1)
```

#### Inherited from

[`TSDeclareFunctionBase`](TSDeclareFunctionBase.md).[`expression`](TSDeclareFunctionBase.md#expression)

***

### generator

> **generator**: `false`

TS1221: Generators are not allowed in an ambient context.

#### Overrides

[`TSDeclareFunctionBase`](TSDeclareFunctionBase.md).[`generator`](TSDeclareFunctionBase.md#generator)

***

### id

> **id**: `null` \| [`Identifier`](Identifier.md)

The function's name.
- For an `ArrowFunctionExpression` this is always `null`.
- For a `FunctionExpression` this may be `null` if the name is omitted.
- For a `FunctionDeclaration` or `TSDeclareFunction` this may be `null` if
  and only if the parent is an `ExportDefaultDeclaration`.

#### Inherited from

[`TSDeclareFunctionBase`](TSDeclareFunctionBase.md).[`id`](TSDeclareFunctionBase.md#id)

***

### loc

> **loc**: [`SourceLocation`](SourceLocation.md)

The source location information of the node.

The loc property is defined as nullable by ESTree, but ESLint requires this property.

#### Inherited from

[`TSDeclareFunctionBase`](TSDeclareFunctionBase.md).[`loc`](TSDeclareFunctionBase.md#loc)

***

### params

> **params**: [`Parameter`](../type-aliases/Parameter.md)[]

The list of parameters declared for the function.

#### Inherited from

[`TSDeclareFunctionBase`](TSDeclareFunctionBase.md).[`params`](TSDeclareFunctionBase.md#params)

***

### parent

> **parent**: [`Node`](../type-aliases/Node.md)

#### Inherited from

[`TSDeclareFunctionBase`](TSDeclareFunctionBase.md).[`parent`](TSDeclareFunctionBase.md#parent)

***

### range

> **range**: [`Range`](../type-aliases/Range.md)

#### Inherited from

[`TSDeclareFunctionBase`](TSDeclareFunctionBase.md).[`range`](TSDeclareFunctionBase.md#range)

***

### returnType

> **returnType**: `undefined` \| [`TSTypeAnnotation`](TSTypeAnnotation.md)

The return type annotation for the function.

#### Inherited from

[`TSDeclareFunctionBase`](TSDeclareFunctionBase.md).[`returnType`](TSDeclareFunctionBase.md#returntype)

***

### type

> **type**: [`TSDeclareFunction`](../enumerations/AST_NODE_TYPES.md#tsdeclarefunction)

#### Inherited from

[`TSDeclareFunctionBase`](TSDeclareFunctionBase.md).[`type`](TSDeclareFunctionBase.md#type)

***

### typeParameters

> **typeParameters**: `undefined` \| [`TSTypeParameterDeclaration`](TSTypeParameterDeclaration.md)

The generic type parameter declaration for the function.

#### Inherited from

[`TSDeclareFunctionBase`](TSDeclareFunctionBase.md).[`typeParameters`](TSDeclareFunctionBase.md#typeparameters)

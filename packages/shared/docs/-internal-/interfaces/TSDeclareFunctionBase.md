[**@eslint-react/shared**](../../README.md)

***

[@eslint-react/shared](../../README.md) / [\<internal\>](../README.md) / TSDeclareFunctionBase

# Interface: TSDeclareFunctionBase

## Extends

- [`FunctionBase`](FunctionBase.md)

## Extended by

- [`TSDeclareFunctionNoDeclare`](TSDeclareFunctionNoDeclare.md)
- [`TSDeclareFunctionWithDeclare`](TSDeclareFunctionWithDeclare.md)

## Properties

### async

> **async**: `boolean`

Whether the function is async:
```
async function foo() {}
const x = async function () {}
const x = async () => {}
```

#### Inherited from

[`FunctionBase`](FunctionBase.md).[`async`](FunctionBase.md#async)

***

### body

> **body**: `undefined`

TS1183: An implementation cannot be declared in ambient contexts.

#### Overrides

[`FunctionBase`](FunctionBase.md).[`body`](FunctionBase.md#body)

***

### declare

> **declare**: `boolean`

Whether the declaration has `declare` modifier.

#### Overrides

[`FunctionBase`](FunctionBase.md).[`declare`](FunctionBase.md#declare)

***

### expression

> **expression**: `false`

This is only ever `true` if and only the node is an `ArrowFunctionExpression` and the body
is an expression:
```
(() => 1)
```

#### Overrides

[`FunctionBase`](FunctionBase.md).[`expression`](FunctionBase.md#expression)

***

### generator

> **generator**: `boolean`

Whether the function is a generator function:
```
function *foo() {}
const x = function *() {}
```
This is always `false` for arrow functions as they cannot be generators.

#### Inherited from

[`FunctionBase`](FunctionBase.md).[`generator`](FunctionBase.md#generator)

***

### id

> **id**: `null` \| [`Identifier`](Identifier.md)

The function's name.
- For an `ArrowFunctionExpression` this is always `null`.
- For a `FunctionExpression` this may be `null` if the name is omitted.
- For a `FunctionDeclaration` or `TSDeclareFunction` this may be `null` if
  and only if the parent is an `ExportDefaultDeclaration`.

#### Inherited from

[`FunctionBase`](FunctionBase.md).[`id`](FunctionBase.md#id)

***

### loc

> **loc**: [`SourceLocation`](SourceLocation.md)

The source location information of the node.

The loc property is defined as nullable by ESTree, but ESLint requires this property.

#### Inherited from

[`FunctionBase`](FunctionBase.md).[`loc`](FunctionBase.md#loc)

***

### params

> **params**: [`Parameter`](../type-aliases/Parameter.md)[]

The list of parameters declared for the function.

#### Inherited from

[`FunctionBase`](FunctionBase.md).[`params`](FunctionBase.md#params)

***

### parent

> **parent**: [`Node`](../type-aliases/Node.md)

#### Inherited from

[`FunctionBase`](FunctionBase.md).[`parent`](FunctionBase.md#parent)

***

### range

> **range**: [`Range`](../type-aliases/Range.md)

#### Inherited from

[`FunctionBase`](FunctionBase.md).[`range`](FunctionBase.md#range)

***

### returnType

> **returnType**: `undefined` \| [`TSTypeAnnotation`](TSTypeAnnotation.md)

The return type annotation for the function.

#### Inherited from

[`FunctionBase`](FunctionBase.md).[`returnType`](FunctionBase.md#returntype)

***

### type

> **type**: [`TSDeclareFunction`](../enumerations/AST_NODE_TYPES.md#tsdeclarefunction)

#### Overrides

[`FunctionBase`](FunctionBase.md).[`type`](FunctionBase.md#type)

***

### typeParameters

> **typeParameters**: `undefined` \| [`TSTypeParameterDeclaration`](TSTypeParameterDeclaration.md)

The generic type parameter declaration for the function.

#### Inherited from

[`FunctionBase`](FunctionBase.md).[`typeParameters`](FunctionBase.md#typeparameters)

[**@eslint-react/core**](../../README.md)

***

[@eslint-react/core](../../README.md) / [\<internal\>](../README.md) / TSEmptyBodyFunctionExpression

# Interface: TSEmptyBodyFunctionExpression

## Extends

- [`FunctionBase`](FunctionBase.md)

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

> **body**: `null`

The body of the function.
- For an `ArrowFunctionExpression` this may be an `Expression` or `BlockStatement`.
- For a `FunctionDeclaration` or `FunctionExpression` this is always a `BlockStatement`.
- For a `TSDeclareFunction` this is always `undefined`.
- For a `TSEmptyBodyFunctionExpression` this is always `null`.

#### Overrides

[`FunctionBase`](FunctionBase.md).[`body`](FunctionBase.md#body)

***

### declare

> **declare**: `boolean`

This is only `true` if and only if the node is a `TSDeclareFunction` and it has `declare`:
```
declare function foo() {}
```

#### Inherited from

[`FunctionBase`](FunctionBase.md).[`declare`](FunctionBase.md#declare)

***

### expression

> **expression**: `boolean`

This is only ever `true` if and only the node is an `ArrowFunctionExpression` and the body
is an expression:
```
(() => 1)
```

#### Inherited from

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

> **id**: `null`

The function's name.
- For an `ArrowFunctionExpression` this is always `null`.
- For a `FunctionExpression` this may be `null` if the name is omitted.
- For a `FunctionDeclaration` or `TSDeclareFunction` this may be `null` if
  and only if the parent is an `ExportDefaultDeclaration`.

#### Overrides

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

> **type**: [`TSEmptyBodyFunctionExpression`](../README.md#tsemptybodyfunctionexpression)

#### Overrides

[`FunctionBase`](FunctionBase.md).[`type`](FunctionBase.md#type)

***

### typeParameters

> **typeParameters**: `undefined` \| [`TSTypeParameterDeclaration`](TSTypeParameterDeclaration.md)

The generic type parameter declaration for the function.

#### Inherited from

[`FunctionBase`](FunctionBase.md).[`typeParameters`](FunctionBase.md#typeparameters)

[**@eslint-react/shared**](../../README.md)

***

[@eslint-react/shared](../../README.md) / [\<internal\>](../README.md) / TSDeclareFunctionNoDeclare

# Interface: TSDeclareFunctionNoDeclare

Function declaration without the `declare` keyword:
```
function foo(): void;
```
This can either be an overload signature or a declaration in an ambient context
(e.g. `declare module`)

## Extends

- [`TSDeclareFunctionBase`](TSDeclareFunctionBase.md)

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

[`TSDeclareFunctionBase`](TSDeclareFunctionBase.md).[`async`](TSDeclareFunctionBase.md#async)

***

### body

> **body**: `undefined`

TS1183: An implementation cannot be declared in ambient contexts.

#### Inherited from

[`TSDeclareFunctionBase`](TSDeclareFunctionBase.md).[`body`](TSDeclareFunctionBase.md#body)

***

### declare

> **declare**: `false`

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

- TS1221: Generators are not allowed in an ambient context.
- TS1222: An overload signature cannot be declared as a generator.

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

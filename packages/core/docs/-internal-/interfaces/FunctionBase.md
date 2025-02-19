[**@eslint-react/core**](../../README.md)

***

[@eslint-react/core](../../README.md) / [\<internal\>](../README.md) / FunctionBase

# Interface: FunctionBase

## Extends

- `BaseNode`

## Extended by

- [`FunctionExpression`](FunctionExpression.md)
- [`TSEmptyBodyFunctionExpression`](TSEmptyBodyFunctionExpression.md)
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

***

### body

> **body**: `undefined` \| `null` \| [`BlockStatement`](BlockStatement.md) \| [`Expression`](../type-aliases/Expression.md)

The body of the function.
- For an `ArrowFunctionExpression` this may be an `Expression` or `BlockStatement`.
- For a `FunctionDeclaration` or `FunctionExpression` this is always a `BlockStatement`.
- For a `TSDeclareFunction` this is always `undefined`.
- For a `TSEmptyBodyFunctionExpression` this is always `null`.

***

### declare

> **declare**: `boolean`

This is only `true` if and only if the node is a `TSDeclareFunction` and it has `declare`:
```
declare function foo() {}
```

***

### expression

> **expression**: `boolean`

This is only ever `true` if and only the node is an `ArrowFunctionExpression` and the body
is an expression:
```
(() => 1)
```

***

### generator

> **generator**: `boolean`

Whether the function is a generator function:
```
function *foo() {}
const x = function *() {}
```
This is always `false` for arrow functions as they cannot be generators.

***

### id

> **id**: `null` \| [`Identifier`](Identifier.md)

The function's name.
- For an `ArrowFunctionExpression` this is always `null`.
- For a `FunctionExpression` this may be `null` if the name is omitted.
- For a `FunctionDeclaration` or `TSDeclareFunction` this may be `null` if
  and only if the parent is an `ExportDefaultDeclaration`.

***

### loc

> **loc**: [`SourceLocation`](SourceLocation.md)

The source location information of the node.

The loc property is defined as nullable by ESTree, but ESLint requires this property.

#### Inherited from

`BaseNode.loc`

***

### params

> **params**: [`Parameter`](../type-aliases/Parameter.md)[]

The list of parameters declared for the function.

***

### parent

> **parent**: [`Node`](../type-aliases/Node.md)

#### Inherited from

`BaseNode.parent`

***

### range

> **range**: [`Range`](../type-aliases/Range.md)

#### Inherited from

`BaseNode.range`

***

### returnType

> **returnType**: `undefined` \| [`TSTypeAnnotation`](TSTypeAnnotation.md)

The return type annotation for the function.

***

### type

> **type**: [`AST_NODE_TYPES`](../enumerations/AST_NODE_TYPES.md)

#### Inherited from

`BaseNode.type`

***

### typeParameters

> **typeParameters**: `undefined` \| [`TSTypeParameterDeclaration`](TSTypeParameterDeclaration.md)

The generic type parameter declaration for the function.

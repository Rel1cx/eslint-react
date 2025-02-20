[**@eslint-react/core**](../../README.md)

***

[@eslint-react/core](../../README.md) / [\<internal\>](../README.md) / ArrowFunctionExpression

# Interface: ArrowFunctionExpression

## Extends

- `BaseNode`

## Properties

### async

> **async**: `boolean`

***

### body

> **body**: [`BlockStatement`](BlockStatement.md) \| [`Expression`](../type-aliases/Expression.md)

***

### expression

> **expression**: `boolean`

***

### generator

> **generator**: `boolean`

***

### id

> **id**: `null`

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

***

### type

> **type**: [`ArrowFunctionExpression`](../README.md#arrowfunctionexpression)

#### Overrides

`BaseNode.type`

***

### typeParameters

> **typeParameters**: `undefined` \| [`TSTypeParameterDeclaration`](TSTypeParameterDeclaration.md)

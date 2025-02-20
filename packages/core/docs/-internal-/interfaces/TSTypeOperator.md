[**@eslint-react/core**](../../README.md)

***

[@eslint-react/core](../../README.md) / [\<internal\>](../README.md) / TSTypeOperator

# Interface: TSTypeOperator

## Extends

- `BaseNode`

## Properties

### loc

> **loc**: [`SourceLocation`](SourceLocation.md)

The source location information of the node.

The loc property is defined as nullable by ESTree, but ESLint requires this property.

#### Inherited from

`BaseNode.loc`

***

### operator

> **operator**: `"readonly"` \| `"keyof"` \| `"unique"`

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

### type

> **type**: [`TSTypeOperator`](../README.md#tstypeoperator)

#### Overrides

`BaseNode.type`

***

### typeAnnotation

> **typeAnnotation**: `undefined` \| [`TypeNode`](../type-aliases/TypeNode.md)

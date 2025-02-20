[**@eslint-react/core**](../../README.md)

***

[@eslint-react/core](../../README.md) / [\<internal\>](../README.md) / TemplateLiteral

# Interface: TemplateLiteral

## Extends

- `BaseNode`

## Properties

### expressions

> **expressions**: [`Expression`](../type-aliases/Expression.md)[]

***

### loc

> **loc**: [`SourceLocation`](SourceLocation.md)

The source location information of the node.

The loc property is defined as nullable by ESTree, but ESLint requires this property.

#### Inherited from

`BaseNode.loc`

***

### parent

> **parent**: [`Node`](../type-aliases/Node.md)

#### Inherited from

`BaseNode.parent`

***

### quasis

> **quasis**: `TemplateElement`[]

***

### range

> **range**: [`Range`](../type-aliases/Range.md)

#### Inherited from

`BaseNode.range`

***

### type

> **type**: [`TemplateLiteral`](../README.md#templateliteral)

#### Overrides

`BaseNode.type`

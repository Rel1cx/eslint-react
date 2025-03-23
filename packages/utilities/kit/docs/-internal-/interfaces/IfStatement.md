[**@eslint-react/kit**](../../README.md)

***

[@eslint-react/kit](../../README.md) / [\<internal\>](../README.md) / IfStatement

# Interface: IfStatement

## Extends

- `BaseNode`

## Properties

### alternate

> **alternate**: `null` \| [`Statement`](../type-aliases/Statement.md)

***

### consequent

> **consequent**: [`Statement`](../type-aliases/Statement.md)

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

### range

> **range**: [`Range`](../type-aliases/Range.md)

#### Inherited from

`BaseNode.range`

***

### test

> **test**: [`Expression`](../type-aliases/Expression.md)

***

### type

> **type**: [`IfStatement`](../README.md#ifstatement)

#### Overrides

`BaseNode.type`

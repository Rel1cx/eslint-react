[**@eslint-react/shared**](../../README.md)

***

[@eslint-react/shared](../../README.md) / [\<internal\>](../README.md) / JSXFragment

# Interface: JSXFragment

## Extends

- `BaseNode`

## Properties

### children

> **children**: [`JSXChild`](../type-aliases/JSXChild-1.md)[]

***

### closingFragment

> **closingFragment**: `JSXClosingFragment`

***

### loc

> **loc**: [`SourceLocation`](SourceLocation.md)

The source location information of the node.

The loc property is defined as nullable by ESTree, but ESLint requires this property.

#### Inherited from

`BaseNode.loc`

***

### openingFragment

> **openingFragment**: `JSXOpeningFragment`

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

> **type**: [`JSXFragment`](../README.md#jsxfragment)

#### Overrides

`BaseNode.type`

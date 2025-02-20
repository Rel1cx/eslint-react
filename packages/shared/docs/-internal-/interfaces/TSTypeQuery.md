[**@eslint-react/shared**](../../README.md)

***

[@eslint-react/shared](../../README.md) / [\<internal\>](../README.md) / TSTypeQuery

# Interface: TSTypeQuery

## Extends

- `BaseNode`

## Properties

### exprName

> **exprName**: [`TSImportType`](TSImportType.md) \| [`EntityName`](../type-aliases/EntityName.md)

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

### type

> **type**: [`TSTypeQuery`](../README.md#tstypequery)

#### Overrides

`BaseNode.type`

***

### typeArguments

> **typeArguments**: `undefined` \| [`TSTypeParameterInstantiation`](TSTypeParameterInstantiation.md)

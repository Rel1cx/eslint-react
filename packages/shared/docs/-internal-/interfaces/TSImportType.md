[**@eslint-react/shared**](../../README.md)

***

[@eslint-react/shared](../../README.md) / [\<internal\>](../README.md) / TSImportType

# Interface: TSImportType

## Extends

- `BaseNode`

## Properties

### argument

> **argument**: [`TypeNode`](../type-aliases/TypeNode.md)

***

### attributes

> **attributes**: `ImportAttribute`[]

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

### qualifier

> **qualifier**: `null` \| [`EntityName`](../type-aliases/EntityName.md)

***

### range

> **range**: [`Range`](../type-aliases/Range.md)

#### Inherited from

`BaseNode.range`

***

### type

> **type**: [`TSImportType`](../README.md#tsimporttype)

#### Overrides

`BaseNode.type`

***

### typeArguments

> **typeArguments**: `null` \| [`TSTypeParameterInstantiation`](TSTypeParameterInstantiation.md)

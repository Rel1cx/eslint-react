[**@eslint-react/shared**](../../README.md)

***

[@eslint-react/shared](../../README.md) / [\<internal\>](../README.md) / TSInterfaceDeclaration

# Interface: TSInterfaceDeclaration

## Extends

- `BaseNode`

## Properties

### body

> **body**: `TSInterfaceBody`

The body of the interface

***

### declare

> **declare**: `boolean`

Whether the interface was `declare`d

***

### extends

> **extends**: `TSInterfaceHeritage`[]

The types this interface `extends`

***

### id

> **id**: [`Identifier`](Identifier.md)

The name of this interface

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

> **type**: [`TSInterfaceDeclaration`](../README.md#tsinterfacedeclaration)

#### Overrides

`BaseNode.type`

***

### typeParameters

> **typeParameters**: `undefined` \| [`TSTypeParameterDeclaration`](TSTypeParameterDeclaration.md)

The generic type parameters declared for the interface. Empty declaration
(`<>`) is different from no declaration.

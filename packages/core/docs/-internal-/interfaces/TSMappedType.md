[**@eslint-react/core**](../../README.md)

***

[@eslint-react/core](../../README.md) / [\<internal\>](../README.md) / TSMappedType

# Interface: TSMappedType

## Extends

- `BaseNode`

## Properties

### constraint

> **constraint**: [`TypeNode`](../type-aliases/TypeNode.md)

***

### key

> **key**: [`Identifier`](Identifier.md)

***

### loc

> **loc**: [`SourceLocation`](SourceLocation.md)

The source location information of the node.

The loc property is defined as nullable by ESTree, but ESLint requires this property.

#### Inherited from

`BaseNode.loc`

***

### nameType

> **nameType**: `null` \| [`TypeNode`](../type-aliases/TypeNode.md)

***

### optional

> **optional**: `undefined` \| `boolean` \| `"+"` \| `"-"`

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

### readonly

> **readonly**: `undefined` \| `boolean` \| `"+"` \| `"-"`

***

### type

> **type**: [`TSMappedType`](../README.md#tsmappedtype)

#### Overrides

`BaseNode.type`

***

### typeAnnotation

> **typeAnnotation**: `undefined` \| [`TypeNode`](../type-aliases/TypeNode.md)

***

### ~~typeParameter~~

> **typeParameter**: `TSTypeParameter`

#### Deprecated

Use \`constraint\` and \`key\` instead.

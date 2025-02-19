[**@eslint-react/core**](../../README.md)

***

[@eslint-react/core](../../README.md) / [\<internal\>](../README.md) / TSTypeAliasDeclaration

# Interface: TSTypeAliasDeclaration

## Extends

- `BaseNode`

## Properties

### declare

> **declare**: `boolean`

Whether the type was `declare`d.

#### Example

```ts
declare type T = 1;
```

***

### id

> **id**: [`Identifier`](Identifier.md)

The name of the type.

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

> **type**: [`TSTypeAliasDeclaration`](../README.md#tstypealiasdeclaration)

#### Overrides

`BaseNode.type`

***

### typeAnnotation

> **typeAnnotation**: [`TypeNode`](../type-aliases/TypeNode.md)

The "value" (type) of the declaration

***

### typeParameters

> **typeParameters**: `undefined` \| [`TSTypeParameterDeclaration`](TSTypeParameterDeclaration.md)

The generic type parameters declared for the type. Empty declaration
(`<>`) is different from no declaration.

[**@eslint-react/core**](../../README.md)

***

[@eslint-react/core](../../README.md) / [\<internal\>](../README.md) / TSEnumDeclaration

# Interface: TSEnumDeclaration

## Extends

- `BaseNode`

## Properties

### body

> **body**: `TSEnumBody`

The body of the enum.

***

### const

> **const**: `boolean`

Whether this is a `const` enum.

#### Example

```ts
const enum Foo {}
```

***

### declare

> **declare**: `boolean`

Whether this is a `declare`d enum.

#### Example

```ts
declare enum Foo {}
```

***

### id

> **id**: [`Identifier`](Identifier.md)

The enum name.

***

### loc

> **loc**: [`SourceLocation`](SourceLocation.md)

The source location information of the node.

The loc property is defined as nullable by ESTree, but ESLint requires this property.

#### Inherited from

`BaseNode.loc`

***

### ~~members~~

> **members**: [`TSEnumMember`](../type-aliases/TSEnumMember.md)[]

The enum members.

#### Deprecated

Use [body](TSEnumDeclaration.md#body) instead.

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

> **type**: [`TSEnumDeclaration`](../README.md#tsenumdeclaration)

#### Overrides

`BaseNode.type`

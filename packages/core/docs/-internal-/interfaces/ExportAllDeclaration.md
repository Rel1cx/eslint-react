[**@eslint-react/core**](../../README.md)

***

[@eslint-react/core](../../README.md) / [\<internal\>](../README.md) / ExportAllDeclaration

# Interface: ExportAllDeclaration

## Extends

- `BaseNode`

## Properties

### ~~assertions~~

> **assertions**: `ImportAttribute`[]

The assertions declared for the export.

#### Example

```ts
export * from 'mod' assert \{ type: 'json' \};
```

#### Deprecated

Replaced with \`attributes\`.

***

### attributes

> **attributes**: `ImportAttribute`[]

The attributes declared for the export.

#### Example

```ts
export * from 'mod' with \{ type: 'json' \};
```

***

### exported

> **exported**: `null` \| [`Identifier`](Identifier.md)

The name for the exported items (`as X`). `null` if no name is assigned.

***

### exportKind

> **exportKind**: [`ExportAndImportKind`](../type-aliases/ExportAndImportKind.md)

The kind of the export.

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

### source

> **source**: [`StringLiteral`](StringLiteral.md)

The source module being exported from.

***

### type

> **type**: [`ExportAllDeclaration`](../README.md#exportalldeclaration)

#### Overrides

`BaseNode.type`

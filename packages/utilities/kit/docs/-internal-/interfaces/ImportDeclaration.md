[**@eslint-react/kit**](../../README.md)

***

[@eslint-react/kit](../../README.md) / [\<internal\>](../README.md) / ImportDeclaration

# Interface: ImportDeclaration

## Extends

- `BaseNode`

## Properties

### ~~assertions~~

> **assertions**: `ImportAttribute`[]

The assertions declared for the export.

#### Example

```ts
import * from 'mod' assert \{ type: 'json' \};
```

#### Deprecated

Replaced with \`attributes\`.

***

### attributes

> **attributes**: `ImportAttribute`[]

The attributes declared for the export.

#### Example

```ts
import * from 'mod' with \{ type: 'json' \};
```

***

### importKind

> **importKind**: [`ExportAndImportKind`](../type-aliases/ExportAndImportKind.md)

The kind of the import.

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

The source module being imported from.

***

### specifiers

> **specifiers**: [`ImportClause`](../type-aliases/ImportClause.md)[]

The specifiers being imported.
If this is an empty array then either there are no specifiers:
```
import {} from 'mod';
```
Or it is a side-effect import:
```
import 'mod';
```

***

### type

> **type**: [`ImportDeclaration`](../README.md#importdeclaration)

#### Overrides

`BaseNode.type`

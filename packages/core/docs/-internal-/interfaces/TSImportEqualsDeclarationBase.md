[**@eslint-react/core**](../../README.md)

***

[@eslint-react/core](../../README.md) / [\<internal\>](../README.md) / TSImportEqualsDeclarationBase

# Interface: TSImportEqualsDeclarationBase

## Extends

- `BaseNode`

## Extended by

- [`TSImportEqualsNamespaceDeclaration`](TSImportEqualsNamespaceDeclaration.md)
- [`TSImportEqualsRequireDeclaration`](TSImportEqualsRequireDeclaration.md)

## Properties

### id

> **id**: [`Identifier`](Identifier.md)

The locally imported name.

***

### importKind

> **importKind**: [`ExportAndImportKind`](../type-aliases/ExportAndImportKind.md)

The kind of the import. Always `'value'` unless `moduleReference` is a
`TSExternalModuleReference`.

***

### loc

> **loc**: [`SourceLocation`](SourceLocation.md)

The source location information of the node.

The loc property is defined as nullable by ESTree, but ESLint requires this property.

#### Inherited from

`BaseNode.loc`

***

### moduleReference

> **moduleReference**: [`Identifier`](Identifier.md) \| [`TSExternalModuleReference`](TSExternalModuleReference.md) \| [`TSQualifiedName`](TSQualifiedName.md)

The value being aliased.

#### Example

```ts
import F1 = A;
import F2 = A.B.C;
import F3 = require('mod');
```

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

> **type**: [`TSImportEqualsDeclaration`](../enumerations/AST_NODE_TYPES.md#tsimportequalsdeclaration)

#### Overrides

`BaseNode.type`

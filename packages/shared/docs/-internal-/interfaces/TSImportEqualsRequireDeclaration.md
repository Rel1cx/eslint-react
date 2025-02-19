[**@eslint-react/shared**](../../README.md)

***

[@eslint-react/shared](../../README.md) / [\<internal\>](../README.md) / TSImportEqualsRequireDeclaration

# Interface: TSImportEqualsRequireDeclaration

## Extends

- [`TSImportEqualsDeclarationBase`](TSImportEqualsDeclarationBase.md)

## Properties

### id

> **id**: [`Identifier`](Identifier.md)

The locally imported name.

#### Inherited from

[`TSImportEqualsDeclarationBase`](TSImportEqualsDeclarationBase.md).[`id`](TSImportEqualsDeclarationBase.md#id)

***

### importKind

> **importKind**: [`ExportAndImportKind`](../type-aliases/ExportAndImportKind.md)

The kind of the import.

#### Overrides

[`TSImportEqualsDeclarationBase`](TSImportEqualsDeclarationBase.md).[`importKind`](TSImportEqualsDeclarationBase.md#importkind)

***

### loc

> **loc**: [`SourceLocation`](SourceLocation.md)

The source location information of the node.

The loc property is defined as nullable by ESTree, but ESLint requires this property.

#### Inherited from

[`TSImportEqualsDeclarationBase`](TSImportEqualsDeclarationBase.md).[`loc`](TSImportEqualsDeclarationBase.md#loc)

***

### moduleReference

> **moduleReference**: [`TSExternalModuleReference`](TSExternalModuleReference.md)

The value being aliased.
```
import F3 = require('mod');
```

#### Overrides

[`TSImportEqualsDeclarationBase`](TSImportEqualsDeclarationBase.md).[`moduleReference`](TSImportEqualsDeclarationBase.md#modulereference)

***

### parent

> **parent**: [`Node`](../type-aliases/Node.md)

#### Inherited from

[`TSImportEqualsDeclarationBase`](TSImportEqualsDeclarationBase.md).[`parent`](TSImportEqualsDeclarationBase.md#parent)

***

### range

> **range**: [`Range`](../type-aliases/Range.md)

#### Inherited from

[`TSImportEqualsDeclarationBase`](TSImportEqualsDeclarationBase.md).[`range`](TSImportEqualsDeclarationBase.md#range)

***

### type

> **type**: [`TSImportEqualsDeclaration`](../enumerations/AST_NODE_TYPES.md#tsimportequalsdeclaration)

#### Inherited from

[`TSImportEqualsDeclarationBase`](TSImportEqualsDeclarationBase.md).[`type`](TSImportEqualsDeclarationBase.md#type)

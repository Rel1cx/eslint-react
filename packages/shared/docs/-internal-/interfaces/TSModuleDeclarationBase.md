[**@eslint-react/shared**](../../README.md)

***

[@eslint-react/shared](../../README.md) / [\<internal\>](../README.md) / TSModuleDeclarationBase

# Interface: TSModuleDeclarationBase

## Extends

- `BaseNode`

## Extended by

- [`TSModuleDeclarationGlobal`](TSModuleDeclarationGlobal.md)
- [`TSModuleDeclarationNamespace`](TSModuleDeclarationNamespace.md)
- [`TSModuleDeclarationModuleBase`](TSModuleDeclarationModuleBase.md)

## Properties

### body?

> `optional` **body**: `TSModuleBlock`

The body of the module.
This can only be `undefined` for the code `declare module 'mod';`

***

### declare

> **declare**: `boolean`

Whether the module is `declare`d

#### Example

```ts
declare namespace F {}
```

***

### ~~global~~

> **global**: `boolean`

Whether this is a global declaration

#### Example

```ts
declare global {}
```

#### Deprecated

Use [kind](TSModuleDeclarationBase.md#kind) instead

***

### id

> **id**: [`Identifier`](Identifier.md) \| [`Literal`](../type-aliases/Literal.md) \| [`TSQualifiedName`](TSQualifiedName.md)

The name of the module
```
namespace A {}
namespace A.B.C {}
module 'a' {}
```

***

### kind

> **kind**: [`TSModuleDeclarationKind`](../type-aliases/TSModuleDeclarationKind.md)

The keyword used to define this module declaration

#### Example

```ts
namespace Foo {}
^^^^^^^^^

module 'foo' {}
^^^^^^

global {}
^^^^^^
```

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

> **type**: [`TSModuleDeclaration`](../enumerations/AST_NODE_TYPES.md#tsmoduledeclaration)

#### Overrides

`BaseNode.type`

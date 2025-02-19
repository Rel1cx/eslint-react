[**@eslint-react/shared**](../../README.md)

***

[@eslint-react/shared](../../README.md) / [\<internal\>](../README.md) / TSModuleDeclarationNamespace

# Interface: TSModuleDeclarationNamespace

## Extends

- [`TSModuleDeclarationBase`](TSModuleDeclarationBase.md)

## Properties

### body

> **body**: `TSModuleBlock`

The body of the module.
This can only be `undefined` for the code `declare module 'mod';`

#### Overrides

[`TSModuleDeclarationBase`](TSModuleDeclarationBase.md).[`body`](TSModuleDeclarationBase.md#body)

***

### declare

> **declare**: `boolean`

Whether the module is `declare`d

#### Example

```ts
declare namespace F {}
```

#### Inherited from

[`TSModuleDeclarationBase`](TSModuleDeclarationBase.md).[`declare`](TSModuleDeclarationBase.md#declare)

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

#### Inherited from

[`TSModuleDeclarationBase`](TSModuleDeclarationBase.md).[`global`](TSModuleDeclarationBase.md#global)

***

### id

> **id**: [`Identifier`](Identifier.md) \| [`TSQualifiedName`](TSQualifiedName.md)

The name of the module
```
namespace A {}
namespace A.B.C {}
module 'a' {}
```

#### Overrides

[`TSModuleDeclarationBase`](TSModuleDeclarationBase.md).[`id`](TSModuleDeclarationBase.md#id)

***

### kind

> **kind**: `"namespace"`

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

#### Overrides

[`TSModuleDeclarationBase`](TSModuleDeclarationBase.md).[`kind`](TSModuleDeclarationBase.md#kind)

***

### loc

> **loc**: [`SourceLocation`](SourceLocation.md)

The source location information of the node.

The loc property is defined as nullable by ESTree, but ESLint requires this property.

#### Inherited from

[`TSModuleDeclarationBase`](TSModuleDeclarationBase.md).[`loc`](TSModuleDeclarationBase.md#loc)

***

### parent

> **parent**: [`Node`](../type-aliases/Node.md)

#### Inherited from

[`TSModuleDeclarationBase`](TSModuleDeclarationBase.md).[`parent`](TSModuleDeclarationBase.md#parent)

***

### range

> **range**: [`Range`](../type-aliases/Range.md)

#### Inherited from

[`TSModuleDeclarationBase`](TSModuleDeclarationBase.md).[`range`](TSModuleDeclarationBase.md#range)

***

### type

> **type**: [`TSModuleDeclaration`](../enumerations/AST_NODE_TYPES.md#tsmoduledeclaration)

#### Inherited from

[`TSModuleDeclarationBase`](TSModuleDeclarationBase.md).[`type`](TSModuleDeclarationBase.md#type)

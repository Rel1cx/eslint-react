[**@eslint-react/core**](../../README.md)

***

[@eslint-react/core](../../README.md) / [\<internal\>](../README.md) / TSModuleDeclarationModuleWithIdentifierId

# Interface: TSModuleDeclarationModuleWithIdentifierId

The legacy module declaration, replaced with namespace declarations.
```
module A {}
```

## Extends

- [`TSModuleDeclarationModuleBase`](TSModuleDeclarationModuleBase.md)

## Properties

### body

> **body**: `TSModuleBlock`

The body of the module.
This can only be `undefined` for the code `declare module 'mod';`

#### Overrides

[`TSModuleDeclarationModuleBase`](TSModuleDeclarationModuleBase.md).[`body`](TSModuleDeclarationModuleBase.md#body)

***

### declare

> **declare**: `boolean`

Whether the module is `declare`d

#### Example

```ts
declare namespace F {}
```

#### Inherited from

[`TSModuleDeclarationModuleBase`](TSModuleDeclarationModuleBase.md).[`declare`](TSModuleDeclarationModuleBase.md#declare)

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

[`TSModuleDeclarationModuleBase`](TSModuleDeclarationModuleBase.md).[`global`](TSModuleDeclarationModuleBase.md#global)

***

### id

> **id**: [`Identifier`](Identifier.md)

The name of the module
```
namespace A {}
namespace A.B.C {}
module 'a' {}
```

#### Overrides

[`TSModuleDeclarationModuleBase`](TSModuleDeclarationModuleBase.md).[`id`](TSModuleDeclarationModuleBase.md#id)

***

### kind

> **kind**: `"module"`

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

[`TSModuleDeclarationModuleBase`](TSModuleDeclarationModuleBase.md).[`kind`](TSModuleDeclarationModuleBase.md#kind)

***

### loc

> **loc**: [`SourceLocation`](SourceLocation.md)

The source location information of the node.

The loc property is defined as nullable by ESTree, but ESLint requires this property.

#### Inherited from

[`TSModuleDeclarationModuleBase`](TSModuleDeclarationModuleBase.md).[`loc`](TSModuleDeclarationModuleBase.md#loc)

***

### parent

> **parent**: [`Node`](../type-aliases/Node.md)

#### Inherited from

[`TSModuleDeclarationModuleBase`](TSModuleDeclarationModuleBase.md).[`parent`](TSModuleDeclarationModuleBase.md#parent)

***

### range

> **range**: [`Range`](../type-aliases/Range.md)

#### Inherited from

[`TSModuleDeclarationModuleBase`](TSModuleDeclarationModuleBase.md).[`range`](TSModuleDeclarationModuleBase.md#range)

***

### type

> **type**: [`TSModuleDeclaration`](../enumerations/AST_NODE_TYPES.md#tsmoduledeclaration)

#### Inherited from

[`TSModuleDeclarationModuleBase`](TSModuleDeclarationModuleBase.md).[`type`](TSModuleDeclarationModuleBase.md#type)

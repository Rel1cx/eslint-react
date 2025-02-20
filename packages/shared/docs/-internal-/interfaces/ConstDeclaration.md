[**@eslint-react/shared**](../../README.md)

***

[@eslint-react/shared](../../README.md) / [\<internal\>](../README.md) / ConstDeclaration

# Interface: ConstDeclaration

## Extends

- [`LetOrConstOrVarDeclarationBase`](LetOrConstOrVarDeclarationBase.md)

## Properties

### declarations

> **declarations**: `VariableDeclaratorMaybeInit`[]

In a `declare const` declaration, the declarators may have initializers, but
not definite assignment assertions. Each declarator cannot have both an
initializer and a type annotation.

Even if the declaration has no `declare`, it may still be ambient and have
no initializer.

#### Overrides

[`LetOrConstOrVarDeclarationBase`](LetOrConstOrVarDeclarationBase.md).[`declarations`](LetOrConstOrVarDeclarationBase.md#declarations)

***

### declare

> **declare**: `boolean`

Whether the declaration is `declare`d

#### Example

```ts
declare const x = 1;
```

#### Inherited from

[`LetOrConstOrVarDeclarationBase`](LetOrConstOrVarDeclarationBase.md).[`declare`](LetOrConstOrVarDeclarationBase.md#declare)

***

### kind

> **kind**: `"const"`

The keyword used to declare the variable(s)

#### Example

```ts
const x = 1;
let y = 2;
var z = 3;
```

#### Overrides

[`LetOrConstOrVarDeclarationBase`](LetOrConstOrVarDeclarationBase.md).[`kind`](LetOrConstOrVarDeclarationBase.md#kind)

***

### loc

> **loc**: [`SourceLocation`](SourceLocation.md)

The source location information of the node.

The loc property is defined as nullable by ESTree, but ESLint requires this property.

#### Inherited from

[`LetOrConstOrVarDeclarationBase`](LetOrConstOrVarDeclarationBase.md).[`loc`](LetOrConstOrVarDeclarationBase.md#loc)

***

### parent

> **parent**: [`Node`](../type-aliases/Node.md)

#### Inherited from

[`LetOrConstOrVarDeclarationBase`](LetOrConstOrVarDeclarationBase.md).[`parent`](LetOrConstOrVarDeclarationBase.md#parent)

***

### range

> **range**: [`Range`](../type-aliases/Range.md)

#### Inherited from

[`LetOrConstOrVarDeclarationBase`](LetOrConstOrVarDeclarationBase.md).[`range`](LetOrConstOrVarDeclarationBase.md#range)

***

### type

> **type**: [`VariableDeclaration`](../enumerations/AST_NODE_TYPES.md#variabledeclaration)

#### Inherited from

[`LetOrConstOrVarDeclarationBase`](LetOrConstOrVarDeclarationBase.md).[`type`](LetOrConstOrVarDeclarationBase.md#type)

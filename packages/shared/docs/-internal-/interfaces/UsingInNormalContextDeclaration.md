[**@eslint-react/shared**](../../README.md)

***

[@eslint-react/shared](../../README.md) / [\<internal\>](../README.md) / UsingInNormalContextDeclaration

# Interface: UsingInNormalContextDeclaration

## Extends

- [`UsingDeclarationBase`](UsingDeclarationBase.md)

## Properties

### declarations

> **declarations**: `UsingInNormalContextDeclarator`[]

The variables declared by this declaration.
Always non-empty.

#### Example

```ts
using x = 1;
using y = 1, z = 2;
```

***

### declare

> **declare**: `false`

This value will always be `false`
because 'declare' modifier cannot appear on a 'using' declaration.

#### Inherited from

[`UsingDeclarationBase`](UsingDeclarationBase.md).[`declare`](UsingDeclarationBase.md#declare)

***

### kind

> **kind**: `"await using"` \| `"using"`

The keyword used to declare the variable(s)

#### Example

```ts
using x = 1;
await using y = 2;
```

#### Inherited from

[`UsingDeclarationBase`](UsingDeclarationBase.md).[`kind`](UsingDeclarationBase.md#kind)

***

### loc

> **loc**: [`SourceLocation`](SourceLocation.md)

The source location information of the node.

The loc property is defined as nullable by ESTree, but ESLint requires this property.

#### Inherited from

[`UsingDeclarationBase`](UsingDeclarationBase.md).[`loc`](UsingDeclarationBase.md#loc)

***

### parent

> **parent**: [`Node`](../type-aliases/Node.md)

#### Inherited from

[`UsingDeclarationBase`](UsingDeclarationBase.md).[`parent`](UsingDeclarationBase.md#parent)

***

### range

> **range**: [`Range`](../type-aliases/Range.md)

#### Inherited from

[`UsingDeclarationBase`](UsingDeclarationBase.md).[`range`](UsingDeclarationBase.md#range)

***

### type

> **type**: [`VariableDeclaration`](../enumerations/AST_NODE_TYPES.md#variabledeclaration)

#### Inherited from

[`UsingDeclarationBase`](UsingDeclarationBase.md).[`type`](UsingDeclarationBase.md#type)

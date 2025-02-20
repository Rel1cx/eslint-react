[**@eslint-react/shared**](../../README.md)

***

[@eslint-react/shared](../../README.md) / [\<internal\>](../README.md) / UsingDeclarationBase

# Interface: UsingDeclarationBase

## Extends

- `BaseNode`

## Extended by

- [`UsingInForOfDeclaration`](UsingInForOfDeclaration.md)
- [`UsingInNormalContextDeclaration`](UsingInNormalContextDeclaration.md)

## Properties

### declare

> **declare**: `false`

This value will always be `false`
because 'declare' modifier cannot appear on a 'using' declaration.

***

### kind

> **kind**: `"await using"` \| `"using"`

The keyword used to declare the variable(s)

#### Example

```ts
using x = 1;
await using y = 2;
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

> **type**: [`VariableDeclaration`](../enumerations/AST_NODE_TYPES.md#variabledeclaration)

#### Overrides

`BaseNode.type`

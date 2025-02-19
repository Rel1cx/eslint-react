[**@eslint-react/shared**](../../README.md)

***

[@eslint-react/shared](../../README.md) / [\<internal\>](../README.md) / LetOrConstOrVarDeclarationBase

# Interface: LetOrConstOrVarDeclarationBase

## Extends

- `BaseNode`

## Extended by

- [`ConstDeclaration`](ConstDeclaration.md)
- [`LetOrVarDeclaredDeclaration`](LetOrVarDeclaredDeclaration.md)
- [`LetOrVarNonDeclaredDeclaration`](LetOrVarNonDeclaredDeclaration.md)

## Properties

### declarations

> **declarations**: [`LetOrConstOrVarDeclarator`](../type-aliases/LetOrConstOrVarDeclarator.md)[]

The variables declared by this declaration.
Always non-empty.

#### Example

```ts
let x;
let y, z;
```

***

### declare

> **declare**: `boolean`

Whether the declaration is `declare`d

#### Example

```ts
declare const x = 1;
```

***

### kind

> **kind**: `"var"` \| `"const"` \| `"let"`

The keyword used to declare the variable(s)

#### Example

```ts
const x = 1;
let y = 2;
var z = 3;
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

[**@eslint-react/core**](../../README.md)

***

[@eslint-react/core](../../README.md) / [\<internal\>](../README.md) / LetOrVarDeclaredDeclaration

# Interface: LetOrVarDeclaredDeclaration

## Extends

- [`LetOrConstOrVarDeclarationBase`](LetOrConstOrVarDeclarationBase.md)

## Properties

### declarations

> **declarations**: `VariableDeclaratorNoInit`[]

In a `declare let` declaration, the declarators must not have definite assignment
assertions or initializers.

#### Example

```ts
using x = 1;
using y =1, z = 2;
```

#### Overrides

[`LetOrConstOrVarDeclarationBase`](LetOrConstOrVarDeclarationBase.md).[`declarations`](LetOrConstOrVarDeclarationBase.md#declarations)

***

### declare

> **declare**: `true`

Whether the declaration is `declare`d

#### Example

```ts
declare const x = 1;
```

#### Overrides

[`LetOrConstOrVarDeclarationBase`](LetOrConstOrVarDeclarationBase.md).[`declare`](LetOrConstOrVarDeclarationBase.md#declare)

***

### kind

> **kind**: `"let"` \| `"var"`

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

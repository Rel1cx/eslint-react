[**@eslint-react/core**](../../README.md)

***

[@eslint-react/core](../../README.md) / [\<internal\>](../README.md) / ClassBase

# Interface: ClassBase

## Extends

- `BaseNode`

## Extended by

- [`ClassExpression`](ClassExpression.md)
- [`ClassDeclarationBase`](ClassDeclarationBase.md)

## Properties

### abstract

> **abstract**: `boolean`

Whether the class is an abstract class.

#### Example

```ts
abstract class Foo {}
```

***

### body

> **body**: `ClassBody`

The class body.

***

### declare

> **declare**: `boolean`

Whether the class has been `declare`d:

#### Example

```ts
declare class Foo {}
```

***

### decorators

> **decorators**: [`Decorator`](Decorator.md)[]

The decorators declared for the class.

#### Example

```ts
@deco
class Foo {}
```

***

### id

> **id**: `null` \| [`Identifier`](Identifier.md)

The class's name.
- For a `ClassExpression` this may be `null` if the name is omitted.
- For a `ClassDeclaration` this may be `null` if and only if the parent is
  an `ExportDefaultDeclaration`.

***

### implements

> **implements**: `TSClassImplements`[]

The implemented interfaces for the class.

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

### superClass

> **superClass**: `null` \| [`LeftHandSideExpression`](../type-aliases/LeftHandSideExpression.md)

The super class this class extends.

***

### superTypeArguments

> **superTypeArguments**: `undefined` \| [`TSTypeParameterInstantiation`](TSTypeParameterInstantiation.md)

The generic type parameters passed to the superClass.

***

### type

> **type**: [`AST_NODE_TYPES`](../enumerations/AST_NODE_TYPES.md)

#### Inherited from

`BaseNode.type`

***

### typeParameters

> **typeParameters**: `undefined` \| [`TSTypeParameterDeclaration`](TSTypeParameterDeclaration.md)

The generic type parameters declared for the class.

[**@eslint-react/core**](../../README.md)

***

[@eslint-react/core](../../README.md) / [\<internal\>](../README.md) / ClassDeclarationBase

# Interface: ClassDeclarationBase

## Extends

- [`ClassBase`](ClassBase.md)

## Extended by

- [`ClassDeclarationWithName`](ClassDeclarationWithName.md)
- [`ClassDeclarationWithOptionalName`](ClassDeclarationWithOptionalName.md)

## Properties

### abstract

> **abstract**: `boolean`

Whether the class is an abstract class.

#### Example

```ts
abstract class Foo {}
```

#### Inherited from

[`ClassBase`](ClassBase.md).[`abstract`](ClassBase.md#abstract)

***

### body

> **body**: `ClassBody`

The class body.

#### Inherited from

[`ClassBase`](ClassBase.md).[`body`](ClassBase.md#body)

***

### declare

> **declare**: `boolean`

Whether the class has been `declare`d:

#### Example

```ts
declare class Foo {}
```

#### Inherited from

[`ClassBase`](ClassBase.md).[`declare`](ClassBase.md#declare)

***

### decorators

> **decorators**: [`Decorator`](Decorator.md)[]

The decorators declared for the class.

#### Example

```ts
@deco
class Foo {}
```

#### Inherited from

[`ClassBase`](ClassBase.md).[`decorators`](ClassBase.md#decorators)

***

### id

> **id**: `null` \| [`Identifier`](Identifier.md)

The class's name.
- For a `ClassExpression` this may be `null` if the name is omitted.
- For a `ClassDeclaration` this may be `null` if and only if the parent is
  an `ExportDefaultDeclaration`.

#### Inherited from

[`ClassBase`](ClassBase.md).[`id`](ClassBase.md#id)

***

### implements

> **implements**: `TSClassImplements`[]

The implemented interfaces for the class.

#### Inherited from

[`ClassBase`](ClassBase.md).[`implements`](ClassBase.md#implements)

***

### loc

> **loc**: [`SourceLocation`](SourceLocation.md)

The source location information of the node.

The loc property is defined as nullable by ESTree, but ESLint requires this property.

#### Inherited from

[`ClassBase`](ClassBase.md).[`loc`](ClassBase.md#loc)

***

### parent

> **parent**: [`Node`](../type-aliases/Node.md)

#### Inherited from

[`ClassBase`](ClassBase.md).[`parent`](ClassBase.md#parent)

***

### range

> **range**: [`Range`](../type-aliases/Range.md)

#### Inherited from

[`ClassBase`](ClassBase.md).[`range`](ClassBase.md#range)

***

### superClass

> **superClass**: `null` \| [`LeftHandSideExpression`](../type-aliases/LeftHandSideExpression.md)

The super class this class extends.

#### Inherited from

[`ClassBase`](ClassBase.md).[`superClass`](ClassBase.md#superclass)

***

### superTypeArguments

> **superTypeArguments**: `undefined` \| [`TSTypeParameterInstantiation`](TSTypeParameterInstantiation.md)

The generic type parameters passed to the superClass.

#### Inherited from

[`ClassBase`](ClassBase.md).[`superTypeArguments`](ClassBase.md#supertypearguments)

***

### type

> **type**: [`ClassDeclaration`](../enumerations/AST_NODE_TYPES.md#classdeclaration)

#### Overrides

[`ClassBase`](ClassBase.md).[`type`](ClassBase.md#type)

***

### typeParameters

> **typeParameters**: `undefined` \| [`TSTypeParameterDeclaration`](TSTypeParameterDeclaration.md)

The generic type parameters declared for the class.

#### Inherited from

[`ClassBase`](ClassBase.md).[`typeParameters`](ClassBase.md#typeparameters)

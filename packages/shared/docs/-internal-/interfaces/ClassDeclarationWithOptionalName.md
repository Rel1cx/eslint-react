[**@eslint-react/shared**](../../README.md)

***

[@eslint-react/shared](../../README.md) / [\<internal\>](../README.md) / ClassDeclarationWithOptionalName

# Interface: ClassDeclarationWithOptionalName

Default-exported class declarations have optional names:
```
export default class {}
```

## Extends

- [`ClassDeclarationBase`](ClassDeclarationBase.md)

## Properties

### abstract

> **abstract**: `boolean`

Whether the class is an abstract class.

#### Example

```ts
abstract class Foo {}
```

#### Inherited from

[`ClassDeclarationBase`](ClassDeclarationBase.md).[`abstract`](ClassDeclarationBase.md#abstract)

***

### body

> **body**: `ClassBody`

The class body.

#### Inherited from

[`ClassDeclarationBase`](ClassDeclarationBase.md).[`body`](ClassDeclarationBase.md#body)

***

### declare

> **declare**: `boolean`

Whether the class has been `declare`d:

#### Example

```ts
declare class Foo {}
```

#### Inherited from

[`ClassDeclarationBase`](ClassDeclarationBase.md).[`declare`](ClassDeclarationBase.md#declare)

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

[`ClassDeclarationBase`](ClassDeclarationBase.md).[`decorators`](ClassDeclarationBase.md#decorators)

***

### id

> **id**: `null` \| [`Identifier`](Identifier.md)

The class's name.
- For a `ClassExpression` this may be `null` if the name is omitted.
- For a `ClassDeclaration` this may be `null` if and only if the parent is
  an `ExportDefaultDeclaration`.

#### Overrides

[`ClassDeclarationBase`](ClassDeclarationBase.md).[`id`](ClassDeclarationBase.md#id)

***

### implements

> **implements**: `TSClassImplements`[]

The implemented interfaces for the class.

#### Inherited from

[`ClassDeclarationBase`](ClassDeclarationBase.md).[`implements`](ClassDeclarationBase.md#implements)

***

### loc

> **loc**: [`SourceLocation`](SourceLocation.md)

The source location information of the node.

The loc property is defined as nullable by ESTree, but ESLint requires this property.

#### Inherited from

[`ClassDeclarationBase`](ClassDeclarationBase.md).[`loc`](ClassDeclarationBase.md#loc)

***

### parent

> **parent**: [`Node`](../type-aliases/Node.md)

#### Inherited from

[`ClassDeclarationBase`](ClassDeclarationBase.md).[`parent`](ClassDeclarationBase.md#parent)

***

### range

> **range**: [`Range`](../type-aliases/Range.md)

#### Inherited from

[`ClassDeclarationBase`](ClassDeclarationBase.md).[`range`](ClassDeclarationBase.md#range)

***

### superClass

> **superClass**: `null` \| [`LeftHandSideExpression`](../type-aliases/LeftHandSideExpression.md)

The super class this class extends.

#### Inherited from

[`ClassDeclarationBase`](ClassDeclarationBase.md).[`superClass`](ClassDeclarationBase.md#superclass)

***

### superTypeArguments

> **superTypeArguments**: `undefined` \| [`TSTypeParameterInstantiation`](TSTypeParameterInstantiation.md)

The generic type parameters passed to the superClass.

#### Inherited from

[`ClassDeclarationBase`](ClassDeclarationBase.md).[`superTypeArguments`](ClassDeclarationBase.md#supertypearguments)

***

### type

> **type**: [`ClassDeclaration`](../README.md#classdeclaration)

#### Inherited from

[`ClassDeclarationBase`](ClassDeclarationBase.md).[`type`](ClassDeclarationBase.md#type)

***

### typeParameters

> **typeParameters**: `undefined` \| [`TSTypeParameterDeclaration`](TSTypeParameterDeclaration.md)

The generic type parameters declared for the class.

#### Inherited from

[`ClassDeclarationBase`](ClassDeclarationBase.md).[`typeParameters`](ClassDeclarationBase.md#typeparameters)

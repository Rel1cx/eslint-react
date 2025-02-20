[**@eslint-react/core**](../../README.md)

***

[@eslint-react/core](../../README.md) / [\<internal\>](../README.md) / Type

# Interface: Type

## Extended by

- [`UnionOrIntersectionType`](UnionOrIntersectionType.md)
- [`ObjectType`](ObjectType.md)
- [`InstantiableType`](InstantiableType.md)
- [`FreshableType`](FreshableType.md)

## Properties

### aliasSymbol?

> `optional` **aliasSymbol**: [`Symbol`](Symbol.md)

***

### aliasTypeArguments?

> `optional` **aliasTypeArguments**: readonly [`Type`](Type.md)[]

***

### flags

> **flags**: [`TypeFlags`](../enumerations/TypeFlags.md)

***

### pattern?

> `optional` **pattern**: [`DestructuringPattern`](../type-aliases/DestructuringPattern.md)

***

### symbol

> **symbol**: [`Symbol`](Symbol.md)

## Methods

### getApparentProperties()

> **getApparentProperties**(): [`Symbol`](Symbol.md)[]

#### Returns

[`Symbol`](Symbol.md)[]

***

### getBaseTypes()

> **getBaseTypes**(): `undefined` \| [`BaseType`](../type-aliases/BaseType.md)[]

#### Returns

`undefined` \| [`BaseType`](../type-aliases/BaseType.md)[]

***

### getCallSignatures()

> **getCallSignatures**(): readonly [`Signature`](Signature.md)[]

#### Returns

readonly [`Signature`](Signature.md)[]

***

### getConstraint()

> **getConstraint**(): `undefined` \| [`Type`](Type.md)

#### Returns

`undefined` \| [`Type`](Type.md)

***

### getConstructSignatures()

> **getConstructSignatures**(): readonly [`Signature`](Signature.md)[]

#### Returns

readonly [`Signature`](Signature.md)[]

***

### getDefault()

> **getDefault**(): `undefined` \| [`Type`](Type.md)

#### Returns

`undefined` \| [`Type`](Type.md)

***

### getFlags()

> **getFlags**(): [`TypeFlags`](../enumerations/TypeFlags.md)

#### Returns

[`TypeFlags`](../enumerations/TypeFlags.md)

***

### getNonNullableType()

> **getNonNullableType**(): [`Type`](Type.md)

#### Returns

[`Type`](Type.md)

***

### getNumberIndexType()

> **getNumberIndexType**(): `undefined` \| [`Type`](Type.md)

#### Returns

`undefined` \| [`Type`](Type.md)

***

### getProperties()

> **getProperties**(): [`Symbol`](Symbol.md)[]

#### Returns

[`Symbol`](Symbol.md)[]

***

### getProperty()

> **getProperty**(`propertyName`): `undefined` \| [`Symbol`](Symbol.md)

#### Parameters

##### propertyName

`string`

#### Returns

`undefined` \| [`Symbol`](Symbol.md)

***

### getStringIndexType()

> **getStringIndexType**(): `undefined` \| [`Type`](Type.md)

#### Returns

`undefined` \| [`Type`](Type.md)

***

### getSymbol()

> **getSymbol**(): `undefined` \| [`Symbol`](Symbol.md)

#### Returns

`undefined` \| [`Symbol`](Symbol.md)

***

### isClass()

> **isClass**(): `this is InterfaceType`

#### Returns

`this is InterfaceType`

***

### isClassOrInterface()

> **isClassOrInterface**(): `this is InterfaceType`

#### Returns

`this is InterfaceType`

***

### isIndexType()

> **isIndexType**(): `this is IndexType`

#### Returns

`this is IndexType`

***

### isIntersection()

> **isIntersection**(): `this is IntersectionType`

#### Returns

`this is IntersectionType`

***

### isLiteral()

> **isLiteral**(): `this is LiteralType`

#### Returns

`this is LiteralType`

***

### isNumberLiteral()

> **isNumberLiteral**(): `this is NumberLiteralType`

#### Returns

`this is NumberLiteralType`

***

### isStringLiteral()

> **isStringLiteral**(): `this is StringLiteralType`

#### Returns

`this is StringLiteralType`

***

### isTypeParameter()

> **isTypeParameter**(): `this is TypeParameter`

#### Returns

`this is TypeParameter`

***

### isUnion()

> **isUnion**(): `this is UnionType`

#### Returns

`this is UnionType`

***

### isUnionOrIntersection()

> **isUnionOrIntersection**(): `this is UnionOrIntersectionType`

#### Returns

`this is UnionOrIntersectionType`

[**@eslint-react/kit**](../../README.md)

***

[@eslint-react/kit](../../README.md) / [\<internal\>](../README.md) / Type

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

> `optional` **aliasTypeArguments**: readonly `Type`[]

***

### flags

> **flags**: [`TypeFlags`](../enumerations/TypeFlags.md)

***

### pattern?

> `optional` **pattern**: [`DestructuringPattern`](../type-aliases/DestructuringPattern-1.md)

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

> **getConstraint**(): `undefined` \| `Type`

#### Returns

`undefined` \| `Type`

***

### getConstructSignatures()

> **getConstructSignatures**(): readonly [`Signature`](Signature.md)[]

#### Returns

readonly [`Signature`](Signature.md)[]

***

### getDefault()

> **getDefault**(): `undefined` \| `Type`

#### Returns

`undefined` \| `Type`

***

### getFlags()

> **getFlags**(): [`TypeFlags`](../enumerations/TypeFlags.md)

#### Returns

[`TypeFlags`](../enumerations/TypeFlags.md)

***

### getNonNullableType()

> **getNonNullableType**(): `Type`

#### Returns

`Type`

***

### getNumberIndexType()

> **getNumberIndexType**(): `undefined` \| `Type`

#### Returns

`undefined` \| `Type`

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

> **getStringIndexType**(): `undefined` \| `Type`

#### Returns

`undefined` \| `Type`

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

[**@eslint-react/shared**](../../README.md)

***

[@eslint-react/shared](../../README.md) / [\<internal\>](../README.md) / UnionType

# Interface: UnionType

## Extends

- [`UnionOrIntersectionType`](UnionOrIntersectionType.md)

## Properties

### aliasSymbol?

> `optional` **aliasSymbol**: [`Symbol`](Symbol.md)

#### Inherited from

[`UnionOrIntersectionType`](UnionOrIntersectionType.md).[`aliasSymbol`](UnionOrIntersectionType.md#aliassymbol)

***

### aliasTypeArguments?

> `optional` **aliasTypeArguments**: readonly [`Type`](Type.md)[]

#### Inherited from

[`UnionOrIntersectionType`](UnionOrIntersectionType.md).[`aliasTypeArguments`](UnionOrIntersectionType.md#aliastypearguments)

***

### flags

> **flags**: [`TypeFlags`](../enumerations/TypeFlags.md)

#### Inherited from

[`UnionOrIntersectionType`](UnionOrIntersectionType.md).[`flags`](UnionOrIntersectionType.md#flags)

***

### pattern?

> `optional` **pattern**: [`DestructuringPattern`](../type-aliases/DestructuringPattern.md)

#### Inherited from

[`UnionOrIntersectionType`](UnionOrIntersectionType.md).[`pattern`](UnionOrIntersectionType.md#pattern)

***

### symbol

> **symbol**: [`Symbol`](Symbol.md)

#### Inherited from

[`UnionOrIntersectionType`](UnionOrIntersectionType.md).[`symbol`](UnionOrIntersectionType.md#symbol)

***

### types

> **types**: [`Type`](Type.md)[]

#### Inherited from

[`UnionOrIntersectionType`](UnionOrIntersectionType.md).[`types`](UnionOrIntersectionType.md#types)

## Methods

### getApparentProperties()

> **getApparentProperties**(): [`Symbol`](Symbol.md)[]

#### Returns

[`Symbol`](Symbol.md)[]

#### Inherited from

[`UnionOrIntersectionType`](UnionOrIntersectionType.md).[`getApparentProperties`](UnionOrIntersectionType.md#getapparentproperties)

***

### getBaseTypes()

> **getBaseTypes**(): `undefined` \| [`BaseType`](../type-aliases/BaseType.md)[]

#### Returns

`undefined` \| [`BaseType`](../type-aliases/BaseType.md)[]

#### Inherited from

[`UnionOrIntersectionType`](UnionOrIntersectionType.md).[`getBaseTypes`](UnionOrIntersectionType.md#getbasetypes)

***

### getCallSignatures()

> **getCallSignatures**(): readonly [`Signature`](Signature.md)[]

#### Returns

readonly [`Signature`](Signature.md)[]

#### Inherited from

[`UnionOrIntersectionType`](UnionOrIntersectionType.md).[`getCallSignatures`](UnionOrIntersectionType.md#getcallsignatures)

***

### getConstraint()

> **getConstraint**(): `undefined` \| [`Type`](Type.md)

#### Returns

`undefined` \| [`Type`](Type.md)

#### Inherited from

[`UnionOrIntersectionType`](UnionOrIntersectionType.md).[`getConstraint`](UnionOrIntersectionType.md#getconstraint)

***

### getConstructSignatures()

> **getConstructSignatures**(): readonly [`Signature`](Signature.md)[]

#### Returns

readonly [`Signature`](Signature.md)[]

#### Inherited from

[`UnionOrIntersectionType`](UnionOrIntersectionType.md).[`getConstructSignatures`](UnionOrIntersectionType.md#getconstructsignatures)

***

### getDefault()

> **getDefault**(): `undefined` \| [`Type`](Type.md)

#### Returns

`undefined` \| [`Type`](Type.md)

#### Inherited from

[`UnionOrIntersectionType`](UnionOrIntersectionType.md).[`getDefault`](UnionOrIntersectionType.md#getdefault)

***

### getFlags()

> **getFlags**(): [`TypeFlags`](../enumerations/TypeFlags.md)

#### Returns

[`TypeFlags`](../enumerations/TypeFlags.md)

#### Inherited from

[`UnionOrIntersectionType`](UnionOrIntersectionType.md).[`getFlags`](UnionOrIntersectionType.md#getflags)

***

### getNonNullableType()

> **getNonNullableType**(): [`Type`](Type.md)

#### Returns

[`Type`](Type.md)

#### Inherited from

[`UnionOrIntersectionType`](UnionOrIntersectionType.md).[`getNonNullableType`](UnionOrIntersectionType.md#getnonnullabletype)

***

### getNumberIndexType()

> **getNumberIndexType**(): `undefined` \| [`Type`](Type.md)

#### Returns

`undefined` \| [`Type`](Type.md)

#### Inherited from

[`UnionOrIntersectionType`](UnionOrIntersectionType.md).[`getNumberIndexType`](UnionOrIntersectionType.md#getnumberindextype)

***

### getProperties()

> **getProperties**(): [`Symbol`](Symbol.md)[]

#### Returns

[`Symbol`](Symbol.md)[]

#### Inherited from

[`UnionOrIntersectionType`](UnionOrIntersectionType.md).[`getProperties`](UnionOrIntersectionType.md#getproperties)

***

### getProperty()

> **getProperty**(`propertyName`): `undefined` \| [`Symbol`](Symbol.md)

#### Parameters

##### propertyName

`string`

#### Returns

`undefined` \| [`Symbol`](Symbol.md)

#### Inherited from

[`UnionOrIntersectionType`](UnionOrIntersectionType.md).[`getProperty`](UnionOrIntersectionType.md#getproperty)

***

### getStringIndexType()

> **getStringIndexType**(): `undefined` \| [`Type`](Type.md)

#### Returns

`undefined` \| [`Type`](Type.md)

#### Inherited from

[`UnionOrIntersectionType`](UnionOrIntersectionType.md).[`getStringIndexType`](UnionOrIntersectionType.md#getstringindextype)

***

### getSymbol()

> **getSymbol**(): `undefined` \| [`Symbol`](Symbol.md)

#### Returns

`undefined` \| [`Symbol`](Symbol.md)

#### Inherited from

[`UnionOrIntersectionType`](UnionOrIntersectionType.md).[`getSymbol`](UnionOrIntersectionType.md#getsymbol)

***

### isClass()

> **isClass**(): `this is InterfaceType`

#### Returns

`this is InterfaceType`

#### Inherited from

[`UnionOrIntersectionType`](UnionOrIntersectionType.md).[`isClass`](UnionOrIntersectionType.md#isclass)

***

### isClassOrInterface()

> **isClassOrInterface**(): `this is InterfaceType`

#### Returns

`this is InterfaceType`

#### Inherited from

[`UnionOrIntersectionType`](UnionOrIntersectionType.md).[`isClassOrInterface`](UnionOrIntersectionType.md#isclassorinterface)

***

### isIndexType()

> **isIndexType**(): `this is IndexType`

#### Returns

`this is IndexType`

#### Inherited from

[`UnionOrIntersectionType`](UnionOrIntersectionType.md).[`isIndexType`](UnionOrIntersectionType.md#isindextype)

***

### isIntersection()

> **isIntersection**(): `this is IntersectionType`

#### Returns

`this is IntersectionType`

#### Inherited from

[`UnionOrIntersectionType`](UnionOrIntersectionType.md).[`isIntersection`](UnionOrIntersectionType.md#isintersection)

***

### isLiteral()

> **isLiteral**(): `this is LiteralType`

#### Returns

`this is LiteralType`

#### Inherited from

[`UnionOrIntersectionType`](UnionOrIntersectionType.md).[`isLiteral`](UnionOrIntersectionType.md#isliteral)

***

### isNumberLiteral()

> **isNumberLiteral**(): `this is NumberLiteralType`

#### Returns

`this is NumberLiteralType`

#### Inherited from

[`UnionOrIntersectionType`](UnionOrIntersectionType.md).[`isNumberLiteral`](UnionOrIntersectionType.md#isnumberliteral)

***

### isStringLiteral()

> **isStringLiteral**(): `this is StringLiteralType`

#### Returns

`this is StringLiteralType`

#### Inherited from

[`UnionOrIntersectionType`](UnionOrIntersectionType.md).[`isStringLiteral`](UnionOrIntersectionType.md#isstringliteral)

***

### isTypeParameter()

> **isTypeParameter**(): `this is TypeParameter`

#### Returns

`this is TypeParameter`

#### Inherited from

[`UnionOrIntersectionType`](UnionOrIntersectionType.md).[`isTypeParameter`](UnionOrIntersectionType.md#istypeparameter)

***

### isUnion()

> **isUnion**(): `this is UnionType`

#### Returns

`this is UnionType`

#### Inherited from

[`UnionOrIntersectionType`](UnionOrIntersectionType.md).[`isUnion`](UnionOrIntersectionType.md#isunion)

***

### isUnionOrIntersection()

> **isUnionOrIntersection**(): `this is UnionOrIntersectionType`

#### Returns

`this is UnionOrIntersectionType`

#### Inherited from

[`UnionOrIntersectionType`](UnionOrIntersectionType.md).[`isUnionOrIntersection`](UnionOrIntersectionType.md#isunionorintersection)

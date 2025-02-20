[**@eslint-react/shared**](../../README.md)

***

[@eslint-react/shared](../../README.md) / [\<internal\>](../README.md) / LiteralType

# Interface: LiteralType

## Extends

- [`FreshableType`](FreshableType.md)

## Extended by

- [`StringLiteralType`](StringLiteralType.md)
- [`NumberLiteralType`](NumberLiteralType.md)
- [`BigIntLiteralType`](BigIntLiteralType.md)

## Properties

### aliasSymbol?

> `optional` **aliasSymbol**: [`Symbol`](Symbol.md)

#### Inherited from

[`FreshableType`](FreshableType.md).[`aliasSymbol`](FreshableType.md#aliassymbol)

***

### aliasTypeArguments?

> `optional` **aliasTypeArguments**: readonly [`Type`](Type.md)[]

#### Inherited from

[`FreshableType`](FreshableType.md).[`aliasTypeArguments`](FreshableType.md#aliastypearguments)

***

### flags

> **flags**: [`TypeFlags`](../enumerations/TypeFlags.md)

#### Inherited from

[`FreshableType`](FreshableType.md).[`flags`](FreshableType.md#flags)

***

### freshType

> **freshType**: [`FreshableType`](FreshableType.md)

#### Inherited from

[`FreshableType`](FreshableType.md).[`freshType`](FreshableType.md#freshtype)

***

### pattern?

> `optional` **pattern**: [`DestructuringPattern`](../type-aliases/DestructuringPattern.md)

#### Inherited from

[`FreshableType`](FreshableType.md).[`pattern`](FreshableType.md#pattern)

***

### regularType

> **regularType**: [`FreshableType`](FreshableType.md)

#### Inherited from

[`FreshableType`](FreshableType.md).[`regularType`](FreshableType.md#regulartype)

***

### symbol

> **symbol**: [`Symbol`](Symbol.md)

#### Inherited from

[`FreshableType`](FreshableType.md).[`symbol`](FreshableType.md#symbol)

***

### value

> **value**: `string` \| `number` \| [`PseudoBigInt`](PseudoBigInt.md)

## Methods

### getApparentProperties()

> **getApparentProperties**(): [`Symbol`](Symbol.md)[]

#### Returns

[`Symbol`](Symbol.md)[]

#### Inherited from

[`FreshableType`](FreshableType.md).[`getApparentProperties`](FreshableType.md#getapparentproperties)

***

### getBaseTypes()

> **getBaseTypes**(): `undefined` \| [`BaseType`](../type-aliases/BaseType.md)[]

#### Returns

`undefined` \| [`BaseType`](../type-aliases/BaseType.md)[]

#### Inherited from

[`FreshableType`](FreshableType.md).[`getBaseTypes`](FreshableType.md#getbasetypes)

***

### getCallSignatures()

> **getCallSignatures**(): readonly [`Signature`](Signature.md)[]

#### Returns

readonly [`Signature`](Signature.md)[]

#### Inherited from

[`FreshableType`](FreshableType.md).[`getCallSignatures`](FreshableType.md#getcallsignatures)

***

### getConstraint()

> **getConstraint**(): `undefined` \| [`Type`](Type.md)

#### Returns

`undefined` \| [`Type`](Type.md)

#### Inherited from

[`FreshableType`](FreshableType.md).[`getConstraint`](FreshableType.md#getconstraint)

***

### getConstructSignatures()

> **getConstructSignatures**(): readonly [`Signature`](Signature.md)[]

#### Returns

readonly [`Signature`](Signature.md)[]

#### Inherited from

[`FreshableType`](FreshableType.md).[`getConstructSignatures`](FreshableType.md#getconstructsignatures)

***

### getDefault()

> **getDefault**(): `undefined` \| [`Type`](Type.md)

#### Returns

`undefined` \| [`Type`](Type.md)

#### Inherited from

[`FreshableType`](FreshableType.md).[`getDefault`](FreshableType.md#getdefault)

***

### getFlags()

> **getFlags**(): [`TypeFlags`](../enumerations/TypeFlags.md)

#### Returns

[`TypeFlags`](../enumerations/TypeFlags.md)

#### Inherited from

[`FreshableType`](FreshableType.md).[`getFlags`](FreshableType.md#getflags)

***

### getNonNullableType()

> **getNonNullableType**(): [`Type`](Type.md)

#### Returns

[`Type`](Type.md)

#### Inherited from

[`FreshableType`](FreshableType.md).[`getNonNullableType`](FreshableType.md#getnonnullabletype)

***

### getNumberIndexType()

> **getNumberIndexType**(): `undefined` \| [`Type`](Type.md)

#### Returns

`undefined` \| [`Type`](Type.md)

#### Inherited from

[`FreshableType`](FreshableType.md).[`getNumberIndexType`](FreshableType.md#getnumberindextype)

***

### getProperties()

> **getProperties**(): [`Symbol`](Symbol.md)[]

#### Returns

[`Symbol`](Symbol.md)[]

#### Inherited from

[`FreshableType`](FreshableType.md).[`getProperties`](FreshableType.md#getproperties)

***

### getProperty()

> **getProperty**(`propertyName`): `undefined` \| [`Symbol`](Symbol.md)

#### Parameters

##### propertyName

`string`

#### Returns

`undefined` \| [`Symbol`](Symbol.md)

#### Inherited from

[`FreshableType`](FreshableType.md).[`getProperty`](FreshableType.md#getproperty)

***

### getStringIndexType()

> **getStringIndexType**(): `undefined` \| [`Type`](Type.md)

#### Returns

`undefined` \| [`Type`](Type.md)

#### Inherited from

[`FreshableType`](FreshableType.md).[`getStringIndexType`](FreshableType.md#getstringindextype)

***

### getSymbol()

> **getSymbol**(): `undefined` \| [`Symbol`](Symbol.md)

#### Returns

`undefined` \| [`Symbol`](Symbol.md)

#### Inherited from

[`FreshableType`](FreshableType.md).[`getSymbol`](FreshableType.md#getsymbol)

***

### isClass()

> **isClass**(): `this is InterfaceType`

#### Returns

`this is InterfaceType`

#### Inherited from

[`FreshableType`](FreshableType.md).[`isClass`](FreshableType.md#isclass)

***

### isClassOrInterface()

> **isClassOrInterface**(): `this is InterfaceType`

#### Returns

`this is InterfaceType`

#### Inherited from

[`FreshableType`](FreshableType.md).[`isClassOrInterface`](FreshableType.md#isclassorinterface)

***

### isIndexType()

> **isIndexType**(): `this is IndexType`

#### Returns

`this is IndexType`

#### Inherited from

[`FreshableType`](FreshableType.md).[`isIndexType`](FreshableType.md#isindextype)

***

### isIntersection()

> **isIntersection**(): `this is IntersectionType`

#### Returns

`this is IntersectionType`

#### Inherited from

[`FreshableType`](FreshableType.md).[`isIntersection`](FreshableType.md#isintersection)

***

### isLiteral()

> **isLiteral**(): `this is LiteralType`

#### Returns

`this is LiteralType`

#### Inherited from

[`FreshableType`](FreshableType.md).[`isLiteral`](FreshableType.md#isliteral)

***

### isNumberLiteral()

> **isNumberLiteral**(): `this is NumberLiteralType`

#### Returns

`this is NumberLiteralType`

#### Inherited from

[`FreshableType`](FreshableType.md).[`isNumberLiteral`](FreshableType.md#isnumberliteral)

***

### isStringLiteral()

> **isStringLiteral**(): `this is StringLiteralType`

#### Returns

`this is StringLiteralType`

#### Inherited from

[`FreshableType`](FreshableType.md).[`isStringLiteral`](FreshableType.md#isstringliteral)

***

### isTypeParameter()

> **isTypeParameter**(): `this is TypeParameter`

#### Returns

`this is TypeParameter`

#### Inherited from

[`FreshableType`](FreshableType.md).[`isTypeParameter`](FreshableType.md#istypeparameter)

***

### isUnion()

> **isUnion**(): `this is UnionType`

#### Returns

`this is UnionType`

#### Inherited from

[`FreshableType`](FreshableType.md).[`isUnion`](FreshableType.md#isunion)

***

### isUnionOrIntersection()

> **isUnionOrIntersection**(): `this is UnionOrIntersectionType`

#### Returns

`this is UnionOrIntersectionType`

#### Inherited from

[`FreshableType`](FreshableType.md).[`isUnionOrIntersection`](FreshableType.md#isunionorintersection)

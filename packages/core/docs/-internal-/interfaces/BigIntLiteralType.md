[**@eslint-react/core**](../../README.md)

***

[@eslint-react/core](../../README.md) / [\<internal\>](../README.md) / BigIntLiteralType

# Interface: BigIntLiteralType

## Extends

- [`LiteralType`](LiteralType.md)

## Properties

### aliasSymbol?

> `optional` **aliasSymbol**: [`Symbol`](Symbol.md)

#### Inherited from

[`LiteralType`](LiteralType.md).[`aliasSymbol`](LiteralType.md#aliassymbol)

***

### aliasTypeArguments?

> `optional` **aliasTypeArguments**: readonly [`Type`](Type.md)[]

#### Inherited from

[`LiteralType`](LiteralType.md).[`aliasTypeArguments`](LiteralType.md#aliastypearguments)

***

### flags

> **flags**: [`TypeFlags`](../enumerations/TypeFlags.md)

#### Inherited from

[`LiteralType`](LiteralType.md).[`flags`](LiteralType.md#flags)

***

### freshType

> **freshType**: [`FreshableType`](FreshableType.md)

#### Inherited from

[`LiteralType`](LiteralType.md).[`freshType`](LiteralType.md#freshtype)

***

### pattern?

> `optional` **pattern**: [`DestructuringPattern`](../type-aliases/DestructuringPattern.md)

#### Inherited from

[`LiteralType`](LiteralType.md).[`pattern`](LiteralType.md#pattern)

***

### regularType

> **regularType**: [`FreshableType`](FreshableType.md)

#### Inherited from

[`LiteralType`](LiteralType.md).[`regularType`](LiteralType.md#regulartype)

***

### symbol

> **symbol**: [`Symbol`](Symbol.md)

#### Inherited from

[`LiteralType`](LiteralType.md).[`symbol`](LiteralType.md#symbol)

***

### value

> **value**: [`PseudoBigInt`](PseudoBigInt.md)

#### Overrides

[`LiteralType`](LiteralType.md).[`value`](LiteralType.md#value)

## Methods

### getApparentProperties()

> **getApparentProperties**(): [`Symbol`](Symbol.md)[]

#### Returns

[`Symbol`](Symbol.md)[]

#### Inherited from

[`LiteralType`](LiteralType.md).[`getApparentProperties`](LiteralType.md#getapparentproperties)

***

### getBaseTypes()

> **getBaseTypes**(): `undefined` \| [`BaseType`](../type-aliases/BaseType.md)[]

#### Returns

`undefined` \| [`BaseType`](../type-aliases/BaseType.md)[]

#### Inherited from

[`LiteralType`](LiteralType.md).[`getBaseTypes`](LiteralType.md#getbasetypes)

***

### getCallSignatures()

> **getCallSignatures**(): readonly [`Signature`](Signature.md)[]

#### Returns

readonly [`Signature`](Signature.md)[]

#### Inherited from

[`LiteralType`](LiteralType.md).[`getCallSignatures`](LiteralType.md#getcallsignatures)

***

### getConstraint()

> **getConstraint**(): `undefined` \| [`Type`](Type.md)

#### Returns

`undefined` \| [`Type`](Type.md)

#### Inherited from

[`LiteralType`](LiteralType.md).[`getConstraint`](LiteralType.md#getconstraint)

***

### getConstructSignatures()

> **getConstructSignatures**(): readonly [`Signature`](Signature.md)[]

#### Returns

readonly [`Signature`](Signature.md)[]

#### Inherited from

[`LiteralType`](LiteralType.md).[`getConstructSignatures`](LiteralType.md#getconstructsignatures)

***

### getDefault()

> **getDefault**(): `undefined` \| [`Type`](Type.md)

#### Returns

`undefined` \| [`Type`](Type.md)

#### Inherited from

[`LiteralType`](LiteralType.md).[`getDefault`](LiteralType.md#getdefault)

***

### getFlags()

> **getFlags**(): [`TypeFlags`](../enumerations/TypeFlags.md)

#### Returns

[`TypeFlags`](../enumerations/TypeFlags.md)

#### Inherited from

[`LiteralType`](LiteralType.md).[`getFlags`](LiteralType.md#getflags)

***

### getNonNullableType()

> **getNonNullableType**(): [`Type`](Type.md)

#### Returns

[`Type`](Type.md)

#### Inherited from

[`LiteralType`](LiteralType.md).[`getNonNullableType`](LiteralType.md#getnonnullabletype)

***

### getNumberIndexType()

> **getNumberIndexType**(): `undefined` \| [`Type`](Type.md)

#### Returns

`undefined` \| [`Type`](Type.md)

#### Inherited from

[`LiteralType`](LiteralType.md).[`getNumberIndexType`](LiteralType.md#getnumberindextype)

***

### getProperties()

> **getProperties**(): [`Symbol`](Symbol.md)[]

#### Returns

[`Symbol`](Symbol.md)[]

#### Inherited from

[`LiteralType`](LiteralType.md).[`getProperties`](LiteralType.md#getproperties)

***

### getProperty()

> **getProperty**(`propertyName`): `undefined` \| [`Symbol`](Symbol.md)

#### Parameters

##### propertyName

`string`

#### Returns

`undefined` \| [`Symbol`](Symbol.md)

#### Inherited from

[`LiteralType`](LiteralType.md).[`getProperty`](LiteralType.md#getproperty)

***

### getStringIndexType()

> **getStringIndexType**(): `undefined` \| [`Type`](Type.md)

#### Returns

`undefined` \| [`Type`](Type.md)

#### Inherited from

[`LiteralType`](LiteralType.md).[`getStringIndexType`](LiteralType.md#getstringindextype)

***

### getSymbol()

> **getSymbol**(): `undefined` \| [`Symbol`](Symbol.md)

#### Returns

`undefined` \| [`Symbol`](Symbol.md)

#### Inherited from

[`LiteralType`](LiteralType.md).[`getSymbol`](LiteralType.md#getsymbol)

***

### isClass()

> **isClass**(): `this is InterfaceType`

#### Returns

`this is InterfaceType`

#### Inherited from

[`LiteralType`](LiteralType.md).[`isClass`](LiteralType.md#isclass)

***

### isClassOrInterface()

> **isClassOrInterface**(): `this is InterfaceType`

#### Returns

`this is InterfaceType`

#### Inherited from

[`LiteralType`](LiteralType.md).[`isClassOrInterface`](LiteralType.md#isclassorinterface)

***

### isIndexType()

> **isIndexType**(): `this is IndexType`

#### Returns

`this is IndexType`

#### Inherited from

[`LiteralType`](LiteralType.md).[`isIndexType`](LiteralType.md#isindextype)

***

### isIntersection()

> **isIntersection**(): `this is IntersectionType`

#### Returns

`this is IntersectionType`

#### Inherited from

[`LiteralType`](LiteralType.md).[`isIntersection`](LiteralType.md#isintersection)

***

### isLiteral()

> **isLiteral**(): `this is LiteralType`

#### Returns

`this is LiteralType`

#### Inherited from

[`LiteralType`](LiteralType.md).[`isLiteral`](LiteralType.md#isliteral)

***

### isNumberLiteral()

> **isNumberLiteral**(): `this is NumberLiteralType`

#### Returns

`this is NumberLiteralType`

#### Inherited from

[`LiteralType`](LiteralType.md).[`isNumberLiteral`](LiteralType.md#isnumberliteral)

***

### isStringLiteral()

> **isStringLiteral**(): `this is StringLiteralType`

#### Returns

`this is StringLiteralType`

#### Inherited from

[`LiteralType`](LiteralType.md).[`isStringLiteral`](LiteralType.md#isstringliteral)

***

### isTypeParameter()

> **isTypeParameter**(): `this is TypeParameter`

#### Returns

`this is TypeParameter`

#### Inherited from

[`LiteralType`](LiteralType.md).[`isTypeParameter`](LiteralType.md#istypeparameter)

***

### isUnion()

> **isUnion**(): `this is UnionType`

#### Returns

`this is UnionType`

#### Inherited from

[`LiteralType`](LiteralType.md).[`isUnion`](LiteralType.md#isunion)

***

### isUnionOrIntersection()

> **isUnionOrIntersection**(): `this is UnionOrIntersectionType`

#### Returns

`this is UnionOrIntersectionType`

#### Inherited from

[`LiteralType`](LiteralType.md).[`isUnionOrIntersection`](LiteralType.md#isunionorintersection)

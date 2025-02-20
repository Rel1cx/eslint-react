[**@eslint-react/core**](../../README.md)

***

[@eslint-react/core](../../README.md) / [\<internal\>](../README.md) / IndexType

# Interface: IndexType

## Extends

- [`InstantiableType`](InstantiableType.md)

## Properties

### aliasSymbol?

> `optional` **aliasSymbol**: [`Symbol`](Symbol.md)

#### Inherited from

[`InstantiableType`](InstantiableType.md).[`aliasSymbol`](InstantiableType.md#aliassymbol)

***

### aliasTypeArguments?

> `optional` **aliasTypeArguments**: readonly [`Type`](Type.md)[]

#### Inherited from

[`InstantiableType`](InstantiableType.md).[`aliasTypeArguments`](InstantiableType.md#aliastypearguments)

***

### flags

> **flags**: [`TypeFlags`](../enumerations/TypeFlags.md)

#### Inherited from

[`InstantiableType`](InstantiableType.md).[`flags`](InstantiableType.md#flags)

***

### pattern?

> `optional` **pattern**: [`DestructuringPattern`](../type-aliases/DestructuringPattern.md)

#### Inherited from

[`InstantiableType`](InstantiableType.md).[`pattern`](InstantiableType.md#pattern)

***

### symbol

> **symbol**: [`Symbol`](Symbol.md)

#### Inherited from

[`InstantiableType`](InstantiableType.md).[`symbol`](InstantiableType.md#symbol)

***

### type

> **type**: [`UnionOrIntersectionType`](UnionOrIntersectionType.md) \| [`InstantiableType`](InstantiableType.md)

## Methods

### getApparentProperties()

> **getApparentProperties**(): [`Symbol`](Symbol.md)[]

#### Returns

[`Symbol`](Symbol.md)[]

#### Inherited from

[`InstantiableType`](InstantiableType.md).[`getApparentProperties`](InstantiableType.md#getapparentproperties)

***

### getBaseTypes()

> **getBaseTypes**(): `undefined` \| [`BaseType`](../type-aliases/BaseType.md)[]

#### Returns

`undefined` \| [`BaseType`](../type-aliases/BaseType.md)[]

#### Inherited from

[`InstantiableType`](InstantiableType.md).[`getBaseTypes`](InstantiableType.md#getbasetypes)

***

### getCallSignatures()

> **getCallSignatures**(): readonly [`Signature`](Signature.md)[]

#### Returns

readonly [`Signature`](Signature.md)[]

#### Inherited from

[`InstantiableType`](InstantiableType.md).[`getCallSignatures`](InstantiableType.md#getcallsignatures)

***

### getConstraint()

> **getConstraint**(): `undefined` \| [`Type`](Type.md)

#### Returns

`undefined` \| [`Type`](Type.md)

#### Inherited from

[`InstantiableType`](InstantiableType.md).[`getConstraint`](InstantiableType.md#getconstraint)

***

### getConstructSignatures()

> **getConstructSignatures**(): readonly [`Signature`](Signature.md)[]

#### Returns

readonly [`Signature`](Signature.md)[]

#### Inherited from

[`InstantiableType`](InstantiableType.md).[`getConstructSignatures`](InstantiableType.md#getconstructsignatures)

***

### getDefault()

> **getDefault**(): `undefined` \| [`Type`](Type.md)

#### Returns

`undefined` \| [`Type`](Type.md)

#### Inherited from

[`InstantiableType`](InstantiableType.md).[`getDefault`](InstantiableType.md#getdefault)

***

### getFlags()

> **getFlags**(): [`TypeFlags`](../enumerations/TypeFlags.md)

#### Returns

[`TypeFlags`](../enumerations/TypeFlags.md)

#### Inherited from

[`InstantiableType`](InstantiableType.md).[`getFlags`](InstantiableType.md#getflags)

***

### getNonNullableType()

> **getNonNullableType**(): [`Type`](Type.md)

#### Returns

[`Type`](Type.md)

#### Inherited from

[`InstantiableType`](InstantiableType.md).[`getNonNullableType`](InstantiableType.md#getnonnullabletype)

***

### getNumberIndexType()

> **getNumberIndexType**(): `undefined` \| [`Type`](Type.md)

#### Returns

`undefined` \| [`Type`](Type.md)

#### Inherited from

[`InstantiableType`](InstantiableType.md).[`getNumberIndexType`](InstantiableType.md#getnumberindextype)

***

### getProperties()

> **getProperties**(): [`Symbol`](Symbol.md)[]

#### Returns

[`Symbol`](Symbol.md)[]

#### Inherited from

[`InstantiableType`](InstantiableType.md).[`getProperties`](InstantiableType.md#getproperties)

***

### getProperty()

> **getProperty**(`propertyName`): `undefined` \| [`Symbol`](Symbol.md)

#### Parameters

##### propertyName

`string`

#### Returns

`undefined` \| [`Symbol`](Symbol.md)

#### Inherited from

[`InstantiableType`](InstantiableType.md).[`getProperty`](InstantiableType.md#getproperty)

***

### getStringIndexType()

> **getStringIndexType**(): `undefined` \| [`Type`](Type.md)

#### Returns

`undefined` \| [`Type`](Type.md)

#### Inherited from

[`InstantiableType`](InstantiableType.md).[`getStringIndexType`](InstantiableType.md#getstringindextype)

***

### getSymbol()

> **getSymbol**(): `undefined` \| [`Symbol`](Symbol.md)

#### Returns

`undefined` \| [`Symbol`](Symbol.md)

#### Inherited from

[`InstantiableType`](InstantiableType.md).[`getSymbol`](InstantiableType.md#getsymbol)

***

### isClass()

> **isClass**(): `this is InterfaceType`

#### Returns

`this is InterfaceType`

#### Inherited from

[`InstantiableType`](InstantiableType.md).[`isClass`](InstantiableType.md#isclass)

***

### isClassOrInterface()

> **isClassOrInterface**(): `this is InterfaceType`

#### Returns

`this is InterfaceType`

#### Inherited from

[`InstantiableType`](InstantiableType.md).[`isClassOrInterface`](InstantiableType.md#isclassorinterface)

***

### isIndexType()

> **isIndexType**(): `this is IndexType`

#### Returns

`this is IndexType`

#### Inherited from

[`InstantiableType`](InstantiableType.md).[`isIndexType`](InstantiableType.md#isindextype)

***

### isIntersection()

> **isIntersection**(): `this is IntersectionType`

#### Returns

`this is IntersectionType`

#### Inherited from

[`InstantiableType`](InstantiableType.md).[`isIntersection`](InstantiableType.md#isintersection)

***

### isLiteral()

> **isLiteral**(): `this is LiteralType`

#### Returns

`this is LiteralType`

#### Inherited from

[`InstantiableType`](InstantiableType.md).[`isLiteral`](InstantiableType.md#isliteral)

***

### isNumberLiteral()

> **isNumberLiteral**(): `this is NumberLiteralType`

#### Returns

`this is NumberLiteralType`

#### Inherited from

[`InstantiableType`](InstantiableType.md).[`isNumberLiteral`](InstantiableType.md#isnumberliteral)

***

### isStringLiteral()

> **isStringLiteral**(): `this is StringLiteralType`

#### Returns

`this is StringLiteralType`

#### Inherited from

[`InstantiableType`](InstantiableType.md).[`isStringLiteral`](InstantiableType.md#isstringliteral)

***

### isTypeParameter()

> **isTypeParameter**(): `this is TypeParameter`

#### Returns

`this is TypeParameter`

#### Inherited from

[`InstantiableType`](InstantiableType.md).[`isTypeParameter`](InstantiableType.md#istypeparameter)

***

### isUnion()

> **isUnion**(): `this is UnionType`

#### Returns

`this is UnionType`

#### Inherited from

[`InstantiableType`](InstantiableType.md).[`isUnion`](InstantiableType.md#isunion)

***

### isUnionOrIntersection()

> **isUnionOrIntersection**(): `this is UnionOrIntersectionType`

#### Returns

`this is UnionOrIntersectionType`

#### Inherited from

[`InstantiableType`](InstantiableType.md).[`isUnionOrIntersection`](InstantiableType.md#isunionorintersection)

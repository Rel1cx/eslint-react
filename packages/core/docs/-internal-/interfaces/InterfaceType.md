[**@eslint-react/core**](../../README.md)

***

[@eslint-react/core](../../README.md) / [\<internal\>](../README.md) / InterfaceType

# Interface: InterfaceType

Class and interface types (ObjectFlags.Class and ObjectFlags.Interface).

## Extends

- [`ObjectType`](ObjectType.md)

## Extended by

- [`GenericType`](GenericType.md)

## Properties

### aliasSymbol?

> `optional` **aliasSymbol**: [`Symbol`](Symbol.md)

#### Inherited from

[`ObjectType`](ObjectType.md).[`aliasSymbol`](ObjectType.md#aliassymbol)

***

### aliasTypeArguments?

> `optional` **aliasTypeArguments**: readonly [`Type`](Type.md)[]

#### Inherited from

[`ObjectType`](ObjectType.md).[`aliasTypeArguments`](ObjectType.md#aliastypearguments)

***

### flags

> **flags**: [`TypeFlags`](../enumerations/TypeFlags.md)

#### Inherited from

[`ObjectType`](ObjectType.md).[`flags`](ObjectType.md#flags)

***

### localTypeParameters

> **localTypeParameters**: `undefined` \| [`TypeParameter`](TypeParameter.md)[]

***

### objectFlags

> **objectFlags**: [`ObjectFlags`](../enumerations/ObjectFlags.md)

#### Inherited from

[`ObjectType`](ObjectType.md).[`objectFlags`](ObjectType.md#objectflags)

***

### outerTypeParameters

> **outerTypeParameters**: `undefined` \| [`TypeParameter`](TypeParameter.md)[]

***

### pattern?

> `optional` **pattern**: [`DestructuringPattern`](../type-aliases/DestructuringPattern.md)

#### Inherited from

[`ObjectType`](ObjectType.md).[`pattern`](ObjectType.md#pattern)

***

### symbol

> **symbol**: [`Symbol`](Symbol.md)

#### Inherited from

[`ObjectType`](ObjectType.md).[`symbol`](ObjectType.md#symbol)

***

### thisType

> **thisType**: `undefined` \| [`TypeParameter`](TypeParameter.md)

***

### typeParameters

> **typeParameters**: `undefined` \| [`TypeParameter`](TypeParameter.md)[]

## Methods

### getApparentProperties()

> **getApparentProperties**(): [`Symbol`](Symbol.md)[]

#### Returns

[`Symbol`](Symbol.md)[]

#### Inherited from

[`ObjectType`](ObjectType.md).[`getApparentProperties`](ObjectType.md#getapparentproperties)

***

### getBaseTypes()

> **getBaseTypes**(): `undefined` \| [`BaseType`](../type-aliases/BaseType.md)[]

#### Returns

`undefined` \| [`BaseType`](../type-aliases/BaseType.md)[]

#### Inherited from

[`ObjectType`](ObjectType.md).[`getBaseTypes`](ObjectType.md#getbasetypes)

***

### getCallSignatures()

> **getCallSignatures**(): readonly [`Signature`](Signature.md)[]

#### Returns

readonly [`Signature`](Signature.md)[]

#### Inherited from

[`ObjectType`](ObjectType.md).[`getCallSignatures`](ObjectType.md#getcallsignatures)

***

### getConstraint()

> **getConstraint**(): `undefined` \| [`Type`](Type.md)

#### Returns

`undefined` \| [`Type`](Type.md)

#### Inherited from

[`ObjectType`](ObjectType.md).[`getConstraint`](ObjectType.md#getconstraint)

***

### getConstructSignatures()

> **getConstructSignatures**(): readonly [`Signature`](Signature.md)[]

#### Returns

readonly [`Signature`](Signature.md)[]

#### Inherited from

[`ObjectType`](ObjectType.md).[`getConstructSignatures`](ObjectType.md#getconstructsignatures)

***

### getDefault()

> **getDefault**(): `undefined` \| [`Type`](Type.md)

#### Returns

`undefined` \| [`Type`](Type.md)

#### Inherited from

[`ObjectType`](ObjectType.md).[`getDefault`](ObjectType.md#getdefault)

***

### getFlags()

> **getFlags**(): [`TypeFlags`](../enumerations/TypeFlags.md)

#### Returns

[`TypeFlags`](../enumerations/TypeFlags.md)

#### Inherited from

[`ObjectType`](ObjectType.md).[`getFlags`](ObjectType.md#getflags)

***

### getNonNullableType()

> **getNonNullableType**(): [`Type`](Type.md)

#### Returns

[`Type`](Type.md)

#### Inherited from

[`ObjectType`](ObjectType.md).[`getNonNullableType`](ObjectType.md#getnonnullabletype)

***

### getNumberIndexType()

> **getNumberIndexType**(): `undefined` \| [`Type`](Type.md)

#### Returns

`undefined` \| [`Type`](Type.md)

#### Inherited from

[`ObjectType`](ObjectType.md).[`getNumberIndexType`](ObjectType.md#getnumberindextype)

***

### getProperties()

> **getProperties**(): [`Symbol`](Symbol.md)[]

#### Returns

[`Symbol`](Symbol.md)[]

#### Inherited from

[`ObjectType`](ObjectType.md).[`getProperties`](ObjectType.md#getproperties)

***

### getProperty()

> **getProperty**(`propertyName`): `undefined` \| [`Symbol`](Symbol.md)

#### Parameters

##### propertyName

`string`

#### Returns

`undefined` \| [`Symbol`](Symbol.md)

#### Inherited from

[`ObjectType`](ObjectType.md).[`getProperty`](ObjectType.md#getproperty)

***

### getStringIndexType()

> **getStringIndexType**(): `undefined` \| [`Type`](Type.md)

#### Returns

`undefined` \| [`Type`](Type.md)

#### Inherited from

[`ObjectType`](ObjectType.md).[`getStringIndexType`](ObjectType.md#getstringindextype)

***

### getSymbol()

> **getSymbol**(): `undefined` \| [`Symbol`](Symbol.md)

#### Returns

`undefined` \| [`Symbol`](Symbol.md)

#### Inherited from

[`ObjectType`](ObjectType.md).[`getSymbol`](ObjectType.md#getsymbol)

***

### isClass()

> **isClass**(): `this is InterfaceType`

#### Returns

`this is InterfaceType`

#### Inherited from

[`ObjectType`](ObjectType.md).[`isClass`](ObjectType.md#isclass)

***

### isClassOrInterface()

> **isClassOrInterface**(): `this is InterfaceType`

#### Returns

`this is InterfaceType`

#### Inherited from

[`ObjectType`](ObjectType.md).[`isClassOrInterface`](ObjectType.md#isclassorinterface)

***

### isIndexType()

> **isIndexType**(): `this is IndexType`

#### Returns

`this is IndexType`

#### Inherited from

[`ObjectType`](ObjectType.md).[`isIndexType`](ObjectType.md#isindextype)

***

### isIntersection()

> **isIntersection**(): `this is IntersectionType`

#### Returns

`this is IntersectionType`

#### Inherited from

[`ObjectType`](ObjectType.md).[`isIntersection`](ObjectType.md#isintersection)

***

### isLiteral()

> **isLiteral**(): `this is LiteralType`

#### Returns

`this is LiteralType`

#### Inherited from

[`ObjectType`](ObjectType.md).[`isLiteral`](ObjectType.md#isliteral)

***

### isNumberLiteral()

> **isNumberLiteral**(): `this is NumberLiteralType`

#### Returns

`this is NumberLiteralType`

#### Inherited from

[`ObjectType`](ObjectType.md).[`isNumberLiteral`](ObjectType.md#isnumberliteral)

***

### isStringLiteral()

> **isStringLiteral**(): `this is StringLiteralType`

#### Returns

`this is StringLiteralType`

#### Inherited from

[`ObjectType`](ObjectType.md).[`isStringLiteral`](ObjectType.md#isstringliteral)

***

### isTypeParameter()

> **isTypeParameter**(): `this is TypeParameter`

#### Returns

`this is TypeParameter`

#### Inherited from

[`ObjectType`](ObjectType.md).[`isTypeParameter`](ObjectType.md#istypeparameter)

***

### isUnion()

> **isUnion**(): `this is UnionType`

#### Returns

`this is UnionType`

#### Inherited from

[`ObjectType`](ObjectType.md).[`isUnion`](ObjectType.md#isunion)

***

### isUnionOrIntersection()

> **isUnionOrIntersection**(): `this is UnionOrIntersectionType`

#### Returns

`this is UnionOrIntersectionType`

#### Inherited from

[`ObjectType`](ObjectType.md).[`isUnionOrIntersection`](ObjectType.md#isunionorintersection)

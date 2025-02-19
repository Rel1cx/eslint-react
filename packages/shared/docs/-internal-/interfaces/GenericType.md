[**@eslint-react/shared**](../../README.md)

***

[@eslint-react/shared](../../README.md) / [\<internal\>](../README.md) / GenericType

# Interface: GenericType

Class and interface types (ObjectFlags.Class and ObjectFlags.Interface).

## Extends

- [`InterfaceType`](InterfaceType.md).[`TypeReference`](TypeReference.md)

## Properties

### aliasSymbol?

> `optional` **aliasSymbol**: [`Symbol`](Symbol.md)

#### Inherited from

[`TypeReference`](TypeReference.md).[`aliasSymbol`](TypeReference.md#aliassymbol)

***

### aliasTypeArguments?

> `optional` **aliasTypeArguments**: readonly [`Type`](Type.md)[]

#### Inherited from

[`TypeReference`](TypeReference.md).[`aliasTypeArguments`](TypeReference.md#aliastypearguments)

***

### flags

> **flags**: [`TypeFlags`](../enumerations/TypeFlags.md)

#### Inherited from

[`TypeReference`](TypeReference.md).[`flags`](TypeReference.md#flags)

***

### localTypeParameters

> **localTypeParameters**: `undefined` \| [`TypeParameter`](TypeParameter.md)[]

#### Inherited from

[`InterfaceType`](InterfaceType.md).[`localTypeParameters`](InterfaceType.md#localtypeparameters)

***

### node?

> `optional` **node**: [`ArrayTypeNode`](ArrayTypeNode.md) \| [`TupleTypeNode`](TupleTypeNode.md) \| [`TypeReferenceNode`](TypeReferenceNode.md)

#### Inherited from

[`TypeReference`](TypeReference.md).[`node`](TypeReference.md#node)

***

### objectFlags

> **objectFlags**: [`ObjectFlags`](../enumerations/ObjectFlags.md)

#### Inherited from

[`TypeReference`](TypeReference.md).[`objectFlags`](TypeReference.md#objectflags)

***

### outerTypeParameters

> **outerTypeParameters**: `undefined` \| [`TypeParameter`](TypeParameter.md)[]

#### Inherited from

[`InterfaceType`](InterfaceType.md).[`outerTypeParameters`](InterfaceType.md#outertypeparameters)

***

### pattern?

> `optional` **pattern**: [`DestructuringPattern`](../type-aliases/DestructuringPattern.md)

#### Inherited from

[`TypeReference`](TypeReference.md).[`pattern`](TypeReference.md#pattern)

***

### symbol

> **symbol**: [`Symbol`](Symbol.md)

#### Inherited from

[`TypeReference`](TypeReference.md).[`symbol`](TypeReference.md#symbol)

***

### target

> **target**: [`GenericType`](GenericType.md)

#### Inherited from

[`TypeReference`](TypeReference.md).[`target`](TypeReference.md#target)

***

### thisType

> **thisType**: `undefined` \| [`TypeParameter`](TypeParameter.md)

#### Inherited from

[`InterfaceType`](InterfaceType.md).[`thisType`](InterfaceType.md#thistype)

***

### typeArguments?

> `optional` **typeArguments**: readonly [`Type`](Type.md)[]

#### Inherited from

[`TypeReference`](TypeReference.md).[`typeArguments`](TypeReference.md#typearguments)

***

### typeParameters

> **typeParameters**: `undefined` \| [`TypeParameter`](TypeParameter.md)[]

#### Inherited from

[`InterfaceType`](InterfaceType.md).[`typeParameters`](InterfaceType.md#typeparameters)

## Methods

### getApparentProperties()

> **getApparentProperties**(): [`Symbol`](Symbol.md)[]

#### Returns

[`Symbol`](Symbol.md)[]

#### Inherited from

[`TypeReference`](TypeReference.md).[`getApparentProperties`](TypeReference.md#getapparentproperties)

***

### getBaseTypes()

> **getBaseTypes**(): `undefined` \| [`BaseType`](../type-aliases/BaseType.md)[]

#### Returns

`undefined` \| [`BaseType`](../type-aliases/BaseType.md)[]

#### Inherited from

[`TypeReference`](TypeReference.md).[`getBaseTypes`](TypeReference.md#getbasetypes)

***

### getCallSignatures()

> **getCallSignatures**(): readonly [`Signature`](Signature.md)[]

#### Returns

readonly [`Signature`](Signature.md)[]

#### Inherited from

[`TypeReference`](TypeReference.md).[`getCallSignatures`](TypeReference.md#getcallsignatures)

***

### getConstraint()

> **getConstraint**(): `undefined` \| [`Type`](Type.md)

#### Returns

`undefined` \| [`Type`](Type.md)

#### Inherited from

[`TypeReference`](TypeReference.md).[`getConstraint`](TypeReference.md#getconstraint)

***

### getConstructSignatures()

> **getConstructSignatures**(): readonly [`Signature`](Signature.md)[]

#### Returns

readonly [`Signature`](Signature.md)[]

#### Inherited from

[`TypeReference`](TypeReference.md).[`getConstructSignatures`](TypeReference.md#getconstructsignatures)

***

### getDefault()

> **getDefault**(): `undefined` \| [`Type`](Type.md)

#### Returns

`undefined` \| [`Type`](Type.md)

#### Inherited from

[`TypeReference`](TypeReference.md).[`getDefault`](TypeReference.md#getdefault)

***

### getFlags()

> **getFlags**(): [`TypeFlags`](../enumerations/TypeFlags.md)

#### Returns

[`TypeFlags`](../enumerations/TypeFlags.md)

#### Inherited from

[`TypeReference`](TypeReference.md).[`getFlags`](TypeReference.md#getflags)

***

### getNonNullableType()

> **getNonNullableType**(): [`Type`](Type.md)

#### Returns

[`Type`](Type.md)

#### Inherited from

[`TypeReference`](TypeReference.md).[`getNonNullableType`](TypeReference.md#getnonnullabletype)

***

### getNumberIndexType()

> **getNumberIndexType**(): `undefined` \| [`Type`](Type.md)

#### Returns

`undefined` \| [`Type`](Type.md)

#### Inherited from

[`TypeReference`](TypeReference.md).[`getNumberIndexType`](TypeReference.md#getnumberindextype)

***

### getProperties()

> **getProperties**(): [`Symbol`](Symbol.md)[]

#### Returns

[`Symbol`](Symbol.md)[]

#### Inherited from

[`TypeReference`](TypeReference.md).[`getProperties`](TypeReference.md#getproperties)

***

### getProperty()

> **getProperty**(`propertyName`): `undefined` \| [`Symbol`](Symbol.md)

#### Parameters

##### propertyName

`string`

#### Returns

`undefined` \| [`Symbol`](Symbol.md)

#### Inherited from

[`TypeReference`](TypeReference.md).[`getProperty`](TypeReference.md#getproperty)

***

### getStringIndexType()

> **getStringIndexType**(): `undefined` \| [`Type`](Type.md)

#### Returns

`undefined` \| [`Type`](Type.md)

#### Inherited from

[`TypeReference`](TypeReference.md).[`getStringIndexType`](TypeReference.md#getstringindextype)

***

### getSymbol()

> **getSymbol**(): `undefined` \| [`Symbol`](Symbol.md)

#### Returns

`undefined` \| [`Symbol`](Symbol.md)

#### Inherited from

[`TypeReference`](TypeReference.md).[`getSymbol`](TypeReference.md#getsymbol)

***

### isClass()

> **isClass**(): `this is InterfaceType`

#### Returns

`this is InterfaceType`

#### Inherited from

[`TypeReference`](TypeReference.md).[`isClass`](TypeReference.md#isclass)

***

### isClassOrInterface()

> **isClassOrInterface**(): `this is InterfaceType`

#### Returns

`this is InterfaceType`

#### Inherited from

[`TypeReference`](TypeReference.md).[`isClassOrInterface`](TypeReference.md#isclassorinterface)

***

### isIndexType()

> **isIndexType**(): `this is IndexType`

#### Returns

`this is IndexType`

#### Inherited from

[`TypeReference`](TypeReference.md).[`isIndexType`](TypeReference.md#isindextype)

***

### isIntersection()

> **isIntersection**(): `this is IntersectionType`

#### Returns

`this is IntersectionType`

#### Inherited from

[`TypeReference`](TypeReference.md).[`isIntersection`](TypeReference.md#isintersection)

***

### isLiteral()

> **isLiteral**(): `this is LiteralType`

#### Returns

`this is LiteralType`

#### Inherited from

[`TypeReference`](TypeReference.md).[`isLiteral`](TypeReference.md#isliteral)

***

### isNumberLiteral()

> **isNumberLiteral**(): `this is NumberLiteralType`

#### Returns

`this is NumberLiteralType`

#### Inherited from

[`TypeReference`](TypeReference.md).[`isNumberLiteral`](TypeReference.md#isnumberliteral)

***

### isStringLiteral()

> **isStringLiteral**(): `this is StringLiteralType`

#### Returns

`this is StringLiteralType`

#### Inherited from

[`TypeReference`](TypeReference.md).[`isStringLiteral`](TypeReference.md#isstringliteral)

***

### isTypeParameter()

> **isTypeParameter**(): `this is TypeParameter`

#### Returns

`this is TypeParameter`

#### Inherited from

[`TypeReference`](TypeReference.md).[`isTypeParameter`](TypeReference.md#istypeparameter)

***

### isUnion()

> **isUnion**(): `this is UnionType`

#### Returns

`this is UnionType`

#### Inherited from

[`TypeReference`](TypeReference.md).[`isUnion`](TypeReference.md#isunion)

***

### isUnionOrIntersection()

> **isUnionOrIntersection**(): `this is UnionOrIntersectionType`

#### Returns

`this is UnionOrIntersectionType`

#### Inherited from

[`TypeReference`](TypeReference.md).[`isUnionOrIntersection`](TypeReference.md#isunionorintersection)

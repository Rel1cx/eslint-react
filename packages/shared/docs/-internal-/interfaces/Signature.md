[**@eslint-react/shared**](../../README.md)

***

[@eslint-react/shared](../../README.md) / [\<internal\>](../README.md) / Signature

# Interface: Signature

## Properties

### declaration?

> `optional` **declaration**: [`JSDocSignature`](JSDocSignature.md) \| [`SignatureDeclaration`](../type-aliases/SignatureDeclaration.md)

***

### parameters

> **parameters**: readonly [`Symbol`](Symbol.md)[]

***

### thisParameter?

> `optional` **thisParameter**: [`Symbol`](Symbol.md)

***

### typeParameters?

> `optional` **typeParameters**: readonly [`TypeParameter`](TypeParameter.md)[]

## Methods

### getDeclaration()

> **getDeclaration**(): [`SignatureDeclaration`](../type-aliases/SignatureDeclaration.md)

#### Returns

[`SignatureDeclaration`](../type-aliases/SignatureDeclaration.md)

***

### getDocumentationComment()

> **getDocumentationComment**(`typeChecker`): [`SymbolDisplayPart`](SymbolDisplayPart.md)[]

#### Parameters

##### typeChecker

`undefined` | [`TypeChecker`](TypeChecker.md)

#### Returns

[`SymbolDisplayPart`](SymbolDisplayPart.md)[]

***

### getJsDocTags()

> **getJsDocTags**(): [`JSDocTagInfo`](JSDocTagInfo.md)[]

#### Returns

[`JSDocTagInfo`](JSDocTagInfo.md)[]

***

### getParameters()

> **getParameters**(): [`Symbol`](Symbol.md)[]

#### Returns

[`Symbol`](Symbol.md)[]

***

### getReturnType()

> **getReturnType**(): [`Type`](Type.md)

#### Returns

[`Type`](Type.md)

***

### getTypeParameterAtPosition()

> **getTypeParameterAtPosition**(`pos`): [`Type`](Type.md)

#### Parameters

##### pos

`number`

#### Returns

[`Type`](Type.md)

***

### getTypeParameters()

> **getTypeParameters**(): `undefined` \| [`TypeParameter`](TypeParameter.md)[]

#### Returns

`undefined` \| [`TypeParameter`](TypeParameter.md)[]

[**@eslint-react/core**](../../README.md)

***

[@eslint-react/core](../../README.md) / [\<internal\>](../README.md) / Symbol

# Interface: Symbol

## Properties

### declarations?

> `optional` **declarations**: [`Declaration`](Declaration.md)[]

***

### escapedName

> **escapedName**: [`__String`](../type-aliases/String.md)

***

### exports?

> `optional` **exports**: [`SymbolTable`](../type-aliases/SymbolTable.md)

***

### flags

> **flags**: [`SymbolFlags`](../enumerations/SymbolFlags.md)

***

### globalExports?

> `optional` **globalExports**: [`SymbolTable`](../type-aliases/SymbolTable.md)

***

### members?

> `optional` **members**: [`SymbolTable`](../type-aliases/SymbolTable.md)

***

### name

> `readonly` **name**: `string`

***

### valueDeclaration?

> `optional` **valueDeclaration**: [`Declaration`](Declaration.md)

## Methods

### getDeclarations()

> **getDeclarations**(): `undefined` \| [`Declaration`](Declaration.md)[]

#### Returns

`undefined` \| [`Declaration`](Declaration.md)[]

***

### getDocumentationComment()

> **getDocumentationComment**(`typeChecker`): [`SymbolDisplayPart`](SymbolDisplayPart.md)[]

#### Parameters

##### typeChecker

`undefined` | [`TypeChecker`](TypeChecker.md)

#### Returns

[`SymbolDisplayPart`](SymbolDisplayPart.md)[]

***

### getEscapedName()

> **getEscapedName**(): [`__String`](../type-aliases/String.md)

#### Returns

[`__String`](../type-aliases/String.md)

***

### getFlags()

> **getFlags**(): [`SymbolFlags`](../enumerations/SymbolFlags.md)

#### Returns

[`SymbolFlags`](../enumerations/SymbolFlags.md)

***

### getJsDocTags()

> **getJsDocTags**(`checker`?): [`JSDocTagInfo`](JSDocTagInfo.md)[]

#### Parameters

##### checker?

[`TypeChecker`](TypeChecker.md)

#### Returns

[`JSDocTagInfo`](JSDocTagInfo.md)[]

***

### getName()

> **getName**(): `string`

#### Returns

`string`

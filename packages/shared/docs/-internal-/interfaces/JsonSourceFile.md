[**@eslint-react/shared**](../../README.md)

***

[@eslint-react/shared](../../README.md) / [\<internal\>](../README.md) / JsonSourceFile

# Interface: JsonSourceFile

## Extends

- [`SourceFile`](SourceFile.md)

## Extended by

- [`TsConfigSourceFile`](TsConfigSourceFile.md)

## Properties

### \_declarationBrand

> **\_declarationBrand**: `any`

#### Inherited from

[`SourceFile`](SourceFile.md).[`_declarationBrand`](SourceFile.md#_declarationbrand)

***

### \_localsContainerBrand

> **\_localsContainerBrand**: `any`

#### Inherited from

[`SourceFile`](SourceFile.md).[`_localsContainerBrand`](SourceFile.md#_localscontainerbrand)

***

### amdDependencies

> **amdDependencies**: readonly [`AmdDependency`](AmdDependency.md)[]

#### Inherited from

[`SourceFile`](SourceFile.md).[`amdDependencies`](SourceFile.md#amddependencies)

***

### end

> `readonly` **end**: `number`

#### Inherited from

[`SourceFile`](SourceFile.md).[`end`](SourceFile.md#end)

***

### endOfFileToken

> `readonly` **endOfFileToken**: [`Token`](Token.md)\<[`EndOfFileToken`](../README.md#endoffiletoken)\>

#### Inherited from

[`SourceFile`](SourceFile.md).[`endOfFileToken`](SourceFile.md#endoffiletoken)

***

### fileName

> **fileName**: `string`

#### Inherited from

[`SourceFile`](SourceFile.md).[`fileName`](SourceFile.md#filename)

***

### flags

> `readonly` **flags**: [`NodeFlags`](../enumerations/NodeFlags.md)

#### Inherited from

[`SourceFile`](SourceFile.md).[`flags`](SourceFile.md#flags)

***

### hasNoDefaultLib

> **hasNoDefaultLib**: `boolean`

lib.d.ts should have a reference comment like

 /// <reference no-default-lib="true"/>

If any other file has this comment, it signals not to include lib.d.ts
because this containing file is intended to act as a default library.

#### Inherited from

[`SourceFile`](SourceFile.md).[`hasNoDefaultLib`](SourceFile.md#hasnodefaultlib)

***

### impliedNodeFormat?

> `optional` **impliedNodeFormat**: [`ResolutionMode`](../type-aliases/ResolutionMode.md)

When `module` is `Node16` or `NodeNext`, this field controls whether the
source file in question is an ESNext-output-format file, or a CommonJS-output-format
module. This is derived by the module resolver as it looks up the file, since
it is derived from either the file extension of the module, or the containing
`package.json` context, and affects both checking and emit.

It is _public_ so that (pre)transformers can set this field,
since it switches the builtin `node` module transform. Generally speaking, if unset,
the field is treated as though it is `ModuleKind.CommonJS`.

Note that this field is only set by the module resolution process when
`moduleResolution` is `Node16` or `NodeNext`, which is implied by the `module` setting
of `Node16` or `NodeNext`, respectively, but may be overriden (eg, by a `moduleResolution`
of `node`). If so, this field will be unset and source files will be considered to be
CommonJS-output-format by the node module transformer and type checker, regardless of extension or context.

#### Inherited from

[`SourceFile`](SourceFile.md).[`impliedNodeFormat`](SourceFile.md#impliednodeformat)

***

### isDeclarationFile

> **isDeclarationFile**: `boolean`

#### Inherited from

[`SourceFile`](SourceFile.md).[`isDeclarationFile`](SourceFile.md#isdeclarationfile)

***

### kind

> `readonly` **kind**: [`SourceFile`](../README.md#sourcefile)

#### Inherited from

[`SourceFile`](SourceFile.md).[`kind`](SourceFile.md#kind)

***

### languageVariant

> **languageVariant**: [`LanguageVariant`](../enumerations/LanguageVariant.md)

#### Inherited from

[`SourceFile`](SourceFile.md).[`languageVariant`](SourceFile.md#languagevariant)

***

### languageVersion

> **languageVersion**: [`ScriptTarget`](../enumerations/ScriptTarget.md)

#### Inherited from

[`SourceFile`](SourceFile.md).[`languageVersion`](SourceFile.md#languageversion)

***

### libReferenceDirectives

> **libReferenceDirectives**: readonly [`FileReference`](FileReference.md)[]

#### Inherited from

[`SourceFile`](SourceFile.md).[`libReferenceDirectives`](SourceFile.md#libreferencedirectives)

***

### moduleName?

> `optional` **moduleName**: `string`

#### Inherited from

[`SourceFile`](SourceFile.md).[`moduleName`](SourceFile.md#modulename)

***

### parent

> `readonly` **parent**: [`Node`](Node.md)

#### Inherited from

[`SourceFile`](SourceFile.md).[`parent`](SourceFile.md#parent)

***

### pos

> `readonly` **pos**: `number`

#### Inherited from

[`SourceFile`](SourceFile.md).[`pos`](SourceFile.md#pos)

***

### referencedFiles

> **referencedFiles**: readonly [`FileReference`](FileReference.md)[]

#### Inherited from

[`SourceFile`](SourceFile.md).[`referencedFiles`](SourceFile.md#referencedfiles)

***

### statements

> `readonly` **statements**: [`NodeArray`](NodeArray.md)\<[`JsonObjectExpressionStatement`](JsonObjectExpressionStatement.md)\>

#### Overrides

[`SourceFile`](SourceFile.md).[`statements`](SourceFile.md#statements)

***

### text

> **text**: `string`

#### Inherited from

[`SourceFile`](SourceFile.md).[`text`](SourceFile.md#text)

***

### typeReferenceDirectives

> **typeReferenceDirectives**: readonly [`FileReference`](FileReference.md)[]

#### Inherited from

[`SourceFile`](SourceFile.md).[`typeReferenceDirectives`](SourceFile.md#typereferencedirectives)

## Methods

### forEachChild()

> **forEachChild**\<`T`\>(`cbNode`, `cbNodeArray`?): `undefined` \| `T`

#### Type Parameters

• **T**

#### Parameters

##### cbNode

(`node`) => `undefined` \| `T`

##### cbNodeArray?

(`nodes`) => `undefined` \| `T`

#### Returns

`undefined` \| `T`

#### Inherited from

[`SourceFile`](SourceFile.md).[`forEachChild`](SourceFile.md#foreachchild)

***

### getChildAt()

> **getChildAt**(`index`, `sourceFile`?): [`Node`](Node.md)

#### Parameters

##### index

`number`

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

[`Node`](Node.md)

#### Inherited from

[`SourceFile`](SourceFile.md).[`getChildAt`](SourceFile.md#getchildat)

***

### getChildCount()

> **getChildCount**(`sourceFile`?): `number`

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`number`

#### Inherited from

[`SourceFile`](SourceFile.md).[`getChildCount`](SourceFile.md#getchildcount)

***

### getChildren()

> **getChildren**(`sourceFile`?): readonly [`Node`](Node.md)[]

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

readonly [`Node`](Node.md)[]

#### Inherited from

[`SourceFile`](SourceFile.md).[`getChildren`](SourceFile.md#getchildren)

***

### getEnd()

> **getEnd**(): `number`

#### Returns

`number`

#### Inherited from

[`SourceFile`](SourceFile.md).[`getEnd`](SourceFile.md#getend)

***

### getFirstToken()

> **getFirstToken**(`sourceFile`?): `undefined` \| [`Node`](Node.md)

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`undefined` \| [`Node`](Node.md)

#### Inherited from

[`SourceFile`](SourceFile.md).[`getFirstToken`](SourceFile.md#getfirsttoken)

***

### getFullStart()

> **getFullStart**(): `number`

#### Returns

`number`

#### Inherited from

[`SourceFile`](SourceFile.md).[`getFullStart`](SourceFile.md#getfullstart)

***

### getFullText()

> **getFullText**(`sourceFile`?): `string`

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`string`

#### Inherited from

[`SourceFile`](SourceFile.md).[`getFullText`](SourceFile.md#getfulltext)

***

### getFullWidth()

> **getFullWidth**(): `number`

#### Returns

`number`

#### Inherited from

[`SourceFile`](SourceFile.md).[`getFullWidth`](SourceFile.md#getfullwidth)

***

### getLastToken()

> **getLastToken**(`sourceFile`?): `undefined` \| [`Node`](Node.md)

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`undefined` \| [`Node`](Node.md)

#### Inherited from

[`SourceFile`](SourceFile.md).[`getLastToken`](SourceFile.md#getlasttoken)

***

### getLeadingTriviaWidth()

> **getLeadingTriviaWidth**(`sourceFile`?): `number`

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`number`

#### Inherited from

[`SourceFile`](SourceFile.md).[`getLeadingTriviaWidth`](SourceFile.md#getleadingtriviawidth)

***

### getLineAndCharacterOfPosition()

> **getLineAndCharacterOfPosition**(`pos`): [`LineAndCharacter`](LineAndCharacter.md)

#### Parameters

##### pos

`number`

#### Returns

[`LineAndCharacter`](LineAndCharacter.md)

#### Inherited from

[`SourceFile`](SourceFile.md).[`getLineAndCharacterOfPosition`](SourceFile.md#getlineandcharacterofposition)

***

### getLineEndOfPosition()

> **getLineEndOfPosition**(`pos`): `number`

#### Parameters

##### pos

`number`

#### Returns

`number`

#### Inherited from

[`SourceFile`](SourceFile.md).[`getLineEndOfPosition`](SourceFile.md#getlineendofposition)

***

### getLineStarts()

> **getLineStarts**(): readonly `number`[]

#### Returns

readonly `number`[]

#### Inherited from

[`SourceFile`](SourceFile.md).[`getLineStarts`](SourceFile.md#getlinestarts)

***

### getPositionOfLineAndCharacter()

> **getPositionOfLineAndCharacter**(`line`, `character`): `number`

#### Parameters

##### line

`number`

##### character

`number`

#### Returns

`number`

#### Inherited from

[`SourceFile`](SourceFile.md).[`getPositionOfLineAndCharacter`](SourceFile.md#getpositionoflineandcharacter)

***

### getSourceFile()

> **getSourceFile**(): [`SourceFile`](SourceFile.md)

#### Returns

[`SourceFile`](SourceFile.md)

#### Inherited from

[`SourceFile`](SourceFile.md).[`getSourceFile`](SourceFile.md#getsourcefile)

***

### getStart()

> **getStart**(`sourceFile`?, `includeJsDocComment`?): `number`

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

##### includeJsDocComment?

`boolean`

#### Returns

`number`

#### Inherited from

[`SourceFile`](SourceFile.md).[`getStart`](SourceFile.md#getstart)

***

### getText()

> **getText**(`sourceFile`?): `string`

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`string`

#### Inherited from

[`SourceFile`](SourceFile.md).[`getText`](SourceFile.md#gettext)

***

### getWidth()

> **getWidth**(`sourceFile`?): `number`

#### Parameters

##### sourceFile?

[`SourceFileLike`](SourceFileLike.md)

#### Returns

`number`

#### Inherited from

[`SourceFile`](SourceFile.md).[`getWidth`](SourceFile.md#getwidth)

***

### update()

> **update**(`newText`, `textChangeRange`): [`SourceFile`](SourceFile.md)

#### Parameters

##### newText

`string`

##### textChangeRange

[`TextChangeRange`](TextChangeRange.md)

#### Returns

[`SourceFile`](SourceFile.md)

#### Inherited from

[`SourceFile`](SourceFile.md).[`update`](SourceFile.md#update)

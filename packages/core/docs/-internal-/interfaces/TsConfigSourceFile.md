[**@eslint-react/core**](../../README.md)

***

[@eslint-react/core](../../README.md) / [\<internal\>](../README.md) / TsConfigSourceFile

# Interface: TsConfigSourceFile

## Extends

- [`JsonSourceFile`](JsonSourceFile.md)

## Properties

### \_declarationBrand

> **\_declarationBrand**: `any`

#### Inherited from

[`JsonSourceFile`](JsonSourceFile.md).[`_declarationBrand`](JsonSourceFile.md#_declarationbrand)

***

### \_localsContainerBrand

> **\_localsContainerBrand**: `any`

#### Inherited from

[`JsonSourceFile`](JsonSourceFile.md).[`_localsContainerBrand`](JsonSourceFile.md#_localscontainerbrand)

***

### amdDependencies

> **amdDependencies**: readonly [`AmdDependency`](AmdDependency.md)[]

#### Inherited from

[`JsonSourceFile`](JsonSourceFile.md).[`amdDependencies`](JsonSourceFile.md#amddependencies)

***

### end

> `readonly` **end**: `number`

#### Inherited from

[`JsonSourceFile`](JsonSourceFile.md).[`end`](JsonSourceFile.md#end)

***

### endOfFileToken

> `readonly` **endOfFileToken**: [`Token`](Token.md)\<[`EndOfFileToken`](../README.md#endoffiletoken)\>

#### Inherited from

[`JsonSourceFile`](JsonSourceFile.md).[`endOfFileToken`](JsonSourceFile.md#endoffiletoken)

***

### extendedSourceFiles?

> `optional` **extendedSourceFiles**: `string`[]

***

### fileName

> **fileName**: `string`

#### Inherited from

[`JsonSourceFile`](JsonSourceFile.md).[`fileName`](JsonSourceFile.md#filename)

***

### flags

> `readonly` **flags**: [`NodeFlags`](../enumerations/NodeFlags.md)

#### Inherited from

[`JsonSourceFile`](JsonSourceFile.md).[`flags`](JsonSourceFile.md#flags)

***

### hasNoDefaultLib

> **hasNoDefaultLib**: `boolean`

lib.d.ts should have a reference comment like

 /// <reference no-default-lib="true"/>

If any other file has this comment, it signals not to include lib.d.ts
because this containing file is intended to act as a default library.

#### Inherited from

[`JsonSourceFile`](JsonSourceFile.md).[`hasNoDefaultLib`](JsonSourceFile.md#hasnodefaultlib)

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

[`JsonSourceFile`](JsonSourceFile.md).[`impliedNodeFormat`](JsonSourceFile.md#impliednodeformat)

***

### isDeclarationFile

> **isDeclarationFile**: `boolean`

#### Inherited from

[`JsonSourceFile`](JsonSourceFile.md).[`isDeclarationFile`](JsonSourceFile.md#isdeclarationfile)

***

### kind

> `readonly` **kind**: [`SourceFile`](../README.md#sourcefile)

#### Inherited from

[`JsonSourceFile`](JsonSourceFile.md).[`kind`](JsonSourceFile.md#kind)

***

### languageVariant

> **languageVariant**: [`LanguageVariant`](../enumerations/LanguageVariant.md)

#### Inherited from

[`JsonSourceFile`](JsonSourceFile.md).[`languageVariant`](JsonSourceFile.md#languagevariant)

***

### languageVersion

> **languageVersion**: [`ScriptTarget`](../enumerations/ScriptTarget.md)

#### Inherited from

[`JsonSourceFile`](JsonSourceFile.md).[`languageVersion`](JsonSourceFile.md#languageversion)

***

### libReferenceDirectives

> **libReferenceDirectives**: readonly [`FileReference`](FileReference.md)[]

#### Inherited from

[`JsonSourceFile`](JsonSourceFile.md).[`libReferenceDirectives`](JsonSourceFile.md#libreferencedirectives)

***

### moduleName?

> `optional` **moduleName**: `string`

#### Inherited from

[`JsonSourceFile`](JsonSourceFile.md).[`moduleName`](JsonSourceFile.md#modulename)

***

### parent

> `readonly` **parent**: [`Node`](Node.md)

#### Inherited from

[`JsonSourceFile`](JsonSourceFile.md).[`parent`](JsonSourceFile.md#parent)

***

### pos

> `readonly` **pos**: `number`

#### Inherited from

[`JsonSourceFile`](JsonSourceFile.md).[`pos`](JsonSourceFile.md#pos)

***

### referencedFiles

> **referencedFiles**: readonly [`FileReference`](FileReference.md)[]

#### Inherited from

[`JsonSourceFile`](JsonSourceFile.md).[`referencedFiles`](JsonSourceFile.md#referencedfiles)

***

### statements

> `readonly` **statements**: [`NodeArray`](NodeArray.md)\<[`JsonObjectExpressionStatement`](JsonObjectExpressionStatement.md)\>

#### Inherited from

[`JsonSourceFile`](JsonSourceFile.md).[`statements`](JsonSourceFile.md#statements)

***

### text

> **text**: `string`

#### Inherited from

[`JsonSourceFile`](JsonSourceFile.md).[`text`](JsonSourceFile.md#text)

***

### typeReferenceDirectives

> **typeReferenceDirectives**: readonly [`FileReference`](FileReference.md)[]

#### Inherited from

[`JsonSourceFile`](JsonSourceFile.md).[`typeReferenceDirectives`](JsonSourceFile.md#typereferencedirectives)

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

[`JsonSourceFile`](JsonSourceFile.md).[`forEachChild`](JsonSourceFile.md#foreachchild)

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

[`JsonSourceFile`](JsonSourceFile.md).[`getChildAt`](JsonSourceFile.md#getchildat)

***

### getChildCount()

> **getChildCount**(`sourceFile`?): `number`

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`number`

#### Inherited from

[`JsonSourceFile`](JsonSourceFile.md).[`getChildCount`](JsonSourceFile.md#getchildcount)

***

### getChildren()

> **getChildren**(`sourceFile`?): readonly [`Node`](Node.md)[]

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

readonly [`Node`](Node.md)[]

#### Inherited from

[`JsonSourceFile`](JsonSourceFile.md).[`getChildren`](JsonSourceFile.md#getchildren)

***

### getEnd()

> **getEnd**(): `number`

#### Returns

`number`

#### Inherited from

[`JsonSourceFile`](JsonSourceFile.md).[`getEnd`](JsonSourceFile.md#getend)

***

### getFirstToken()

> **getFirstToken**(`sourceFile`?): `undefined` \| [`Node`](Node.md)

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`undefined` \| [`Node`](Node.md)

#### Inherited from

[`JsonSourceFile`](JsonSourceFile.md).[`getFirstToken`](JsonSourceFile.md#getfirsttoken)

***

### getFullStart()

> **getFullStart**(): `number`

#### Returns

`number`

#### Inherited from

[`JsonSourceFile`](JsonSourceFile.md).[`getFullStart`](JsonSourceFile.md#getfullstart)

***

### getFullText()

> **getFullText**(`sourceFile`?): `string`

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`string`

#### Inherited from

[`JsonSourceFile`](JsonSourceFile.md).[`getFullText`](JsonSourceFile.md#getfulltext)

***

### getFullWidth()

> **getFullWidth**(): `number`

#### Returns

`number`

#### Inherited from

[`JsonSourceFile`](JsonSourceFile.md).[`getFullWidth`](JsonSourceFile.md#getfullwidth)

***

### getLastToken()

> **getLastToken**(`sourceFile`?): `undefined` \| [`Node`](Node.md)

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`undefined` \| [`Node`](Node.md)

#### Inherited from

[`JsonSourceFile`](JsonSourceFile.md).[`getLastToken`](JsonSourceFile.md#getlasttoken)

***

### getLeadingTriviaWidth()

> **getLeadingTriviaWidth**(`sourceFile`?): `number`

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`number`

#### Inherited from

[`JsonSourceFile`](JsonSourceFile.md).[`getLeadingTriviaWidth`](JsonSourceFile.md#getleadingtriviawidth)

***

### getLineAndCharacterOfPosition()

> **getLineAndCharacterOfPosition**(`pos`): [`LineAndCharacter`](LineAndCharacter.md)

#### Parameters

##### pos

`number`

#### Returns

[`LineAndCharacter`](LineAndCharacter.md)

#### Inherited from

[`JsonSourceFile`](JsonSourceFile.md).[`getLineAndCharacterOfPosition`](JsonSourceFile.md#getlineandcharacterofposition)

***

### getLineEndOfPosition()

> **getLineEndOfPosition**(`pos`): `number`

#### Parameters

##### pos

`number`

#### Returns

`number`

#### Inherited from

[`JsonSourceFile`](JsonSourceFile.md).[`getLineEndOfPosition`](JsonSourceFile.md#getlineendofposition)

***

### getLineStarts()

> **getLineStarts**(): readonly `number`[]

#### Returns

readonly `number`[]

#### Inherited from

[`JsonSourceFile`](JsonSourceFile.md).[`getLineStarts`](JsonSourceFile.md#getlinestarts)

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

[`JsonSourceFile`](JsonSourceFile.md).[`getPositionOfLineAndCharacter`](JsonSourceFile.md#getpositionoflineandcharacter)

***

### getSourceFile()

> **getSourceFile**(): [`SourceFile`](SourceFile.md)

#### Returns

[`SourceFile`](SourceFile.md)

#### Inherited from

[`JsonSourceFile`](JsonSourceFile.md).[`getSourceFile`](JsonSourceFile.md#getsourcefile)

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

[`JsonSourceFile`](JsonSourceFile.md).[`getStart`](JsonSourceFile.md#getstart)

***

### getText()

> **getText**(`sourceFile`?): `string`

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`string`

#### Inherited from

[`JsonSourceFile`](JsonSourceFile.md).[`getText`](JsonSourceFile.md#gettext)

***

### getWidth()

> **getWidth**(`sourceFile`?): `number`

#### Parameters

##### sourceFile?

[`SourceFileLike`](SourceFileLike.md)

#### Returns

`number`

#### Inherited from

[`JsonSourceFile`](JsonSourceFile.md).[`getWidth`](JsonSourceFile.md#getwidth)

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

[`JsonSourceFile`](JsonSourceFile.md).[`update`](JsonSourceFile.md#update)

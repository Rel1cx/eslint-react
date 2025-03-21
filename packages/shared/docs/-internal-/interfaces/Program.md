[**@eslint-react/shared**](../../README.md)

***

[@eslint-react/shared](../../README.md) / [\<internal\>](../README.md) / Program

# Interface: Program

## Extends

- [`ScriptReferenceHost`](ScriptReferenceHost.md)

## Methods

### emit()

> **emit**(`targetSourceFile`?, `writeFile`?, `cancellationToken`?, `emitOnlyDtsFiles`?, `customTransformers`?): [`EmitResult`](EmitResult.md)

Emits the JavaScript and declaration files.  If targetSourceFile is not specified, then
the JavaScript and declaration files will be produced for all the files in this program.
If targetSourceFile is specified, then only the JavaScript and declaration for that
specific file will be generated.

If writeFile is not specified then the writeFile callback from the compiler host will be
used for writing the JavaScript and declaration files.  Otherwise, the writeFile parameter
will be invoked when writing the JavaScript and declaration files.

#### Parameters

##### targetSourceFile?

[`SourceFile`](SourceFile.md)

##### writeFile?

[`WriteFileCallback`](../type-aliases/WriteFileCallback.md)

##### cancellationToken?

[`CancellationToken`](CancellationToken.md)

##### emitOnlyDtsFiles?

`boolean`

##### customTransformers?

[`CustomTransformers`](CustomTransformers.md)

#### Returns

[`EmitResult`](EmitResult.md)

***

### getCompilerOptions()

> **getCompilerOptions**(): [`CompilerOptions`](CompilerOptions.md)

#### Returns

[`CompilerOptions`](CompilerOptions.md)

#### Inherited from

[`ScriptReferenceHost`](ScriptReferenceHost.md).[`getCompilerOptions`](ScriptReferenceHost.md#getcompileroptions)

***

### getConfigFileParsingDiagnostics()

> **getConfigFileParsingDiagnostics**(): readonly [`Diagnostic`](Diagnostic.md)[]

#### Returns

readonly [`Diagnostic`](Diagnostic.md)[]

***

### getCurrentDirectory()

> **getCurrentDirectory**(): `string`

#### Returns

`string`

#### Overrides

[`ScriptReferenceHost`](ScriptReferenceHost.md).[`getCurrentDirectory`](ScriptReferenceHost.md#getcurrentdirectory)

***

### getDeclarationDiagnostics()

> **getDeclarationDiagnostics**(`sourceFile`?, `cancellationToken`?): readonly [`DiagnosticWithLocation`](DiagnosticWithLocation.md)[]

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

##### cancellationToken?

[`CancellationToken`](CancellationToken.md)

#### Returns

readonly [`DiagnosticWithLocation`](DiagnosticWithLocation.md)[]

***

### getGlobalDiagnostics()

> **getGlobalDiagnostics**(`cancellationToken`?): readonly [`Diagnostic`](Diagnostic.md)[]

#### Parameters

##### cancellationToken?

[`CancellationToken`](CancellationToken.md)

#### Returns

readonly [`Diagnostic`](Diagnostic.md)[]

***

### getIdentifierCount()

> **getIdentifierCount**(): `number`

#### Returns

`number`

***

### getInstantiationCount()

> **getInstantiationCount**(): `number`

#### Returns

`number`

***

### getModeForResolutionAtIndex()

> **getModeForResolutionAtIndex**(`file`, `index`): [`ResolutionMode`](../type-aliases/ResolutionMode.md)

Calculates the final resolution mode for an import at some index within a file's `imports` list. This function only returns a result
when module resolution settings allow differing resolution between ESM imports and CJS requires, or when a mode is explicitly provided
via import attributes, which cause an `import` or `require` condition to be used during resolution regardless of module resolution
settings. In absence of overriding attributes, and in modes that support differing resolution, the result indicates the syntax the
usage would emit to JavaScript. Some examples:

```ts
// tsc foo.mts --module nodenext
import {} from "mod";
// Result: ESNext - the import emits as ESM due to `impliedNodeFormat` set by .mts file extension

// tsc foo.cts --module nodenext
import {} from "mod";
// Result: CommonJS - the import emits as CJS due to `impliedNodeFormat` set by .cts file extension

// tsc foo.ts --module preserve --moduleResolution bundler
import {} from "mod";
// Result: ESNext - the import emits as ESM due to `--module preserve` and `--moduleResolution bundler`
// supports conditional imports/exports

// tsc foo.ts --module preserve --moduleResolution node10
import {} from "mod";
// Result: undefined - the import emits as ESM due to `--module preserve`, but `--moduleResolution node10`
// does not support conditional imports/exports

// tsc foo.ts --module commonjs --moduleResolution node10
import type {} from "mod" with { "resolution-mode": "import" };
// Result: ESNext - conditional imports/exports always supported with "resolution-mode" attribute
```

#### Parameters

##### file

[`SourceFile`](SourceFile.md)

##### index

`number`

#### Returns

[`ResolutionMode`](../type-aliases/ResolutionMode.md)

***

### getModeForUsageLocation()

> **getModeForUsageLocation**(`file`, `usage`): [`ResolutionMode`](../type-aliases/ResolutionMode.md)

Calculates the final resolution mode for a given module reference node. This function only returns a result when module resolution
settings allow differing resolution between ESM imports and CJS requires, or when a mode is explicitly provided via import attributes,
which cause an `import` or `require` condition to be used during resolution regardless of module resolution settings. In absence of
overriding attributes, and in modes that support differing resolution, the result indicates the syntax the usage would emit to JavaScript.
Some examples:

```ts
// tsc foo.mts --module nodenext
import {} from "mod";
// Result: ESNext - the import emits as ESM due to `impliedNodeFormat` set by .mts file extension

// tsc foo.cts --module nodenext
import {} from "mod";
// Result: CommonJS - the import emits as CJS due to `impliedNodeFormat` set by .cts file extension

// tsc foo.ts --module preserve --moduleResolution bundler
import {} from "mod";
// Result: ESNext - the import emits as ESM due to `--module preserve` and `--moduleResolution bundler`
// supports conditional imports/exports

// tsc foo.ts --module preserve --moduleResolution node10
import {} from "mod";
// Result: undefined - the import emits as ESM due to `--module preserve`, but `--moduleResolution node10`
// does not support conditional imports/exports

// tsc foo.ts --module commonjs --moduleResolution node10
import type {} from "mod" with { "resolution-mode": "import" };
// Result: ESNext - conditional imports/exports always supported with "resolution-mode" attribute
```

#### Parameters

##### file

[`SourceFile`](SourceFile.md)

##### usage

[`StringLiteralLike`](../type-aliases/StringLiteralLike.md)

#### Returns

[`ResolutionMode`](../type-aliases/ResolutionMode.md)

***

### getNodeCount()

> **getNodeCount**(): `number`

#### Returns

`number`

***

### getOptionsDiagnostics()

> **getOptionsDiagnostics**(`cancellationToken`?): readonly [`Diagnostic`](Diagnostic.md)[]

#### Parameters

##### cancellationToken?

[`CancellationToken`](CancellationToken.md)

#### Returns

readonly [`Diagnostic`](Diagnostic.md)[]

***

### getProjectReferences()

> **getProjectReferences**(): `undefined` \| readonly [`ProjectReference`](ProjectReference.md)[]

#### Returns

`undefined` \| readonly [`ProjectReference`](ProjectReference.md)[]

***

### getRelationCacheSizes()

> **getRelationCacheSizes**(): `object`

#### Returns

`object`

##### assignable

> **assignable**: `number`

##### identity

> **identity**: `number`

##### strictSubtype

> **strictSubtype**: `number`

##### subtype

> **subtype**: `number`

***

### getResolvedProjectReferences()

> **getResolvedProjectReferences**(): `undefined` \| readonly (`undefined` \| [`ResolvedProjectReference`](ResolvedProjectReference.md))[]

#### Returns

`undefined` \| readonly (`undefined` \| [`ResolvedProjectReference`](ResolvedProjectReference.md))[]

***

### getRootFileNames()

> **getRootFileNames**(): readonly `string`[]

Get a list of root file names that were passed to a 'createProgram'

#### Returns

readonly `string`[]

***

### getSemanticDiagnostics()

> **getSemanticDiagnostics**(`sourceFile`?, `cancellationToken`?): readonly [`Diagnostic`](Diagnostic.md)[]

The first time this is called, it will return global diagnostics (no location).

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

##### cancellationToken?

[`CancellationToken`](CancellationToken.md)

#### Returns

readonly [`Diagnostic`](Diagnostic.md)[]

***

### getSourceFile()

> **getSourceFile**(`fileName`): `undefined` \| [`SourceFile`](SourceFile.md)

#### Parameters

##### fileName

`string`

#### Returns

`undefined` \| [`SourceFile`](SourceFile.md)

#### Inherited from

[`ScriptReferenceHost`](ScriptReferenceHost.md).[`getSourceFile`](ScriptReferenceHost.md#getsourcefile)

***

### getSourceFileByPath()

> **getSourceFileByPath**(`path`): `undefined` \| [`SourceFile`](SourceFile.md)

#### Parameters

##### path

[`Path`](../type-aliases/Path.md)

#### Returns

`undefined` \| [`SourceFile`](SourceFile.md)

#### Inherited from

[`ScriptReferenceHost`](ScriptReferenceHost.md).[`getSourceFileByPath`](ScriptReferenceHost.md#getsourcefilebypath)

***

### getSourceFiles()

> **getSourceFiles**(): readonly [`SourceFile`](SourceFile.md)[]

Get a list of files in the program

#### Returns

readonly [`SourceFile`](SourceFile.md)[]

***

### getSymbolCount()

> **getSymbolCount**(): `number`

#### Returns

`number`

***

### getSyntacticDiagnostics()

> **getSyntacticDiagnostics**(`sourceFile`?, `cancellationToken`?): readonly [`DiagnosticWithLocation`](DiagnosticWithLocation.md)[]

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

##### cancellationToken?

[`CancellationToken`](CancellationToken.md)

#### Returns

readonly [`DiagnosticWithLocation`](DiagnosticWithLocation.md)[]

***

### getTypeChecker()

> **getTypeChecker**(): [`TypeChecker`](TypeChecker.md)

Gets a type checker that can be used to semantically analyze source files in the program.

#### Returns

[`TypeChecker`](TypeChecker.md)

***

### getTypeCount()

> **getTypeCount**(): `number`

#### Returns

`number`

***

### isSourceFileDefaultLibrary()

> **isSourceFileDefaultLibrary**(`file`): `boolean`

#### Parameters

##### file

[`SourceFile`](SourceFile.md)

#### Returns

`boolean`

***

### isSourceFileFromExternalLibrary()

> **isSourceFileFromExternalLibrary**(`file`): `boolean`

#### Parameters

##### file

[`SourceFile`](SourceFile.md)

#### Returns

`boolean`

[**@eslint-react/kit**](../../README.md)

***

[@eslint-react/kit](../../README.md) / [\<internal\>](../README.md) / CompilerOptions

# Type Alias: CompilerOptions

> **CompilerOptions** = `object`

## Properties

### allowArbitraryExtensions?

> `optional` **allowArbitraryExtensions**: `boolean`

Suppress errors for file formats that TypeScript does not understand.

#### Default

```ts
false
```

***

### allowImportingTsExtensions?

> `optional` **allowImportingTsExtensions**: `boolean`

Allows TypeScript files to import each other with a TypeScript-specific extension like .ts, .mts, or .tsx.

#### Default

```ts
false
```

***

### allowJs?

> `optional` **allowJs**: `boolean`

Allow javascript files to be compiled.

#### Default

```ts
false
```

***

### allowSyntheticDefaultImports?

> `optional` **allowSyntheticDefaultImports**: `boolean`

Allow default imports from modules with no default export. This does not affect code emit, just typechecking.

#### Default

```ts
module === 'system' || esModuleInterop
```

***

### allowUmdGlobalAccess?

> `optional` **allowUmdGlobalAccess**: `boolean`

Allow accessing UMD globals from modules.

#### Default

```ts
false
```

***

### allowUnreachableCode?

> `optional` **allowUnreachableCode**: `boolean`

Do not report errors on unreachable code.

#### Default

```ts
false
```

***

### allowUnusedLabels?

> `optional` **allowUnusedLabels**: `boolean`

Do not report errors on unused labels.

#### Default

```ts
false
```

***

### alwaysStrict?

> `optional` **alwaysStrict**: `boolean`

Parse in strict mode and emit `'use strict'` for each source file.

#### Default

```ts
false
```

***

### assumeChangesOnlyAffectDirectDependencies?

> `optional` **assumeChangesOnlyAffectDirectDependencies**: `boolean`

Have recompiles in '--incremental' and '--watch' assume that changes within a file will only affect files directly depending on it.

#### Default

```ts
false
```

***

### baseUrl?

> `optional` **baseUrl**: `string`

Base directory to resolve non-relative module names.

***

### ~~charset?~~

> `optional` **charset**: `string`

The character set of the input files.

#### Default

```ts
'utf8'
```

#### Deprecated

This option will be removed in TypeScript 5.5.

***

### checkJs?

> `optional` **checkJs**: `boolean`

Report errors in `.js` files.

#### Default

```ts
false
```

***

### composite?

> `optional` **composite**: `boolean`

Enables building for project references.

#### Default

```ts
true
```

***

### customConditions?

> `optional` **customConditions**: `string`[]

List of additional conditions that should succeed when TypeScript resolves from package.json.

***

### declaration?

> `optional` **declaration**: `boolean`

Generates corresponding d.ts files.

#### Default

```ts
false
```

***

### declarationDir?

> `optional` **declarationDir**: `string`

Specify output directory for generated declaration files.

***

### declarationMap?

> `optional` **declarationMap**: `boolean`

Generates a sourcemap for each corresponding `.d.ts` file.

#### Default

```ts
false
```

***

### diagnostics?

> `optional` **diagnostics**: `boolean`

Show diagnostic information.

#### Default

```ts
false
```

***

### disableReferencedProjectLoad?

> `optional` **disableReferencedProjectLoad**: `boolean`

Reduce the number of projects loaded automatically by TypeScript.

#### Default

```ts
false
```

***

### disableSizeLimit?

> `optional` **disableSizeLimit**: `boolean`

Disable size limit for JavaScript project.

#### Default

```ts
false
```

***

### disableSolutionSearching?

> `optional` **disableSolutionSearching**: `boolean`

Opt a project out of multi-project reference checking when editing.

#### Default

```ts
false
```

***

### disableSourceOfProjectReferenceRedirect?

> `optional` **disableSourceOfProjectReferenceRedirect**: `boolean`

Disable preferring source files instead of declaration files when referencing composite projects.

#### Default

```ts
true if composite, false otherwise
```

***

### downlevelIteration?

> `optional` **downlevelIteration**: `boolean`

Provide full support for iterables in `for-of`, spread, and destructuring when targeting `ES5` or `ES3`.

#### Default

```ts
false
```

***

### emitBOM?

> `optional` **emitBOM**: `boolean`

Emit a UTF-8 Byte Order Mark (BOM) in the beginning of output files.

#### Default

```ts
false
```

***

### emitDeclarationOnly?

> `optional` **emitDeclarationOnly**: `boolean`

Only emit `.d.ts` declaration files.

#### Default

```ts
false
```

***

### emitDecoratorMetadata?

> `optional` **emitDecoratorMetadata**: `boolean`

Emit design-type metadata for decorated declarations in source.

#### Default

```ts
false
```

***

### esModuleInterop?

> `optional` **esModuleInterop**: `boolean`

Emit `__importStar` and `__importDefault` helpers for runtime Babel ecosystem compatibility and enable `--allowSyntheticDefaultImports` for typesystem compatibility.

#### Default

```ts
false
```

***

### exactOptionalPropertyTypes?

> `optional` **exactOptionalPropertyTypes**: `boolean`

Differentiate between undefined and not present when type checking.

#### Default

```ts
false
```

***

### experimentalDecorators?

> `optional` **experimentalDecorators**: `boolean`

Enables experimental support for ES7 decorators.

#### Default

```ts
false
```

***

### explainFiles?

> `optional` **explainFiles**: `boolean`

Print names of files which TypeScript sees as a part of your project and the reason they are part of the compilation.

#### Default

```ts
false
```

***

### extendedDiagnostics?

> `optional` **extendedDiagnostics**: `boolean`

Output more detailed compiler performance information after building.

#### Default

```ts
false
```

***

### ~~fallbackPolling?~~

> `optional` **fallbackPolling**: [`FallbackPolling`](../namespaces/CompilerOptions/type-aliases/FallbackPolling.md)

Specify the polling strategy to use when the system runs out of or doesn't support native file watchers.

#### Deprecated

Use watchOptions.fallbackPolling instead.

***

### forceConsistentCasingInFileNames?

> `optional` **forceConsistentCasingInFileNames**: `boolean`

Disallow inconsistently-cased references to the same file.

#### Default

```ts
true
```

***

### generateCpuProfile?

> `optional` **generateCpuProfile**: `string`

Emit a v8 CPU profile of the compiler run for debugging.

#### Default

```ts
'profile.cpuprofile'
```

***

### generateTrace?

> `optional` **generateTrace**: `boolean`

Generates an event trace and a list of types.

***

### ignoreDeprecations?

> `optional` **ignoreDeprecations**: [`IgnoreDeprecations`](../namespaces/CompilerOptions/type-aliases/IgnoreDeprecations.md)

Suppress deprecation warnings

***

### importHelpers?

> `optional` **importHelpers**: `boolean`

Import emit helpers (e.g. `__extends`, `__rest`, etc..) from tslib.

#### Default

```ts
false
```

***

### ~~importsNotUsedAsValues?~~

> `optional` **importsNotUsedAsValues**: [`ImportsNotUsedAsValues`](../namespaces/CompilerOptions/type-aliases/ImportsNotUsedAsValues.md)

Specify emit/checking behavior for imports that are only used for types.

#### Default

```ts
'remove'
```

#### Deprecated

Use `verbatimModuleSyntax` instead.

***

### incremental?

> `optional` **incremental**: `boolean`

Enable incremental compilation.

#### Default

`composite`

***

### inlineSourceMap?

> `optional` **inlineSourceMap**: `boolean`

Emit a single file with source maps instead of having a separate file.

#### Default

```ts
false
```

***

### inlineSources?

> `optional` **inlineSources**: `boolean`

Emit the source alongside the sourcemaps within a single file.

Requires `--inlineSourceMap` to be set.

#### Default

```ts
false
```

***

### isolatedDeclarations?

> `optional` **isolatedDeclarations**: `boolean`

Require sufficient annotation on exports so other tools can trivially generate declaration files.

#### Default

```ts
false
```

***

### isolatedModules?

> `optional` **isolatedModules**: `boolean`

Unconditionally emit imports for unresolved files.

#### Default

```ts
false
```

***

### jsx?

> `optional` **jsx**: [`JSX`](JSX.md)

Specify what JSX code is generated.

#### Default

```ts
'preserve'
```

***

### jsxFactory?

> `optional` **jsxFactory**: `string`

Specify the JSX factory function to use when targeting React JSX emit, e.g. `React.createElement` or `h`.

#### Default

```ts
'React.createElement'
```

***

### jsxFragmentFactory?

> `optional` **jsxFragmentFactory**: `string`

Specify the JSX Fragment reference used for fragments when targeting React JSX emit e.g. 'React.Fragment' or 'Fragment'.

#### Default

```ts
'React.Fragment'
```

***

### jsxImportSource?

> `optional` **jsxImportSource**: `string`

Specify module specifier used to import the JSX factory functions when using `jsx: react-jsx*`.

#### Default

```ts
'react'
```

***

### ~~keyofStringsOnly?~~

> `optional` **keyofStringsOnly**: `boolean`

Resolve `keyof` to string valued property names only (no numbers or symbols).

#### Default

```ts
false
```

#### Deprecated

This option will be removed in TypeScript 5.5.

***

### lib?

> `optional` **lib**: [`Lib`](../namespaces/CompilerOptions/type-aliases/Lib.md)[]

List of library files to be included in the compilation.

***

### listEmittedFiles?

> `optional` **listEmittedFiles**: `boolean`

Enable to list all emitted files.

#### Default

```ts
false
```

***

### listFiles?

> `optional` **listFiles**: `boolean`

Print names of files part of the compilation.

#### Default

```ts
false
```

***

### listFilesOnly?

> `optional` **listFilesOnly**: `boolean`

Print names of files that are part of the compilation and then stop processing.

#### Default

```ts
false
```

***

### mapRoot?

> `optional` **mapRoot**: `string`

Specifies the location where debugger should locate map files instead of generated locations.

***

### maxNodeModuleJsDepth?

> `optional` **maxNodeModuleJsDepth**: `number`

The maximum dependency depth to search under `node_modules` and load JavaScript files. Only applicable with `--allowJs`.

#### Default

```ts
0
```

***

### module?

> `optional` **module**: [`Module`](../namespaces/CompilerOptions/type-aliases/Module.md)

Specify module code generation: 'None', 'CommonJS', 'AMD', 'System', 'UMD', 'ES6', 'ES2015' or 'ESNext'. Only 'AMD' and 'System' can be used in conjunction with `--outFile`. 'ES6' and 'ES2015' values may be used when targeting 'ES5' or lower.

#### Default

```ts
['ES3', 'ES5'].includes(target) ? 'CommonJS' : 'ES6'
```

***

### moduleDetection?

> `optional` **moduleDetection**: [`ModuleDetection`](../namespaces/CompilerOptions/type-aliases/ModuleDetection.md)

Control what method is used to detect module-format JS files.

#### Default

```ts
'auto'
```

***

### moduleResolution?

> `optional` **moduleResolution**: [`ModuleResolution`](../namespaces/CompilerOptions/type-aliases/ModuleResolution.md)

Specifies module resolution strategy: 'node' (Node) or 'classic' (TypeScript pre 1.6).

#### Default

```ts
['AMD', 'System', 'ES6'].includes(module) ? 'classic' : 'node'
```

***

### moduleSuffixes?

> `optional` **moduleSuffixes**: `string`[]

List of file name suffixes to search when resolving a module.

***

### newLine?

> `optional` **newLine**: [`NewLine`](../namespaces/CompilerOptions/type-aliases/NewLine.md)

Specifies the end of line sequence to be used when emitting files: 'crlf' (Windows) or 'lf' (Unix).

#### Default

```ts
'LF'
```

***

### noCheck?

> `optional` **noCheck**: `boolean`

Disable full type checking (only critical parse and emit errors will be reported).

#### Default

```ts
false
```

***

### noEmit?

> `optional` **noEmit**: `boolean`

Do not emit output.

#### Default

```ts
false
```

***

### noEmitHelpers?

> `optional` **noEmitHelpers**: `boolean`

Do not generate custom helper functions like `__extends` in compiled output.

#### Default

```ts
false
```

***

### noEmitOnError?

> `optional` **noEmitOnError**: `boolean`

Do not emit outputs if any type checking errors were reported.

#### Default

```ts
false
```

***

### noErrorTruncation?

> `optional` **noErrorTruncation**: `boolean`

Do not truncate error messages.

#### Default

```ts
false
```

***

### noFallthroughCasesInSwitch?

> `optional` **noFallthroughCasesInSwitch**: `boolean`

Report errors for fallthrough cases in switch statement.

#### Default

```ts
false
```

***

### noImplicitAny?

> `optional` **noImplicitAny**: `boolean`

Warn on expressions and declarations with an implied 'any' type.

#### Default

```ts
false
```

***

### noImplicitOverride?

> `optional` **noImplicitOverride**: `boolean`

Ensure overriding members in derived classes are marked with an override modifier.

#### Default

```ts
false
```

***

### noImplicitReturns?

> `optional` **noImplicitReturns**: `boolean`

Report error when not all code paths in function return a value.

#### Default

```ts
false
```

***

### noImplicitThis?

> `optional` **noImplicitThis**: `boolean`

Raise error on 'this' expressions with an implied any type.

#### Default

```ts
false
```

***

### ~~noImplicitUseStrict?~~

> `optional` **noImplicitUseStrict**: `boolean`

Do not emit `'use strict'` directives in module output.

#### Default

```ts
false
```

#### Deprecated

This option will be removed in TypeScript 5.5.

***

### noLib?

> `optional` **noLib**: `boolean`

Do not include the default library file (lib.d.ts).

#### Default

```ts
false
```

***

### noPropertyAccessFromIndexSignature?

> `optional` **noPropertyAccessFromIndexSignature**: `boolean`

Enforces using indexed accessors for keys declared using an indexed type.

#### Default

```ts
false
```

***

### noResolve?

> `optional` **noResolve**: `boolean`

Do not add triple-slash references or module import targets to the list of compiled files.

#### Default

```ts
false
```

***

### ~~noStrictGenericChecks?~~

> `optional` **noStrictGenericChecks**: `boolean`

Disable strict checking of generic signatures in function types.

#### Default

```ts
false
```

#### Deprecated

This option will be removed in TypeScript 5.5.

***

### noUncheckedIndexedAccess?

> `optional` **noUncheckedIndexedAccess**: `boolean`

Add `undefined` to a type when accessed using an index.

#### Default

```ts
false
```

***

### noUncheckedSideEffectImports?

> `optional` **noUncheckedSideEffectImports**: `boolean`

Report error if failed to find a source file for a side effect import.

#### Default

```ts
false
```

***

### noUnusedLocals?

> `optional` **noUnusedLocals**: `boolean`

Report errors on unused locals.

#### Default

```ts
false
```

***

### noUnusedParameters?

> `optional` **noUnusedParameters**: `boolean`

Report errors on unused parameters.

#### Default

```ts
false
```

***

### outDir?

> `optional` **outDir**: `string`

Redirect output structure to the directory.

***

### outFile?

> `optional` **outFile**: `string`

Concatenate and emit output to single file.

***

### paths?

> `optional` **paths**: [`Record`](Record.md)\<`string`, `string`[]\>

Specify path mapping to be computed relative to baseUrl option.

***

### plugins?

> `optional` **plugins**: [`Plugin`](../namespaces/CompilerOptions/type-aliases/Plugin.md)[]

List of TypeScript language server plugins to load.

***

### preserveConstEnums?

> `optional` **preserveConstEnums**: `boolean`

Do not erase const enum declarations in generated code.

#### Default

```ts
false
```

***

### preserveSymlinks?

> `optional` **preserveSymlinks**: `boolean`

Do not resolve symlinks to their real path; treat a symlinked file like a real one.

#### Default

```ts
false
```

***

### ~~preserveValueImports?~~

> `optional` **preserveValueImports**: `boolean`

Preserve unused imported values in the JavaScript output that would otherwise be removed.

#### Default

```ts
true
```

#### Deprecated

Use `verbatimModuleSyntax` instead.

***

### preserveWatchOutput?

> `optional` **preserveWatchOutput**: `boolean`

Keep outdated console output in watch mode instead of clearing the screen.

#### Default

```ts
false
```

***

### pretty?

> `optional` **pretty**: `boolean`

Stylize errors and messages using color and context (experimental).

#### Default

```ts
true // Unless piping to another program or redirecting output to a file.
```

***

### reactNamespace?

> `optional` **reactNamespace**: `string`

Specifies the object invoked for `createElement` and `__spread` when targeting `'react'` JSX emit.

#### Default

```ts
'React'
```

***

### removeComments?

> `optional` **removeComments**: `boolean`

Do not emit comments to output.

#### Default

```ts
false
```

***

### resolveJsonModule?

> `optional` **resolveJsonModule**: `boolean`

Include modules imported with `.json` extension.

#### Default

```ts
false
```

***

### resolvePackageJsonExports?

> `optional` **resolvePackageJsonExports**: `boolean`

Forces TypeScript to consult the exports field of package.json files if it ever reads from a package in node_modules.

#### Default

```ts
false
```

***

### resolvePackageJsonImports?

> `optional` **resolvePackageJsonImports**: `boolean`

Forces TypeScript to consult the imports field of package.json files when performing a lookup that starts with # from a file whose ancestor directory contains a package.json.

#### Default

```ts
false
```

***

### rootDir?

> `optional` **rootDir**: `string`

Specifies the root directory of input files.

Use to control the output directory structure with `--outDir`.

***

### rootDirs?

> `optional` **rootDirs**: `string`[]

Specify list of root directories to be used when resolving modules.

***

### ~~skipDefaultLibCheck?~~

> `optional` **skipDefaultLibCheck**: `boolean`

#### Deprecated

use `skipLibCheck` instead.

***

### skipLibCheck?

> `optional` **skipLibCheck**: `boolean`

Skip type checking of declaration files.

#### Default

```ts
false
```

***

### sourceMap?

> `optional` **sourceMap**: `boolean`

Generates corresponding '.map' file.

#### Default

```ts
false
```

***

### sourceRoot?

> `optional` **sourceRoot**: `string`

Specifies the location where debugger should locate TypeScript files instead of source locations.

***

### strict?

> `optional` **strict**: `boolean`

Enable all strict type checking options.

#### Default

```ts
false
```

***

### strictBindCallApply?

> `optional` **strictBindCallApply**: `boolean`

Enable stricter checking of of the `bind`, `call`, and `apply` methods on functions.

#### Default

```ts
false
```

***

### strictBuiltinIteratorReturn?

> `optional` **strictBuiltinIteratorReturn**: `boolean`

Built-in iterators are instantiated with a `TReturn` type of undefined instead of `any`.

#### Default

```ts
false
```

***

### strictFunctionTypes?

> `optional` **strictFunctionTypes**: `boolean`

Disable bivariant parameter checking for function types.

#### Default

```ts
false
```

***

### strictNullChecks?

> `optional` **strictNullChecks**: `boolean`

Enable strict null checks.

#### Default

```ts
false
```

***

### strictPropertyInitialization?

> `optional` **strictPropertyInitialization**: `boolean`

Ensure non-undefined class properties are initialized in the constructor.

#### Default

```ts
false
```

***

### stripInternal?

> `optional` **stripInternal**: `boolean`

Do not emit declarations for code that has an `@internal` annotation.

***

### ~~suppressExcessPropertyErrors?~~

> `optional` **suppressExcessPropertyErrors**: `boolean`

Suppress excess property checks for object literals.

#### Default

```ts
false
```

#### Deprecated

This option will be removed in TypeScript 5.5.

***

### ~~suppressImplicitAnyIndexErrors?~~

> `optional` **suppressImplicitAnyIndexErrors**: `boolean`

Suppress noImplicitAny errors for indexing objects lacking index signatures.

#### Default

```ts
false
```

#### Deprecated

This option will be removed in TypeScript 5.5.

***

### target?

> `optional` **target**: [`Target`](../namespaces/CompilerOptions/type-aliases/Target.md)

Specify ECMAScript target version.

#### Default

```ts
'es3'
```

***

### traceResolution?

> `optional` **traceResolution**: `boolean`

Enable tracing of the name resolution process.

#### Default

```ts
false
```

***

### tsBuildInfoFile?

> `optional` **tsBuildInfoFile**: `string`

Specify file to store incremental compilation information.

#### Default

```ts
'.tsbuildinfo'
```

***

### typeRoots?

> `optional` **typeRoots**: `string`[]

Specify list of directories for type definition files to be included.

***

### types?

> `optional` **types**: `string`[]

Type declaration files to be included in compilation.

***

### useDefineForClassFields?

> `optional` **useDefineForClassFields**: `boolean`

Emit ECMAScript standard class fields.

#### Default

```ts
false
```

***

### useUnknownInCatchVariables?

> `optional` **useUnknownInCatchVariables**: `boolean`

Default catch clause variables as `unknown` instead of `any`.

#### Default

```ts
false
```

***

### verbatimModuleSyntax?

> `optional` **verbatimModuleSyntax**: `boolean`

Anything that uses the type modifier is dropped entirely.

#### Default

```ts
false
```

***

### ~~watch?~~

> `optional` **watch**: `boolean`

Watch input files.

#### Default

```ts
false
```

#### Deprecated

Use watchOptions instead.

***

### ~~watchDirectory?~~

> `optional` **watchDirectory**: [`WatchDirectory`](../namespaces/CompilerOptions/type-aliases/WatchDirectory.md)

Specify the strategy for watching directories under systems that lack recursive file-watching functionality.

#### Default

```ts
'useFsEvents'
```

#### Deprecated

Use watchOptions.watchDirectory instead.

***

### ~~watchFile?~~

> `optional` **watchFile**: [`WatchFile`](../namespaces/CompilerOptions/type-aliases/WatchFile.md)

Specify the strategy for watching individual files.

#### Default

```ts
'useFsEvents'
```

#### Deprecated

Use watchOptions.watchFile instead.

[**@eslint-react/core**](../../README.md)

***

[@eslint-react/core](../../README.md) / [\<internal\>](../README.md) / RuleContext

# Interface: RuleContext\<MessageIds, Options\>

## Type Parameters

• **MessageIds** *extends* `string`

• **Options** *extends* readonly `unknown`[]

## Properties

### cwd

> **cwd**: `string`

The current working directory passed to Linter.
It is a path to a directory that should be considered as the current working directory.

***

### filename

> **filename**: `string`

The filename associated with the source.

***

### id

> **id**: `string`

The rule ID.

***

### languageOptions

> **languageOptions**: [`LanguageOptions`](LanguageOptions.md)

The language options configured for this run

***

### options

> **options**: `Options`

An array of the configured options for this rule.
This array does not include the rule severity.

***

### parserOptions

> **parserOptions**: [`ParserOptions`](ParserOptions.md)

The parser options configured for this run

***

### parserPath

> **parserPath**: `undefined` \| `string`

The name of the parser from configuration, if in eslintrc (legacy) config.

***

### ~~parserServices?~~

> `optional` **parserServices**: [`ParserServices`](../type-aliases/ParserServices.md)

An object containing parser-provided services for rules

#### Deprecated

in favor of `SourceCode#parserServices`

***

### physicalFilename

> **physicalFilename**: `string`

The full path of the file on disk without any code block information (unlike `filename`).

***

### settings

> **settings**: `SharedConfigurationSettings`

The shared settings from configuration.
We do not have any shared settings in this plugin.

***

### sourceCode

> **sourceCode**: [`Readonly`](../type-aliases/Readonly.md)\<[`SourceCode`](../classes/SourceCode.md)\>

A SourceCode object that you can use to work with the source that
was passed to ESLint.

## Methods

### ~~getAncestors()~~

> **getAncestors**(): [`Node`](../type-aliases/Node.md)[]

Returns an array of the ancestors of the currently-traversed node, starting at
the root of the AST and continuing through the direct parent of the current node.
This array does not include the currently-traversed node itself.

#### Returns

[`Node`](../type-aliases/Node.md)[]

#### Deprecated

in favor of `SourceCode#getAncestors`

***

### ~~getCwd()~~

> **getCwd**(): `string`

Returns the current working directory passed to Linter.
It is a path to a directory that should be considered as the current working directory.

#### Returns

`string`

#### Deprecated

in favor of `RuleContext#cwd`

***

### ~~getDeclaredVariables()~~

> **getDeclaredVariables**(`node`): readonly [`ScopeVariable`](../type-aliases/ScopeVariable.md)[]

Returns a list of variables declared by the given node.
This information can be used to track references to variables.

#### Parameters

##### node

[`Node`](../type-aliases/Node.md)

#### Returns

readonly [`ScopeVariable`](../type-aliases/ScopeVariable.md)[]

#### Deprecated

in favor of `SourceCode#getDeclaredVariables`

***

### ~~getFilename()~~

> **getFilename**(): `string`

Returns the filename associated with the source.

#### Returns

`string`

#### Deprecated

in favor of `RuleContext#filename`

***

### ~~getPhysicalFilename()~~

> **getPhysicalFilename**(): `string`

Returns the full path of the file on disk without any code block information (unlike `getFilename()`).

#### Returns

`string`

#### Deprecated

in favor of `RuleContext#physicalFilename`

***

### ~~getScope()~~

> **getScope**(): [`Scope`](../type-aliases/Scope.md)

Returns the scope of the currently-traversed node.
This information can be used track references to variables.

#### Returns

[`Scope`](../type-aliases/Scope.md)

#### Deprecated

in favor of `SourceCode#getScope`

***

### ~~getSourceCode()~~

> **getSourceCode**(): [`Readonly`](../type-aliases/Readonly.md)\<[`SourceCode`](../classes/SourceCode.md)\>

Returns a SourceCode object that you can use to work with the source that
was passed to ESLint.

#### Returns

[`Readonly`](../type-aliases/Readonly.md)\<[`SourceCode`](../classes/SourceCode.md)\>

#### Deprecated

in favor of `RuleContext#sourceCode`

***

### ~~markVariableAsUsed()~~

> **markVariableAsUsed**(`name`): `boolean`

Marks a variable with the given name in the current scope as used.
This affects the no-unused-vars rule.

#### Parameters

##### name

`string`

#### Returns

`boolean`

#### Deprecated

in favor of `SourceCode#markVariableAsUsed`

***

### report()

> **report**(`descriptor`): `void`

Reports a problem in the code.

#### Parameters

##### descriptor

[`ReportDescriptor`](../type-aliases/ReportDescriptor.md)\<`MessageIds`\>

#### Returns

`void`

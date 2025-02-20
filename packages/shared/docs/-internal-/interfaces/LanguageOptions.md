[**@eslint-react/shared**](../../README.md)

***

[@eslint-react/shared](../../README.md) / [\<internal\>](../README.md) / LanguageOptions

# Interface: LanguageOptions

## Properties

### ecmaVersion?

> `optional` **ecmaVersion**: [`EcmaVersion`](../type-aliases/EcmaVersion.md)

The version of ECMAScript to support.
May be any year (i.e., `2022`) or version (i.e., `5`).
Set to `"latest"` for the most recent supported version.

#### Default

```ts
"latest"
```

***

### globals?

> `optional` **globals**: [`GlobalsConfig`](GlobalsConfig.md)

An object specifying additional objects that should be added to the global scope during linting.

***

### parser?

> `optional` **parser**: [`LooseParserModule`](../type-aliases/LooseParserModule.md)

An object containing a `parse()` method or a `parseForESLint()` method.

#### Default

```
// https://github.com/eslint/espree
require('espree')
```

***

### parserOptions?

> `optional` **parserOptions**: [`ParserOptions`](ParserOptions.md)

An object specifying additional options that are passed directly to the parser.
The available options are parser-dependent.

***

### sourceType?

> `optional` **sourceType**: [`SourceType`](../type-aliases/SourceType.md)

The type of JavaScript source code.
Possible values are `"script"` for traditional script files, `"module"` for ECMAScript modules (ESM), and `"commonjs"` for CommonJS files.

#### Default

```
// for `.js` and `.mjs` files
"module"
// for `.cjs` files
"commonjs"
```

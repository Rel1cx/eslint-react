[@eslint-react/kit](../README.md) / RuleContext

# Interface: RuleContext\<MessageIds, Options\>

## Type Parameters

| Type Parameter |
| ------ |
| `MessageIds` *extends* `string` |
| `Options` *extends* readonly `unknown`[] |

## Properties

| Property | Type | Description |
| ------ | ------ | ------ |
| <a id="property-cwd"></a> `cwd` | `string` | The current working directory passed to Linter. It is a path to a directory that should be considered as the current working directory. |
| <a id="property-filename"></a> `filename` | `string` | The filename associated with the source. |
| <a id="property-id"></a> `id` | `string` | The rule ID. |
| <a id="property-languageoptions"></a> `languageOptions` | `LanguageOptions` & \{ `parserOptions`: `ParserOptions`; \} | The language options configured for this run |
| <a id="property-options"></a> `options` | `Options` | An array of the configured options for this rule. This array does not include the rule severity. |
| <a id="property-parseroptions"></a> ~~`parserOptions`~~ | `ParserOptions` | The parser options configured for this run **Deprecated** This was deprecated in ESLint 9 and removed in ESLint 10. |
| <a id="property-parserpath"></a> ~~`parserPath`~~ | `string` \| `undefined` | The name of the parser from configuration, if in eslintrc (legacy) config. **Deprecated** This was deprecated in ESLint 9 and removed in ESLint 10. |
| <a id="property-parserservices"></a> ~~`parserServices?`~~ | `ParserServices` | An object containing parser-provided services for rules **Deprecated** in favor of `SourceCode#parserServices` |
| <a id="property-physicalfilename"></a> `physicalFilename` | `string` | The full path of the file on disk without any code block information (unlike `filename`). |
| <a id="property-settings"></a> `settings` | `SharedConfigurationSettings` | The shared settings from configuration. We do not have any shared settings in this plugin. |
| <a id="property-sourcecode"></a> `sourceCode` | [`Readonly`](https://www.typescriptlang.org/docs/handbook/utility-types.html#readonlytype)\<`SourceCode`\> | A SourceCode object that you can use to work with the source that was passed to ESLint. |

## Methods

### ~~getAncestors()~~

```ts
getAncestors(): Node[];
```

Returns an array of the ancestors of the currently-traversed node, starting at
the root of the AST and continuing through the direct parent of the current node.
This array does not include the currently-traversed node itself.

#### Returns

`Node`[]

#### Deprecated

in favor of `SourceCode#getAncestors`

***

### ~~getCwd()~~

```ts
getCwd(): string;
```

Returns the current working directory passed to Linter.
It is a path to a directory that should be considered as the current working directory.

#### Returns

`string`

#### Deprecated

in favor of `RuleContext#cwd`

***

### ~~getDeclaredVariables()~~

```ts
getDeclaredVariables(node: Node): readonly ScopeVariable[];
```

Returns a list of variables declared by the given node.
This information can be used to track references to variables.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `node` | `Node` |

#### Returns

readonly `ScopeVariable`[]

#### Deprecated

in favor of `SourceCode#getDeclaredVariables`

***

### ~~getFilename()~~

```ts
getFilename(): string;
```

Returns the filename associated with the source.

#### Returns

`string`

#### Deprecated

in favor of `RuleContext#filename`

***

### ~~getPhysicalFilename()~~

```ts
getPhysicalFilename(): string;
```

Returns the full path of the file on disk without any code block information (unlike `getFilename()`).

#### Returns

`string`

#### Deprecated

in favor of `RuleContext#physicalFilename`

***

### ~~getScope()~~

```ts
getScope(): Scope;
```

Returns the scope of the currently-traversed node.
This information can be used track references to variables.

#### Returns

`Scope`

#### Deprecated

in favor of `SourceCode#getScope`

***

### ~~getSourceCode()~~

```ts
getSourceCode(): Readonly<SourceCode>;
```

Returns a SourceCode object that you can use to work with the source that
was passed to ESLint.

#### Returns

[`Readonly`](https://www.typescriptlang.org/docs/handbook/utility-types.html#readonlytype)\<`SourceCode`\>

#### Deprecated

in favor of `RuleContext#sourceCode`

***

### ~~markVariableAsUsed()~~

```ts
markVariableAsUsed(name: string): boolean;
```

Marks a variable with the given name in the current scope as used.
This affects the no-unused-vars rule.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `name` | `string` |

#### Returns

`boolean`

#### Deprecated

in favor of `SourceCode#markVariableAsUsed`

***

### report()

#### Call Signature

```ts
report(descriptor: ReportDescriptor<MessageIds>): void;
```

Reports a problem in the code.

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `descriptor` | `ReportDescriptor`\<`MessageIds`\> |

##### Returns

`void`

#### Call Signature

```ts
report(descriptor: {
  data?: Readonly<Record<string, unknown>>;
  fix?:   | ((fixer: RuleFixer) => 
     | RuleFix
     | IterableIterator<RuleFix, any, any>
     | readonly RuleFix[]
     | null)
     | null;
  loc?:   | Readonly<Position>
     | Readonly<SourceLocation>;
  message: string;
  node: Node;
  suggest?:   | readonly {
     data?: Readonly<Record<string, unknown>>;
     desc: string;
     fix: (fixer: RuleFixer) => 
        | RuleFix
        | IterableIterator<RuleFix, any, any>
        | readonly RuleFix[]
       | null;
   }[]
     | null;
}): void;
```

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `descriptor` | \{ `data?`: [`Readonly`](https://www.typescriptlang.org/docs/handbook/utility-types.html#readonlytype)\<[`Record`](https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type)\<`string`, `unknown`\>\>; `fix?`: \| ((`fixer`: `RuleFixer`) => \| `RuleFix` \| `IterableIterator`\<`RuleFix`, `any`, `any`\> \| readonly `RuleFix`[] \| `null`) \| `null`; `loc?`: \| [`Readonly`](https://www.typescriptlang.org/docs/handbook/utility-types.html#readonlytype)\<`Position`\> \| [`Readonly`](https://www.typescriptlang.org/docs/handbook/utility-types.html#readonlytype)\<`SourceLocation`\>; `message`: `string`; `node`: `Node`; `suggest?`: \| readonly \{ `data?`: [`Readonly`](https://www.typescriptlang.org/docs/handbook/utility-types.html#readonlytype)\<[`Record`](https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type)\<`string`, `unknown`\>\>; `desc`: `string`; `fix`: (`fixer`: `RuleFixer`) => \| `RuleFix` \| `IterableIterator`\<`RuleFix`, `any`, `any`\> \| readonly `RuleFix`[] \| `null`; \}[] \| `null`; \} |
| `descriptor.data?` | [`Readonly`](https://www.typescriptlang.org/docs/handbook/utility-types.html#readonlytype)\<[`Record`](https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type)\<`string`, `unknown`\>\> |
| `descriptor.fix?` | \| ((`fixer`: `RuleFixer`) => \| `RuleFix` \| `IterableIterator`\<`RuleFix`, `any`, `any`\> \| readonly `RuleFix`[] \| `null`) \| `null` |
| `descriptor.loc?` | \| [`Readonly`](https://www.typescriptlang.org/docs/handbook/utility-types.html#readonlytype)\<`Position`\> \| [`Readonly`](https://www.typescriptlang.org/docs/handbook/utility-types.html#readonlytype)\<`SourceLocation`\> |
| `descriptor.message` | `string` |
| `descriptor.node` | `Node` |
| `descriptor.suggest?` | \| readonly \{ `data?`: [`Readonly`](https://www.typescriptlang.org/docs/handbook/utility-types.html#readonlytype)\<[`Record`](https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type)\<`string`, `unknown`\>\>; `desc`: `string`; `fix`: (`fixer`: `RuleFixer`) => \| `RuleFix` \| `IterableIterator`\<`RuleFix`, `any`, `any`\> \| readonly `RuleFix`[] \| `null`; \}[] \| `null` |

##### Returns

`void`

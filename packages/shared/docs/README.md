@eslint-react/shared

# @eslint-react/shared

## Table of contents

### Type Aliases

- [ESLintReactSettings](README.md#eslintreactsettings)
- [ESLintSettings](README.md#eslintsettings)

### Variables

- [GITHUB\_URL](README.md#github_url)
- [NPM\_SCOPE](README.md#npm_scope)
- [RE\_CAMEL\_CASE](README.md#re_camel_case)
- [RE\_CONSTANT\_CASE](README.md#re_constant_case)
- [RE\_JAVASCRIPT\_PROTOCOL](README.md#re_javascript_protocol)
- [RE\_KEBAB\_CASE](README.md#re_kebab_case)
- [RE\_PASCAL\_CASE](README.md#re_pascal_case)
- [RE\_SNAKE\_CASE](README.md#re_snake_case)
- [WEBSITE\_URL](README.md#website_url)

### Functions

- [createRuleForPlugin](README.md#createruleforplugin)
- [parseSchema](README.md#parseschema)
- [safeParseSchema](README.md#safeparseschema)

## Type Aliases

### ESLintReactSettings

Ƭ **ESLintReactSettings**: `ReadonlyDeep`\<`Output`\<typeof `ESLintReactSettingsSchema`\>\>

___

### ESLintSettings

Ƭ **ESLintSettings**: `ReadonlyDeep`\<\{ `[key: string]`: `unknown`; `reactOptions?`: [`ESLintReactSettings`](README.md#eslintreactsettings)  }\>

## Variables

### GITHUB\_URL

• `Const` **GITHUB\_URL**: ``"https://github.com/rel1cx/eslint-react/blob/main"``

___

### NPM\_SCOPE

• `Const` **NPM\_SCOPE**: ``"@eslint-react"``

-----------------------------------------------------------------------------
Meta
-----------------------------------------------------------------------------

___

### RE\_CAMEL\_CASE

• `Const` **RE\_CAMEL\_CASE**: `RegExp`

___

### RE\_CONSTANT\_CASE

• `Const` **RE\_CONSTANT\_CASE**: `RegExp`

___

### RE\_JAVASCRIPT\_PROTOCOL

• `Const` **RE\_JAVASCRIPT\_PROTOCOL**: `RegExp`

___

### RE\_KEBAB\_CASE

• `Const` **RE\_KEBAB\_CASE**: `RegExp`

___

### RE\_PASCAL\_CASE

• `Const` **RE\_PASCAL\_CASE**: `RegExp`

-----------------------------------------------------------------------------
RegExps
-----------------------------------------------------------------------------

___

### RE\_SNAKE\_CASE

• `Const` **RE\_SNAKE\_CASE**: `RegExp`

___

### WEBSITE\_URL

• `Const` **WEBSITE\_URL**: ``"https://eslint-react.xyz"``

## Functions

### createRuleForPlugin

▸ **createRuleForPlugin**(`pluginName`): \<TOptions, TMessageIds\>(`__namedParameters`: `Readonly`\<`RuleWithMetaAndName`\<`TOptions`, `TMessageIds`\>\>) => `RuleModule`\<`TMessageIds`, `TOptions`, `RuleListener`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `pluginName` | `string` |

#### Returns

`fn`

▸ \<`TOptions`, `TMessageIds`\>(`«destructured»`): `RuleModule`\<`TMessageIds`, `TOptions`, `RuleListener`\>

##### Type parameters

| Name | Type |
| :------ | :------ |
| `TOptions` | extends readonly `unknown`[] |
| `TMessageIds` | extends `string` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Readonly`\<`RuleWithMetaAndName`\<`TOptions`, `TMessageIds`\>\> |

##### Returns

`RuleModule`\<`TMessageIds`, `TOptions`, `RuleListener`\>

___

### parseSchema

▸ **parseSchema**\<`TSchema`\>(`schema`, `input`, `info?`): `Output`\<`TSchema`\>

Parses unknown input based on a schema.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TSchema` | extends `BaseSchema`\<`any`, `any`\> |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `schema` | `TSchema` | The schema to be used. |
| `input` | `unknown` | The input to be parsed. |
| `info?` | `Pick`\<`Partial`\<`Pick`\<`Issue`, ``"origin"`` \| ``"abortEarly"`` \| ``"abortPipeEarly"`` \| ``"skipPipe"``\>\>, ``"abortEarly"`` \| ``"abortPipeEarly"`` \| ``"skipPipe"``\> | The optional parse info. |

#### Returns

`Output`\<`TSchema`\>

The parsed output.

___

### safeParseSchema

▸ **safeParseSchema**\<`TSchema`\>(`schema`, `input`, `info?`): `SafeParseResult`\<`TSchema`\>

Parses unknown input based on a schema.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TSchema` | extends `BaseSchema`\<`any`, `any`\> |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `schema` | `TSchema` | The schema to be used. |
| `input` | `unknown` | The input to be parsed. |
| `info?` | `Pick`\<`Partial`\<`Pick`\<`Issue`, ``"origin"`` \| ``"abortEarly"`` \| ``"abortPipeEarly"`` \| ``"skipPipe"``\>\>, ``"abortEarly"`` \| ``"abortPipeEarly"`` \| ``"skipPipe"``\> | The optional parse info. |

#### Returns

`SafeParseResult`\<`TSchema`\>

The parsed output.

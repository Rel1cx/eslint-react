@eslint-react/shared

# @eslint-react/shared

## Table of contents

### Classes

- [CaseValidator](classes/CaseValidator.md)

### Type Aliases

- [ESLintReactSettings](README.md#eslintreactsettings)
- [ESLintSettings](README.md#eslintsettings)

### Variables

- [GITHUB\_URL](README.md#github_url)
- [NPM\_SCOPE](README.md#npm_scope)
- [RE\_JAVASCRIPT\_PROTOCOL](README.md#re_javascript_protocol)
- [WEBSITE\_URL](README.md#website_url)
- [presetRules](README.md#presetrules)

### Functions

- [createRuleForPlugin](README.md#createruleforplugin)
- [getCaseValidator](README.md#getcasevalidator)
- [getRule](README.md#getrule)
- [parseSchema](README.md#parseschema)
- [safeParseSchema](README.md#safeparseschema)
- [splitName](README.md#splitname)

## Type Aliases

### ESLintReactSettings

Ƭ **ESLintReactSettings**: `ReadonlyDeep`\<`Output`\<typeof `ESLintReactSettingsSchema`\>\>

___

### ESLintSettings

Ƭ **ESLintSettings**: `ReadonlyDeep`\<\{ `[key: string]`: `unknown`; `eslintReact?`: [`ESLintReactSettings`](README.md#eslintreactsettings)  }\>

## Variables

### GITHUB\_URL

• `Const` **GITHUB\_URL**: ``"https://github.com/rel1cx/eslint-react/blob/main"``

___

### NPM\_SCOPE

• `Const` **NPM\_SCOPE**: ``"@eslint-react"``

___

### RE\_JAVASCRIPT\_PROTOCOL

• `Const` **RE\_JAVASCRIPT\_PROTOCOL**: `RegExp`

___

### WEBSITE\_URL

• `Const` **WEBSITE\_URL**: ``"https://eslint-react.rel1cx.io"``

___

### presetRules

• `Const` **presetRules**: `PresetRules`

## Functions

### createRuleForPlugin

▸ **createRuleForPlugin**(`pluginName`): \<TOptions, TMessageIds\>(`urlCreator`: `Readonly`\<`RuleWithMetaAndName`\<`TOptions`, `TMessageIds`\>\>) => `RuleModule`\<`TMessageIds`, `TOptions`, `RuleListener`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `pluginName` | `string` |

#### Returns

`fn`

▸ \<`TOptions`, `TMessageIds`\>(`urlCreator`): `RuleModule`\<`TMessageIds`, `TOptions`, `RuleListener`\>

Creates reusable function to create rules with default options and docs URLs.

##### Type parameters

| Name | Type |
| :------ | :------ |
| `TOptions` | extends readonly `unknown`[] |
| `TMessageIds` | extends `string` |

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `urlCreator` | `Readonly`\<`RuleWithMetaAndName`\<`TOptions`, `TMessageIds`\>\> | Creates a documentation URL for a given rule name. |

##### Returns

`RuleModule`\<`TMessageIds`, `TOptions`, `RuleListener`\>

Function to create a rule with the docs URL format.

___

### getCaseValidator

▸ **getCaseValidator**(`ruleName`, `ignorePattern?`): [`CaseValidator`](classes/CaseValidator.md)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `ruleName` | `string` | `undefined` |
| `ignorePattern` | `string`[] | `[]` |

#### Returns

[`CaseValidator`](classes/CaseValidator.md)

___

### getRule

▸ **getRule**(`expression`, `preset?`): `Rule`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `expression` | `string` | `undefined` |
| `preset` | `PresetRules` | `presetRules` |

#### Returns

`Rule`

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

___

### splitName

▸ **splitName**(`name`): `string`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`string`[]

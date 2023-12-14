@eslint-react/shared

# @eslint-react/shared

## Table of contents

### Classes

- [CaseValidator](classes/CaseValidator.md)

### Variables

- [presetRules](README.md#presetrules)
- [uid](README.md#uid)

### Functions

- [createRuleForPlugin](README.md#createruleforplugin)
- [getCaseValidator](README.md#getcasevalidator)
- [getRule](README.md#getrule)
- [mergeConfigs](README.md#mergeconfigs)
- [splitName](README.md#splitname)

## Variables

### presetRules

• `Const` **presetRules**: `PresetRules`

---

### uid

• `Const` **uid**: `default`

## Functions

### createRuleForPlugin

▸ **createRuleForPlugin**(`pluginName`): \<TOptions, TMessageIds\>(`urlCreator`: `Readonly`\<`RuleWithMetaAndName`\<`TOptions`, `TMessageIds`\>\>) => `RuleModule`\<`TMessageIds`, `TOptions`, `RuleListener`\>

#### Parameters

| Name         | Type     |
| :----------- | :------- |
| `pluginName` | `string` |

#### Returns

`fn`

▸ \<`TOptions`, `TMessageIds`\>(`urlCreator`): `RuleModule`\<`TMessageIds`, `TOptions`, `RuleListener`\>

Creates reusable function to create rules with default options and docs URLs.

##### Type parameters

| Name          | Type                         |
| :------------ | :--------------------------- |
| `TOptions`    | extends readonly `unknown`[] |
| `TMessageIds` | extends `string`             |

##### Parameters

| Name         | Type                                                             | Description                                        |
| :----------- | :--------------------------------------------------------------- | :------------------------------------------------- |
| `urlCreator` | `Readonly`\<`RuleWithMetaAndName`\<`TOptions`, `TMessageIds`\>\> | Creates a documentation URL for a given rule name. |

##### Returns

`RuleModule`\<`TMessageIds`, `TOptions`, `RuleListener`\>

Function to create a rule with the docs URL format.

---

### getCaseValidator

▸ **getCaseValidator**(`ruleName`, `ignorePattern?`): [`CaseValidator`](classes/CaseValidator.md)

#### Parameters

| Name            | Type       | Default value |
| :-------------- | :--------- | :------------ |
| `ruleName`      | `string`   | `undefined`   |
| `ignorePattern` | `string`[] | `[]`          |

#### Returns

[`CaseValidator`](classes/CaseValidator.md)

---

### getRule

▸ **getRule**(`expression`, `preset?`): `Rule`

#### Parameters

| Name         | Type          | Default value |
| :----------- | :------------ | :------------ |
| `expression` | `string`      | `undefined`   |
| `preset`     | `PresetRules` | `presetRules` |

#### Returns

`Rule`

---

### mergeConfigs

▸ **mergeConfigs**\<`Ts`\>(`...objects`): `DeepMergeHKT`\<`Ts`, `Readonly`\<\{ `DeepMergeArraysURI`: `"DeepMergeArraysDefaultURI"` ; `DeepMergeMapsURI`: `"DeepMergeMapsDefaultURI"` ; `DeepMergeOthersURI`: `"DeepMergeLeafURI"` ; `DeepMergeRecordsURI`: `"DeepMergeRecordsDefaultURI"` ; `DeepMergeSetsURI`: `"DeepMergeSetsDefaultURI"` }\>, \{ `keyPath`: `PropertyKey`[] }\>

Deeply merge two or more objects using the given options and meta data.

#### Type parameters

| Name | Type                         |
| :--- | :--------------------------- |
| `Ts` | extends readonly `unknown`[] |

#### Parameters

| Name         | Type |
| :----------- | :--- |
| `...objects` | `Ts` |

#### Returns

`DeepMergeHKT`\<`Ts`, `Readonly`\<\{ `DeepMergeArraysURI`: `"DeepMergeArraysDefaultURI"` ; `DeepMergeMapsURI`: `"DeepMergeMapsDefaultURI"` ; `DeepMergeOthersURI`: `"DeepMergeLeafURI"` ; `DeepMergeRecordsURI`: `"DeepMergeRecordsDefaultURI"` ; `DeepMergeSetsURI`: `"DeepMergeSetsDefaultURI"` }\>, \{ `keyPath`: `PropertyKey`[] }\>

---

### splitName

▸ **splitName**(`name`): `string`[]

#### Parameters

| Name   | Type     |
| :----- | :------- |
| `name` | `string` |

#### Returns

`string`[]

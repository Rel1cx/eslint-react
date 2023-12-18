@eslint-react/eslint-utils

# @eslint-react/eslint-utils

## Table of contents

### Functions

- [createRuleForPlugin](README.md#createruleforplugin)
- [mergeConfigs](README.md#mergeconfigs)

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

### mergeConfigs

▸ **mergeConfigs**\<`Ts`\>(`...objects`): `DeepMergeHKT`\<`Ts`, `Readonly`\<\{ `DeepMergeArraysURI`: ``"DeepMergeArraysDefaultURI"`` ; `DeepMergeMapsURI`: ``"DeepMergeMapsDefaultURI"`` ; `DeepMergeOthersURI`: ``"DeepMergeLeafURI"`` ; `DeepMergeRecordsURI`: ``"DeepMergeRecordsDefaultURI"`` ; `DeepMergeSetsURI`: ``"DeepMergeSetsDefaultURI"``  }\>, \{ `keyPath`: `PropertyKey`[]  }\>

Deeply merge two or more objects using the given options and meta data.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Ts` | extends readonly `unknown`[] |

#### Parameters

| Name | Type |
| :------ | :------ |
| `...objects` | `Ts` |

#### Returns

`DeepMergeHKT`\<`Ts`, `Readonly`\<\{ `DeepMergeArraysURI`: ``"DeepMergeArraysDefaultURI"`` ; `DeepMergeMapsURI`: ``"DeepMergeMapsDefaultURI"`` ; `DeepMergeOthersURI`: ``"DeepMergeLeafURI"`` ; `DeepMergeRecordsURI`: ``"DeepMergeRecordsDefaultURI"`` ; `DeepMergeSetsURI`: ``"DeepMergeSetsDefaultURI"``  }\>, \{ `keyPath`: `PropertyKey`[]  }\>

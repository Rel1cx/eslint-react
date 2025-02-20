[**@eslint-react/shared**](../../README.md)

***

[@eslint-react/shared](../../README.md) / [\<internal\>](../README.md) / RuleCreator

# Function: RuleCreator()

> **RuleCreator**\<`PluginDocs`\>(`urlCreator`): \<`Options`, `MessageIds`\>(`__namedParameters`) => [`RuleModule`](../interfaces/RuleModule.md)\<`MessageIds`, `Options`, `PluginDocs`\>

Creates reusable function to create rules with default options and docs URLs.

## Type Parameters

• **PluginDocs** = `unknown`

## Parameters

### urlCreator

(`ruleName`) => `string`

Creates a documentation URL for a given rule name.

## Returns

`Function`

Function to create a rule with the docs URL format.

### Type Parameters

• **Options** *extends* readonly `unknown`[]

• **MessageIds** *extends* `string`

### Parameters

#### \_\_namedParameters

[`Readonly`](../type-aliases/Readonly.md)\<[`RuleWithMetaAndName`](../interfaces/RuleWithMetaAndName.md)\<`Options`, `MessageIds`, `PluginDocs`\>\>

### Returns

[`RuleModule`](../interfaces/RuleModule.md)\<`MessageIds`, `Options`, `PluginDocs`\>

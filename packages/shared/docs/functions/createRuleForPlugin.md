[**@eslint-react/shared**](../README.md) • **Docs**

***

[@eslint-react/shared](../README.md) / createRuleForPlugin

# Function: createRuleForPlugin()

> **createRuleForPlugin**(`pluginName`): \<`Options`, `MessageIds`\>(`__namedParameters`) => `RuleModule`\<`MessageIds`, `Options`, `RuleListener`\>

Get the ESLint rule creator for a plugin.

## Parameters

• **pluginName**: `string`

The name of the plugin.

## Returns

`Function`

The ESLint rule creator.

### Type Parameters

• **Options** *extends* readonly `unknown`[]

• **MessageIds** *extends* `string`

### Parameters

• **\_\_namedParameters**: `Readonly`\<`RuleWithMetaAndName`\<`Options`, `MessageIds`\>\>

### Returns

`RuleModule`\<`MessageIds`, `Options`, `RuleListener`\>

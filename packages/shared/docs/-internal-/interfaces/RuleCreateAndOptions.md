[**@eslint-react/shared**](../../README.md)

***

[@eslint-react/shared](../../README.md) / [\<internal\>](../README.md) / RuleCreateAndOptions

# Interface: RuleCreateAndOptions\<Options, MessageIds\>

## Extended by

- [`RuleWithMetaAndName`](RuleWithMetaAndName.md)
- [`RuleWithMeta`](RuleWithMeta.md)

## Type Parameters

• **Options** *extends* readonly `unknown`[]

• **MessageIds** *extends* `string`

## Properties

### create()

> **create**: (`context`, `optionsWithDefault`) => [`RuleListener`](../type-aliases/RuleListener.md)

#### Parameters

##### context

[`Readonly`](../type-aliases/Readonly.md)\<[`RuleContext`](RuleContext.md)\<`MessageIds`, `Options`\>\>

##### optionsWithDefault

[`Readonly`](../type-aliases/Readonly.md)\<`Options`\>

#### Returns

[`RuleListener`](../type-aliases/RuleListener.md)

***

### defaultOptions

> **defaultOptions**: [`Readonly`](../type-aliases/Readonly.md)\<`Options`\>

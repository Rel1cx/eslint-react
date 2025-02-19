[**@eslint-react/shared**](../../README.md)

***

[@eslint-react/shared](../../README.md) / [\<internal\>](../README.md) / RuleModule

# Interface: RuleModule\<MessageIds, Options, Docs, ExtendedRuleListener\>

## Type Parameters

• **MessageIds** *extends* `string`

• **Options** *extends* readonly `unknown`[] = \[\]

• **Docs** = `unknown`

• **ExtendedRuleListener** *extends* [`RuleListener`](../type-aliases/RuleListener.md) = [`RuleListener`](../type-aliases/RuleListener.md)

## Properties

### defaultOptions

> **defaultOptions**: `Options`

Default options the rule will be run with

***

### meta

> **meta**: [`RuleMetaData`](RuleMetaData.md)\<`MessageIds`, `Docs`, `Options`\>

Metadata about the rule

## Methods

### create()

> **create**(`context`): `ExtendedRuleListener`

Function which returns an object with methods that ESLint calls to “visit”
nodes while traversing the abstract syntax tree.

#### Parameters

##### context

[`Readonly`](../type-aliases/Readonly.md)\<[`RuleContext`](RuleContext.md)\<`MessageIds`, `Options`\>\>

#### Returns

`ExtendedRuleListener`

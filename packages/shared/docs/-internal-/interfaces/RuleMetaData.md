[**@eslint-react/shared**](../../README.md)

***

[@eslint-react/shared](../../README.md) / [\<internal\>](../README.md) / RuleMetaData

# Interface: RuleMetaData\<MessageIds, PluginDocs, Options\>

## Type Parameters

• **MessageIds** *extends* `string`

• **PluginDocs** = `unknown`

• **Options** *extends* readonly `unknown`[] = \[\]

## Properties

### defaultOptions?

> `optional` **defaultOptions**: `Options`

Specifies default options for the rule. If present, any user-provided options in their config will be merged on top of them recursively.
This merging will be applied directly to `context.options`.
If you want backwards-compatible support for earlier ESLint version; consider using the top-level `defaultOptions` instead.

since ESLint 9.15.0

***

### deprecated?

> `optional` **deprecated**: `boolean`

True if the rule is deprecated, false otherwise

***

### docs?

> `optional` **docs**: `PluginDocs` & [`RuleMetaDataDocs`](RuleMetaDataDocs.md)

Documentation for the rule

***

### fixable?

> `optional` **fixable**: `"code"` \| `"whitespace"`

The fixer category. Omit if there is no fixer

***

### hasSuggestions?

> `optional` **hasSuggestions**: `boolean`

Specifies whether rules can return suggestions. Omit if there is no suggestions

***

### messages

> **messages**: [`Record`](../type-aliases/Record.md)\<`MessageIds`, `string`\>

A map of messages which the rule can report.
The key is the messageId, and the string is the parameterised error string.
See: https://eslint.org/docs/developer-guide/working-with-rules#messageids

***

### replacedBy?

> `optional` **replacedBy**: readonly `string`[]

The name of the rule this rule was replaced by, if it was deprecated.

***

### schema

> **schema**: [`JSONSchema4`](../type-aliases/JSONSchema4.md) \| readonly [`JSONSchema4`](../type-aliases/JSONSchema4.md)[]

The options schema. Supply an empty array if there are no options.

***

### type

> **type**: `"layout"` \| `"problem"` \| `"suggestion"`

The type of rule.
- `"problem"` means the rule is identifying code that either will cause an error or may cause a confusing behavior. Developers should consider this a high priority to resolve.
- `"suggestion"` means the rule is identifying something that could be done in a better way but no errors will occur if the code isn’t changed.
- `"layout"` means the rule cares primarily about whitespace, semicolons, commas, and parentheses, all the parts of the program that determine how the code looks rather than how it executes. These rules work on parts of the code that aren’t specified in the AST.

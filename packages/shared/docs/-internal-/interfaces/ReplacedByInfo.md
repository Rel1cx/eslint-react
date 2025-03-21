[**@eslint-react/shared**](../../README.md)

***

[@eslint-react/shared](../../README.md) / [\<internal\>](../README.md) / ReplacedByInfo

# Interface: ReplacedByInfo

## Properties

### message?

> `optional` **message**: `string`

General message presented to the user, e.g. how to replace the rule

***

### plugin?

> `optional` **plugin**: [`ExternalSpecifier`](ExternalSpecifier.md)

Name should be "eslint" if the replacement is an ESLint core rule. Omit
the property if the replacement is in the same plugin.

***

### rule?

> `optional` **rule**: [`ExternalSpecifier`](ExternalSpecifier.md)

Name and documentation of the replacement rule

***

### url?

> `optional` **url**: `string`

URL to more information about this replacement in general

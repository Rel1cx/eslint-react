[**@eslint-react/shared**](../../README.md)

***

[@eslint-react/shared](../../README.md) / [\<internal\>](../README.md) / DeprecatedInfo

# Interface: DeprecatedInfo

## Properties

### availableUntil?

> `optional` **availableUntil**: `null` \| `string`

The estimated version when the rule is removed (probably the next major
version). null means the rule is "frozen" (will be available but will not
be changed).

***

### deprecatedSince?

> `optional` **deprecatedSince**: `string`

The package version since when the rule is deprecated (should use full
semver without a leading "v").

***

### message?

> `optional` **message**: `string`

General message presented to the user, e.g. for the key rule why the rule
is deprecated or for info how to replace the rule.

***

### replacedBy?

> `optional` **replacedBy**: [`ReplacedByInfo`](ReplacedByInfo.md)[]

An empty array explicitly states that there is no replacement.

***

### url?

> `optional` **url**: `string`

URL to more information about this deprecation in general.

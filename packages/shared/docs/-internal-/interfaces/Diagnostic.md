[**@eslint-react/shared**](../../README.md)

***

[@eslint-react/shared](../../README.md) / [\<internal\>](../README.md) / Diagnostic

# Interface: Diagnostic

## Extends

- [`DiagnosticRelatedInformation`](DiagnosticRelatedInformation.md)

## Extended by

- [`DiagnosticWithLocation`](DiagnosticWithLocation.md)

## Properties

### category

> **category**: [`DiagnosticCategory`](../enumerations/DiagnosticCategory.md)

#### Inherited from

[`DiagnosticRelatedInformation`](DiagnosticRelatedInformation.md).[`category`](DiagnosticRelatedInformation.md#category)

***

### code

> **code**: `number`

#### Inherited from

[`DiagnosticRelatedInformation`](DiagnosticRelatedInformation.md).[`code`](DiagnosticRelatedInformation.md#code)

***

### file

> **file**: `undefined` \| [`SourceFile`](SourceFile.md)

#### Inherited from

[`DiagnosticRelatedInformation`](DiagnosticRelatedInformation.md).[`file`](DiagnosticRelatedInformation.md#file)

***

### length

> **length**: `undefined` \| `number`

#### Inherited from

[`DiagnosticRelatedInformation`](DiagnosticRelatedInformation.md).[`length`](DiagnosticRelatedInformation.md#length)

***

### messageText

> **messageText**: `string` \| [`DiagnosticMessageChain`](DiagnosticMessageChain.md)

#### Inherited from

[`DiagnosticRelatedInformation`](DiagnosticRelatedInformation.md).[`messageText`](DiagnosticRelatedInformation.md#messagetext)

***

### relatedInformation?

> `optional` **relatedInformation**: [`DiagnosticRelatedInformation`](DiagnosticRelatedInformation.md)[]

***

### reportsDeprecated?

> `optional` **reportsDeprecated**: `object`

***

### reportsUnnecessary?

> `optional` **reportsUnnecessary**: `object`

May store more in future. For now, this will simply be `true` to indicate when a diagnostic is an unused-identifier diagnostic.

***

### source?

> `optional` **source**: `string`

***

### start

> **start**: `undefined` \| `number`

#### Inherited from

[`DiagnosticRelatedInformation`](DiagnosticRelatedInformation.md).[`start`](DiagnosticRelatedInformation.md#start)

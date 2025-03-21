[**@eslint-react/shared**](../../README.md)

***

[@eslint-react/shared](../../README.md) / [\<internal\>](../README.md) / DiagnosticWithLocation

# Interface: DiagnosticWithLocation

## Extends

- [`Diagnostic`](Diagnostic.md)

## Properties

### category

> **category**: [`DiagnosticCategory`](../enumerations/DiagnosticCategory.md)

#### Inherited from

[`Diagnostic`](Diagnostic.md).[`category`](Diagnostic.md#category)

***

### code

> **code**: `number`

#### Inherited from

[`Diagnostic`](Diagnostic.md).[`code`](Diagnostic.md#code)

***

### file

> **file**: [`SourceFile`](SourceFile.md)

#### Overrides

[`Diagnostic`](Diagnostic.md).[`file`](Diagnostic.md#file)

***

### length

> **length**: `number`

#### Overrides

[`Diagnostic`](Diagnostic.md).[`length`](Diagnostic.md#length)

***

### messageText

> **messageText**: `string` \| [`DiagnosticMessageChain`](DiagnosticMessageChain.md)

#### Inherited from

[`Diagnostic`](Diagnostic.md).[`messageText`](Diagnostic.md#messagetext)

***

### relatedInformation?

> `optional` **relatedInformation**: [`DiagnosticRelatedInformation`](DiagnosticRelatedInformation.md)[]

#### Inherited from

[`Diagnostic`](Diagnostic.md).[`relatedInformation`](Diagnostic.md#relatedinformation)

***

### reportsDeprecated?

> `optional` **reportsDeprecated**: `object`

#### Inherited from

[`Diagnostic`](Diagnostic.md).[`reportsDeprecated`](Diagnostic.md#reportsdeprecated)

***

### reportsUnnecessary?

> `optional` **reportsUnnecessary**: `object`

May store more in future. For now, this will simply be `true` to indicate when a diagnostic is an unused-identifier diagnostic.

#### Inherited from

[`Diagnostic`](Diagnostic.md).[`reportsUnnecessary`](Diagnostic.md#reportsunnecessary)

***

### source?

> `optional` **source**: `string`

#### Inherited from

[`Diagnostic`](Diagnostic.md).[`source`](Diagnostic.md#source)

***

### start

> **start**: `number`

#### Overrides

[`Diagnostic`](Diagnostic.md).[`start`](Diagnostic.md#start)

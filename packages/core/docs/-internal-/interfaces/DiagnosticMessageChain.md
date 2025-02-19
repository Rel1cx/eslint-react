[**@eslint-react/core**](../../README.md)

***

[@eslint-react/core](../../README.md) / [\<internal\>](../README.md) / DiagnosticMessageChain

# Interface: DiagnosticMessageChain

A linked list of formatted diagnostic messages to be used as part of a multiline message.
It is built from the bottom up, leaving the head to be the "main" diagnostic.
While it seems that DiagnosticMessageChain is structurally similar to DiagnosticMessage,
the difference is that messages are all preformatted in DMC.

## Properties

### category

> **category**: [`DiagnosticCategory`](../enumerations/DiagnosticCategory.md)

***

### code

> **code**: `number`

***

### messageText

> **messageText**: `string`

***

### next?

> `optional` **next**: [`DiagnosticMessageChain`](DiagnosticMessageChain.md)[]

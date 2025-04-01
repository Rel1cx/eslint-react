[**@eslint-react/kit**](../../README.md)

***

[@eslint-react/kit](../../README.md) / [\<internal\>](../README.md) / LastTupleItem

# Type Alias: LastTupleItem\<TTuple\>

> **LastTupleItem**\<`TTuple`\> = `TTuple`\[`TTuple` *extends* readonly \[`unknown`, `...(infer TRest)`\] ? `TRest`\[`"length"`\] : `never`\]

Extracts last tuple item.

## Type Parameters

### TTuple

`TTuple` *extends* readonly \[`unknown`, `...unknown[]`\]

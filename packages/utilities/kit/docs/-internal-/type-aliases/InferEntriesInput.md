[**@eslint-react/kit**](../../README.md)

***

[@eslint-react/kit](../../README.md) / [\<internal\>](../README.md) / InferEntriesInput

# Type Alias: InferEntriesInput\<TEntries\>

> **InferEntriesInput**\<`TEntries`\> = `{ -readonly [TKey in keyof TEntries]: InferInput<TEntries[TKey]> }`

Infer entries input type.

## Type Parameters

### TEntries

`TEntries` *extends* [`ObjectEntries`](../interfaces/ObjectEntries.md) \| [`ObjectEntriesAsync`](../interfaces/ObjectEntriesAsync.md)

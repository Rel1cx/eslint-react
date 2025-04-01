[**@eslint-react/kit**](../../README.md)

***

[@eslint-react/kit](../../README.md) / [\<internal\>](../README.md) / InferEntriesOutput

# Type Alias: InferEntriesOutput\<TEntries\>

> **InferEntriesOutput**\<`TEntries`\> = `{ -readonly [TKey in keyof TEntries]: InferOutput<TEntries[TKey]> }`

Infer entries output type.

## Type Parameters

### TEntries

`TEntries` *extends* [`ObjectEntries`](../interfaces/ObjectEntries.md) \| [`ObjectEntriesAsync`](../interfaces/ObjectEntriesAsync.md)

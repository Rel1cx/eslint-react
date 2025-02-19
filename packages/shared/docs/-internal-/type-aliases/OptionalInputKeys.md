[**@eslint-react/shared**](../../README.md)

***

[@eslint-react/shared](../../README.md) / [\<internal\>](../README.md) / OptionalInputKeys

# Type Alias: OptionalInputKeys\<TEntries\>

> **OptionalInputKeys**\<`TEntries`\>: \{ \[TKey in keyof TEntries\]: TEntries\[TKey\] extends OptionalEntrySchema \| OptionalEntrySchemaAsync ? TKey : never \}\[keyof `TEntries`\]

Optional input keys type.

## Type Parameters

• **TEntries** *extends* [`ObjectEntries`](../interfaces/ObjectEntries.md) \| [`ObjectEntriesAsync`](../interfaces/ObjectEntriesAsync.md)

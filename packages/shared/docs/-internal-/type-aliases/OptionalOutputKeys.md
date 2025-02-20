[**@eslint-react/shared**](../../README.md)

***

[@eslint-react/shared](../../README.md) / [\<internal\>](../README.md) / OptionalOutputKeys

# Type Alias: OptionalOutputKeys\<TEntries\>

> **OptionalOutputKeys**\<`TEntries`\>: \{ \[TKey in keyof TEntries\]: TEntries\[TKey\] extends OptionalEntrySchema \| OptionalEntrySchemaAsync ? undefined extends TEntries\[TKey\]\["default"\] ? TKey : never : never \}\[keyof `TEntries`\]

Optional output keys type.

## Type Parameters

• **TEntries** *extends* [`ObjectEntries`](../interfaces/ObjectEntries.md) \| [`ObjectEntriesAsync`](../interfaces/ObjectEntriesAsync.md)

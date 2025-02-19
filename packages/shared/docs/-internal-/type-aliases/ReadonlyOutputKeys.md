[**@eslint-react/shared**](../../README.md)

***

[@eslint-react/shared](../../README.md) / [\<internal\>](../README.md) / ReadonlyOutputKeys

# Type Alias: ReadonlyOutputKeys\<TEntries\>

> **ReadonlyOutputKeys**\<`TEntries`\>: \{ \[TKey in keyof TEntries\]: TEntries\[TKey\] extends SchemaWithPipe\<infer TPipe\> \| SchemaWithPipeAsync\<infer TPipe\> ? ReadonlyAction\<any\> extends TPipe\[number\] ? TKey : never : never \}\[keyof `TEntries`\]

Readonly output keys type.

## Type Parameters

• **TEntries** *extends* [`ObjectEntries`](../interfaces/ObjectEntries.md) \| [`ObjectEntriesAsync`](../interfaces/ObjectEntriesAsync.md)

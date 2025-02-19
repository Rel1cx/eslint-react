[**@eslint-react/shared**](../../README.md)

***

[@eslint-react/shared](../../README.md) / [\<internal\>](../README.md) / OutputWithReadonly

# Type Alias: OutputWithReadonly\<TEntries, TObject\>

> **OutputWithReadonly**\<`TEntries`, `TObject`\>: [`Readonly`](Readonly.md)\<`TObject`\> & [`Pick`](Pick.md)\<`TObject`, [`Exclude`](Exclude.md)\<keyof `TObject`, [`ReadonlyOutputKeys`](ReadonlyOutputKeys.md)\<`TEntries`\>\>\>

Output with readonly type.

## Type Parameters

• **TEntries** *extends* [`ObjectEntries`](../interfaces/ObjectEntries.md) \| [`ObjectEntriesAsync`](../interfaces/ObjectEntriesAsync.md)

• **TObject** *extends* [`OutputWithQuestionMarks`](OutputWithQuestionMarks.md)\<`TEntries`, [`InferEntriesOutput`](InferEntriesOutput.md)\<`TEntries`\>\>

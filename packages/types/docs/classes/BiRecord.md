[**@eslint-react/types**](../README.md)

***

[@eslint-react/types](../README.md) / BiRecord

# Class: BiRecord\<T\>

## Type Parameters

• **T** *extends* `Record`\<`any`, `any`\>

## Constructors

### new BiRecord()

> **new BiRecord**\<`T`\>(`original`, `reversed`): [`BiRecord`](BiRecord.md)\<`T`\>

#### Parameters

##### original

`T`

##### reversed

`Reverse`\<`T`\> = `...`

#### Returns

[`BiRecord`](BiRecord.md)\<`T`\>

## Properties

### original

> **original**: `T`

***

### reversed

> **reversed**: `Reverse`\<`T`\>

## Methods

### get()

> **get**\<`U`\>(`key`): `U` *extends* keyof `T` ? `T`\[`U`\<`U`\>\] : `U` *extends* `T`\[keyof `T`\] ? `Reverse`\<`T`\>\[`U`\<`U`\>\] : `unknown`

#### Type Parameters

• **U** *extends* `any`

#### Parameters

##### key

`U`

#### Returns

`U` *extends* keyof `T` ? `T`\[`U`\<`U`\>\] : `U` *extends* `T`\[keyof `T`\] ? `Reverse`\<`T`\>\[`U`\<`U`\>\] : `unknown`

***

### has()

> **has**(`key`): key is keyof T \| T\[keyof T\]

#### Parameters

##### key

`any`

#### Returns

key is keyof T \| T\[keyof T\]

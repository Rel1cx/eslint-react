[**@eslint-react/core**](../../README.md)

***

[@eslint-react/core](../../README.md) / [\<internal\>](../README.md) / BiRecord

# Class: BiRecord\<T\>

## Type Parameters

### T

`T` *extends* [`Record`](../type-aliases/Record.md)\<`any`, `any`\>

## Constructors

### new BiRecord()

> **new BiRecord**\<`T`\>(`original`, `reversed`?): `BiRecord`\<`T`\>

#### Parameters

##### original

`T`

##### reversed?

[`Reverse`](../type-aliases/Reverse.md)\<`T`\>

#### Returns

`BiRecord`\<`T`\>

## Properties

### original

> **original**: `T`

***

### reversed

> **reversed**: [`Reverse`](../type-aliases/Reverse.md)\<`T`\>

## Methods

### get()

> **get**\<`U`\>(`key`): `U` *extends* keyof `T` ? `T`\[`U`\<`U`\>\] : `U` *extends* `T`\[keyof `T`\] ? [`Reverse`](../type-aliases/Reverse.md)\<`T`\>\[`U`\<`U`\>\] : `unknown`

#### Type Parameters

##### U

`U` *extends* `any`

#### Parameters

##### key

`U`

#### Returns

`U` *extends* keyof `T` ? `T`\[`U`\<`U`\>\] : `U` *extends* `T`\[keyof `T`\] ? [`Reverse`](../type-aliases/Reverse.md)\<`T`\>\[`U`\<`U`\>\] : `unknown`

***

### has()

> **has**(`key`): key is keyof T \| T\[keyof T\]

#### Parameters

##### key

`any`

#### Returns

key is keyof T \| T\[keyof T\]

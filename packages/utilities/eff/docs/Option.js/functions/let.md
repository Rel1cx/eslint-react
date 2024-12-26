[**@eslint-react/eff**](../../README.md)

***

[@eslint-react/eff](../../README.md) / [./Option.js](../README.md) / let

# Function: let()

## Call Signature

> **let**\<`N`, `A`, `B`\>(`name`, `f`): (`self`) => [`Option`](../type-aliases/Option.md)\<\{ \[K in string \| number \| symbol\]: K extends keyof A ? A\[K\<K\>\] : B \}\>

### Type Parameters

• **N** *extends* `string`

• **A** *extends* `object`

• **B**

### Parameters

#### name

`Exclude`\<`N`, keyof `A`\>

#### f

(`a`) => `B`

### Returns

`Function`

#### Parameters

##### self

[`Option`](../type-aliases/Option.md)\<`A`\>

#### Returns

[`Option`](../type-aliases/Option.md)\<\{ \[K in string \| number \| symbol\]: K extends keyof A ? A\[K\<K\>\] : B \}\>

## Call Signature

> **let**\<`A`, `N`, `B`\>(`self`, `name`, `f`): [`Option`](../type-aliases/Option.md)\<\{ \[K in string \| number \| symbol\]: K extends keyof A ? A\[K\<K\>\] : B \}\>

### Type Parameters

• **A** *extends* `object`

• **N** *extends* `string`

• **B**

### Parameters

#### self

[`Option`](../type-aliases/Option.md)\<`A`\>

#### name

`Exclude`\<`N`, keyof `A`\>

#### f

(`a`) => `B`

### Returns

[`Option`](../type-aliases/Option.md)\<\{ \[K in string \| number \| symbol\]: K extends keyof A ? A\[K\<K\>\] : B \}\>

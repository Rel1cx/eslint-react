[**@eslint-react/tools**](../../../README.md) • **Docs**

***

[@eslint-react/tools](../../../README.md) / [E](../README.md) / let

# Function: let()

## let(name, f)

> **let**\<`N`, `R`, `B`\>(`name`, `f`): \<`L`\>(`self`) => [`Either`](../type-aliases/Either.md)\<\{ \[K in string \| number \| symbol\]: K extends keyof R ? R\[K\<K\>\] : B \}, `L`\>

### Type Parameters

• **N** *extends* `string`

• **R** *extends* `object`

• **B**

### Parameters

• **name**: `Exclude`\<`N`, keyof `R`\>

• **f**

### Returns

`Function`

#### Type Parameters

• **L**

#### Parameters

• **self**: [`Either`](../type-aliases/Either.md)\<`R`, `L`\>

#### Returns

[`Either`](../type-aliases/Either.md)\<\{ \[K in string \| number \| symbol\]: K extends keyof R ? R\[K\<K\>\] : B \}, `L`\>

## let(self, name, f)

> **let**\<`R`, `L`, `N`, `B`\>(`self`, `name`, `f`): [`Either`](../type-aliases/Either.md)\<\{ \[K in string \| number \| symbol\]: K extends keyof R ? R\[K\<K\>\] : B \}, `L`\>

### Type Parameters

• **R** *extends* `object`

• **L**

• **N** *extends* `string`

• **B**

### Parameters

• **self**: [`Either`](../type-aliases/Either.md)\<`R`, `L`\>

• **name**: `Exclude`\<`N`, keyof `R`\>

• **f**

### Returns

[`Either`](../type-aliases/Either.md)\<\{ \[K in string \| number \| symbol\]: K extends keyof R ? R\[K\<K\>\] : B \}, `L`\>

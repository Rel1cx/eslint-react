[**@eslint-react/tools**](../../../README.md) • **Docs**

***

[@eslint-react/tools](../../../README.md) / [O](../README.md) / let

# Function: let()

## let(name, f)

> **let**\<`N`, `A`, `B`\>(`name`, `f`): (`self`) => [`Option`](../type-aliases/Option.md)\<\{ \[K in string \| number \| symbol\]: K extends keyof A ? A\[K\<K\>\] : B \}\>

### Type Parameters

• **N** *extends* `string`

• **A** *extends* `object`

• **B**

### Parameters

• **name**: `Exclude`\<`N`, keyof `A`\>

• **f**

### Returns

`Function`

#### Parameters

• **self**: [`Option`](../type-aliases/Option.md)\<`A`\>

#### Returns

[`Option`](../type-aliases/Option.md)\<\{ \[K in string \| number \| symbol\]: K extends keyof A ? A\[K\<K\>\] : B \}\>

## let(self, name, f)

> **let**\<`A`, `N`, `B`\>(`self`, `name`, `f`): [`Option`](../type-aliases/Option.md)\<\{ \[K in string \| number \| symbol\]: K extends keyof A ? A\[K\<K\>\] : B \}\>

### Type Parameters

• **A** *extends* `object`

• **N** *extends* `string`

• **B**

### Parameters

• **self**: [`Option`](../type-aliases/Option.md)\<`A`\>

• **name**: `Exclude`\<`N`, keyof `A`\>

• **f**

### Returns

[`Option`](../type-aliases/Option.md)\<\{ \[K in string \| number \| symbol\]: K extends keyof A ? A\[K\<K\>\] : B \}\>

[**@eslint-react/tools**](../../../README.md)

***

[@eslint-react/tools](../../../README.md) / [Ref](../README.md) / modifySome

# Function: modifySome()

## Since

2.0.0

## Call Signature

> **modifySome**\<`B`, `A`\>(`fallback`, `pf`): (`self`) => `Effect`\<`B`, `never`, `never`\>

### Type Parameters

• **B**

• **A**

### Parameters

#### fallback

`B`

#### pf

(`a`) => [`Option`](../../../Option.js/type-aliases/Option.md)\<readonly [`B`, `A`]\>

### Returns

`Function`

#### Parameters

##### self

[`Ref`](../interfaces/Ref.md)\<`A`\>

#### Returns

`Effect`\<`B`, `never`, `never`\>

### Since

2.0.0

### Since

2.0.0

## Call Signature

> **modifySome**\<`A`, `B`\>(`self`, `fallback`, `pf`): `Effect`\<`B`, `never`, `never`\>

### Type Parameters

• **A**

• **B**

### Parameters

#### self

[`Ref`](../interfaces/Ref.md)\<`A`\>

#### fallback

`B`

#### pf

(`a`) => [`Option`](../../../Option.js/type-aliases/Option.md)\<readonly [`B`, `A`]\>

### Returns

`Effect`\<`B`, `never`, `never`\>

### Since

2.0.0

### Since

2.0.0

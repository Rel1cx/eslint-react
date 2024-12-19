[**@eslint-react/tools**](../../README.md)

***

[@eslint-react/tools](../../README.md) / [./Option.js](../README.md) / composeK

# Function: composeK()

## Since

2.0.0

## Call Signature

> **composeK**\<`B`, `C`\>(`bfc`): \<`A`\>(`afb`) => (`a`) => [`Option`](../type-aliases/Option.md)\<`C`\>

### Type Parameters

• **B**

• **C**

### Parameters

#### bfc

(`b`) => [`Option`](../type-aliases/Option.md)\<`C`\>

### Returns

`Function`

#### Type Parameters

• **A**

#### Parameters

##### afb

(`a`) => [`Option`](../type-aliases/Option.md)\<`B`\>

#### Returns

`Function`

##### Parameters

###### a

`A`

##### Returns

[`Option`](../type-aliases/Option.md)\<`C`\>

### Since

2.0.0

### Since

2.0.0

## Call Signature

> **composeK**\<`A`, `B`, `C`\>(`afb`, `bfc`): (`a`) => [`Option`](../type-aliases/Option.md)\<`C`\>

### Type Parameters

• **A**

• **B**

• **C**

### Parameters

#### afb

(`a`) => [`Option`](../type-aliases/Option.md)\<`B`\>

#### bfc

(`b`) => [`Option`](../type-aliases/Option.md)\<`C`\>

### Returns

`Function`

#### Parameters

##### a

`A`

#### Returns

[`Option`](../type-aliases/Option.md)\<`C`\>

### Since

2.0.0

### Since

2.0.0

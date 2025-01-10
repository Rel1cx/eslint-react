[**@eslint-react/eff**](../README.md)

***

[@eslint-react/eff](../README.md) / not

# Function: not()

## Call Signature

> **not**\<`T`, `S`\>(`predicate`): (`data`) => `data is Exclude<T, S>`

A function that takes a guard function as predicate and returns a guard that negates it.

### Type Parameters

• **T**

• **S**

### Parameters

#### predicate

(`data`) => `data is S`

The guard function to negate.

### Returns

`Function`

Function A guard function.

#### Parameters

##### data

`T`

#### Returns

`data is Exclude<T, S>`

## Call Signature

> **not**\<`T`\>(`predicate`): (`data`) => `boolean`

A function that takes a guard function as predicate and returns a guard that negates it.

### Type Parameters

• **T**

### Parameters

#### predicate

(`data`) => `boolean`

The guard function to negate.

### Returns

`Function`

Function A guard function.

#### Parameters

##### data

`T`

#### Returns

`boolean`

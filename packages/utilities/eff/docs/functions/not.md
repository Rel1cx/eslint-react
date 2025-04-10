[**@eslint-react/eff**](../README.md)

***

[@eslint-react/eff](../README.md) / not

# Function: not()

## Call Signature

> **not**\<`T`, `S`\>(`predicate`): (`data`) => `data is Exclude<T, S>`

A function that takes a guard function as predicate and returns a guard that negates it.

### Type Parameters

#### T

`T`

#### S

`S`

### Parameters

#### predicate

(`data`) => `data is S`

The guard function to negate.

### Returns

Function A guard function.

> (`data`): `data is Exclude<T, S>`

#### Parameters

##### data

`T`

#### Returns

`data is Exclude<T, S>`

## Call Signature

> **not**\<`T`\>(`predicate`): (`data`) => `boolean`

A function that takes a guard function as predicate and returns a guard that negates it.

### Type Parameters

#### T

`T`

### Parameters

#### predicate

(`data`) => `boolean`

The guard function to negate.

### Returns

Function A guard function.

> (`data`): `boolean`

#### Parameters

##### data

`T`

#### Returns

`boolean`

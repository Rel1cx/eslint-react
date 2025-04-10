[**@eslint-react/eff**](../README.md)

***

[@eslint-react/eff](../README.md) / or

# Function: or()

## Call Signature

> **or**\<`T`, `S`, `U`\>(`a`, `b`): (`data`) => data is S \| U

A function that takes two guard functions as predicates and returns a guard that checks if either of them is true.

### Type Parameters

#### T

`T`

#### S

`S`

#### U

`U`

### Parameters

#### a

(`data`) => `data is S`

The first guard function.

#### b

(`data`) => `data is U`

The second guard function.

### Returns

Function A guard function.

> (`data`): data is S \| U

#### Parameters

##### data

`T`

#### Returns

data is S \| U

## Call Signature

> **or**\<`T`, `S`\>(`a`, `b`): (`data`) => `data is S`

A function that takes two guard functions as predicates and returns a guard that checks if either of them is true.

### Type Parameters

#### T

`T`

#### S

`S`

### Parameters

#### a

(`data`) => `data is S`

The first guard function.

#### b

(`data`) => `boolean`

The second guard function.

### Returns

Function A guard function.

> (`data`): `data is S`

#### Parameters

##### data

`T`

#### Returns

`data is S`

## Call Signature

> **or**\<`T`, `U`\>(`a`, `b`): (`data`) => `data is U`

A function that takes two guard functions as predicates and returns a guard that checks if either of them is true.

### Type Parameters

#### T

`T`

#### U

`U`

### Parameters

#### a

(`data`) => `boolean`

The first guard function.

#### b

(`data`) => `data is U`

The second guard function.

### Returns

Function A guard function.

> (`data`): `data is U`

#### Parameters

##### data

`T`

#### Returns

`data is U`

## Call Signature

> **or**\<`T`\>(`a`, `b`): (`data`) => `boolean`

A function that takes two guard functions as predicates and returns a guard that checks if either of them is true.

### Type Parameters

#### T

`T`

### Parameters

#### a

(`data`) => `boolean`

The first guard function.

#### b

(`data`) => `boolean`

The second guard function.

### Returns

Function A guard function.

> (`data`): `boolean`

#### Parameters

##### data

`T`

#### Returns

`boolean`

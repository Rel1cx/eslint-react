[**@eslint-react/eff**](../README.md)

***

[@eslint-react/eff](../README.md) / zipWith

# Function: zipWith()

> **zipWith**\<`T`, `U`, `V`\>(`arrayA`, `arrayB`, `callback`): `V`[]

Creates a new array from two supplied arrays by calling the supplied function
with the same-positioned element from each array.

## Type Parameters

### T

`T`

### U

`U`

### V

`V`

## Parameters

### arrayA

readonly `T`[]

The first input array.

### arrayB

readonly `U`[]

The second input array.

### callback

(`a`, `b`, `index`) => `V`

The function applied to each position of the arrays.

## Returns

`V`[]

A new array with the results of the function.

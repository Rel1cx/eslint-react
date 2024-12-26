[**@eslint-react/eff**](../../../README.md)

***

[@eslint-react/eff](../../../README.md) / [Data](../README.md) / TaggedError

# Function: TaggedError()

> **TaggedError**\<`Tag`\>(`tag`): \<`A`\>(`args`) => `YieldableError` & `object` & `Readonly`\<`A`\>

## Type Parameters

• **Tag** *extends* `string`

## Parameters

### tag

`Tag`

## Returns

`Function`

### Parameters

#### args

`Equals`\<`A`, \{\}\> *extends* `true` ? `void` : \{ readonly \[P in string \| number \| symbol as P extends "\_tag" ? never : P\]: A\[P\] \}

### Returns

`YieldableError` & `object` & `Readonly`\<`A`\>

## Since

2.0.0

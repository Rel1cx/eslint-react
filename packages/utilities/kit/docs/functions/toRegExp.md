[**@eslint-react/kit**](../README.md)

***

[@eslint-react/kit](../README.md) / toRegExp

# Function: toRegExp()

> **toRegExp**(`string`): `object`

Convert a string to the `RegExp`.
Normal strings (e.g. `"foo"`) is converted to `/^foo$/` of `RegExp`.
Strings like `"/^foo/i"` are converted to `/^foo/i` of `RegExp`.

## Parameters

### string

`string`

The string to convert.

## Returns

`object`

Returns the `RegExp`.

### test()

#### Parameters

##### s

`string`

#### Returns

`boolean`

## See

https://github.com/sveltejs/eslint-plugin-svelte/blob/main/packages/eslint-plugin-svelte/src/utils/regexp.ts

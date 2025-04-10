[**@eslint-react/eff**](../README.md)

***

[@eslint-react/eff](../README.md) / getOrUpdate

# Function: getOrUpdate()

> **getOrUpdate**\<`K`, `V`\>(`map`, `key`, `callback`): `V`

Retrieves a value from a Map if the key exists, or computes and stores a new value if it doesn't.

## Type Parameters

### K

`K`

### V

`V`

## Parameters

### map

[`Map`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Map)\<`K`, `V`\>

The Map to get from or update

### key

`K`

The key to look up in the Map

### callback

() => `V`

The function to call to generate a new value if the key doesn't exist

## Returns

`V`

The existing value for the key, or the newly computed value

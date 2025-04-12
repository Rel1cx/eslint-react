[**@eslint-react/eff**](../README.md)

***

[@eslint-react/eff](../README.md) / getOrUpdate

# Function: getOrUpdate()

## Call Signature

> **getOrUpdate**\<`K`, `V`\>(`map`, `key`, `callback`): `V`

Retrieves a value from a Map or WeakMap if the key exists, or computes and stores a new value if it doesn't.

### Type Parameters

#### K

`K` *extends* `WeakKey`

#### V

`V`

### Parameters

#### map

[`WeakMap`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/WeakMap)\<`K`, `V`\>

The Map or WeakMap to get from or update

#### key

`K`

The key to look up in the Map or WeakMap

#### callback

() => `V`

The function to call to generate a new value if the key doesn't exist

### Returns

`V`

The existing value for the key, or the newly computed value

## Call Signature

> **getOrUpdate**\<`K`, `V`\>(`map`, `key`, `callback`): `V`

Retrieves a value from a Map or WeakMap if the key exists, or computes and stores a new value if it doesn't.

### Type Parameters

#### K

`K`

#### V

`V`

### Parameters

#### map

[`Map`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Map)\<`K`, `V`\>

The Map or WeakMap to get from or update

#### key

`K`

The key to look up in the Map or WeakMap

#### callback

() => `V`

The function to call to generate a new value if the key doesn't exist

### Returns

`V`

The existing value for the key, or the newly computed value

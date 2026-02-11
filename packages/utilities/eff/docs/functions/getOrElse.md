[@eslint-react/eff](../README.md) / getOrElse

# Function: getOrElse()

## Call Signature

```ts
function getOrElse<K, V>(
   map: WeakMap<K, V>, 
   key: K, 
   callback: () => V): V;
```

Retrieves a value from a Map or WeakMap if the key exists, or computes a new value if it doesn't.

### Type Parameters

| Type Parameter |
| ------ |
| `K` *extends* `WeakKey` |
| `V` |

### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `map` | [`WeakMap`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/WeakMap)\<`K`, `V`\> | The Map or WeakMap to get from. |
| `key` | `K` | The key to look up in the Map or WeakMap. |
| `callback` | () => `V` | The function to call to generate a new value if the key doesn't exist. |

### Returns

`V`

The existing value for the key, or the computed fallback value.

## Call Signature

```ts
function getOrElse<K, V>(
   map: Map<K, V>, 
   key: K, 
   callback: () => V): V;
```

Retrieves a value from a Map or WeakMap if the key exists, or computes a new value if it doesn't.

### Type Parameters

| Type Parameter |
| ------ |
| `K` |
| `V` |

### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `map` | [`Map`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Map)\<`K`, `V`\> | The Map or WeakMap to get from. |
| `key` | `K` | The key to look up in the Map or WeakMap. |
| `callback` | () => `V` | The function to call to generate a new value if the key doesn't exist. |

### Returns

`V`

The existing value for the key, or the computed fallback value.

[@local/eff](../README.md) / getOrInsertComputed

# Function: getOrInsertComputed()

## Call Signature

```ts
function getOrInsertComputed<K, V>(
  map: WeakMap<K, V>,
  key: K,
  callback: (key: K) => V,
): V;
```

Retrieves a value from a Map or WeakMap if the key exists, or computes and stores a new value if it doesn't.

### Type Parameters

| Type Parameter          |
| ----------------------- |
| `K` _extends_ `WeakKey` |
| `V`                     |

### Parameters

| Parameter  | Type                                                                                                        | Description                                                                                             |
| ---------- | ----------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| `map`      | [`WeakMap`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/WeakMap)\<`K`, `V`\> | The Map or WeakMap to get from or update.                                                               |
| `key`      | `K`                                                                                                         | The key to look up in the Map or WeakMap.                                                               |
| `callback` | (`key`: `K`) => `V`                                                                                         | A function that returns the value to insert if the key is not present. Called with the key as argument. |

### Returns

`V`

The existing value for the key, or the newly computed value.

## Call Signature

```ts
function getOrInsertComputed<K, V>(
  map: Map<K, V>,
  key: K,
  callback: (key: K) => V,
): V;
```

Retrieves a value from a Map or WeakMap if the key exists, or computes and stores a new value if it doesn't.

### Type Parameters

| Type Parameter |
| -------------- |
| `K`            |
| `V`            |

### Parameters

| Parameter  | Type                                                                                                | Description                                                                                             |
| ---------- | --------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| `map`      | [`Map`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Map)\<`K`, `V`\> | The Map or WeakMap to get from or update.                                                               |
| `key`      | `K`                                                                                                 | The key to look up in the Map or WeakMap.                                                               |
| `callback` | (`key`: `K`) => `V`                                                                                 | A function that returns the value to insert if the key is not present. Called with the key as argument. |

### Returns

`V`

The existing value for the key, or the newly computed value.

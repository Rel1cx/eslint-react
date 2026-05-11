[@local/eff](../README.md) / getOrInsert

# Function: getOrInsert()

## Call Signature

```ts
function getOrInsert<K, V>(
  map: WeakMap<K, V>,
  key: K,
  defaultValue: V,
): V;
```

Retrieves a value from a Map or WeakMap if the key exists, or inserts and returns a default value if it doesn't.

### Type Parameters

| Type Parameter          |
| ----------------------- |
| `K` _extends_ `WeakKey` |
| `V`                     |

### Parameters

| Parameter      | Type                                                                                                        | Description                                               |
| -------------- | ----------------------------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| `map`          | [`WeakMap`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/WeakMap)\<`K`, `V`\> | The Map or WeakMap to get from or update.                 |
| `key`          | `K`                                                                                                         | The key to look up in the Map or WeakMap.                 |
| `defaultValue` | `V`                                                                                                         | The value to insert and return if the key is not present. |

### Returns

`V`

The existing value for the key, or the inserted default value.

## Call Signature

```ts
function getOrInsert<K, V>(
  map: Map<K, V>,
  key: K,
  defaultValue: V,
): V;
```

Retrieves a value from a Map or WeakMap if the key exists, or inserts and returns a default value if it doesn't.

### Type Parameters

| Type Parameter |
| -------------- |
| `K`            |
| `V`            |

### Parameters

| Parameter      | Type                                                                                                | Description                                               |
| -------------- | --------------------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| `map`          | [`Map`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Map)\<`K`, `V`\> | The Map or WeakMap to get from or update.                 |
| `key`          | `K`                                                                                                 | The key to look up in the Map or WeakMap.                 |
| `defaultValue` | `V`                                                                                                 | The value to insert and return if the key is not present. |

### Returns

`V`

The existing value for the key, or the inserted default value.

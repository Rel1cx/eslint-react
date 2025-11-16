[@eslint-react/eff](../README.md) / not

# Function: not()

## Call Signature

```ts
function not<T, S>(predicate: (data: T) => data is S): (data: T) => data is Exclude<T, S>;
```

A function that takes a guard function as predicate and returns a guard that negates it.

### Type Parameters

| Type Parameter |
| ------ |
| `T` |
| `S` |

### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `predicate` | (`data`: `T`) => `data is S` | The guard function to negate. |

### Returns

Function A guard function.

```ts
(data: T): data is Exclude<T, S>;
```

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `data` | `T` |

#### Returns

`data is Exclude<T, S>`

## Call Signature

```ts
function not<T>(predicate: (data: T) => boolean): (data: T) => boolean;
```

A function that takes a guard function as predicate and returns a guard that negates it.

### Type Parameters

| Type Parameter |
| ------ |
| `T` |

### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `predicate` | (`data`: `T`) => `boolean` | The guard function to negate. |

### Returns

Function A guard function.

```ts
(data: T): boolean;
```

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `data` | `T` |

#### Returns

`boolean`

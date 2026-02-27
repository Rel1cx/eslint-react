[@eslint-react/eff](../README.md) / or

# Function: or()

## Call Signature

```ts
function or<T, S, U>(a: (data: T) => data is S, b: (data: T) => data is U): (data: T) => data is S | U;
```

A function that takes two guard functions as predicates and returns a guard that checks if either of them is true.

### Type Parameters

| Type Parameter |
| ------ |
| `T` |
| `S` |
| `U` |

### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `a` | (`data`: `T`) => `data is S` | The first guard function. |
| `b` | (`data`: `T`) => `data is U` | The second guard function. |

### Returns

A guard function that checks if either predicate is true.

```ts
(data: T): data is S | U;
```

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `data` | `T` |

#### Returns

data is S \| U

## Call Signature

```ts
function or<T, S>(a: (data: T) => data is S, b: (data: T) => boolean): (data: T) => data is S;
```

A function that takes two guard functions as predicates and returns a guard that checks if either of them is true.

### Type Parameters

| Type Parameter |
| ------ |
| `T` |
| `S` |

### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `a` | (`data`: `T`) => `data is S` | The first guard function. |
| `b` | (`data`: `T`) => `boolean` | The second guard function. |

### Returns

A guard function that checks if either predicate is true.

```ts
(data: T): data is S;
```

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `data` | `T` |

#### Returns

`data is S`

## Call Signature

```ts
function or<T, U>(a: (data: T) => boolean, b: (data: T) => data is U): (data: T) => data is U;
```

A function that takes two guard functions as predicates and returns a guard that checks if either of them is true.

### Type Parameters

| Type Parameter |
| ------ |
| `T` |
| `U` |

### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `a` | (`data`: `T`) => `boolean` | The first guard function. |
| `b` | (`data`: `T`) => `data is U` | The second guard function. |

### Returns

A guard function that checks if either predicate is true.

```ts
(data: T): data is U;
```

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `data` | `T` |

#### Returns

`data is U`

## Call Signature

```ts
function or<T>(a: (data: T) => boolean, b: (data: T) => boolean): (data: T) => boolean;
```

A function that takes two guard functions as predicates and returns a guard that checks if either of them is true.

### Type Parameters

| Type Parameter |
| ------ |
| `T` |

### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `a` | (`data`: `T`) => `boolean` | The first guard function. |
| `b` | (`data`: `T`) => `boolean` | The second guard function. |

### Returns

A guard function that checks if either predicate is true.

```ts
(data: T): boolean;
```

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `data` | `T` |

#### Returns

`boolean`

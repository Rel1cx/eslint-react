[@local/eff](../README.md) / isArray

# Function: isArray()

## Call Signature

```ts
function isArray(data: unknown): data is unknown[];
```

A function that checks if the passed parameter is an Array and narrows its type accordingly.

### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data` | `unknown` | The variable to check. |

### Returns

`data is unknown[]`

True if the passed input is an Array, false otherwise.

## Call Signature

```ts
function isArray<T>(data: T): data is Extract<T, readonly any[]>;
```

A function that checks if the passed parameter is an Array and narrows its type accordingly.

### Type Parameters

| Type Parameter |
| ------ |
| `T` |

### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data` | `T` | The variable to check. |

### Returns

`data is Extract<T, readonly any[]>`

True if the passed input is an Array, false otherwise.

[@local/eff](../README.md) / isPropertyKey

# Function: isPropertyKey()

```ts
function isPropertyKey(data: unknown): data is PropertyKey;
```

A function that checks if the passed parameter is a valid property key (string, number, or symbol).

## Parameters

| Parameter | Type      | Description            |
| --------- | --------- | ---------------------- |
| `data`    | `unknown` | The variable to check. |

## Returns

`data is PropertyKey`

True if the passed input is a property key, false otherwise.

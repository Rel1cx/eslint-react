[@local/eff](../README.md) / isObjectOrArray

# Function: isObjectOrArray()

```ts
function isObjectOrArray(data: unknown): data is { [x: string | number | symbol]: unknown } | unknown[];
```

Checks whether a value is an object or an array (any non-null object).

## Parameters

| Parameter | Type      | Description            |
| --------- | --------- | ---------------------- |
| `data`    | `unknown` | The variable to check. |

## Returns

data is \{ \[x: string \| number \| symbol\]: unknown \} \| unknown\[\]

True if the passed input is a non-null object (including arrays), false otherwise.

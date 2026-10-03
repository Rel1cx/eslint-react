[@local/eff](../README.md) / isObjectKeyword

# Function: isObjectKeyword()

```ts
function isObjectKeyword(data: unknown): data is object;
```

Checks whether a value is an `object` in the JavaScript sense (objects, arrays, functions), excluding `null`.

## Parameters

| Parameter | Type      | Description            |
| --------- | --------- | ---------------------- |
| `data`    | `unknown` | The variable to check. |

## Returns

`data is object`

True if the passed input is an object, array, or function, false otherwise.

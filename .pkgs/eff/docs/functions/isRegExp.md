[@local/eff](../README.md) / isRegExp

# Function: isRegExp()

```ts
function isRegExp(data: unknown): data is RegExp;
```

A function that checks if the passed parameter is a `RegExp` and narrows its type accordingly.

## Parameters

| Parameter | Type      | Description            |
| --------- | --------- | ---------------------- |
| `data`    | `unknown` | The variable to check. |

## Returns

`data is RegExp`

True if the passed input is a `RegExp`, false otherwise.

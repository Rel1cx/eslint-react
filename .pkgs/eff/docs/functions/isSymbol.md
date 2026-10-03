[@local/eff](../README.md) / isSymbol

# Function: isSymbol()

```ts
function isSymbol(data: unknown): data is symbol;
```

A function that checks if the passed parameter is a symbol and narrows its type accordingly.

## Parameters

| Parameter | Type      | Description            |
| --------- | --------- | ---------------------- |
| `data`    | `unknown` | The variable to check. |

## Returns

`data is symbol`

True if the passed input is a symbol, false otherwise.

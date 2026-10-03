[@local/eff](../README.md) / isIterable

# Function: isIterable()

```ts
function isIterable(data: unknown): data is Iterable<unknown, any, any>;
```

A function that checks if the passed parameter is iterable and narrows its type accordingly.

## Parameters

| Parameter | Type      | Description            |
| --------- | --------- | ---------------------- |
| `data`    | `unknown` | The variable to check. |

## Returns

`data is Iterable<unknown, any, any>`

True if the passed input is iterable (including strings), false otherwise.

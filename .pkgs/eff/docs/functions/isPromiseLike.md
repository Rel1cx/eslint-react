[@local/eff](../README.md) / isPromiseLike

# Function: isPromiseLike()

```ts
function isPromiseLike(data: unknown): data is PromiseLike<unknown>;
```

A function that checks if the passed parameter is `PromiseLike` (has a callable `then` method).

## Parameters

| Parameter | Type      | Description            |
| --------- | --------- | ---------------------- |
| `data`    | `unknown` | The variable to check. |

## Returns

`data is PromiseLike<unknown>`

True if the passed input is `PromiseLike`, false otherwise.

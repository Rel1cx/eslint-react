[@local/eff](../README.md) / isPromise

# Function: isPromise()

```ts
function isPromise(data: unknown): data is Promise<unknown>;
```

A function that checks if the passed parameter is a `Promise`-like object with `then` and `catch` methods.

## Parameters

| Parameter | Type      | Description            |
| --------- | --------- | ---------------------- |
| `data`    | `unknown` | The variable to check. |

## Returns

`data is Promise<unknown>`

True if the passed input is a `Promise`, false otherwise.

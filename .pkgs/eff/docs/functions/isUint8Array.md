[@local/eff](../README.md) / isUint8Array

# Function: isUint8Array()

```ts
function isUint8Array(data: unknown): data is Uint8Array<ArrayBufferLike>;
```

A function that checks if the passed parameter is a `Uint8Array` and narrows its type accordingly.

## Parameters

| Parameter | Type      | Description            |
| --------- | --------- | ---------------------- |
| `data`    | `unknown` | The variable to check. |

## Returns

`data is Uint8Array<ArrayBufferLike>`

True if the passed input is a `Uint8Array`, false otherwise.

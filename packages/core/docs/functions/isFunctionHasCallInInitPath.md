[@eslint-react/core](../README.md) / isFunctionHasCallInInitPath

# Function: isFunctionHasCallInInitPath()

```ts
function isFunctionHasCallInInitPath(callName: string, initPath: FunctionInitPath): boolean;
```

Checks if a specific function call exists in the function initialization path.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `callName` | `string` | The name of the call to check for (e.g., "memo", "forwardRef"). |
| `initPath` | [`FunctionInitPath`](../type-aliases/FunctionInitPath.md) | The function initialization path to search in. |

## Returns

`boolean`

`true` if the call exists in the path, `false` otherwise.

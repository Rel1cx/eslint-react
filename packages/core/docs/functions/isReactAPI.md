[@eslint-react/core](../README.md) / isReactAPI

# Function: isReactAPI()

```ts
function isReactAPI(api: string): ReturnType;
```

Checks if the node is a React API identifier or member expression

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `api` | `string` | The React API name to check against (e.g., "useState", "React.memo") |

## Returns

[`ReturnType`](../@eslint-react/namespaces/isReactAPI/type-aliases/ReturnType.md)

A predicate function to check if a node matches the API

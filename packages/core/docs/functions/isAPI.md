[@eslint-react/core](../README.md) / isAPI

# Function: isAPI()

```ts
function isAPI(api: string): ReturnType;
```

Check if the node is a React API identifier or member expression

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `api` | `string` | The React API name to check against (ex: "useState", "React.memo") |

## Returns

[`ReturnType`](../@eslint-react/namespaces/isAPI/type-aliases/ReturnType.md)

A predicate function to check if a node matches the API

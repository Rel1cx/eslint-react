[@eslint-react/core](../README.md) / isAPICall

# Function: isAPICall()

```ts
function isAPICall(api: string): ReturnType;
```

Check if the node is a call expression to a specific API.

## Parameters

| Parameter | Type     | Description                    |
| --------- | -------- | ------------------------------ |
| `api`     | `string` | The API name to check against. |

## Returns

[`ReturnType`](../@eslint-react/namespaces/isAPICall/type-aliases/ReturnType.md)

A dual-signature predicate: call it as `(context, node)` to check a node directly,
or as `(context)` to get a `(node) => node is TSESTree.CallExpression` predicate (ex: for use in array filters).

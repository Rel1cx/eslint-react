[@eslint-react/core](../README.md) / isAPI

# Function: isAPI()

```ts
function isAPI(api: string): ReturnType;
```

Check if the node is an API identifier or member expression.

## Parameters

| Parameter | Type     | Description                                                   |
| --------- | -------- | ------------------------------------------------------------- |
| `api`     | `string` | The API name to check against (ex: "useState", "React.memo"). |

## Returns

[`ReturnType`](../@eslint-react/namespaces/isAPI/type-aliases/ReturnType.md)

A dual-signature predicate: call it as `(context, node)` to check a node directly,
or as `(context)` to get a `(node) => boolean` predicate (ex: for use in array filters).

## Remarks

Matching is namespace-agnostic by design: the fully qualified name of the node is compared
against the API name by exact match or by suffix (`.${api}`), so `foo.bar.useState` matches
`"useState"` just as `React.useState` does.

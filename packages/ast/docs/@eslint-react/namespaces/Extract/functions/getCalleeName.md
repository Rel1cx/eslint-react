[@eslint-react/ast](../../../../README.md) / [Extract](../README.md) / getCalleeName

# Function: getCalleeName()

```ts
function getCalleeName(node: CallExpression): string | null;
```

Get the name of a call expression's callee when it is an identifier
or a non-computed member expression whose property is an identifier

## Parameters

| Parameter | Type             | Description              |
| --------- | ---------------- | ------------------------ |
| `node`    | `CallExpression` | The call expression node |

## Returns

`string` \| `null`

The callee name, or `null` if it cannot be determined

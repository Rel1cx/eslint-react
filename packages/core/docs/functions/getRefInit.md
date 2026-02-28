[@eslint-react/core](../README.md) / getRefInit

# Function: getRefInit()

```ts
function getRefInit(name: string, initialScope: Scope): Expression | null;
```

Get the init expression of a ref variable

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `name` | `string` | The variable name |
| `initialScope` | `Scope` | The initial scope |

## Returns

`Expression` \| `null`

The init expression node if the variable is derived from a ref, or null otherwise

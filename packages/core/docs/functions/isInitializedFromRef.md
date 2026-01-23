[@eslint-react/core](../README.md) / isInitializedFromRef

# Function: isInitializedFromRef()

```ts
function isInitializedFromRef(name: string, initialScope: Scope): boolean;
```

Checks if the variable with the given name is initialized or derived from a ref

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `name` | `string` | The variable name |
| `initialScope` | `Scope` | The initial scope |

## Returns

`boolean`

True if the variable is derived from a ref, false otherwise

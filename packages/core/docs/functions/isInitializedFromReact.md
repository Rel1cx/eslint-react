[@eslint-react/core](../README.md) / isInitializedFromReact

# Function: isInitializedFromReact()

```ts
function isInitializedFromReact(
   name: string, 
   initialScope: Scope, 
   importSource: string): boolean;
```

Checks if a variable is initialized or derived from React import

## Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `name` | `string` | `undefined` | The variable name |
| `initialScope` | `Scope` | `undefined` | The initial scope |
| `importSource` | `string` | `"react"` | Alternative import source of React (e.g., "preact/compat") |

## Returns

`boolean`

True if the variable is initialized or derived from React import

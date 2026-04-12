[@eslint-react/core](../README.md) / isAPIFromReact

# Function: isAPIFromReact()

```ts
function isAPIFromReact(
   name: string, 
   initialScope: Scope, 
   importSource?: string): boolean;
```

Check if a variable is initialized from React import

## Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `name` | `string` | `undefined` | The variable name |
| `initialScope` | `Scope` | `undefined` | The initial scope |
| `importSource` | `string` | `"react"` | Alternative import source of React (ex: "preact/compat") |

## Returns

`boolean`

True if the variable is initialized or derived from React import

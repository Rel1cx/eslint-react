[@eslint-react/core](../README.md) / isInitializedFromReact

# Function: isInitializedFromReact()

```ts
function isInitializedFromReact(
   name: string, 
   importSource: string, 
   initialScope: Scope): boolean;
```

Check if an identifier name is initialized from react

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `name` | `string` | The top-level identifier's name |
| `importSource` | `string` | The import source to check against |
| `initialScope` | `Scope` | Initial scope to search for the identifier |

## Returns

`boolean`

Whether the identifier name is initialized from react

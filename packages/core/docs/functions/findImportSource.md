[@eslint-react/core](../README.md) / findImportSource

# Function: findImportSource()

```ts
function findImportSource(name: string, initialScope: Scope): string | null;
```

Find the import source of a variable

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `name` | `string` | The variable name |
| `initialScope` | `Scope` | The initial scope to search |

## Returns

`string` \| `null`

The import source or null if not found

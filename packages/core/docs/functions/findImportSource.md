[@eslint-react/core](../README.md) / findImportSource

# Function: findImportSource()

```ts
function findImportSource(name: string, initialScope: Scope): string | undefined;
```

Find the import source of a variable

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `name` | `string` | The variable name |
| `initialScope` | `Scope` | The initial scope to search |

## Returns

`string` \| `undefined`

The import source or undefined if not found

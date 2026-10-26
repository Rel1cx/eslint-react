[@eslint-react/var](../README.md) / resolveImportSource

# Function: resolveImportSource()

```ts
function resolveImportSource(name: string, initialScope: Scope): string | null;
```

Resolve the import source of a variable by walking its latest definition.

## Parameters

| Parameter      | Type     | Description        |
| -------------- | -------- | ------------------ |
| `name`         | `string` | The variable name. |
| `initialScope` | `Scope`  | The initial scope. |

## Returns

`string` \| `null`

The import source, or `null` when it cannot be resolved.

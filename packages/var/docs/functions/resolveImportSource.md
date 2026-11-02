[@eslint-react/var](../README.md) / resolveImportSource

# Function: resolveImportSource()

```ts
function resolveImportSource(name: string, initialScope: Scope): string | null;
```

Resolve the import source of a variable by walking its latest definition.

## Parameters

| Parameter      | Type     | Description                                                                                                                                                                                                                                                 |
| -------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `name`         | `string` | The variable name.                                                                                                                                                                                                                                          |
| `initialScope` | `Scope`  | The initial scope. The lookup walks the scope chain upward only, so this must be the scope of a reference to the variable or one of its descendants (e.g. the module scope); passing an ancestor scope such as the program's global scope resolves nothing. |

## Returns

`string` \| `null`

The import source, or `null` when it cannot be resolved.

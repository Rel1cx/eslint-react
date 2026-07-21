[@eslint-react/var](../README.md) / resolveImportSource

# Function: resolveImportSource()

```ts
function resolveImportSource(
  name: string,
  initialScope: Scope,
  seen?: Set<string>,
): string | null;
```

Resolve the import source of a variable by walking its latest definition.

## Parameters

| Parameter      | Type                                                                                                | Description                                                      |
| -------------- | --------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| `name`         | `string`                                                                                            | The variable name.                                               |
| `initialScope` | `Scope`                                                                                             | The initial scope.                                               |
| `seen`         | [`Set`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Set)\<`string`\> | The set of already visited variable names (for cycle detection). |

## Returns

`string` \| `null`

The import source, or `null` if it cannot be resolved.

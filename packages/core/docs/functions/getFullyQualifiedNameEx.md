[@eslint-react/core](../README.md) / getFullyQualifiedNameEx

# Function: getFullyQualifiedNameEx()

```ts
function getFullyQualifiedNameEx(checker: TypeChecker, symbol: Symbol): string;
```

An enhanced version of getFullyQualifiedName that handles cases that original function does not handle.

## Parameters

| Parameter | Type          | Description                                 |
| --------- | ------------- | ------------------------------------------- |
| `checker` | `TypeChecker` | The TypeScript type checker.                |
| `symbol`  | `Symbol`      | The symbol to get fully qualified name for. |

## Returns

`string`

The fully qualified name of the symbol.

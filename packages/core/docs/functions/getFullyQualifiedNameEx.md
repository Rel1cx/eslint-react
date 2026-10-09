[@eslint-react/core](../README.md) / getFullyQualifiedNameEx

# Function: getFullyQualifiedNameEx()

```ts
function getFullyQualifiedNameEx(checker: TypeChecker, symbol: Symbol): string;
```

Get the fully qualified name of a symbol, handling cases that `ts.TypeChecker.getFullyQualifiedName` does not handle (ex: `export as namespace preact`).

## Parameters

| Parameter | Type          | Description                                 |
| --------- | ------------- | ------------------------------------------- |
| `checker` | `TypeChecker` | The TypeScript type checker.                |
| `symbol`  | `Symbol`      | The symbol to get fully qualified name for. |

## Returns

`string`

The fully qualified name of the symbol.

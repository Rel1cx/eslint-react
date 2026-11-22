[@eslint-react/core](../README.md) / getFullyQualifiedName

# Function: getFullyQualifiedName()

```ts
function getFullyQualifiedName(checker: TypeChecker, symbol: Symbol): string;
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

## Remarks

Known approximations:

- Symbols declared in a file with `export as namespace X` get the `X.` prefix even when they are not exported; this is deliberate for allow-list matching.
- For symbols with merged declarations across files, the first declaration determines the source file used for the namespace lookup.

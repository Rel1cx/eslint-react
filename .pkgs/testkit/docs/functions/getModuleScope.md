[@local/testkit](../README.md) / getModuleScope

# Function: getModuleScope()

```ts
function getModuleScope(parsed: ParseForESLintResult): Scope;
```

Returns the module scope (first child of the global scope) of a parsed
program.

## Parameters

| Parameter | Type                   | Description                |
| --------- | ---------------------- | -------------------------- |
| `parsed`  | `ParseForESLintResult` | The result of `parseCode`. |

## Returns

`Scope`

The module scope of the parsed program.

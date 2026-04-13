[@eslint-react/core](../README.md) / isFunctionHasDirective

# Function: isFunctionHasDirective()

```ts
function isFunctionHasDirective(node: FunctionExpression, name: string): boolean;
```

Checks if a directive with the given name exists in the function directives.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `node` | `FunctionExpression` | The function AST node. |
| `name` | `string` | The directive name to check (e.g., "use memo", "use no memo"). |

## Returns

`boolean`

`true` if the directive exists, `false` otherwise.

[@local/testkit](../README.md) / getFirstExpression

# Function: getFirstExpression()

```ts
function getFirstExpression(code: string, options?: ParseCodeOptions): Expression;
```

Parses `code` and returns the expression of the first top-level
ExpressionStatement.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `code` | `string` | Source code whose first statement is an expression statement. |
| `options` | [`ParseCodeOptions`](../interfaces/ParseCodeOptions.md) | Parser options passed to `parseCode`. |

## Returns

`Expression`

The expression of the first top-level ExpressionStatement.

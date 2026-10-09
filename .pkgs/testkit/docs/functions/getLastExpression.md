[@local/testkit](../README.md) / getLastExpression

# Function: getLastExpression()

```ts
function getLastExpression(code: string, options?: ParseCodeOptions): Expression;
```

Parses `code` and returns the expression of the last top-level
ExpressionStatement.

## Parameters

| Parameter | Type                                                    | Description                                                  |
| --------- | ------------------------------------------------------- | ------------------------------------------------------------ |
| `code`    | `string`                                                | Source code whose last statement is an expression statement. |
| `options` | [`ParseCodeOptions`](../interfaces/ParseCodeOptions.md) | Parser options passed to `parseCode`.                        |

## Returns

`Expression`

The expression of the last top-level ExpressionStatement.

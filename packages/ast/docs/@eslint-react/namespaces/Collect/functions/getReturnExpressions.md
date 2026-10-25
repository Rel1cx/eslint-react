[@eslint-react/ast](../../../../README.md) / [Collect](../README.md) / getReturnExpressions

# Function: getReturnExpressions()

```ts
function getReturnExpressions(node: TSESTreeFunction): readonly Expression[];
```

Get all expressions returned by a function, in source order.

The implicit return value of an expression-bodied arrow function (ex: `() => value`) is
included, while bare `return;` statements without an argument are skipped. Return statements
inside nested functions are excluded.

## Parameters

| Parameter | Type                                                               | Description                                      |
| --------- | ------------------------------------------------------------------ | ------------------------------------------------ |
| `node`    | [`TSESTreeFunction`](../../../../type-aliases/TSESTreeFunction.md) | The function to collect return expressions from. |

## Returns

readonly `Expression`[]

All expressions returned by the function.

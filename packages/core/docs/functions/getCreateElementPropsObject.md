[@eslint-react/core](../README.md) / getCreateElementPropsObject

# Function: getCreateElementPropsObject()

```ts
function getCreateElementPropsObject(context: RuleContext, node: Node | null): ObjectExpression | null;
```

Get the props object (the second argument) of a `createElement` call.

Type expressions and chain expressions wrapping the argument are unwrapped
before the object check; `null`, spread, or otherwise non-object props
arguments yield `null`.

## Parameters

| Parameter | Type             | Description              |
| --------- | ---------------- | ------------------------ |
| `context` | `RuleContext`    | The ESLint rule context. |
| `node`    | `Node` \| `null` | The node to inspect.     |

## Returns

`ObjectExpression` \| `null`

The props `ObjectExpression`, or `null` when absent or not statically an object literal.

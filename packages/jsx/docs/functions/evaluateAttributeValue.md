[@eslint-react/jsx](../README.md) / evaluateAttributeValue

# Function: evaluateAttributeValue()

```ts
function evaluateAttributeValue(context: RuleContext, value: AttributeValue):
  | AttributeStaticValue
  | undefined;
```

Attempt to statically evaluate a resolved attribute value.

Returns `{ value: undefined }` for a known `undefined`, and `undefined` when
evaluation is not possible. Scope is obtained from the actual value node,
which may belong to a spread object's declaration rather than the JSX use.

## Parameters

| Parameter | Type                                                  | Description                        |
| --------- | ----------------------------------------------------- | ---------------------------------- |
| `context` | `RuleContext`                                         | The ESLint rule context.           |
| `value`   | [`AttributeValue`](../type-aliases/AttributeValue.md) | The syntax descriptor to evaluate. |

## Returns

\| [`AttributeStaticValue`](../interfaces/AttributeStaticValue.md)
\| `undefined`

A wrapped static value on success, or `undefined` on failure.

[@eslint-react/jsx](../README.md) / getAttributeStaticValue

# Function: getAttributeStaticValue()

```ts
function getAttributeStaticValue(context: RuleContext, value: AttributeValue | null): unknown;
```

Get the statically known value of an attribute value descriptor when possible.

Boolean attributes resolve to `true`; literal attributes resolve to their
literal value; other expressions are evaluated statically when possible.
Returns `undefined` when the descriptor is null, is a JSX element or fragment,
is a `missing` descriptor, cannot be statically evaluated, or evaluates to
`undefined`. A statically known `undefined` is therefore indistinguishable
from an indeterminate value.

## Parameters

| Parameter | Type                                                            | Description                                          |
| --------- | --------------------------------------------------------------- | ---------------------------------------------------- |
| `context` | `RuleContext`                                                   | The ESLint rule context (needed for scope look-ups). |
| `value`   | [`AttributeValue`](../type-aliases/AttributeValue.md) \| `null` | The attribute value descriptor, or `null`.           |

## Returns

`unknown`

The static value, or `undefined` when no statically known plain value is available.

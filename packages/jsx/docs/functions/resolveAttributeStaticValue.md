[@eslint-react/jsx](../README.md) / resolveAttributeStaticValue

# Function: resolveAttributeStaticValue()

```ts
function resolveAttributeStaticValue(context: RuleContext, value: AttributeValue | null): unknown;
```

Collapse a resolved attribute value to a plain JavaScript value when possible.

Returns `undefined` when the value is absent, is a JSX element, is an empty
expression container, or cannot be statically evaluated. A statically known
`undefined` is therefore indistinguishable from an indeterminate value.

## Parameters

| Parameter | Type                                                            | Description                                          |
| --------- | --------------------------------------------------------------- | ---------------------------------------------------- |
| `context` | `RuleContext`                                                   | The ESLint rule context (needed for scope look-ups). |
| `value`   | [`AttributeValue`](../type-aliases/AttributeValue.md) \| `null` | The attribute value descriptor, or `null`.           |

## Returns

`unknown`

The static value, or `undefined` when it cannot be determined.

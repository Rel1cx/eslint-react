[@eslint-react/jsx](../README.md) / getAttributeStaticValue

# Function: getAttributeStaticValue()

```ts
function getAttributeStaticValue(
  context: RuleContext,
  element: JSXElement,
  name: string,
): unknown;
```

Find an attribute by name and return its plain static value.

This convenience API intentionally returns `undefined` for an absent or
unresolved attribute, an indeterminate value, and a known `undefined` alike.
Use [getAttributeValue](getAttributeValue.md) and [evaluateAttributeValue](evaluateAttributeValue.md) separately
when those distinctions matter.

## Parameters

| Parameter | Type          | Description                                      |
| --------- | ------------- | ------------------------------------------------ |
| `context` | `RuleContext` | The ESLint rule context.                         |
| `element` | `JSXElement`  | The JSX element to search.                       |
| `name`    | `string`      | The attribute name to look up (ex: "className"). |

## Returns

`unknown`

The static value, or `undefined` when absent or indeterminate.

[@eslint-react/jsx](../README.md) / getAttributeStaticValue

# Function: getAttributeStaticValue()

```ts
function getAttributeStaticValue(
  context: RuleContext,
  element: JSXElement,
  name: string,
): unknown;
```

Find an attribute by name on a JSX element and collapse its value to a plain JavaScript value.

Returns `undefined` both when the attribute is absent and when its value cannot
be statically determined; use [hasAttribute](hasAttribute.md) when presence itself matters.

## Parameters

| Parameter | Type          | Description                                      |
| --------- | ------------- | ------------------------------------------------ |
| `context` | `RuleContext` | The ESLint rule context.                         |
| `element` | `JSXElement`  | The `JSXElement` node to check.                  |
| `name`    | `string`      | The attribute name to look up (ex: "className"). |

## Returns

`unknown`

The static value of the attribute, or `undefined` when absent or indeterminate.

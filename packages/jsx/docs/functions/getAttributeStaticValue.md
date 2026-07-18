[@eslint-react/jsx](../README.md) / getAttributeStaticValue

# Function: getAttributeStaticValue()

```ts
function getAttributeStaticValue(
  context: RuleContext,
  element: JSXElement,
  name: string,
): unknown;
```

Find an attribute by name on a JSX element and collapse its value to a plain
JavaScript value in a single step.

This is a convenience composition of [findAttribute](findAttribute.md) ->
[resolveAttributeValue](resolveAttributeValue.md) -> `toStatic()`, with automatic handling of the
`spreadProps` case (extracts the named property from the spread object).

Returns `undefined` both when the attribute is absent and when its value
cannot be statically determined; use [findAttribute](findAttribute.md) or
[hasAttribute](hasAttribute.md) when presence itself matters.

## Parameters

| Parameter | Type          | Description                                      |
| --------- | ------------- | ------------------------------------------------ |
| `context` | `RuleContext` | The ESLint rule context.                         |
| `element` | `JSXElement`  | The `JSXElement` node to inspect.                |
| `name`    | `string`      | The attribute name to look up (ex: "className"). |

## Returns

`unknown`

The static value of the attribute, or `undefined` when absent or indeterminate.

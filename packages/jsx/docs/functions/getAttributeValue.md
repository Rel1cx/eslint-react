[@eslint-react/jsx](../README.md) / getAttributeValue

# Function: getAttributeValue()

```ts
function getAttributeValue(
  context: RuleContext,
  element: JSXElement,
  name: string,
): AttributeValue | null;
```

Find an attribute by name on a JSX element and resolve its value in a single call.

This is a convenience composition of [findAttribute](findAttribute.md) and
[resolveAttributeValue](resolveAttributeValue.md) that eliminates the most common two-step
pattern in lint rules.

## Parameters

| Parameter | Type          | Description                                      |
| --------- | ------------- | ------------------------------------------------ |
| `context` | `RuleContext` | The ESLint rule context.                         |
| `element` | `JSXElement`  | The `JSXElement` node to search.                 |
| `name`    | `string`      | The attribute name to look up (ex: "className"). |

## Returns

`AttributeValue` \| `null`

A JsxAttributeValue descriptor, or `null` when the attribute is not present on the element.

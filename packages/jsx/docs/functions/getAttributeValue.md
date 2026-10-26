[@eslint-react/jsx](../README.md) / getAttributeValue

# Function: getAttributeValue()

```ts
function getAttributeValue(context: RuleContext, element: JSXElement, name: string): AttributeValue | null;
```

Find an attribute by name on a JSX element and resolve its value in a single call.

Convenience composition of [findAttribute](findAttribute.md) and [resolveAttributeValue](resolveAttributeValue.md).

## Parameters

| Parameter | Type          | Description                                      |
| --------- | ------------- | ------------------------------------------------ |
| `context` | `RuleContext` | The ESLint rule context.                         |
| `element` | `JSXElement`  | The `JSXElement` node to search.                 |
| `name`    | `string`      | The attribute name to look up (ex: "className"). |

## Returns

[`AttributeValue`](../type-aliases/AttributeValue.md) \| `null`

An [AttributeValue](../type-aliases/AttributeValue.md) descriptor, or `null` when the attribute is not present.

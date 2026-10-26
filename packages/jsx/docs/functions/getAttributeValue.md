[@eslint-react/jsx](../README.md) / getAttributeValue

# Function: getAttributeValue()

```ts
function getAttributeValue(element: JSXElement, name: string): AttributeValue | null;
```

Find a direct attribute by name on a JSX element and resolve its value.

Convenience composition of [findAttribute](findAttribute.md) and [resolveAttributeValue](resolveAttributeValue.md).
Spread attributes are ignored.

## Parameters

| Parameter | Type         | Description                                      |
| --------- | ------------ | ------------------------------------------------ |
| `element` | `JSXElement` | The `JSXElement` node to search.                 |
| `name`    | `string`     | The attribute name to look up (ex: "className"). |

## Returns

[`AttributeValue`](../type-aliases/AttributeValue.md) \| `null`

An [AttributeValue](../type-aliases/AttributeValue.md) descriptor, or `null` when the attribute is not present.

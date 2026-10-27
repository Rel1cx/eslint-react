[@eslint-react/jsx](../README.md) / getAttributeValueByName

# Function: getAttributeValueByName()

```ts
function getAttributeValueByName(element: JSXElement, name: string): AttributeValue | null;
```

Find the last direct attribute with the given full name and get its value.

Convenience composition of [findAttribute](findAttribute.md) and [getAttributeValue](getAttributeValue.md).
Spread attributes are ignored; a spread after the matched attribute may still
override it at runtime.

## Parameters

| Parameter | Type         | Description                                                        |
| --------- | ------------ | ------------------------------------------------------------------ |
| `element` | `JSXElement` | The `JSXElement` node to search.                                   |
| `name`    | `string`     | The full attribute name to look up (ex: "className", "xml:space"). |

## Returns

[`AttributeValue`](../type-aliases/AttributeValue.md) \| `null`

An [AttributeValue](../type-aliases/AttributeValue.md) descriptor, or `null` when no matching direct attribute is present.

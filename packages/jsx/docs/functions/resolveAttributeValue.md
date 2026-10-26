[@eslint-react/jsx](../README.md) / resolveAttributeValue

# Function: resolveAttributeValue()

```ts
function resolveAttributeValue(attribute: TSESTreeJSXAttributeLike): AttributeValue;
```

Resolve a `JSXAttribute` or `JSXSpreadAttribute` into an [AttributeValue](../type-aliases/AttributeValue.md) descriptor.

Spread attributes are represented structurally by the `spreadProps` kind;
their properties and values are not resolved.

## Parameters

| Parameter   | Type                       | Description                                                 |
| ----------- | -------------------------- | ----------------------------------------------------------- |
| `attribute` | `TSESTreeJSXAttributeLike` | The `JSXAttribute` or `JSXSpreadAttribute` node to resolve. |

## Returns

[`AttributeValue`](../type-aliases/AttributeValue.md)

A discriminated-union descriptor of the attribute's value.

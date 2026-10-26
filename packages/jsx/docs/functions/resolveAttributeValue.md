[@eslint-react/jsx](../README.md) / resolveAttributeValue

# Function: resolveAttributeValue()

```ts
function resolveAttributeValue(
  matchOrAttribute:
    | AttributeMatch
    | TSESTreeJSXAttributeLike,
): AttributeValue;
```

Resolve an attribute (or an attribute lookup match) into an [AttributeValue](../type-aliases/AttributeValue.md) descriptor.

When passing an [AttributeMatch](../type-aliases/AttributeMatch.md) for a spread attribute, the matched
property is carried into the descriptor; passing a raw `JSXSpreadAttribute`
yields a `spreadProps` descriptor with `property: null`.

## Parameters

| Parameter          | Type                                                                                   | Description                                                     |
| ------------------ | -------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| `matchOrAttribute` | \| [`AttributeMatch`](../type-aliases/AttributeMatch.md) \| `TSESTreeJSXAttributeLike` | A lookup match or a `JSXAttribute` / `JSXSpreadAttribute` node. |

## Returns

[`AttributeValue`](../type-aliases/AttributeValue.md)

A discriminated-union descriptor of the attribute's value.

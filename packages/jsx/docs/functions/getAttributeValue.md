[@eslint-react/jsx](../README.md) / getAttributeValue

# Function: getAttributeValue()

```ts
function getAttributeValue(attribute: JSXAttribute): AttributeValue;
```

Get the structural value of a direct `JSXAttribute`.

The attribute's value is classified syntactically; expressions are not
evaluated. Only direct `JSXAttribute` nodes are accepted; spread attributes
are outside this API.

## Parameters

| Parameter   | Type           | Description                                    |
| ----------- | -------------- | ---------------------------------------------- |
| `attribute` | `JSXAttribute` | The `JSXAttribute` node to get the value from. |

## Returns

[`AttributeValue`](../type-aliases/AttributeValue.md)

A discriminated-union descriptor of the attribute's value.

## Remarks

A `JSXSpreadChild` in attribute value position is not valid JSX and is not
produced by current parsers, but it is part of the TSESTree union. It is
treated as its inner expression, or as `missing` when that expression is empty.

[@eslint-react/jsx](../README.md) / AttributeDescriptor

# Interface: AttributeDescriptor

A named attribute, its source, and its value, with context-bound static evaluation.

## Properties

| Property                              | Modifier   | Type                                                    |
| ------------------------------------- | ---------- | ------------------------------------------------------- |
| <a id="property-name"></a> `name`     | `readonly` | `string`                                                |
| <a id="property-source"></a> `source` | `readonly` | [`AttributeSource`](../type-aliases/AttributeSource.md) |
| <a id="property-value"></a> `value`   | `readonly` | [`AttributeValue`](../type-aliases/AttributeValue.md)   |

## Methods

### getStaticValue()

```ts
getStaticValue(): AttributeStaticValue | undefined;
```

Return a wrapped known value (including `undefined`), or `undefined` if evaluation fails.

#### Returns

[`AttributeStaticValue`](AttributeStaticValue.md) \| `undefined`

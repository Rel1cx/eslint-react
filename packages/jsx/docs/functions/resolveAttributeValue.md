[@eslint-react/jsx](../README.md) / resolveAttributeValue

# Function: resolveAttributeValue()

```ts
function resolveAttributeValue(
  context: RuleContext,
  attribute: TSESTreeJSXAttributeLike,
  name?: string,
): AttributeValue;
```

Resolve the value of a JSX attribute (or spread attribute) into an
AttributeValue descriptor that can be inspected further.

This is the low-level building block; it operates on a single attribute
node that the caller has already located. For the higher-level "find by
name and resolve" combo, see [getAttributeValue](getAttributeValue.md).

When the attribute is a `JSXSpreadAttribute`, passing `name` (typically the
same name the attribute was found by) makes `toStatic()` return the static
value of that named property, eliminating the need to branch on
`kind === "spreadProps"` at the call site.

## Parameters

| Parameter   | Type                       | Description                                                                |
| ----------- | -------------------------- | -------------------------------------------------------------------------- |
| `context`   | `RuleContext`              | The ESLint rule context (needed for scope look-ups).                       |
| `attribute` | `TSESTreeJSXAttributeLike` | A `JSXAttribute` or `JSXSpreadAttribute` node.                             |
| `name?`     | `string`                   | Optional property name used to resolve `toStatic()` for spread attributes. |

## Returns

`AttributeValue`

A discriminated-union descriptor of the attribute's value.

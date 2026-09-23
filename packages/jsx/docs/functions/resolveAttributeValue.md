[@eslint-react/jsx](../README.md) / resolveAttributeValue

# Function: resolveAttributeValue()

## Call Signature

```ts
function resolveAttributeValue(context: RuleContext, attribute: JSXAttribute): AttributeValue;
```

Resolve a plain JSX attribute into a syntax descriptor without evaluating it.

### Parameters

| Parameter   | Type           | Description                   |
| ----------- | -------------- | ----------------------------- |
| `context`   | `RuleContext`  | The ESLint rule context.      |
| `attribute` | `JSXAttribute` | The JSX attribute to resolve. |

### Returns

[`AttributeValue`](../type-aliases/AttributeValue.md)

The attribute's value descriptor.

## Call Signature

```ts
function resolveAttributeValue(
  context: RuleContext,
  attribute: TSESTreeJSXAttributeLike,
  name: string,
): AttributeValue | undefined;
```

Resolve an attribute found by name, extracting that property for a spread.

A spread requires a property name: a props object is not itself an attribute
value. This uses [findSpreadProperty](findSpreadProperty.md)'s best-effort lookup; an unresolved
property does not prove that the spread lacks it at runtime.

### Parameters

| Parameter   | Type                       | Description                                                         |
| ----------- | -------------------------- | ------------------------------------------------------------------- |
| `context`   | `RuleContext`              | The ESLint rule context (needed for spread property lookup).        |
| `attribute` | `TSESTreeJSXAttributeLike` | A plain or spread JSX attribute.                                    |
| `name`      | `string`                   | The property to extract for a spread; ignored for plain attributes. |

### Returns

[`AttributeValue`](../type-aliases/AttributeValue.md) \| `undefined`

The value descriptor, or `undefined` when the spread property cannot be found.

[@eslint-react/jsx](../README.md) / getAttributeValue

# Function: getAttributeValue()

```ts
function getAttributeValue(
  context: RuleContext,
  element: JSXElement,
  name: string,
): AttributeValue | undefined;
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

`AttributeValue` \| `undefined`

An AttributeValue descriptor, or `undefined` when the attribute is not present.

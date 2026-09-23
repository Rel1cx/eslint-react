[@eslint-react/jsx](../README.md) / getAttributeValue

# Function: getAttributeValue()

```ts
function getAttributeValue(
  context: RuleContext,
  element: JSXElement,
  name: string,
): AttributeValue | undefined;
```

Find an attribute by name on a JSX element and describe its value.

Uses [findAttribute](findAttribute.md)'s best-effort lookup and last-known-match ordering.
Unresolvable spreads are skipped, so `undefined` means no known matching
attribute, not proof of runtime absence.

## Parameters

| Parameter | Type          | Description                                      |
| --------- | ------------- | ------------------------------------------------ |
| `context` | `RuleContext` | The ESLint rule context.                         |
| `element` | `JSXElement`  | The JSX element to search.                       |
| `name`    | `string`      | The attribute name to look up (ex: "className"). |

## Returns

[`AttributeValue`](../type-aliases/AttributeValue.md) \| `undefined`

The value descriptor, or `undefined` when no matching attribute can be resolved.

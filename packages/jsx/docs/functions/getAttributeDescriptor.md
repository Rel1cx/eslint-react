[@eslint-react/jsx](../README.md) / getAttributeDescriptor

# Function: getAttributeDescriptor()

```ts
function getAttributeDescriptor(
  context: RuleContext,
  element: JSXElement,
  name: string,
):
  | AttributeDescriptor
  | undefined;
```

Find an authored JSX attribute by name and describe its source and value.

This preserves [findAttribute](findAttribute.md)'s last-known-match ordering. Unresolvable
spreads are skipped; neither absence nor an earlier value is a runtime guarantee.

## Parameters

| Parameter | Type          | Description                 |
| --------- | ------------- | --------------------------- |
| `context` | `RuleContext` | The ESLint rule context.    |
| `element` | `JSXElement`  | The JSX element to search.  |
| `name`    | `string`      | The attribute name to find. |

## Returns

\| [`AttributeDescriptor`](../interfaces/AttributeDescriptor.md)
\| `undefined`

The descriptor, or `undefined` when no known matching attribute is found.

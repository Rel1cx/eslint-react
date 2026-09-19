[@eslint-react/jsx](../README.md) / hasAnyAttribute

# Function: hasAnyAttribute()

```ts
function hasAnyAttribute(
  context: RuleContext,
  element: JSXElement,
  names: string[],
): boolean;
```

Check if the element has at least one of the given attributes.

## Parameters

| Parameter | Type          | Description                                                                    |
| --------- | ------------- | ------------------------------------------------------------------------------ |
| `context` | `RuleContext` | The ESLint rule context (needed for variable resolution in spread attributes). |
| `element` | `JSXElement`  | The `JSXElement` node to check.                                                |
| `names`   | `string`[]    | The attribute names to look for.                                               |

## Returns

`boolean`

`true` if at least one of the attributes is present.

[@eslint-react/jsx](../README.md) / hasEveryAttribute

# Function: hasEveryAttribute()

```ts
function hasEveryAttribute(
  context: RuleContext,
  element: JSXElement,
  names: string[],
): boolean;
```

Check if the element has all of the given attributes.

## Parameters

| Parameter | Type          | Description                                                                    |
| --------- | ------------- | ------------------------------------------------------------------------------ |
| `context` | `RuleContext` | The ESLint rule context (needed for variable resolution in spread attributes). |
| `element` | `JSXElement`  | The `JSXElement` node to check.                                                |
| `names`   | `string`[]    | The attribute names to look for.                                               |

## Returns

`boolean`

`true` if every attribute is present on the element.

[@eslint-react/jsx](../README.md) / hasAttribute

# Function: hasAttribute()

```ts
function hasAttribute(
  context: RuleContext,
  element: JSXElement,
  name: string,
): boolean;
```

Check if the element has an attribute with the given name.

Spread attributes are taken into account: `<Comp {...{ disabled: true }} />`
reports `true` for `"disabled"` (see [findAttribute](findAttribute.md)).

## Parameters

| Parameter | Type          | Description                                                                    |
| --------- | ------------- | ------------------------------------------------------------------------------ |
| `context` | `RuleContext` | The ESLint rule context (needed for variable resolution in spread attributes). |
| `element` | `JSXElement`  | The `JSXElement` node to check.                                                |
| `name`    | `string`      | The attribute name to look for (ex: "className").                              |

## Returns

`boolean`

`true` if the attribute is present on the element.

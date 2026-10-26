[@eslint-react/jsx](../README.md) / hasAttribute

# Function: hasAttribute()

```ts
function hasAttribute(element: JSXElement, name: string): boolean;
```

Check if the element has a direct attribute with the given full name.

Spread attributes are ignored; only direct `JSXAttribute` nodes are checked.

## Parameters

| Parameter | Type         | Description                                                         |
| --------- | ------------ | ------------------------------------------------------------------- |
| `element` | `JSXElement` | The `JSXElement` node to check.                                     |
| `name`    | `string`     | The full attribute name to look for (ex: "className", "xml:space"). |

## Returns

`boolean`

`true` if the attribute is directly present on the element.

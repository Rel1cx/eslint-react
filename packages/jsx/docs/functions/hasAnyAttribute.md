[@eslint-react/jsx](../README.md) / hasAnyAttribute

# Function: hasAnyAttribute()

```ts
function hasAnyAttribute(element: JSXElement, names: readonly string[]): boolean;
```

Check if the element has at least one of the given direct attributes.

Spread attributes are ignored; only direct `JSXAttribute` nodes are checked.

## Parameters

| Parameter | Type                | Description                                                 |
| --------- | ------------------- | ----------------------------------------------------------- |
| `element` | `JSXElement`        | The `JSXElement` node to check.                             |
| `names`   | readonly `string`[] | The full attribute names to look for (namespaces included). |

## Returns

`boolean`

`true` if at least one direct attribute is present; `false` for an empty list.

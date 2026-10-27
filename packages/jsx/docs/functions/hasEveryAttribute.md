[@eslint-react/jsx](../README.md) / hasEveryAttribute

# Function: hasEveryAttribute()

```ts
function hasEveryAttribute(element: JSXElement, names: readonly string[]): boolean;
```

Check if the element has all of the given direct attributes.

Spread attributes are ignored; only direct `JSXAttribute` nodes are checked.

## Parameters

| Parameter | Type                | Description                                                 |
| --------- | ------------------- | ----------------------------------------------------------- |
| `element` | `JSXElement`        | The `JSXElement` node to check.                             |
| `names`   | readonly `string`[] | The full attribute names to look for (namespaces included). |

## Returns

`boolean`

`true` if every direct attribute is present; an empty list is vacuously `true`.

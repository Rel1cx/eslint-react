[@eslint-react/jsx](../README.md) / hasEveryAttribute

# Function: hasEveryAttribute()

```ts
function hasEveryAttribute(element: JSXElement, names: readonly string[]): boolean;
```

Check if the element has all of the given direct attributes.

Spread attributes are ignored; only direct `JSXAttribute` nodes are checked.

## Parameters

| Parameter | Type                | Description                      |
| --------- | ------------------- | -------------------------------- |
| `element` | `JSXElement`        | The `JSXElement` node to check.  |
| `names`   | readonly `string`[] | The attribute names to look for. |

## Returns

`boolean`

`true` if every attribute is present on the element.

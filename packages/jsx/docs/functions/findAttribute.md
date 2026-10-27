[@eslint-react/jsx](../README.md) / findAttribute

# Function: findAttribute()

```ts
function findAttribute(element: JSXElement, name: string): JSXAttribute | null;
```

Find the last direct JSX attribute with the given full name.

Later direct attributes take precedence, matching the order in which JSX
props are written. Spread attributes are opaque: they are ignored by this lookup, and a
spread after the returned attribute may still override it at runtime.

## Parameters

| Parameter | Type         | Description                                                         |
| --------- | ------------ | ------------------------------------------------------------------- |
| `element` | `JSXElement` | The `JSXElement` node to search.                                    |
| `name`    | `string`     | The full attribute name to look for (ex: "className", "xml:space"). |

## Returns

`JSXAttribute` \| `null`

The last matching `JSXAttribute`, or `null` when not found.

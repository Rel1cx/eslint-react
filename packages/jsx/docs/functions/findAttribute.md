[@eslint-react/jsx](../README.md) / findAttribute

# Function: findAttribute()

```ts
function findAttribute(element: JSXElement, name: string): JSXAttribute | null;
```

Find a direct JSX attribute by name.

Returns the last matching attribute to mirror React's behavior where later
props win. Only direct `JSXAttribute` nodes are considered; spread attributes
are ignored rather than statically resolved.

## Parameters

| Parameter | Type         | Description                                                    |
| --------- | ------------ | -------------------------------------------------------------- |
| `element` | `JSXElement` | The `JSXElement` node to search.                               |
| `name`    | `string`     | The attribute name to look for (ex: "className", "xml:space"). |

## Returns

`JSXAttribute` \| `null`

The matching `JSXAttribute`, or `null` when not found.

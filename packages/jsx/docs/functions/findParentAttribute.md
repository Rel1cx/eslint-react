[@eslint-react/jsx](../README.md) / findParentAttribute

# Function: findParentAttribute()

```ts
function findParentAttribute(node: Node | null | undefined, test?: AttributeTest): JSXAttribute | null;
```

Walk up the AST from `node` to find the nearest `JSXAttribute` ancestor,
optionally matching a string name or a predicate.

## Parameters

| Parameter | Type                                                | Description                                                                                                                                                  |
| --------- | --------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `node`    | `Node` \| `null` \| `undefined`                     | The starting node for the upward search.                                                                                                                     |
| `test?`   | [`AttributeTest`](../type-aliases/AttributeTest.md) | Optional test to filter candidate `JSXAttribute` nodes. A string matches the full attribute name (see [isAttributeNamed](../variables/isAttributeNamed.md)). |

## Returns

`JSXAttribute` \| `null`

The first matching `JSXAttribute` ancestor, or `null` when none is found.

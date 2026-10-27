[@eslint-react/jsx](../README.md) / findParentAttribute

# Function: findParentAttribute()

```ts
function findParentAttribute(node: Node | null | undefined, test?: AttributeTest): JSXAttribute | null;
```

Walk up the AST from `node` to find the nearest `JSXAttribute` ancestor,
optionally matching a string name or a predicate.

The search starts at `node.parent`; `node` itself is not considered. When
`test` is omitted, the nearest `JSXAttribute` ancestor matches.

## Parameters

| Parameter | Type                                                | Description                                                                                                                                                                                               |
| --------- | --------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `node`    | `Node` \| `null` \| `undefined`                     | The starting node for the upward search; nullish values return `null`.                                                                                                                                    |
| `test?`   | [`AttributeTest`](../type-aliases/AttributeTest.md) | Optional test to filter candidate `JSXAttribute` nodes. A string matches the full attribute name (see [isAttributeNamed](../variables/isAttributeNamed.md)); a function receives the candidate attribute. |

## Returns

`JSXAttribute` \| `null`

The first matching `JSXAttribute` ancestor, or `null` when none is found.

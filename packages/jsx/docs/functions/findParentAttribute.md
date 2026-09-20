[@eslint-react/jsx](../README.md) / findParentAttribute

# Function: findParentAttribute()

```ts
function findParentAttribute(node: Node, test?: (node: JSXAttribute) => boolean): JSXAttribute | undefined;
```

Walk up the AST from `node` to find the nearest `JSXAttribute` ancestor, optionally matching a predicate.

## Parameters

| Parameter | Type                                  | Description                                                  |
| --------- | ------------------------------------- | ------------------------------------------------------------ |
| `node`    | `Node`                                | The starting node for the upward search.                     |
| `test`    | (`node`: `JSXAttribute`) => `boolean` | Optional predicate to filter candidate `JSXAttribute` nodes. |

## Returns

`JSXAttribute` \| `undefined`

The first matching `JSXAttribute` ancestor, or `undefined` when none is found.

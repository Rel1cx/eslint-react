[@eslint-react/jsx](../README.md) / findParentAttribute

# Function: findParentAttribute()

```ts
function findParentAttribute(node: Node, test?: (node: JSXAttribute) => boolean): JSXAttribute | null;
```

Walk **up** the AST from `node` to find the nearest ancestor that is a
`JSXAttribute` and (optionally) passes a predicate.

This is useful when a rule visitor enters a deeply‑nested node (e.g. a
`Literal` inside an expression container) and needs to know which JSX
attribute it belongs to.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `node` | `Node` | The starting node for the upward search. |
| `test` | (`node`: `JSXAttribute`) => `boolean` | Optional predicate to filter candidate `JSXAttribute` nodes. When omitted every `JSXAttribute` ancestor matches. |

## Returns

`JSXAttribute` \| `null`

The first matching `JSXAttribute` ancestor, or `null` if none is
         found before reaching the root.

## Example

```ts
// Inside a Literal visitor, find the owning attribute:
const attr = findParentAttribute(literalNode);
if (attr != null) {
  console.log(getAttributeName(attr));
}
```

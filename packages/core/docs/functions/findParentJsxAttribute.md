[@eslint-react/core](../README.md) / findParentJsxAttribute

# Function: findParentJsxAttribute()

```ts
function findParentJsxAttribute(node: Node, test?: (node: JSXAttribute) => boolean): JSXAttribute | null;
```

Traverses up the AST to find a parent JSX attribute node that matches a given test

## Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `node` | `Node` | `undefined` | The starting AST node |
| `test` | (`node`: `JSXAttribute`) => `boolean` | `constTrue` | Optional predicate function to test if the attribute meets criteria Defaults to always returning true (matches any attribute) |

## Returns

`JSXAttribute` \| `null`

The first matching JSX attribute node found when traversing upwards, or null

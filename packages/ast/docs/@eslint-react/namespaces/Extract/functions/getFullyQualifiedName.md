[@eslint-react/ast](../../../../README.md) / [Extract](../README.md) / getFullyQualifiedName

# Function: getFullyQualifiedName()

```ts
function getFullyQualifiedName(node: Node, getText: (node: Node) => string): string;
```

Get the fully qualified name of a node (ex: `React.useState`), falling back to source text when needed.

## Parameters

| Parameter | Type                         | Description                                     |
| --------- | ---------------------------- | ----------------------------------------------- |
| `node`    | `Node`                       | The node to inspect.                            |
| `getText` | (`node`: `Node`) => `string` | A function returning the source text of a node. |

## Returns

`string`

The fully qualified name.

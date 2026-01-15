[@eslint-react/core](../README.md) / isInsideComponentOrHook

# Function: isInsideComponentOrHook()

```ts
function isInsideComponentOrHook(node: Node | undefined): boolean;
```

Checks if a given AST node is inside a React component or hook

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `node` | `Node` \| `undefined` | The AST node to check |

## Returns

`boolean`

True if the node is inside a component or hook, false otherwise

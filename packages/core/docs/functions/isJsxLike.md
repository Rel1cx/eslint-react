[@eslint-react/core](../README.md) / isJsxLike

# Function: isJsxLike()

```ts
function isJsxLike(
   code: {
  getScope: (node: Node) => Scope;
}, 
   node: Node | null, 
   hint?: bigint): boolean;
```

Determine if a node represents JSX-like content based on heuristics
Supports configuration through hint flags to customize detection behavior

## Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `code` | \{ `getScope`: (`node`: `Node`) => `Scope`; \} | `undefined` | The source code with scope lookup capability |
| `code.getScope` | (`node`: `Node`) => `Scope` | `undefined` | The function to get the scope of a node |
| `node` | `Node` \| `null` | `undefined` | The AST node to analyze |
| `hint` | `bigint` | `DEFAULT_JSX_DETECTION_HINT` | The configuration flags to adjust detection behavior |

## Returns

`boolean`

boolean Whether the node is considered JSX-like

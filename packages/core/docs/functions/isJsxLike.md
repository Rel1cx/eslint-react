[@eslint-react/core](../README.md) / isJsxLike

# Function: isJsxLike()

```ts
function isJsxLike(
   context: RuleContext, 
   node: Node | null, 
   hint?: bigint): boolean;
```

Determine if a node represents JSX-like content based on heuristics
Supports configuration through hint flags to customize detection behavior

## Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `context` | `RuleContext` | `undefined` | The rule context with scope lookup capability |
| `node` | `Node` \| `null` | `undefined` | The AST node to analyze |
| `hint` | `bigint` | `DEFAULT_JSX_DETECTION_HINT` | The configuration flags to adjust detection behavior |

## Returns

`boolean`

boolean Whether the node is considered JSX-like

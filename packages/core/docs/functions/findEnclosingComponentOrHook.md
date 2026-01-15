[@eslint-react/core](../README.md) / findEnclosingComponentOrHook

# Function: findEnclosingComponentOrHook()

```ts
function findEnclosingComponentOrHook(node: Node | undefined, test: FindEnclosingComponentOrHookFilter): 
  | ArrowFunctionExpression
  | FunctionDeclarationWithName
  | FunctionDeclarationWithOptionalName
  | FunctionExpression
  | undefined;
```

Find the enclosing React component or hook for a given AST node

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `node` | `Node` \| `undefined` | The AST node to start the search from |
| `test` | [`FindEnclosingComponentOrHookFilter`](../type-aliases/FindEnclosingComponentOrHookFilter.md) | Optional test function to customize component or hook identification |

## Returns

  \| `ArrowFunctionExpression`
  \| `FunctionDeclarationWithName`
  \| `FunctionDeclarationWithOptionalName`
  \| `FunctionExpression`
  \| `undefined`

The enclosing component or hook node, or `null` if none is found

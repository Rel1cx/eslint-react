[@eslint-react/core](../README.md) / getFunctionDirectives

# Function: getFunctionDirectives()

```ts
function getFunctionDirectives(node: FunctionExpression): Directive[];
```

Gets all directive expression statements from the top of a function body.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `node` | `FunctionExpression` | The function AST node. |

## Returns

`Directive`[]

An array of directive expression statements.

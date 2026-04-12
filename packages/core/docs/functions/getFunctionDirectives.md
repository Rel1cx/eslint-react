[@eslint-react/core](../README.md) / getFunctionDirectives

# Function: getFunctionDirectives()

```ts
function getFunctionDirectives(node: TSESTreeFunction): TSESTreeDirective[];
```

Gets all directive expression statements from the top of a function body.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `node` | `TSESTreeFunction` | The function AST node. |

## Returns

`TSESTreeDirective`[]

An array of directive expression statements.

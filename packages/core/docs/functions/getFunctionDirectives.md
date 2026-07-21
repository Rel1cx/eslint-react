[@eslint-react/core](../README.md) / getFunctionDirectives

# Function: getFunctionDirectives()

```ts
function getFunctionDirectives(node: TSESTreeFunction): TSESTreeDirective[];
```

Get the directives of a function (ex: "use strict", "use client", "use server").

## Parameters

| Parameter | Type               | Description                                   |
| --------- | ------------------ | --------------------------------------------- |
| `node`    | `TSESTreeFunction` | The function node to get the directives from. |

## Returns

`TSESTreeDirective`[]

The directives of the function.

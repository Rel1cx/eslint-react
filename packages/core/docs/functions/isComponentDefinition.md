[@eslint-react/core](../README.md) / isComponentDefinition

# Function: isComponentDefinition()

```ts
function isComponentDefinition(
   context: RuleContext, 
   node: TSESTreeFunction, 
   hint: bigint): boolean;
```

Determines if a function node represents a valid React component definition

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `context` | `RuleContext` | The rule context |
| `node` | `TSESTreeFunction` | The function node to check |
| `hint` | `bigint` | Component detection hints as bit flags |

## Returns

`boolean`

`true` if the node is a valid component definition, `false` otherwise

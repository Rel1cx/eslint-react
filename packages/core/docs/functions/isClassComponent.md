[@eslint-react/core](../README.md) / isClassComponent

# Function: isClassComponent()

## Call Signature

```ts
function isClassComponent(node: Node): node is TSESTreeClass;
```

Check if a node is a React class component

### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `node` | `Node` | The AST node to check |

### Returns

`node is TSESTreeClass`

`true` if the node is a class component, `false` otherwise

## Call Signature

```ts
function isClassComponent(node: Node, context: RuleContext): node is TSESTreeClass;
```

Check if a node is a React class component

### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `node` | `Node` | The AST node to check |
| `context` | `RuleContext` | - |

### Returns

`node is TSESTreeClass`

`true` if the node is a class component, `false` otherwise

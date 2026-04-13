[@eslint-react/core](../README.md) / isClassComponent

# ~~Function: isClassComponent()~~

## Call Signature

```ts
function isClassComponent(node: Node): node is ClassExpression;
```

### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `node` | `Node` | The AST node to check. |

### Returns

`node is ClassExpression`

### Deprecated

Class components are legacy. This function exists only to support legacy rules.

## Call Signature

```ts
function isClassComponent(node: Node, context: RuleContext): node is ClassExpression;
```

### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `node` | `Node` | The AST node to check. |
| `context` | `RuleContext` | The rule context. |

### Returns

`node is ClassExpression`

### Deprecated

Class components are legacy. This function exists only to support legacy rules.

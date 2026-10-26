[@eslint-react/var](../README.md) / resolveBindingTarget

# Function: resolveBindingTarget()

```ts
function resolveBindingTarget<T extends Node | null>(node: T): BindingTarget<T>;
```

Resolve the binding target of a pattern element, property value, or parameter:
`AssignmentPattern` defaults unwrap to their left side, other nodes pass through.

## Type Parameters

| Type Parameter                                               |
| ------------------------------------------------------------ |
| <a id="type-parameter-t"></a> `T` _extends_ `Node` \| `null` |

## Parameters

| Parameter | Type | Description          |
| --------- | ---- | -------------------- |
| `node`    | `T`  | The node to resolve. |

## Returns

[`BindingTarget`](../type-aliases/BindingTarget.md)\<`T`\>

The binding target, or `null` when `node` is `null`.

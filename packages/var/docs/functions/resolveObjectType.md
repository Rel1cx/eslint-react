[@eslint-react/var](../README.md) / resolveObjectType

# Function: resolveObjectType()

```ts
function resolveObjectType(
  context: RuleContext,
  node: Node | null | undefined,
  options?: Partial<{
    boundary: Node;
  }>,
): ObjectType | null;
```

Resolve the object type of the node.

## Parameters

| Parameter  | Type                                                                                                                  | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| ---------- | --------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `context`  | `RuleContext`                                                                                                         | The ESLint rule context.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `node`     | `Node` \| `null` \| `undefined`                                                                                       | The node to resolve.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `options?` | [`Partial`](https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype)\<\{ `boundary`: `Node`; \}\> | Optional settings: - `boundary`: A node (typically the enclosing component or hook function) that bounds identifier resolution. Identifiers are resolved through their initializer only when the binding is declared within the boundary — this catches render-scoped constructions referenced from nested callbacks, while values declared outside the boundary (e.g. module-level constants, which are stable across renders) are treated as unresolvable. When omitted, only the identifier's own scope is searched. |

## Returns

[`ObjectType`](../type-aliases/ObjectType.md) \| `null`

The object type of the node, or `null` when it cannot be resolved.

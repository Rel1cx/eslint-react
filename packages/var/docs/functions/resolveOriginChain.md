[@eslint-react/var](../README.md) / resolveOriginChain

# Function: resolveOriginChain()

```ts
function resolveOriginChain(context: RuleContext, node: Identifier, options?: ResolveOriginChainOptions): Node | null;
```

Follow an identifier through an alias chain to the node its value ultimately
originates from.

Each step uses [resolveOrigin](resolveOrigin.md) and unwraps TypeScript type and chain
expressions, so `const a = b as T` continues through `b`. Resolution stops
when a step yields a non-identifier node, a `null` origin, a repeated node
(cycle), or after `maxDepth` steps.

Use this instead of calling [resolveOrigin](resolveOrigin.md) in a loop: it provides
cycle protection and a bounded traversal.

## Parameters

| Parameter  | Type                                                                      | Description                                                                                                      |
| ---------- | ------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `context`  | `RuleContext`                                                             | The ESLint rule context.                                                                                         |
| `node`     | `Identifier`                                                              | The identifier to start from.                                                                                    |
| `options?` | [`ResolveOriginChainOptions`](../interfaces/ResolveOriginChainOptions.md) | Optional chain-resolution settings; see [ResolveOriginChainOptions](../interfaces/ResolveOriginChainOptions.md). |

## Returns

`Node` \| `null`

The first non-identifier origin node, or `null` when the chain cannot be resolved.

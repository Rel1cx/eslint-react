[@eslint-react/jsx](../README.md) / isCreateElementCall

# Function: isCreateElementCall()

```ts
function isCreateElementCall(context: RuleContext, node: Node | null | undefined): node is CallExpression;
```

Check if the node is a call to a `createElement` API.

Matching is name-based and namespace-agnostic: the fully qualified callee name
must be `createElement` or end with `.createElement`. No import provenance
check is performed, matching `isAPICall("createElement")` in `@eslint-react/core`.

## Parameters

| Parameter | Type                            | Description                                                    |
| --------- | ------------------------------- | -------------------------------------------------------------- |
| `context` | `RuleContext`                   | The ESLint rule context.                                       |
| `node`    | `Node` \| `null` \| `undefined` | The node to inspect; nullish or non-call nodes return `false`. |

## Returns

`node is CallExpression`

`true` if the node is a `createElement` call.

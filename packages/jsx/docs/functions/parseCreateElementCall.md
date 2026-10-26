[@eslint-react/jsx](../README.md) / parseCreateElementCall

# Function: parseCreateElementCall()

```ts
function parseCreateElementCall(context: RuleContext, node: Node | null | undefined): CreateElementCall | null;
```

Parse a `createElement` call into its positional arguments.

A non-`createElement` node yields `null`; a matched call always yields a
descriptor, even when it has no arguments. This removes the ambiguity between
"not a `createElement` call" and "a call with no props/children".

## Parameters

| Parameter | Type                            | Description              |
| --------- | ------------------------------- | ------------------------ |
| `context` | `RuleContext`                   | The ESLint rule context. |
| `node`    | `Node` \| `null` \| `undefined` | The node to inspect.     |

## Returns

[`CreateElementCall`](../interfaces/CreateElementCall.md) \| `null`

The parsed call, or `null` when the node is not a `createElement` call.

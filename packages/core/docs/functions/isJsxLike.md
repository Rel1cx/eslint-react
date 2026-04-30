[@eslint-react/core](../README.md) / isJsxLike

# Function: isJsxLike()

```ts
function isJsxLike(
   context: RuleContext, 
   node: Node | null, 
   hint?: bigint): boolean;
```

Determine whether a node represents JSX-like content based on heuristics.

The detection behaviour is configurable through [JsxDetectionHint](../variables/JsxDetectionHint.md)
bit-flags so that callers can opt individual value kinds in or out.

## Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `context` | `RuleContext` | `undefined` | The ESLint rule context (needed for variable resolution). |
| `node` | `Node` \| `null` | `undefined` | The AST node to analyse. |
| `hint` | `bigint` | `DEFAULT_JSX_DETECTION_HINT` | Optional bit-flags to adjust detection behaviour. Defaults to [DEFAULT\_JSX\_DETECTION\_HINT](../variables/DEFAULT_JSX_DETECTION_HINT.md). |

## Returns

`boolean`

Whether the node is considered JSX-like.

## Example

```ts
import { isJsxLike } from "@eslint-react/core";

if (isJsxLike(context, node)) {
  // node looks like it evaluates to a React element
}
```

[@eslint-react/core](../README.md) / isJsxLike

# Function: isJsxLike()

```ts
function isJsxLike(
  context: RuleContext,
  node: Node | null,
  hint?: bigint,
): boolean;
```

Determine whether a node represents JSX-like content based on heuristics.

The detection behaviour is configurable through JsxDetectionHint
bit-flags so that callers can opt individual value kinds in or out.

Identifiers are resolved to their definitions via scope analysis;
circular definitions (e.g. `var a = b; var b = a;`) are detected and
treated as not JSX-like instead of recursing indefinitely.

## Parameters

| Parameter | Type             | Default value                | Description                                                                                  |
| --------- | ---------------- | ---------------------------- | -------------------------------------------------------------------------------------------- |
| `context` | `RuleContext`    | `undefined`                  | The ESLint rule context (needed for variable resolution).                                    |
| `node`    | `Node` \| `null` | `undefined`                  | The AST node to analyse.                                                                     |
| `hint`    | `bigint`         | `DEFAULT_JSX_DETECTION_HINT` | Optional bit-flags to adjust detection behaviour. Defaults to DEFAULT\_JSX\_DETECTION\_HINT. |

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

[@eslint-react/core](../README.md) / isJSXLike

# Function: isJSXLike()

```ts
function isJSXLike(context: RuleContext, node: Node | null, hint?: bigint): boolean;
```

Check if the node represents JSX-like content based on heuristics.

The detection behavior is configurable through [JSXDetectionHint](../variables/JSXDetectionHint.md)
bit-flags so that callers can opt individual value kinds in or out.

Identifiers are resolved to their definitions via scope analysis;
circular definitions (e.g. `var a = b; var b = a;`) are detected and
treated as not JSX-like instead of recursing indefinitely.

## Parameters

| Parameter | Type             | Default value                | Description                                                                                                                               |
| --------- | ---------------- | ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `context` | `RuleContext`    | `undefined`                  | The ESLint rule context (needed for variable resolution).                                                                                 |
| `node`    | `Node` \| `null` | `undefined`                  | The AST node to analyze.                                                                                                                  |
| `hint?`   | `bigint`         | `DEFAULT_JSX_DETECTION_HINT` | Optional bit-flags to adjust detection behavior. Defaults to [DEFAULT\_JSX\_DETECTION\_HINT](../variables/DEFAULT_JSX_DETECTION_HINT.md). |

## Returns

`boolean`

Whether the node is considered JSX-like.

## Example

```ts
import { isJSXLike } from "@eslint-react/core";

if (isJSXLike(context, node)) {
  // node looks like it evaluates to a React element
}
```

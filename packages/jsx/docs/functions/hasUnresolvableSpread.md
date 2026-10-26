[@eslint-react/jsx](../README.md) / hasUnresolvableSpread

# Function: hasUnresolvableSpread()

```ts
function hasUnresolvableSpread(context: RuleContext, argument: Expression): boolean;
```

Check whether a spread argument, or any nested spread inside its resolved
object expression, cannot be statically resolved to an object expression.

A spread is considered unresolvable when its argument (or a nested spread)
does not resolve to an object expression, or when the resolved object
contains a computed key that cannot be statically evaluated. Such a spread
may provide arbitrary properties (ex: `key` or `ref`), so callers that must
not misjudge the effective props can use this as a conservative check.

## Parameters

| Parameter  | Type          | Description                                               |
| ---------- | ------------- | --------------------------------------------------------- |
| `context`  | `RuleContext` | The ESLint rule context (needed for variable resolution). |
| `argument` | `Expression`  | The spread argument expression to check.                  |

## Returns

`boolean`

`true` if the spread argument cannot be fully resolved.

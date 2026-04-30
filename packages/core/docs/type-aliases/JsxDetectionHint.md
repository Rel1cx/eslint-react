[@eslint-react/core](../README.md) / JsxDetectionHint

# Type Alias: JsxDetectionHint

```ts
type JsxDetectionHint = bigint;
```

BitFlags for configuring JSX detection behavior.

Used by [isJsxLike](../functions/isJsxLike.md) to control which AST node kinds are
considered "JSX-like". Combine flags with the `|` operator.

## Example

```ts
const hint = JsxDetectionHint.DoNotIncludeJsxWithBooleanValue
  | JsxDetectionHint.DoNotIncludeJsxWithStringValue;

isJsxLike(context, node, hint);
```

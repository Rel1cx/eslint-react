[@eslint-react/jsx](../README.md) / isMeaningfulChild

# Function: isMeaningfulChild()

```ts
function isMeaningfulChild(node: JSXChild): boolean;
```

Check if the child is syntactically non-empty ("meaningful") content.

Excluded: whitespace-only `JSXText` per [isWhitespaceText](isWhitespaceText.md) (raw text, so
entity text such as `&nbsp;`/`&#32;` is kept), empty expression containers, and
bare empty string literals.

Kept: dynamic values (`{null}`, `{false}`, `{undefined}`, `{0}`, `{NaN}`,
`{cond ? <A /> : null}`), TS-wrapped empty strings (`{"" as string}`, `{""!}`),
unevaluated template literals, and spread children.

A syntactic check, not a rendering oracle: React renders nothing for `null`,
`undefined`, booleans, and `""`, but those children are kept.

## Parameters

| Parameter | Type       | Description             |
| --------- | ---------- | ----------------------- |
| `node`    | `JSXChild` | The JSX child to check. |

## Returns

`boolean`

`true` if the child is not syntactically empty.

## Remarks

Definitional difference: JSXText `" "` is not meaningful, while `{" "}` and
`&#32;` are, even though all three render a space text node.

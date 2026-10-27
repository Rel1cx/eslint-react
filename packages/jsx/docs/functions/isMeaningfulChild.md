[@eslint-react/jsx](../README.md) / isMeaningfulChild

# Function: isMeaningfulChild()

```ts
function isMeaningfulChild(node: JSXChild): boolean;
```

Check if the child carries content for the "meaningful children" semantics.

Whitespace-only `JSXText` as determined by [isWhitespaceText](isWhitespaceText.md) (which
reads raw source text and therefore keeps entity text), empty expression
containers, and empty string literal expressions are excluded. This is a
syntactic check: `{null}`, `{false}`, and other dynamic expressions still
count as children content.

## Parameters

| Parameter | Type       | Description             |
| --------- | ---------- | ----------------------- |
| `node`    | `JSXChild` | The JSX child to check. |

## Returns

`boolean`

`true` if the child is not syntactically empty.

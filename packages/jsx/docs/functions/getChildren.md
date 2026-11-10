[@eslint-react/jsx](../README.md) / getChildren

# Function: getChildren()

```ts
function getChildren(element: TSESTreeJSXElementLike): JSXChild[];
```

Get the children of a JSX element or fragment after removing padding
whitespace (see [isPaddingWhitespace](isPaddingWhitespace.md)), empty expression containers,
and empty string literals.

Same-line whitespace is kept (it can render a text node); this is a syntactic
filter, not a rendering guarantee (`{null}`/`{false}` are kept). Compared with
[getMeaningfulChildren](getMeaningfulChildren.md):

| Input                   | `getChildren`             | `getMeaningfulChildren` |
| ----------------------- | ------------------------- | ----------------------- |
| `" "`, `"\t"`           | kept                      | excluded                |
| `\r  \r` (CR-only)      | excluded                  | excluded                |
| `&#10;`, `&#13;`        | excluded (Babel cleaning) | kept (raw text)         |
| `&#32;`, `&nbsp;`       | kept                      | kept                    |
| `{null}`, `{false}`     | kept                      | kept                    |
| `{}`, `{/* comment */}` | excluded                  | excluded                |
| `{""}`                  | excluded                  | excluded                |
| `{"" as string}`        | kept                      | kept                    |

## Parameters

| Parameter | Type                     | Description                           |
| --------- | ------------------------ | ------------------------------------- |
| `element` | `TSESTreeJSXElementLike` | A `JSXElement` or `JSXFragment` node. |

## Returns

`JSXChild`[]

The children that remain after removing padding artifacts.

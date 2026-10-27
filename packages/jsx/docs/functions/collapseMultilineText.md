[@eslint-react/jsx](../README.md) / collapseMultilineText

# Function: collapseMultilineText()

```ts
function collapseMultilineText(text: string): string | null;
```

Collapse a JSX text string using Babel's `cleanJSXElementLiteralChild`
whitespace rules.

1. Split the input on CRLF, LF, or CR.
2. Track the last line containing a character other than a space or tab,
   defaulting to the first line when there is none.
3. Replace each tab with a space.
4. Remove leading spaces from non-first lines and trailing spaces from
   non-last physical lines.
5. Append a single space after each line that still has content, except the
   last tracked line.

## Parameters

| Parameter | Type     | Description                                                            |
| --------- | -------- | ---------------------------------------------------------------------- |
| `text`    | `string` | The JSX text string to collapse (typically a decoded `JSXText.value`). |

## Returns

`string` \| `null`

The collapsed string, or `null` when the collapsed result is empty
(for example, for empty input or multiline input containing only spaces, tabs,
and line breaks).

## See

https://github.com/babel/babel/blob/main/packages/babel-types/src/utils/react/cleanJSXElementLiteralChild.ts

[@eslint-react/jsx](../README.md) / collapseMultilineText

# Function: collapseMultilineText()

```ts
function collapseMultilineText(text: string): string | null;
```

Collapse a multiline JSX text string following React's whitespace rules

This mirrors Babel's `cleanJSXElementLiteralChild` algorithm:
1. Split the raw text into lines.
2. Find the last non-empty line.
3. Trim leading spaces on non-first lines and trailing spaces on non-last lines.
4. Collapse tabs into spaces.
5. Append a single space after each non-last non-empty line.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `text` | `string` | The raw JSX text string to collapse |

## Returns

`string` \| `null`

The collapsed string, or `null` if the text contains only whitespace

## See

https://github.com/babel/babel/blob/main/packages/babel-types/src/utils/react/cleanJSXElementLiteralChild.ts

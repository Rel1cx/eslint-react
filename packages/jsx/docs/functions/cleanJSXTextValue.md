[@eslint-react/jsx](../README.md) / cleanJSXTextValue

# Function: cleanJSXTextValue()

```ts
function cleanJSXTextValue(node: JSXText): string | null;
```

Clean a `JSXText` node's value following React's whitespace rules.

This mirrors Babel's `cleanJSXElementLiteralChild` algorithm:
1. Split the raw text into lines.
2. Find the last non-empty line.
3. Trim leading spaces on non-first lines and trailing spaces on non-last lines.
4. Collapse tabs into spaces.
5. Append a single space after each non-last non-empty line.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `node` | `JSXText` | The JSXText node to clean. |

## Returns

`string` \| `null`

The cleaned string, or `null` if the text contains only whitespace.

## See

https://github.com/babel/babel/blob/main/packages/babel-types/src/utils/react/cleanJSXElementLiteralChild.ts

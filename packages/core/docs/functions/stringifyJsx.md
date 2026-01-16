[@eslint-react/core](../README.md) / stringifyJsx

# Function: stringifyJsx()

```ts
function stringifyJsx(node: 
  | JSXIdentifier
  | JSXNamespacedName
  | JSXMemberExpression
  | JSXOpeningElement
  | JSXClosingElement
  | JSXOpeningFragment
  | JSXClosingFragment
  | JSXText): string;
```

Incomplete but sufficient stringification of JSX nodes for common use cases

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `node` | \| `JSXIdentifier` \| `JSXNamespacedName` \| `JSXMemberExpression` \| `JSXOpeningElement` \| `JSXClosingElement` \| `JSXOpeningFragment` \| `JSXClosingFragment` \| `JSXText` | JSX node from TypeScript ESTree |

## Returns

`string`

String representation of the JSX node

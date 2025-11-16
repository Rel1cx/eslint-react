[@eslint-react/core](../README.md) / stringifyJsx

# Function: stringifyJsx()

```ts
function stringifyJsx(node: 
  | JSXClosingElement
  | JSXClosingFragment
  | JSXIdentifier
  | JSXMemberExpression
  | JSXNamespacedName
  | JSXOpeningElement
  | JSXOpeningFragment
  | JSXText): string;
```

Incomplete but sufficient stringification of JSX nodes for common use cases

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `node` | \| `JSXClosingElement` \| `JSXClosingFragment` \| `JSXIdentifier` \| `JSXMemberExpression` \| `JSXNamespacedName` \| `JSXOpeningElement` \| `JSXOpeningFragment` \| `JSXText` | JSX node from TypeScript ESTree |

## Returns

`string`

String representation of the JSX node

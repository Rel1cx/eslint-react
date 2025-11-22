[@eslint-react/core](../README.md) / getJsxElementType

# Function: getJsxElementType()

```ts
function getJsxElementType(context: RuleContext, node: JSXElement | JSXFragment): string;
```

Extracts the element type name from a JSX element or fragment
For JSX elements, returns the stringified name (e.g., "div", "Button", "React.Fragment")
For JSX fragments, returns an empty string

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `context` | `RuleContext` | ESLint rule context |
| `node` | `JSXElement` \| `JSXFragment` | JSX element or fragment node |

## Returns

`string`

String representation of the element type

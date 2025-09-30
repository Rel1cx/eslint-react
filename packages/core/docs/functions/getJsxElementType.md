[**@eslint-react/core**](../README.md)

***

[@eslint-react/core](../README.md) / getJsxElementType

# Function: getJsxElementType()

> **getJsxElementType**(`context`, `node`): `string`

Extracts the element type name from a JSX element or fragment
For JSX elements, returns the stringified name (e.g., "div", "Button", "React.Fragment")
For JSX fragments, returns an empty string

## Parameters

### context

`RuleContext`

ESLint rule context

### node

JSX element or fragment node

`JSXElement` | `JSXFragment`

## Returns

`string`

String representation of the element type

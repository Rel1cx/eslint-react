[**@eslint-react/core**](../README.md)

***

[@eslint-react/core](../README.md) / getAttribute

# Function: getAttribute()

> **getAttribute**(`context`, `name`, `attributes`, `initialScope?`): `undefined` \| `JSXAttribute` \| `JSXSpreadAttribute`

Searches for a specific JSX attribute by name in a list of attributes
Returns the last matching attribute (rightmost in JSX)

## Parameters

### context

`RuleContext`

ESLint rule context

### name

`string`

The name of the attribute to find

### attributes

(`JSXAttribute` \| `JSXSpreadAttribute`)[]

Array of JSX attributes to search through

### initialScope?

`Scope`

Optional scope for resolving variables

## Returns

`undefined` \| `JSXAttribute` \| `JSXSpreadAttribute`

The found attribute or undefined

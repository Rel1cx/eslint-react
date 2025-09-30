[**@eslint-react/core**](../README.md)

***

[@eslint-react/core](../README.md) / hasJsxAttribute

# Function: hasJsxAttribute()

> **hasJsxAttribute**(`context`, `name`, `attributes`, `initialScope?`): `boolean`

Checks if a JSX element has a specific attribute

## Parameters

### context

`RuleContext`

ESLint rule context

### name

`string`

Name of the attribute to check for

### attributes

(`JSXAttribute` \| `JSXSpreadAttribute`)[]

List of JSX attributes from opening element

### initialScope?

`Scope`

Optional scope for resolving variables in spread attributes

## Returns

`boolean`

boolean indicating whether the attribute exists

[**@eslint-react/core**](../README.md)

***

[@eslint-react/core](../README.md) / hasEveryAttribute

# Function: hasEveryAttribute()

> **hasEveryAttribute**(`context`, `names`, `attributes`, `initialScope?`): `boolean`

Checks if a JSX element has all of the specified attributes

## Parameters

### context

`RuleContext`

ESLint rule context

### names

`string`[]

Array of attribute names to check for

### attributes

(`JSXAttribute` \| `JSXSpreadAttribute`)[]

List of JSX attributes from opening element

### initialScope?

`Scope`

Optional scope for resolving variables in spread attributes

## Returns

`boolean`

boolean indicating whether all of the attributes exist

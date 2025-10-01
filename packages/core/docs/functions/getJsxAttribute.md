[**@eslint-react/core**](../README.md)

***

[@eslint-react/core](../README.md) / getJsxAttribute

# Function: getJsxAttribute()

> **getJsxAttribute**(`context`, `node`, `initialScope?`): (`name`) => `undefined` \| `JSXAttribute` \| `JSXSpreadAttribute`

Get a function to find JSX attributes by name, considering direct attributes and spread attributes.

## Parameters

### context

`RuleContext`

The ESLint rule context

### node

`JSXElement`

The JSX element node

### initialScope?

`Scope`

Optional initial scope for variable resolution

## Returns

A function that takes an attribute name and returns the corresponding JSX attribute node or undefined

> (`name`): `undefined` \| `JSXAttribute` \| `JSXSpreadAttribute`

### Parameters

#### name

`string`

### Returns

`undefined` \| `JSXAttribute` \| `JSXSpreadAttribute`

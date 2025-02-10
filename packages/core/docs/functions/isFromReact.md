[**@eslint-react/core**](../README.md)

***

[@eslint-react/core](../README.md) / isFromReact

# Function: isFromReact()

> **isFromReact**(`name`): (`node`, `context`) => `boolean`

Checks if the given node is a call expression to the given function or method of the pragma

## Parameters

### name

`string`

The name of the function or method to check

## Returns

`Function`

A predicate that checks if the given node is a call expression to the given function or method

### Parameters

#### node

`Identifier` | `MemberExpression`

#### context

`Readonly`

### Returns

`boolean`

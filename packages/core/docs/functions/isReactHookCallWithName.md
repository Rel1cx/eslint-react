[**@eslint-react/core**](../README.md)

***

[@eslint-react/core](../README.md) / isReactHookCallWithName

# Function: isReactHookCallWithName()

> **isReactHookCallWithName**(`context`, `node`): (`name`) => `boolean`

Checks if a node is a call to a specific React hook, with React import validation.
Returns a function that accepts a hook name to check against.

## Parameters

### context

`RuleContext`

The rule context

### node

The AST node to check

`undefined` | `Node`

## Returns

A function that takes a hook name and returns boolean

> (`name`): `boolean`

### Parameters

#### name

`string`

### Returns

`boolean`

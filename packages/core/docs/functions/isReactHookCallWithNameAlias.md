[**@eslint-react/core**](../README.md)

***

[@eslint-react/core](../README.md) / isReactHookCallWithNameAlias

# Function: isReactHookCallWithNameAlias()

> **isReactHookCallWithNameAlias**(`context`, `name`, `alias`): (`node`) => `boolean`

Checks if a node is a call to a specific React hook or one of its aliases.

## Parameters

### context

`RuleContext`

The rule context

### name

`string`

The primary hook name to check

### alias

Optional array of alias names to also accept

`undefined` | `string`[]

## Returns

Function that checks if a node matches the hook name or aliases

> (`node`): `boolean`

### Parameters

#### node

`CallExpression`

### Returns

`boolean`

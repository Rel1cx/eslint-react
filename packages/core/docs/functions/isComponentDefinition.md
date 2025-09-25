[**@eslint-react/core**](../README.md)

***

[@eslint-react/core](../README.md) / isComponentDefinition

# Function: isComponentDefinition()

> **isComponentDefinition**(`context`, `node`, `hint`): `boolean`

Determines if a function node represents a valid React component definition

## Parameters

### context

`RuleContext`

The rule context

### node

`TSESTreeFunction`

The function node to check

### hint

`bigint`

Component detection hints as bit flags

## Returns

`boolean`

`true` if the node is a valid component definition, `false` otherwise

[**@eslint-react/kit**](../../../../README.md)

***

[@eslint-react/kit](../../../../README.md) / [ContextDetection](../README.md) / isProcessEnvNodeEnvCompare

# Function: isProcessEnvNodeEnvCompare()

> **isProcessEnvNodeEnvCompare**(`node`, `operator`, `value`): `node is BinaryExpression`

Check if the given node is a binary expression that compares `process.env.NODE_ENV` with a string literal

## Parameters

### node

The AST node

`undefined` | `null` | `Node`

### operator

The operator used in the comparison

`"==="` | `"!=="`

### value

The string literal value to compare against

`"development"` | `"production"`

## Returns

`node is BinaryExpression`

True if the node is a binary expression that compares `process.env.NODE_ENV` with the specified value, false otherwise

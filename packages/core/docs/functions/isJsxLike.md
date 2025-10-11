[**@eslint-react/core**](../README.md)

***

[@eslint-react/core](../README.md) / isJsxLike

# Function: isJsxLike()

> **isJsxLike**(`code`, `node`, `hint`): `boolean`

Determines if a node represents JSX-like content based on heuristics
Supports configuration through hint flags to customize detection behavior

## Parameters

### code

The source code with scope lookup capability

#### getScope

(`node`) => `Scope`

The function to get the scope of a node

### node

The AST node to analyze

`Node` | `null` | `undefined`

### hint

`bigint` = `DEFAULT_JSX_DETECTION_HINT`

The configuration flags to adjust detection behavior

## Returns

`boolean`

boolean Whether the node is considered JSX-like

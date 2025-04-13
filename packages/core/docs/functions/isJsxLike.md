[**@eslint-react/core**](../README.md)

***

[@eslint-react/core](../README.md) / isJsxLike

# Function: isJsxLike()

> **isJsxLike**(`code`, `node`, `hint`): `boolean`

Heuristic decision to determine if a node is a JSX-like node.

## Parameters

### code

The sourceCode object

#### getScope

(`node`) => `Scope`

The function to get the scope of a node

### node

The AST node to check

`undefined` | `null` | `Node`

### hint

`bigint` = `DEFAULT_JSX_DETECTION_HINT`

The `JSXDetectionHint` to use

## Returns

`boolean`

boolean

[**@eslint-react/core**](../README.md)

***

[@eslint-react/core](../README.md) / getAttributeValue

# Function: getAttributeValue()

> **getAttributeValue**(`context`, `node`, `name`): \{ `initialScope`: `undefined` \| `Scope`; `kind`: `"none"`; `node`: `Node`; \} \| \{ `initialScope`: `undefined` \| `Scope`; `kind`: `"some"`; `node`: `Node`; `value`: `unknown`; \}

Get a StaticValue of the attribute value

## Parameters

### context

`RuleContext`

The rule context

### node

The JSX attribute node

`JSXAttribute` | `JSXSpreadAttribute`

### name

`string`

The name of the attribute

## Returns

\{ `initialScope`: `undefined` \| `Scope`; `kind`: `"none"`; `node`: `Node`; \} \| \{ `initialScope`: `undefined` \| `Scope`; `kind`: `"some"`; `node`: `Node`; `value`: `unknown`; \}

The StaticValue of the attribute value

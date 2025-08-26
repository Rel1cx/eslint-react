[**@eslint-react/core**](../README.md)

***

[@eslint-react/core](../README.md) / getAttributeValue

# Function: getAttributeValue()

> **getAttributeValue**(`context`, `node`, `name`): \{ `initialScope`: `undefined` \| `Scope`; `kind`: `"none"`; `node`: `Node`; \} \| \{ `initialScope`: `undefined` \| `Scope`; `kind`: `"some"`; `node`: `Node`; `value`: `unknown`; \}

Extracts the value of a JSX attribute by name

## Parameters

### context

`RuleContext`

ESLint rule context

### node

JSX attribute or spread attribute node

`JSXAttribute` | `JSXSpreadAttribute`

### name

`string`

Name of the attribute to extract

## Returns

\{ `initialScope`: `undefined` \| `Scope`; `kind`: `"none"`; `node`: `Node`; \} \| \{ `initialScope`: `undefined` \| `Scope`; `kind`: `"some"`; `node`: `Node`; `value`: `unknown`; \}

The extracted attribute value in a structured format

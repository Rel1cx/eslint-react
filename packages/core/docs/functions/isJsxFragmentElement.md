[**@eslint-react/core**](../README.md)

***

[@eslint-react/core](../README.md) / isJsxFragmentElement

# Function: isJsxFragmentElement()

> **isJsxFragmentElement**(`context`, `node`): `node is JSXElement`

Determines if a JSX element is a React Fragment
Fragments can be imported from React and used like <Fragment> or <React.Fragment>

## Parameters

### context

`RuleContext`

ESLint rule context

### node

`Node`

AST node to check

## Returns

`node is JSXElement`

boolean indicating if the element is a Fragment with type narrowing

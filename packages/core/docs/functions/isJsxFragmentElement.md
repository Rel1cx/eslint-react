[@eslint-react/core](../README.md) / isJsxFragmentElement

# Function: isJsxFragmentElement()

```ts
function isJsxFragmentElement(context: RuleContext, node: Node): node is JSXElement;
```

Determines if a JSX element is a React Fragment
Fragments can be imported from React and used like <Fragment> or <React.Fragment>

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `context` | `RuleContext` | ESLint rule context |
| `node` | `Node` | AST node to check |

## Returns

`node is JSXElement`

boolean indicating if the element is a Fragment with type narrowing

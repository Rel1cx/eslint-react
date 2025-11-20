[@eslint-react/core](../README.md) / isJsxHostElement

# Function: isJsxHostElement()

```ts
function isJsxHostElement(context: RuleContext, node: Node): boolean;
```

Determines if a JSX element is a host element
Host elements in React start with lowercase letters (e.g., div, span)

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `context` | `RuleContext` | ESLint rule context |
| `node` | `Node` | AST node to check |

## Returns

`boolean`

boolean indicating if the element is a host element

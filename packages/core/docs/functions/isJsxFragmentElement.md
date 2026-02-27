[@eslint-react/core](../README.md) / isJsxFragmentElement

# Function: isJsxFragmentElement()

```ts
function isJsxFragmentElement(
   context: RuleContext, 
   node: Node, 
   jsxConfig?: Pick<JsxConfig, "jsxFragmentFactory">): boolean;
```

Determine if a JSX element is a React Fragment
Fragments can be imported from React and used like <Fragment> or <React.Fragment>

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `context` | `RuleContext` | ESLint rule context |
| `node` | `Node` | AST node to check |
| `jsxConfig?` | [`Pick`](https://www.typescriptlang.org/docs/handbook/utility-types.html#picktype-keys)\<[`JsxConfig`](../interfaces/JsxConfig.md), `"jsxFragmentFactory"`\> | Optional JSX configuration |

## Returns

`boolean`

boolean indicating if the element is a Fragment

[@eslint-react/jsx](../README.md) / isFragmentElement

# Function: isFragmentElement()

```ts
function isFragmentElement(node: Node, jsxFragmentFactory: string): node is TSESTreeJSXElementLike;
```

Check if the node is a React Fragment element.

Recognizes both the shorthand `<>...</>` syntax (`JSXFragment`) and the explicit
`<Fragment>` / `<React.Fragment>` form (`JSXElement`). The comparison is performed
against the self name (last dot-separated segment) of both the node and the
configured factory, so `<React.Fragment>` matches `"React.Fragment"` and
`<Fragment>` matches `"Fragment"`.

The factory is a required parameter (no implicit `"React.Fragment"` default) so
that callers always pass the project-configured pragma — see `getJsxConfig` in
`@eslint-react/core` — and cannot silently use the wrong factory under a custom
JSX runtime (ex: Preact). Note the self-name comparison is a heuristic: any
`<*.Fragment>` member expression matches, regardless of the qualifier.

## Parameters

| Parameter            | Type     | Description                                                    |
| -------------------- | -------- | -------------------------------------------------------------- |
| `node`               | `Node`   | The node to check.                                             |
| `jsxFragmentFactory` | `string` | The configured fragment factory string (ex: "React.Fragment"). |

## Returns

`node is TSESTreeJSXElementLike`

`true` if the node represents a React Fragment.

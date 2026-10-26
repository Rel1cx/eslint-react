[@eslint-react/jsx](../README.md) / isFragmentElement

# Function: isFragmentElement()

```ts
function isFragmentElement(node: Node | null | undefined, jsxFragmentFactory: string): node is TSESTreeJSXElementLike;
```

Check if the node is a React Fragment element.

Recognizes the shorthand `<>...</>` syntax (`JSXFragment`) and the explicit
`<Fragment>` / `<React.Fragment>` form (`JSXElement`). Matching compares only
the last dot-separated segment, so with the usual `"React.Fragment"` factory
both `<React.Fragment>` and `<Fragment>` match.

The factory is a required parameter (no implicit `"React.Fragment"` default) so
that callers always pass the project-configured pragma — see `getJSXConfig` in
`@eslint-react/core` — and cannot silently use the wrong factory under a custom
JSX runtime (ex: Preact). Note the self-name comparison is a heuristic: any
`<*.Fragment>` member expression matches, regardless of the qualifier.

## Parameters

| Parameter            | Type                            | Description                                                                                                     |
| -------------------- | ------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `node`               | `Node` \| `null` \| `undefined` | The node to check.                                                                                              |
| `jsxFragmentFactory` | `string`                        | The configured fragment factory string (ex: "React.Fragment"); only its last dot-separated segment is compared. |

## Returns

`node is TSESTreeJSXElementLike`

`true` if the node is a `JSXFragment` or its element type's self name matches the configured fragment self name.

[@eslint-react/jsx](../README.md) / isFragmentElement

# Function: isFragmentElement()

```ts
function isFragmentElement(node: Node, jsxFragmentFactory?: string): node is TSESTreeJSXElementLike;
```

Check whether a node is a React **Fragment** element.

Recognises both the shorthand `<>…</>` syntax (`JSXFragment`) and the
explicit `<Fragment>` / `<React.Fragment>` form (`JSXElement`).

The comparison is performed against the **self name** (last dot‑separated
segment) of both the node and the configured factory, so
`<React.Fragment>` matches `"React.Fragment"` and `<Fragment>` matches
`"Fragment"`.

## Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `node` | `Node` | `undefined` | The AST node to test. |
| `jsxFragmentFactory` | `string` | `"React.Fragment"` | The configured fragment factory string (e.g. `"React.Fragment"`). Defaults to `"React.Fragment"`. |

## Returns

`node is TSESTreeJSXElementLike`

`true` when the node represents a React Fragment.

## Example

```ts
// Using the default factory
if (isFragmentElement(node)) { … }

// With a custom factory from jsxConfig
const config = getJsxConfig(context);
if (isFragmentElement(node, config.jsxFragmentFactory)) { … }
```

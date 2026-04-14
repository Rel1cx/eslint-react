[@eslint-react/jsx](../README.md) / ElementTest

# Type Alias: ElementTest

```ts
type ElementTest = 
  | string
  | readonly string[]
  | ((elementType: string, node: TSESTreeJSXElementLike) => boolean);
```

A test that determines whether a JSX element matches.

- `string`     — matches against the full element type (e.g. `"div"`,
                 `"React.Fragment"`)
- `string[]`   — matches when the element type equals **any** of the
                 given strings
- `function`   — receives the element type string and returns a boolean

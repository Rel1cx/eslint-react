[@eslint-react/jsx](../README.md) / ElementTest

# Type Alias: ElementTest

```ts
type ElementTest =
  | string
  | readonly string[]
  | ((elementType: string, node: TSESTreeJSXElementLike) => boolean);
```

A test that determines whether a JSX element or fragment matches.

- `string` matches the full element type (ex: "div", "React.Fragment"; a
  fragment has type `""`)
- `readonly string[]` matches when the full element type equals any entry
- `function` receives the full element type string and the element or fragment node.

The function form receives `(elementType, node)`; this order is intentional:
the element type is the primary subject of the test.

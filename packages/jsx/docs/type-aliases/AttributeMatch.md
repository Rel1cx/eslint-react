[@eslint-react/jsx](../README.md) / AttributeMatch

# Type Alias: AttributeMatch

```ts
type AttributeMatch =
  | {
    attribute: TSESTree.JSXAttribute;
    kind: "plain";
  }
  | {
    attribute: TSESTree.JSXSpreadAttribute;
    kind: "spread";
    property: TSESTree.Property;
  };
```

The result of looking up an attribute by name.

A `plain` match is a direct `JSXAttribute`. A `spread` match is a
`JSXSpreadAttribute` whose argument provides the name; `property` is the
object property that supplies it (possibly through nested spreads).

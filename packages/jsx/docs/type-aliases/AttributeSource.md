[@eslint-react/jsx](../README.md) / AttributeSource

# Type Alias: AttributeSource

```ts
type AttributeSource =
  | {
    kind: "jsx";
    node: TSESTree.JSXAttribute;
  }
  | {
    kind: "jsxSpread";
    node: TSESTree.JSXSpreadAttribute;
    property: TSESTree.Property;
  }
  | {
    kind: "property";
    node: TSESTree.Property;
  };
```

Where an authored attribute comes from, independent of its value's syntax.

For JSX spreads, `node` is the spread at the use site and `property` is the
resolved object property, which may be declared elsewhere. A `property` source
describes a props object entry, such as a `createElement` config property.

[@eslint-react/jsx](../README.md) / AttributeTest

# Type Alias: AttributeTest

```ts
type AttributeTest = string | ((attribute: TSESTree.JSXAttribute) => boolean);
```

A test used to select a `JSXAttribute`.

A string is matched against the full attribute name (including a namespace);
a function receives the attribute node.

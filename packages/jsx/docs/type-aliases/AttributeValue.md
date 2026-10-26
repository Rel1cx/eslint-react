[@eslint-react/jsx](../README.md) / AttributeValue

# Type Alias: AttributeValue

```ts
type AttributeValue =
  | {
    attribute: TSESTree.JSXAttribute;
    kind: "boolean";
    node: null;
  }
  | {
    attribute: TSESTree.JSXAttribute;
    kind: "literal";
    node: TSESTree.Literal;
  }
  | {
    attribute: TSESTree.JSXAttribute;
    kind: "unknown";
    node: TSESTree.Expression;
  }
  | {
    attribute: TSESTree.JSXAttribute;
    kind: "element";
    node: TSESTreeJSXElementLike;
  }
  | {
    attribute: TSESTree.JSXAttribute;
    kind: "missing";
    node: TSESTree.JSXEmptyExpression;
  }
  | {
    attribute: TSESTree.JSXAttribute;
    kind: "spreadChild";
    node: TSESTree.JSXSpreadChild;
  }
  | {
    attribute: TSESTree.JSXSpreadAttribute;
    kind: "spreadProps";
  };
```

The structural value of an attribute.

Direct attributes carry the source `attribute` and, when it exists, the value
node. The `spreadProps` variant only records the spread attribute itself: its
properties and values are not resolved. This is plain data; use
[resolveAttributeStaticValue](../functions/resolveAttributeStaticValue.md) to collapse direct values to a plain
JavaScript value.

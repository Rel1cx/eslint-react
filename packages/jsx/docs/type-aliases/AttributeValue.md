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
    property: TSESTree.Property | null;
  };
```

The structural value of an attribute.

Plain attribute variants carry the source `attribute` and the value node.
The `spreadProps` variant does not carry a `node`: the value is supplied by
`property` (when known), and the spread source is `attribute.argument`.

This is plain data; use [resolveAttributeStaticValue](../functions/resolveAttributeStaticValue.md) to collapse it to
a plain JavaScript value.

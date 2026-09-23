[@eslint-react/jsx](../README.md) / AttributeValue

# Type Alias: AttributeValue

```ts
type AttributeValue =
  | {
    kind: "boolean";
    node: null;
  }
  | {
    kind: "literal";
    node: TSESTree.Literal;
  }
  | {
    kind: "expression";
    node: TSESTree.Expression;
  }
  | {
    kind: "element";
    node: TSESTree.JSXElement;
  }
  | {
    kind: "fragment";
    node: TSESTree.JSXFragment;
  }
  | {
    kind: "empty";
    node: TSESTree.JSXEmptyExpression;
  }
  | {
    kind: "spreadChild";
    node: TSESTree.JSXSpreadChild;
  };
```

The syntax of a single attribute value, independent of its source and static evaluation.

`node` is the actual value node, with expression containers and spread properties
unwrapped. Equivalent values have the same `kind` whether written directly,
inside braces, or in a props object. Source information belongs to
[AttributeDescriptor](../interfaces/AttributeDescriptor.md), not to the value.

Boolean shorthand has no value node. An `empty` value is a present attribute
with an empty expression container, not an absent attribute. Use
[evaluateAttributeValue](../functions/evaluateAttributeValue.md) to attempt static evaluation.

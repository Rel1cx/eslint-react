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
  };
```

The structural value of a direct JSX attribute.

- `boolean`: the attribute has no value (ex: `<input disabled />`).
- `literal`: the value is a literal.
- `unknown`: a non-empty expression, normally in an expression container; the expression is not evaluated.
- `element`: the value is a JSX element or fragment.
- `missing`: no expression, normally an empty expression container
  (`{}` or `{/* comment */}`).

Every variant carries the source `attribute`; `node` is `null` only for the
`boolean` kind. This is plain data; use [getAttributeStaticValue](../functions/getAttributeStaticValue.md) to
collapse values to a plain JavaScript value.

## Remarks

The `spreadChild` variant is omitted because it is not valid in attribute
value position and is not produced by current parsers. The `spreadProps`
variant is omitted because spread props are not resolved and direct attribute
lookup never produces a spread descriptor.

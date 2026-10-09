[@eslint-react/jsx](../README.md) / AttributeValue

# Type Alias: AttributeValue

```ts
type AttributeValue =
  | {
    kind: "boolean";
    node: null;
    toStatic: true;
  }
  | {
    kind: "literal";
    node: TSESTree.Literal;
    toStatic:
      | string
      | number
      | bigint
      | boolean
      | RegExp
      | null;
  }
  | {
    kind: "unknown";
    node: TSESTree.Expression;
    toStatic: unknown;
  }
  | {
    kind: "element";
    node: TSESTree.JSXElement;
    toStatic: undefined;
  }
  | {
    kind: "missing";
    node: TSESTree.JSXEmptyExpression;
    toStatic: undefined;
  }
  | {
    kind: "spreadChild";
    node: TSESTree.JSXSpreadChild;
    toStatic: undefined;
  }
  | {
    kind: "spreadProps";
    node: TSESTree.JSXSpreadAttribute["argument"];
    getProperty: unknown;
    toStatic: unknown;
  };
```

Discriminated union representing the resolved value of a JSX attribute.

Each variant carries the original AST `node` (the `boolean` variant has no value
node and reports `null`) and a `toStatic()` helper that attempts to collapse the
value into a plain JavaScript value at analysis time. `toStatic()` returns
`undefined` when no static value is available; structural information is carried
by `kind`, value information by `toStatic()`.

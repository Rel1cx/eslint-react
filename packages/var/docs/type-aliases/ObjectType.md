[@eslint-react/var](../README.md) / ObjectType

# Type Alias: ObjectType

```ts
type ObjectType =
  | {
    kind: "jsx";
    node: TSESTree.JSXElement | TSESTree.JSXFragment;
    via: "jsx";
  }
  | {
    kind: "array";
    node: TSESTree.ArrayExpression | TSESTree.CallExpression;
    via: "literal" | "call";
  }
  | {
    kind: "plain";
    node: TSESTree.ObjectExpression | TSESTree.CallExpression;
    via: "literal" | "call";
  }
  | {
    kind: "class";
    node: TSESTree.ClassDeclaration | TSESTree.ClassExpression;
    via: "declaration" | "expression";
  }
  | {
    kind: "instance";
    node: TSESTree.NewExpression | TSESTree.ThisExpression;
    via: "new" | "this";
  }
  | {
    kind: "function";
    node:
      | TSESTree.FunctionDeclaration
      | TSESTree.FunctionExpression
      | TSESTree.ArrowFunctionExpression;
    via: "declaration" | "expression" | "arrow";
  }
  | {
    kind: "regexp";
    node: TSESTree.RegExpLiteral | TSESTree.CallExpression;
    via: "literal" | "call";
  }
  | {
    kind: "unknown";
    node: TSESTree.Node;
    reason: "call-expression";
  };
```

Represents the type classification of an object node.

`via` records how a known kind was constructed (a literal, a call, a
declaration, ...), so consumers can distinguish e.g. `[]` from `Array()`
without inspecting `node.type`. `unknown` carries a typed `reason` instead.

## Union Members

### Type Literal

```ts
{
  kind: "jsx";
  node: TSESTree.JSXElement | TSESTree.JSXFragment;
  via: "jsx";
}
```

---

### Type Literal

```ts
{
  kind: "array";
  node: TSESTree.ArrayExpression | TSESTree.CallExpression;
  via: "literal" | "call";
}
```

---

### Type Literal

```ts
{
  kind: "plain";
  node: TSESTree.ObjectExpression | TSESTree.CallExpression;
  via: "literal" | "call";
}
```

---

### Type Literal

```ts
{
  kind: "class";
  node: TSESTree.ClassDeclaration | TSESTree.ClassExpression;
  via: "declaration" | "expression";
}
```

---

### Type Literal

```ts
{
  kind: "instance";
  node: TSESTree.NewExpression | TSESTree.ThisExpression;
  via: "new" | "this";
}
```

---

### Type Literal

```ts
{
  kind: "function";
  node:   | TSESTree.FunctionDeclaration
     | TSESTree.FunctionExpression
     | TSESTree.ArrowFunctionExpression;
  via: "declaration" | "expression" | "arrow";
}
```

---

### Type Literal

```ts
{
  kind: "regexp";
  node: TSESTree.RegExpLiteral | TSESTree.CallExpression;
  via: "literal" | "call";
}
```

---

### Type Literal

```ts
{
  kind: "unknown";
  node: TSESTree.Node;
  reason: "call-expression";
}
```

| Name     | Type                | Description                           |
| -------- | ------------------- | ------------------------------------- |
| `kind`   | `"unknown"`         | -                                     |
| `node`   | `TSESTree.Node`     | -                                     |
| `reason` | `"call-expression"` | Why the node could not be classified. |

[@eslint-react/var](../README.md) / ObjectType

# Type Alias: ObjectType

```ts
type ObjectType = 
  | {
  kind: "jsx";
  node: TSESTree.JSXElement | TSESTree.JSXFragment;
}
  | {
  kind: "array";
  node: TSESTree.ArrayExpression | TSESTree.CallExpression;
}
  | {
  kind: "plain";
  node: TSESTree.ObjectExpression | TSESTree.CallExpression;
}
  | {
  kind: "class";
  node: TSESTree.ClassExpression;
}
  | {
  kind: "instance";
  node: TSESTree.NewExpression | TSESTree.ThisExpression;
}
  | {
  kind: "function";
  node:   | TSESTree.FunctionDeclaration
     | TSESTree.FunctionExpression
     | TSESTree.ArrowFunctionExpression;
}
  | {
  kind: "regexp";
  node: TSESTree.RegExpLiteral | TSESTree.CallExpression;
}
  | {
  kind: "unknown";
  node: TSESTree.Node;
  reason?: string;
};
```

Represents the type classification of an object node

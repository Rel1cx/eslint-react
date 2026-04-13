[@eslint-react/core](../README.md) / FunctionInitPath

# Type Alias: FunctionInitPath

```ts
type FunctionInitPath = 
  | readonly [TSESTree.FunctionDeclaration]
  | readonly [TSESTree.VariableDeclaration, TSESTree.VariableDeclarator, FunctionExpression]
  | readonly [TSESTree.VariableDeclaration, TSESTree.VariableDeclarator, TSESTree.CallExpression, FunctionExpression]
  | readonly [TSESTree.VariableDeclaration, TSESTree.VariableDeclarator, TSESTree.CallExpression, TSESTree.CallExpression, FunctionExpression]
  | readonly [TSESTree.VariableDeclaration, TSESTree.VariableDeclarator, TSESTree.ObjectExpression, TSESTree.Property, FunctionExpression]
  | readonly [TSESTree.VariableDeclaration, TSESTree.VariableDeclarator, TSESTree.ObjectExpression, TSESTree.Property, TSESTree.CallExpression, FunctionExpression]
  | readonly [TSESTree.VariableDeclaration, TSESTree.VariableDeclarator, TSESTree.ObjectExpression, TSESTree.Property, TSESTree.CallExpression, TSESTree.CallExpression, FunctionExpression]
  | readonly [TSESTree.ClassDeclaration | TSESTree.ClassExpression, TSESTree.ClassBody, TSESTree.MethodDefinition, FunctionExpression]
  | readonly [TSESTree.ClassDeclaration | TSESTree.ClassExpression, TSESTree.ClassBody, TSESTree.PropertyDefinition, FunctionExpression];
```

Represents various AST paths for function declarations.
Each tuple type represents a specific function definition pattern.

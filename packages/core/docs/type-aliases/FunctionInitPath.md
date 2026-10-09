[@eslint-react/core](../README.md) / FunctionInitPath

# Type Alias: FunctionInitPath

```ts
type FunctionInitPath = 
  | readonly [TSESTree.FunctionDeclaration]
  | readonly [TSESTree.VariableDeclaration, TSESTree.VariableDeclarator, TSESTreeFunction]
  | readonly [TSESTree.VariableDeclaration, TSESTree.VariableDeclarator, TSESTree.CallExpression, TSESTreeFunction]
  | readonly [TSESTree.VariableDeclaration, TSESTree.VariableDeclarator, TSESTree.CallExpression, TSESTree.CallExpression, TSESTreeFunction]
  | readonly [TSESTree.VariableDeclaration, TSESTree.VariableDeclarator, TSESTree.ObjectExpression, TSESTree.Property, TSESTreeFunction]
  | readonly [TSESTree.VariableDeclaration, TSESTree.VariableDeclarator, TSESTree.ObjectExpression, TSESTree.Property, TSESTree.CallExpression, TSESTreeFunction]
  | readonly [TSESTree.VariableDeclaration, TSESTree.VariableDeclarator, TSESTree.ObjectExpression, TSESTree.Property, TSESTree.CallExpression, TSESTree.CallExpression, TSESTreeFunction]
  | readonly [TSESTree.ClassDeclaration | TSESTree.ClassExpression, TSESTree.ClassBody, TSESTree.MethodDefinition, TSESTreeFunction]
  | readonly [TSESTree.ClassDeclaration | TSESTree.ClassExpression, TSESTree.ClassBody, TSESTree.PropertyDefinition, TSESTreeFunction];
```

Represents various AST paths for function declarations.
Each tuple type represents a specific function definition pattern.

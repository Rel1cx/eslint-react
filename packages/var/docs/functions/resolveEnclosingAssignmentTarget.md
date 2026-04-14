[@eslint-react/var](../README.md) / resolveEnclosingAssignmentTarget

# Function: resolveEnclosingAssignmentTarget()

```ts
function resolveEnclosingAssignmentTarget(node: Node): 
  | Identifier
  | ArrayExpression
  | ArrayPattern
  | ArrowFunctionExpression
  | AssignmentExpression
  | AwaitExpression
  | PrivateInExpression
  | SymmetricBinaryExpression
  | CallExpression
  | ChainExpression
  | ClassDeclarationWithOptionalName
  | ClassExpression
  | ConditionalExpression
  | FunctionDeclarationWithName
  | FunctionDeclarationWithOptionalName
  | FunctionExpression
  | ImportExpression
  | JSXElement
  | JSXFragment
  | BigIntLiteral
  | BooleanLiteral
  | NullLiteral
  | NumberLiteral
  | RegExpLiteral
  | StringLiteral
  | LogicalExpression
  | MemberExpressionComputedName
  | MemberExpressionNonComputedName
  | MetaProperty
  | NewExpression
  | ObjectExpression
  | ObjectPattern
  | PrivateIdentifier
  | SequenceExpression
  | Super
  | TaggedTemplateExpression
  | TemplateLiteral
  | ThisExpression
  | TSAsExpression
  | TSDeclareFunctionNoDeclare
  | TSDeclareFunctionWithDeclare
  | TSEnumDeclaration
  | TSInstantiationExpression
  | TSInterfaceDeclaration
  | TSModuleDeclarationGlobal
  | TSModuleDeclarationModuleWithIdentifierId
  | TSModuleDeclarationModuleWithStringIdDeclared
  | TSModuleDeclarationModuleWithStringIdNotDeclared
  | TSModuleDeclarationNamespace
  | TSNonNullExpression
  | TSSatisfiesExpression
  | TSTypeAliasDeclaration
  | TSTypeAssertion
  | UnaryExpressionBitwiseNot
  | UnaryExpressionDelete
  | UnaryExpressionMinus
  | UnaryExpressionNot
  | UnaryExpressionPlus
  | UnaryExpressionTypeof
  | UnaryExpressionVoid
  | UpdateExpression
  | ConstDeclaration
  | LetOrVarDeclaredDeclaration
  | LetOrVarNonDeclaredDeclaration
  | UsingInForOfDeclaration
  | UsingInNormalContextDeclaration
  | YieldExpression
  | null;
```

Finds the enclosing assignment target (variable, property, etc.) for a given node

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `node` | `Node` | The starting node |

## Returns

  \| `Identifier`
  \| `ArrayExpression`
  \| `ArrayPattern`
  \| `ArrowFunctionExpression`
  \| `AssignmentExpression`
  \| `AwaitExpression`
  \| `PrivateInExpression`
  \| `SymmetricBinaryExpression`
  \| `CallExpression`
  \| `ChainExpression`
  \| `ClassDeclarationWithOptionalName`
  \| `ClassExpression`
  \| `ConditionalExpression`
  \| `FunctionDeclarationWithName`
  \| `FunctionDeclarationWithOptionalName`
  \| `FunctionExpression`
  \| `ImportExpression`
  \| `JSXElement`
  \| `JSXFragment`
  \| `BigIntLiteral`
  \| `BooleanLiteral`
  \| `NullLiteral`
  \| `NumberLiteral`
  \| `RegExpLiteral`
  \| `StringLiteral`
  \| `LogicalExpression`
  \| `MemberExpressionComputedName`
  \| `MemberExpressionNonComputedName`
  \| `MetaProperty`
  \| `NewExpression`
  \| `ObjectExpression`
  \| `ObjectPattern`
  \| `PrivateIdentifier`
  \| `SequenceExpression`
  \| `Super`
  \| `TaggedTemplateExpression`
  \| `TemplateLiteral`
  \| `ThisExpression`
  \| `TSAsExpression`
  \| `TSDeclareFunctionNoDeclare`
  \| `TSDeclareFunctionWithDeclare`
  \| `TSEnumDeclaration`
  \| `TSInstantiationExpression`
  \| `TSInterfaceDeclaration`
  \| `TSModuleDeclarationGlobal`
  \| `TSModuleDeclarationModuleWithIdentifierId`
  \| `TSModuleDeclarationModuleWithStringIdDeclared`
  \| `TSModuleDeclarationModuleWithStringIdNotDeclared`
  \| `TSModuleDeclarationNamespace`
  \| `TSNonNullExpression`
  \| `TSSatisfiesExpression`
  \| `TSTypeAliasDeclaration`
  \| `TSTypeAssertion`
  \| `UnaryExpressionBitwiseNot`
  \| `UnaryExpressionDelete`
  \| `UnaryExpressionMinus`
  \| `UnaryExpressionNot`
  \| `UnaryExpressionPlus`
  \| `UnaryExpressionTypeof`
  \| `UnaryExpressionVoid`
  \| `UpdateExpression`
  \| `ConstDeclaration`
  \| `LetOrVarDeclaredDeclaration`
  \| `LetOrVarNonDeclaredDeclaration`
  \| `UsingInForOfDeclaration`
  \| `UsingInNormalContextDeclaration`
  \| `YieldExpression`
  \| `null`

The enclosing assignment target node, or null if not found

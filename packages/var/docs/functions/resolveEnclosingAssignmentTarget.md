[@eslint-react/var](../README.md) / resolveEnclosingAssignmentTarget

# Function: resolveEnclosingAssignmentTarget()

```ts
function resolveEnclosingAssignmentTarget(node: Node):
  | ArrayExpression
  | ArrayPattern
  | ArrowFunctionExpressionWithBlockBody
  | ArrowFunctionExpressionWithExpressionBody
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
  | Identifier
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
  | YieldNoStarExpression
  | YieldStarExpression
  | null;
```

Resolve the enclosing assignment target (variable, property, etc.) of a node.

## Parameters

| Parameter | Type   | Description        |
| --------- | ------ | ------------------ |
| `node`    | `Node` | The starting node. |

## Returns

\| `ArrayExpression`
\| `ArrayPattern`
\| `ArrowFunctionExpressionWithBlockBody`
\| `ArrowFunctionExpressionWithExpressionBody`
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
\| `Identifier`
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
\| `YieldNoStarExpression`
\| `YieldStarExpression`
\| `null`

The enclosing assignment target node, or `null` if not found.

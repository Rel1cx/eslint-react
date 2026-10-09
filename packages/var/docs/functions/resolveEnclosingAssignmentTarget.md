[@eslint-react/var](../README.md) / resolveEnclosingAssignmentTarget

# Function: resolveEnclosingAssignmentTarget()

```ts
function resolveEnclosingAssignmentTarget(node: Node):
  | FunctionDeclarationWithName
  | TSDeclareFunctionNoDeclare
  | TSDeclareFunctionWithDeclare
  | TSEnumDeclaration
  | TSInterfaceDeclaration
  | TSModuleDeclarationGlobal
  | TSModuleDeclarationModuleWithIdentifierId
  | TSModuleDeclarationModuleWithStringIdDeclared
  | TSModuleDeclarationModuleWithStringIdNotDeclared
  | TSModuleDeclarationNamespace
  | TSTypeAliasDeclaration
  | ConstDeclaration
  | LetOrVarDeclaredDeclaration
  | LetOrVarNonDeclaredDeclaration
  | UsingInForOfDeclaration
  | UsingInNormalContextDeclaration
  | StringLiteral
  | Identifier
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
  | TSInstantiationExpression
  | TSNonNullExpression
  | TSSatisfiesExpression
  | TSTypeAssertion
  | UnaryExpressionBitwiseNot
  | UnaryExpressionDelete
  | UnaryExpressionMinus
  | UnaryExpressionNot
  | UnaryExpressionPlus
  | UnaryExpressionTypeof
  | UnaryExpressionVoid
  | UpdateExpression
  | YieldNoStarExpression
  | YieldStarExpression
  | null;
```

Resolve the enclosing assignment target (variable, property, etc.) of the node.

## Parameters

| Parameter | Type   | Description                              |
| --------- | ------ | ---------------------------------------- |
| `node`    | `Node` | The starting node for the upward search. |

## Returns

\| `FunctionDeclarationWithName`
\| `TSDeclareFunctionNoDeclare`
\| `TSDeclareFunctionWithDeclare`
\| `TSEnumDeclaration`
\| `TSInterfaceDeclaration`
\| `TSModuleDeclarationGlobal`
\| `TSModuleDeclarationModuleWithIdentifierId`
\| `TSModuleDeclarationModuleWithStringIdDeclared`
\| `TSModuleDeclarationModuleWithStringIdNotDeclared`
\| `TSModuleDeclarationNamespace`
\| `TSTypeAliasDeclaration`
\| `ConstDeclaration`
\| `LetOrVarDeclaredDeclaration`
\| `LetOrVarNonDeclaredDeclaration`
\| `UsingInForOfDeclaration`
\| `UsingInNormalContextDeclaration`
\| `StringLiteral`
\| `Identifier`
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
\| `TSInstantiationExpression`
\| `TSNonNullExpression`
\| `TSSatisfiesExpression`
\| `TSTypeAssertion`
\| `UnaryExpressionBitwiseNot`
\| `UnaryExpressionDelete`
\| `UnaryExpressionMinus`
\| `UnaryExpressionNot`
\| `UnaryExpressionPlus`
\| `UnaryExpressionTypeof`
\| `UnaryExpressionVoid`
\| `UpdateExpression`
\| `YieldNoStarExpression`
\| `YieldStarExpression`
\| `null`

The enclosing assignment target node, or `null` when not found.

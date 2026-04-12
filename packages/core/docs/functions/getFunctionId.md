[@eslint-react/core](../README.md) / getFunctionId

# Function: getFunctionId()

```ts
function getFunctionId(node: 
  | ArrayExpression
  | ArrayPattern
  | ArrowFunctionExpression
  | AssignmentExpression
  | AwaitExpression
  | PrivateInExpression
  | SymmetricBinaryExpression
  | CallExpression
  | ChainExpression
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
  | YieldExpression): 
  | ArrayExpression
  | ArrayPattern
  | ArrowFunctionExpression
  | AssignmentExpression
  | AwaitExpression
  | PrivateInExpression
  | SymmetricBinaryExpression
  | CallExpression
  | ChainExpression
  | ClassExpression
  | ConditionalExpression
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
  | YieldExpression
  | null;
```

Gets the static identifier of a function AST node.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `node` | \| `ArrayExpression` \| `ArrayPattern` \| `ArrowFunctionExpression` \| `AssignmentExpression` \| `AwaitExpression` \| `PrivateInExpression` \| `SymmetricBinaryExpression` \| `CallExpression` \| `ChainExpression` \| `ClassExpression` \| `ConditionalExpression` \| `FunctionDeclarationWithName` \| `FunctionDeclarationWithOptionalName` \| `FunctionExpression` \| `Identifier` \| `ImportExpression` \| `JSXElement` \| `JSXFragment` \| `BigIntLiteral` \| `BooleanLiteral` \| `NullLiteral` \| `NumberLiteral` \| `RegExpLiteral` \| `StringLiteral` \| `LogicalExpression` \| `MemberExpressionComputedName` \| `MemberExpressionNonComputedName` \| `MetaProperty` \| `NewExpression` \| `ObjectExpression` \| `ObjectPattern` \| `SequenceExpression` \| `Super` \| `TaggedTemplateExpression` \| `TemplateLiteral` \| `ThisExpression` \| `TSAsExpression` \| `TSInstantiationExpression` \| `TSNonNullExpression` \| `TSSatisfiesExpression` \| `TSTypeAssertion` \| `UnaryExpressionBitwiseNot` \| `UnaryExpressionDelete` \| `UnaryExpressionMinus` \| `UnaryExpressionNot` \| `UnaryExpressionPlus` \| `UnaryExpressionTypeof` \| `UnaryExpressionVoid` \| `UpdateExpression` \| `YieldExpression` | The function node to analyze. |

## Returns

  \| `ArrayExpression`
  \| `ArrayPattern`
  \| `ArrowFunctionExpression`
  \| `AssignmentExpression`
  \| `AwaitExpression`
  \| `PrivateInExpression`
  \| `SymmetricBinaryExpression`
  \| `CallExpression`
  \| `ChainExpression`
  \| `ClassExpression`
  \| `ConditionalExpression`
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
  \| `YieldExpression`
  \| `null`

The identifier node if found, `null` otherwise.

## Remarks

For function declarations this is straightforward. For anonymous function
expressions it is more complex. This function roughly detects the same AST
nodes as the ECMAScript spec's `IsAnonymousFunctionDefinition()` with some
exceptions to better fit our use case.

Ported from [RulesOfHooks.ts](https://github.com/facebook/react/blob/bb8a76c6cc77ea2976d690ea09f5a1b3d9b1792a/packages/eslint-plugin-react-hooks/src/rules/RulesOfHooks.ts#L860)

[@eslint-react/core](../README.md) / getFunctionComponentId

# Function: getFunctionComponentId()

```ts
function getFunctionComponentId(context: RuleContext, node: TSESTreeFunction): 
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
  | undefined;
```

Get function component identifier from `const Component = memo(() => {});`

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `context` | `RuleContext` | The rule context |
| `node` | `TSESTreeFunction` | The function node to analyze |

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
  \| `undefined`

The function identifier or `unit` if not found

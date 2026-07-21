[@eslint-react/ast](../../../../README.md) / [Check](../README.md) / isExpression

# Variable: isExpression

```ts
const isExpression: (
  node: Node | null | undefined,
) => node is
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
  | YieldStarExpression;
```

Check if a node is an expression node.

## Parameters

| Parameter | Type                            |
| --------- | ------------------------------- |
| `node`    | `Node` \| `null` \| `undefined` |

## Returns

node is ArrayExpression \| ArrayPattern \| ArrowFunctionExpressionWithBlockBody \| ArrowFunctionExpressionWithExpressionBody \| AssignmentExpression \| AwaitExpression \| PrivateInExpression \| SymmetricBinaryExpression \| CallExpression \| ChainExpression \| ClassExpression \| ConditionalExpression \| FunctionExpression \| Identifier \| ImportExpression \| JSXElement \| JSXFragment \| BigIntLiteral \| BooleanLiteral \| NullLiteral \| NumberLiteral \| RegExpLiteral \| StringLiteral \| LogicalExpression \| MemberExpressionComputedName \| MemberExpressionNonComputedName \| MetaProperty \| NewExpression \| ObjectExpression \| ObjectPattern \| SequenceExpression \| Super \| TaggedTemplateExpression \| TemplateLiteral \| ThisExpression \| TSAsExpression \| TSInstantiationExpression \| TSNonNullExpression \| TSSatisfiesExpression \| TSTypeAssertion \| UnaryExpressionBitwiseNot \| UnaryExpressionDelete \| UnaryExpressionMinus \| UnaryExpressionNot \| UnaryExpressionPlus \| UnaryExpressionTypeof \| UnaryExpressionVoid \| UpdateExpression \| YieldNoStarExpression \| YieldStarExpression

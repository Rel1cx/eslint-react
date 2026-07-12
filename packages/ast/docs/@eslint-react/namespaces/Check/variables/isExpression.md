[@eslint-react/ast](../../../../README.md) / [Check](../README.md) / isExpression

# Variable: isExpression

```ts
const isExpression: (
  node: Node | null | undefined,
) => node is
  | ArrowFunctionExpressionWithBlockBody
  | ArrowFunctionExpressionWithExpressionBody
  | FunctionExpression
  | ClassExpression
  | JSXElement
  | JSXFragment
  | StringLiteral
  | TSAsExpression
  | TSTypeAssertion
  | TSNonNullExpression
  | TSSatisfiesExpression
  | TSInstantiationExpression
  | ArrayExpression
  | ArrayPattern
  | AssignmentExpression
  | AwaitExpression
  | PrivateInExpression
  | SymmetricBinaryExpression
  | CallExpression
  | ChainExpression
  | ConditionalExpression
  | Identifier
  | ImportExpression
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
  | SequenceExpression
  | Super
  | TaggedTemplateExpression
  | TemplateLiteral
  | ThisExpression
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

## Parameters

| Parameter | Type                            |
| --------- | ------------------------------- |
| `node`    | `Node` \| `null` \| `undefined` |

## Returns

node is ArrowFunctionExpressionWithBlockBody \| ArrowFunctionExpressionWithExpressionBody \| FunctionExpression \| ClassExpression \| JSXElement \| JSXFragment \| StringLiteral \| TSAsExpression \| TSTypeAssertion \| TSNonNullExpression \| TSSatisfiesExpression \| TSInstantiationExpression \| ArrayExpression \| ArrayPattern \| AssignmentExpression \| AwaitExpression \| PrivateInExpression \| SymmetricBinaryExpression \| CallExpression \| ChainExpression \| ConditionalExpression \| Identifier \| ImportExpression \| BigIntLiteral \| BooleanLiteral \| NullLiteral \| NumberLiteral \| RegExpLiteral \| LogicalExpression \| MemberExpressionComputedName \| MemberExpressionNonComputedName \| MetaProperty \| NewExpression \| ObjectExpression \| ObjectPattern \| SequenceExpression \| Super \| TaggedTemplateExpression \| TemplateLiteral \| ThisExpression \| UnaryExpressionBitwiseNot \| UnaryExpressionDelete \| UnaryExpressionMinus \| UnaryExpressionNot \| UnaryExpressionPlus \| UnaryExpressionTypeof \| UnaryExpressionVoid \| UpdateExpression \| YieldNoStarExpression \| YieldStarExpression

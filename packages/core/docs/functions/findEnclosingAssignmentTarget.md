[@eslint-react/core](../README.md) / findEnclosingAssignmentTarget

# Function: findEnclosingAssignmentTarget()

```ts
function findEnclosingAssignmentTarget(node: Node): 
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

Finds the enclosing assignment target (variable, property, etc.) for a given node

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `node` | `Node` | The starting node |

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

The enclosing assignment target node, or undefined if not found

## Todo

Verify correctness and completeness of this function

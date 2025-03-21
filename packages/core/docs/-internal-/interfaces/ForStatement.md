[**@eslint-react/core**](../../README.md)

***

[@eslint-react/core](../../README.md) / [\<internal\>](../README.md) / ForStatement

# Interface: ForStatement

## Extends

- `BaseNode`

## Properties

### body

> **body**: [`Statement`](../type-aliases/Statement.md)

***

### init

> **init**: `null` \| [`Identifier`](Identifier.md) \| [`ArrayExpression`](ArrayExpression.md) \| [`ArrayPattern`](ArrayPattern.md) \| [`ArrowFunctionExpression`](ArrowFunctionExpression.md) \| [`AssignmentExpression`](AssignmentExpression.md) \| [`AwaitExpression`](AwaitExpression.md) \| [`BinaryExpression`](BinaryExpression.md) \| [`CallExpression`](CallExpression.md) \| [`ChainExpression`](ChainExpression.md) \| [`ClassExpression`](ClassExpression.md) \| [`ConditionalExpression`](ConditionalExpression.md) \| [`FunctionExpression`](FunctionExpression.md) \| [`ImportExpression`](ImportExpression.md) \| [`JSXElement`](JSXElement-1.md) \| [`JSXFragment`](JSXFragment-1.md) \| [`BigIntLiteral`](BigIntLiteral.md) \| [`BooleanLiteral`](BooleanLiteral.md) \| [`NullLiteral`](NullLiteral.md) \| [`NumberLiteral`](NumberLiteral.md) \| [`RegExpLiteral`](RegExpLiteral.md) \| [`StringLiteral`](StringLiteral.md) \| [`LogicalExpression`](LogicalExpression.md) \| [`MemberExpressionComputedName`](MemberExpressionComputedName.md) \| [`MemberExpressionNonComputedName`](MemberExpressionNonComputedName.md) \| [`MetaProperty`](MetaProperty.md) \| [`NewExpression`](NewExpression.md) \| [`ObjectExpression`](ObjectExpression.md) \| [`ObjectPattern`](ObjectPattern.md) \| [`SequenceExpression`](SequenceExpression.md) \| [`Super`](Super.md) \| [`TaggedTemplateExpression`](TaggedTemplateExpression.md) \| [`TemplateLiteral`](TemplateLiteral.md) \| [`ThisExpression`](ThisExpression.md) \| [`TSAsExpression`](TSAsExpression.md) \| [`TSInstantiationExpression`](TSInstantiationExpression.md) \| [`TSNonNullExpression`](TSNonNullExpression.md) \| [`TSSatisfiesExpression`](TSSatisfiesExpression.md) \| [`TSTypeAssertion`](TSTypeAssertion.md) \| [`UnaryExpression`](UnaryExpression.md) \| [`UpdateExpression`](UpdateExpression.md) \| [`ConstDeclaration`](ConstDeclaration.md) \| [`LetOrVarDeclaredDeclaration`](LetOrVarDeclaredDeclaration.md) \| [`LetOrVarNonDeclaredDeclaration`](LetOrVarNonDeclaredDeclaration.md) \| [`YieldExpression`](YieldExpression.md)

***

### loc

> **loc**: [`SourceLocation`](SourceLocation.md)

The source location information of the node.

The loc property is defined as nullable by ESTree, but ESLint requires this property.

#### Inherited from

`BaseNode.loc`

***

### parent

> **parent**: [`Node`](../type-aliases/Node.md)

#### Inherited from

`BaseNode.parent`

***

### range

> **range**: [`Range`](../type-aliases/Range.md)

#### Inherited from

`BaseNode.range`

***

### test

> **test**: `null` \| [`Expression`](../type-aliases/Expression.md)

***

### type

> **type**: [`ForStatement`](../README.md#forstatement)

#### Overrides

`BaseNode.type`

***

### update

> **update**: `null` \| [`Expression`](../type-aliases/Expression.md)

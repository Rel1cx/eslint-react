[@eslint-react/ast](../../../README.md) / View

# View

Experimental read-only node facades with unwrapping accessors.

## Classes

| Class                                                               | Description                                                             |
| ------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| [AssignmentExpressionView](classes/AssignmentExpressionView.md)     | View over an assignment expression.                                     |
| [AwaitExpressionView](classes/AwaitExpressionView.md)               | View over an await expression.                                          |
| [BinaryExpressionView](classes/BinaryExpressionView.md)             | View over a binary expression.                                          |
| [BinaryLikeView](classes/BinaryLikeView.md)                         | Base view over binary-like expressions sharing `left`/`right` operands. |
| [CallExpressionView](classes/CallExpressionView.md)                 | View over a call expression.                                            |
| [ConditionalExpressionView](classes/ConditionalExpressionView.md)   | View over a conditional expression.                                     |
| [ExpressionStatementView](classes/ExpressionStatementView.md)       | View over an expression statement.                                      |
| [JSXExpressionContainerView](classes/JSXExpressionContainerView.md) | View over a JSX expression container.                                   |
| [LogicalExpressionView](classes/LogicalExpressionView.md)           | View over a logical expression.                                         |
| [MemberExpressionView](classes/MemberExpressionView.md)             | View over a member expression.                                          |
| [NewExpressionView](classes/NewExpressionView.md)                   | View over a `new` expression.                                           |
| [NodeView](classes/NodeView.md)                                     | Experimental read-only facade over a `TSESTree` node.                   |
| [PropertyView](classes/PropertyView.md)                             | View over an object literal property.                                   |
| [ReturnStatementView](classes/ReturnStatementView.md)               | View over a return statement.                                           |
| [ThrowStatementView](classes/ThrowStatementView.md)                 | View over a throw statement.                                            |
| [UnaryExpressionView](classes/UnaryExpressionView.md)               | View over a unary expression.                                           |
| [VariableDeclaratorView](classes/VariableDeclaratorView.md)         | View over a variable declarator.                                        |

## Interfaces

| Interface                                        | Description                                                                                                                           |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------- |
| [NodeViewContext](interfaces/NodeViewContext.md) | The minimal context a view needs, structurally compatible with `RuleContext`. Only required by getters that fall back to source text. |

## Functions

| Function              | Description                                                                                            |
| --------------------- | ------------------------------------------------------------------------------------------------------ |
| [of](functions/of.md) | Create the most specific view for a node. Node types without a dedicated view get the base `NodeView`. |

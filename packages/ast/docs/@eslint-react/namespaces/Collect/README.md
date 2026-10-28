[@eslint-react/ast](../../../README.md) / Collect

# Collect

Helpers for collecting `TSESTree` nodes.

## Variables

| Variable                                              | Description                                               |
| ----------------------------------------------------- | --------------------------------------------------------- |
| [getCallExpressions](variables/getCallExpressions.md) | Get all call expressions within a node, in source order.  |
| [getNewExpressions](variables/getNewExpressions.md)   | Get all `new` expressions within a node, in source order. |

## Functions

| Function                                                  | Description                                                                     |
| --------------------------------------------------------- | ------------------------------------------------------------------------------- |
| [getIdentifiers](functions/getIdentifiers.md)             | Get all identifiers occurring within a node, in source order.                   |
| [getReturnExpressions](functions/getReturnExpressions.md) | Get all expressions returned by a function, in source order.                    |
| [getReturnStatements](functions/getReturnStatements.md)   | Get all return statements in the subtree of `node` that belong to its function. |

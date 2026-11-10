[@eslint-react/ast](../../../README.md) / Check

# Check

Helpers for checking `TSESTree` node types.

## Variables

| Variable                                                            | Description                                                                                                                        |
| ------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| [is](variables/is.md)                                               | Check if a node is of the given type.                                                                                              |
| [isCallExpression](variables/isCallExpression.md)                   | Check if a node is a call expression.                                                                                              |
| [isClass](variables/isClass.md)                                     | Check if a node is a class declaration or class expression.                                                                        |
| [isConditionalOrLoop](variables/isConditionalOrLoop.md)             | Check if a node is a conditional or logical expression, a conditional statement, or a loop statement.                              |
| [isExpression](variables/isExpression.md)                           | Check if a node is an expression node.                                                                                             |
| [isFunction](variables/isFunction.md)                               | Check if a node is a function declaration, function expression, or arrow function expression.                                      |
| [isFunctionOrClass](variables/isFunctionOrClass.md)                 | Check if a node is a function declaration, function expression, arrow function expression, class declaration, or class expression. |
| [isJSX](variables/isJSX.md)                                         | Check if a node is any JSX-related node.                                                                                           |
| [isJSXElement](variables/isJSXElement.md)                           | Check if a node is a JSX element.                                                                                                  |
| [isJSXElementOrFragment](variables/isJSXElementOrFragment.md)       | Check if a node is a JSX element or JSX fragment.                                                                                  |
| [isJSXExpressionContainer](variables/isJSXExpressionContainer.md)   | Check if a node is a JSX expression container.                                                                                     |
| [isJSXFragment](variables/isJSXFragment.md)                         | Check if a node is a JSX fragment.                                                                                                 |
| [isJSXSpreadAttribute](variables/isJSXSpreadAttribute.md)           | Check if a node is a JSX spread attribute.                                                                                         |
| [isJSXTagNameExpression](variables/isJSXTagNameExpression.md)       | Check if a node can appear as a JSX tag name.                                                                                      |
| [isLoopStatement](variables/isLoopStatement.md)                     | Check if a node is a loop statement.                                                                                               |
| [isMemberExpression](variables/isMemberExpression.md)               | Check if a node is a member expression.                                                                                            |
| [isObjectExpression](variables/isObjectExpression.md)               | Check if a node is an object expression.                                                                                           |
| [isOneOf](variables/isOneOf.md)                                     | Check if a node is one of the given types.                                                                                         |
| [isProperty](variables/isProperty.md)                               | Check if a node is a `TSPropertySignature`, `PropertyDefinition`, `TSIndexSignature`, or `TSParameterProperty`.                    |
| [isPropertyOrMethod](variables/isPropertyOrMethod.md)               | Check if a node is a `MethodDefinition` or `PropertyDefinition`.                                                                   |
| [isReturnStatement](variables/isReturnStatement.md)                 | Check if a node is a return statement.                                                                                             |
| [isTypeAssertionExpression](variables/isTypeAssertionExpression.md) | Check if a node is a TypeScript type assertion-like expression (as, assertion, non-null, or satisfies).                            |
| [isTypeExpression](variables/isTypeExpression.md)                   | Check if a node is a TypeScript type expression (assertion, non-null, satisfies, or instantiation).                                |
| [isTypeOrChainExpression](variables/isTypeOrChainExpression.md)     | Check if a node is a TypeScript type expression or a chain expression (i.e. a transparent wrapper around an inner expression).     |

## Functions

| Function                                                                    | Description                                                                                                                                                                                  |
| --------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [isArrayPatternElementDefault](functions/isArrayPatternElementDefault.md)   | Check if a node is the default value of an array pattern element, i.e. an `AssignmentPattern` directly nested in an `ArrayPattern` (ex: `const [a = 1] = arr`).                              |
| [isDirective](functions/isDirective.md)                                     | Check if a node is a directive (an expression statement in a directive prologue, ex: `"use client"`), optionally matching a specific name.                                                   |
| [isIdentifier](functions/isIdentifier.md)                                   | Check if a node is an identifier, optionally matching a specific name.                                                                                                                       |
| [isObjectPatternElementDefault](functions/isObjectPatternElementDefault.md) | Check if a node is the default value of an object pattern property, i.e. an `AssignmentPattern` used as the `value` of a `Property` inside an `ObjectPattern` (ex: `const { a = 1 } = obj`). |

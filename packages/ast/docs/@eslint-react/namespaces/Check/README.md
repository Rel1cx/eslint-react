[@eslint-react/ast](../../../README.md) / Check

# Check

Helpers for checking `TSESTree` node types.

## Variables

| Variable                                                            | Description                                                                                                                |
| ------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| [is](variables/is.md)                                               | Check if a node is of the given type.                                                                                      |
| [isClass](variables/isClass.md)                                     | Check if a node is a class declaration or class expression.                                                                |
| [isConditional](variables/isConditional.md)                         | Check if a node is a conditional expression or a control flow statement.                                                   |
| [isExpression](variables/isExpression.md)                           | Check if a node is an expression node.                                                                                     |
| [isFunction](variables/isFunction.md)                               | Check if a node is a function declaration, function expression, or arrow function expression.                              |
| [isJSX](variables/isJSX.md)                                         | Check if a node is any JSX-related node.                                                                                   |
| [isJSXElement](variables/isJSXElement.md)                           | Check if a node is a JSX element.                                                                                          |
| [isJSXElementOrFragment](variables/isJSXElementOrFragment.md)       | Check if a node is a JSX element or JSX fragment.                                                                          |
| [isJSXFragment](variables/isJSXFragment.md)                         | Check if a node is a JSX fragment.                                                                                         |
| [isJSXTagNameExpression](variables/isJSXTagNameExpression.md)       | Check if a node can appear as a JSX tag name.                                                                              |
| [isOneOf](variables/isOneOf.md)                                     | Check if a node is one of the given types.                                                                                 |
| [isProperty](variables/isProperty.md)                               | Check if a node is a property-like node (property definition, index signature, parameter property, or property signature). |
| [isPropertyOrMethod](variables/isPropertyOrMethod.md)               | Check if a node is a property or method definition.                                                                        |
| [isTypeAssertionExpression](variables/isTypeAssertionExpression.md) | Check if a node is a TypeScript type assertion-like expression (as, assertion, non-null, or satisfies).                    |
| [isTypeExpression](variables/isTypeExpression.md)                   | Check if a node is a TypeScript type expression (assertion, non-null, satisfies, or instantiation).                        |

## Functions

| Function                                  | Description                                                                                                   |
| ----------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| [isDirective](functions/isDirective.md)   | Check if a node is a directive statement (ex: `"use client"`), optionally matching a specific directive name. |
| [isIdentifier](functions/isIdentifier.md) | Check if a node is an identifier, optionally matching a specific name.                                        |

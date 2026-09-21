[@eslint-react/ast](../../../README.md) / Extract

# Extract

Helpers for extracting information from `TSESTree` nodes.

## Functions

| Function                                                    | Description                                                                                                                                                             |
| ----------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [findProperty](functions/findProperty.md)                   | Find a property by name in a list of object literal properties, recursing into spread object expressions.                                                               |
| [getCalleeName](functions/getCalleeName.md)                 | Get the name of the callee of a call expression.                                                                                                                        |
| [getFullyQualifiedName](functions/getFullyQualifiedName.md) | Get the fully qualified name of a node (ex: `React.useState`), falling back to source text when needed.                                                                 |
| [getMemberChain](functions/getMemberChain.md)               | Get the member chain of an expression (ex: `[a, b, c]` for `a.b.c`), starting from the base object. Type expressions and chain expressions are unwrapped along the way. |
| [getPropertyName](functions/getPropertyName.md)             | Get the static name of an object property's key.                                                                                                                        |
| [unwrap](functions/unwrap.md)                               | Recursively unwrap TypeScript type expressions and chain expressions to get the underlying expression.                                                                  |

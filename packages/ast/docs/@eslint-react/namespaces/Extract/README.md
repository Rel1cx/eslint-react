[@eslint-react/ast](../../../README.md) / Extract

# Extract

Helpers for extracting information from `TSESTree` nodes.

## Functions

| Function                                                    | Description                                                                                               |
| ----------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| [findProperty](functions/findProperty.md)                   | Find a property by name in a list of object literal properties, recursing into spread object expressions. |
| [getCalleeName](functions/getCalleeName.md)                 | Get the name of the callee of a call expression.                                                          |
| [getFullyQualifiedName](functions/getFullyQualifiedName.md) | Get the fully qualified name of a node (ex: `React.useState`), falling back to source text when needed.   |
| [getIdentifierAt](functions/getIdentifierAt.md)             | Get the identifier at a given position in a member expression chain (ex: position `0` in `a.b.c` is `a`). |
| [getPropertyName](functions/getPropertyName.md)             | Get the static name of an object property's key.                                                          |
| [unwrap](functions/unwrap.md)                               | Recursively unwrap TypeScript type expressions and chain expressions to get the underlying expression.    |

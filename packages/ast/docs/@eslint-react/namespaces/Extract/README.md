[@eslint-react/ast](../../../README.md) / Extract

# Extract

Helpers for extracting information from `TSESTree` nodes.

## Functions

| Function                                                    | Description                                                                                             |
| ----------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| [getCalleeName](functions/getCalleeName.md)                 | Get the name of the callee of a call expression.                                                        |
| [getFullyQualifiedName](functions/getFullyQualifiedName.md) | Get the fully qualified name of a node (ex: `React.useState`), falling back to source text when needed. |
| [getJSXName](functions/getJSXName.md)                       | Get the flattened name of a JSX identifier, namespaced name, or member expression.                      |
| [unwrap](functions/unwrap.md)                               | Recursively unwrap TypeScript type expressions and chain expressions to get the underlying expression.  |

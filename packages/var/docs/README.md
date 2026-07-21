# @eslint-react/var

## Type Aliases

| Type Alias                                           | Description                                                                                                                    |
| ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| [AssignmentTarget](type-aliases/AssignmentTarget.md) | The possible assignment targets returned by [resolveEnclosingAssignmentTarget](functions/resolveEnclosingAssignmentTarget.md). |
| [ObjectType](type-aliases/ObjectType.md)             | Represents the type classification of an object node.                                                                          |

## Functions

| Function                                                                          | Description                                                                                                |
| --------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| [isValueEqual](functions/isValueEqual.md)                                         | Check if the value of a node equals the value of another node.                                             |
| [resolve](functions/resolve.md)                                                   | Resolve an identifier to the AST node that represents its value, suitable for use in ESLint rule analysis. |
| [resolveEnclosingAssignmentTarget](functions/resolveEnclosingAssignmentTarget.md) | Resolve the enclosing assignment target (variable, property, etc.) of a node.                              |
| [resolveImportSource](functions/resolveImportSource.md)                           | Resolve the import source of a variable by walking its latest definition.                                  |
| [resolveObjectType](functions/resolveObjectType.md)                               | Resolve the object type of the given node.                                                                 |

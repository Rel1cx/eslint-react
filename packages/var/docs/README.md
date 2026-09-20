# @eslint-react/var

## Interfaces

| Interface                                                | Description                                                                          |
| -------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| [ImportEntry](interfaces/ImportEntry.md)                 | One entry per local import binding, mirroring the specification's ImportEntry model. |
| [ImportLookup](interfaces/ImportLookup.md)               | -                                                                                    |
| [ImportLookupOptions](interfaces/ImportLookupOptions.md) | -                                                                                    |

## Type Aliases

| Type Alias                                           | Description                                                                                                                    |
| ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| [AssignmentTarget](type-aliases/AssignmentTarget.md) | The possible assignment targets returned by [resolveEnclosingAssignmentTarget](functions/resolveEnclosingAssignmentTarget.md). |
| [ObjectType](type-aliases/ObjectType.md)             | Represents the type classification of an object node.                                                                          |

## Functions

| Function                                                                          | Description                                                                                                |
| --------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| [createImportLookup](functions/createImportLookup.md)                             | Create a lookup of local import bindings from a source by scanning the top-level imports of a program.     |
| [isValueEqual](functions/isValueEqual.md)                                         | Check if two nodes have equal values.                                                                      |
| [resolve](functions/resolve.md)                                                   | Resolve an identifier to the AST node that represents its value, suitable for use in ESLint rule analysis. |
| [resolveEnclosingAssignmentTarget](functions/resolveEnclosingAssignmentTarget.md) | Resolve the enclosing assignment target (variable, property, etc.) of the node.                            |
| [resolveImportSource](functions/resolveImportSource.md)                           | Resolve the import source of a variable by walking its latest definition.                                  |
| [resolveObjectType](functions/resolveObjectType.md)                               | Resolve the object type of the node.                                                                       |

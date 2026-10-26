# @eslint-react/var

## Interfaces

| Interface                                                | Description                                                                   |
| -------------------------------------------------------- | ----------------------------------------------------------------------------- |
| [ImportEntry](interfaces/ImportEntry.md)                 | A single local import binding, modeled after the specification's ImportEntry. |
| [ImportLookup](interfaces/ImportLookup.md)               | A read-only index over the local import bindings of a program.                |
| [ImportLookupOptions](interfaces/ImportLookupOptions.md) | Options for [createImportLookup](functions/createImportLookup.md).            |

## Type Aliases

| Type Alias                                                             | Description                                                                                                                    |
| ---------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| [EnclosingAssignmentTarget](type-aliases/EnclosingAssignmentTarget.md) | The possible assignment targets returned by [resolveEnclosingAssignmentTarget](functions/resolveEnclosingAssignmentTarget.md). |
| [ObjectType](type-aliases/ObjectType.md)                               | Represents the type classification of an object node.                                                                          |

## Functions

| Function                                                                          | Description                                                                                                                         |
| --------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| [createImportLookup](functions/createImportLookup.md)                             | Create a lookup of local import bindings from a source by scanning the top-level imports of a program.                              |
| [isValueEqual](functions/isValueEqual.md)                                         | Check if two nodes have equal values.                                                                                               |
| [resolve](functions/resolve.md)                                                   | Resolve an identifier to the AST node that represents its value, suitable for use in ESLint rule analysis.                          |
| [resolveEnclosingAssignmentTarget](functions/resolveEnclosingAssignmentTarget.md) | Resolve the enclosing assignment target (variable, property, etc.) of the node.                                                     |
| [resolveImportSource](functions/resolveImportSource.md)                           | Resolve the import source of a variable by walking its latest definition.                                                           |
| [resolveObjectType](functions/resolveObjectType.md)                               | Resolve the object type of the node.                                                                                                |
| [resolveOrigin](functions/resolveOrigin.md)                                       | Resolve an identifier to the AST node its value **originates from**, suitable for origin/pedigree tracking in ESLint rule analysis. |

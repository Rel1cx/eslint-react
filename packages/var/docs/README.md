# @eslint-react/var

## Interfaces

| Interface                                                            | Description                                                        |
| -------------------------------------------------------------------- | ------------------------------------------------------------------ |
| [ImportLookup](interfaces/ImportLookup.md)                           | A read-only index over the local import bindings of a program.     |
| [ImportLookupOptions](interfaces/ImportLookupOptions.md)             | Options for [createImportLookup](functions/createImportLookup.md). |
| [ResolveObjectTypeOptions](interfaces/ResolveObjectTypeOptions.md)   | Options for [resolveObjectType](functions/resolveObjectType.md).   |
| [ResolveOptions](interfaces/ResolveOptions.md)                       | Options shared by the identifier-resolution helpers.               |
| [ResolveOriginChainOptions](interfaces/ResolveOriginChainOptions.md) | Options for [resolveOriginChain](functions/resolveOriginChain.md). |

## Type Aliases

| Type Alias                                                             | Description                                                                                                                    |
| ---------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| [EnclosingAssignmentTarget](type-aliases/EnclosingAssignmentTarget.md) | The possible assignment targets returned by [resolveEnclosingAssignmentTarget](functions/resolveEnclosingAssignmentTarget.md). |
| [ImportEntry](type-aliases/ImportEntry.md)                             | A single local import binding, modeled after the specification's ImportEntry.                                                  |
| [ObjectType](type-aliases/ObjectType.md)                               | Represents the type classification of an object node.                                                                          |

## Functions

| Function                                                                          | Description                                                                                                                                                                                                                         |
| --------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [createImportLookup](functions/createImportLookup.md)                             | Create a lookup of local import bindings from a source by scanning the top-level imports of a program.                                                                                                                              |
| [isProvenanceEqual](functions/isProvenanceEqual.md)                               | Check if two nodes refer to the same value or share provenance.                                                                                                                                                                     |
| [isValueEqual](functions/isValueEqual.md)                                         | Check if two nodes have equal values.                                                                                                                                                                                               |
| [resolve](functions/resolve.md)                                                   | Resolve an identifier to the AST node that represents its value, suitable for use in ESLint rule analysis.                                                                                                                          |
| [resolveAssignmentTargets](functions/resolveAssignmentTargets.md)                 | Resolve every write target of an assignment or loop target, expanding destructuring patterns such as `[local, globalValue] = source` or `({ a: obj.x } = source)`. Defaults (`{ a = source }`) are not targets; their left side is. |
| [resolveEnclosingAssignmentTarget](functions/resolveEnclosingAssignmentTarget.md) | Resolve the enclosing assignment target (variable, property, etc.) of the node.                                                                                                                                                     |
| [resolveImportSource](functions/resolveImportSource.md)                           | Resolve the import source of a variable by walking its latest definition.                                                                                                                                                           |
| [resolveObjectType](functions/resolveObjectType.md)                               | Resolve the object type of the node.                                                                                                                                                                                                |
| [resolveOrigin](functions/resolveOrigin.md)                                       | Resolve an identifier to the AST node its value **originates from**, suitable for origin/pedigree tracking in ESLint rule analysis.                                                                                                 |
| [resolveOriginChain](functions/resolveOriginChain.md)                             | Follow an identifier through an alias chain to the node its value ultimately originates from.                                                                                                                                       |

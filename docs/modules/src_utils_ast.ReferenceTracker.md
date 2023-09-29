[eslint-plugin-react-ts](../README.md) / [src/utils/ast](src_utils_ast.md) / ReferenceTracker

# Namespace: ReferenceTracker

[src/utils/ast](src_utils_ast.md).ReferenceTracker

The tracker for references. This provides reference tracking for global variables, CommonJS modules, and ES modules.

**`See`**

[https://eslint-community.github.io/eslint-utils/api/scope-utils.html#referencetracker-class](https://eslint-community.github.io/eslint-utils/api/scope-utils.html#referencetracker-class)

## Table of contents

### Interfaces

- [FoundReference](../interfaces/src_utils_ast.ReferenceTracker.FoundReference.md)
- [TraceMapElement](../interfaces/src_utils_ast.ReferenceTracker.TraceMapElement.md)

### Type Aliases

- [CALL](src_utils_ast.ReferenceTracker.md#call)
- [CONSTRUCT](src_utils_ast.ReferenceTracker.md#construct)
- [ESM](src_utils_ast.ReferenceTracker.md#esm)
- [READ](src_utils_ast.ReferenceTracker.md#read)
- [ReferenceType](src_utils_ast.ReferenceTracker.md#referencetype)
- [TraceMap](src_utils_ast.ReferenceTracker.md#tracemap)

## Type Aliases

### CALL

Ƭ **CALL**: `ReferenceTrackerStatic`[``"CALL"``]

___

### CONSTRUCT

Ƭ **CONSTRUCT**: `ReferenceTrackerStatic`[``"CONSTRUCT"``]

___

### ESM

Ƭ **ESM**: `ReferenceTrackerStatic`[``"ESM"``]

___

### READ

Ƭ **READ**: `ReferenceTrackerStatic`[``"READ"``]

___

### ReferenceType

Ƭ **ReferenceType**: [`CALL`](src_utils_ast.ReferenceTracker.md#call) \| [`CONSTRUCT`](src_utils_ast.ReferenceTracker.md#construct) \| [`READ`](src_utils_ast.ReferenceTracker.md#read)

___

### TraceMap

Ƭ **TraceMap**<`T`\>: `Record`<`string`, [`TraceMapElement`](../interfaces/src_utils_ast.ReferenceTracker.TraceMapElement.md)<`T`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `any` |

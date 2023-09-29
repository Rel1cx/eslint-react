[eslint-plugin-react-ts](../README.md) / [src/utils/ast](../modules/src_utils_ast.md) / ReferenceTracker

# Interface: ReferenceTracker

[src/utils/ast](../modules/src_utils_ast.md).ReferenceTracker

## Table of contents

### Methods

- [iterateCjsReferences](src_utils_ast.ReferenceTracker-1.md#iteratecjsreferences)
- [iterateEsmReferences](src_utils_ast.ReferenceTracker-1.md#iterateesmreferences)
- [iterateGlobalReferences](src_utils_ast.ReferenceTracker-1.md#iterateglobalreferences)

## Methods

### iterateCjsReferences

▸ **iterateCjsReferences**<`T`\>(`traceMap`): `IterableIterator`<[`FoundReference`](src_utils_ast.ReferenceTracker.FoundReference.md)<`T`\>\>

Iterate the references that the given `traceMap` determined.
This method starts to search from `require()` expression.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `traceMap` | [`TraceMap`](../modules/src_utils_ast.ReferenceTracker.md#tracemap)<`T`\> |

#### Returns

`IterableIterator`<[`FoundReference`](src_utils_ast.ReferenceTracker.FoundReference.md)<`T`\>\>

**`See`**

[https://eslint-community.github.io/eslint-utils/api/scope-utils.html#tracker-iteratecjsreferences](https://eslint-community.github.io/eslint-utils/api/scope-utils.html#tracker-iteratecjsreferences)

___

### iterateEsmReferences

▸ **iterateEsmReferences**<`T`\>(`traceMap`): `IterableIterator`<[`FoundReference`](src_utils_ast.ReferenceTracker.FoundReference.md)<`T`\>\>

Iterate the references that the given `traceMap` determined.
This method starts to search from `import`/`export` declarations.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `traceMap` | [`TraceMap`](../modules/src_utils_ast.ReferenceTracker.md#tracemap)<`T`\> |

#### Returns

`IterableIterator`<[`FoundReference`](src_utils_ast.ReferenceTracker.FoundReference.md)<`T`\>\>

**`See`**

[https://eslint-community.github.io/eslint-utils/api/scope-utils.html#tracker-iterateesmreferences](https://eslint-community.github.io/eslint-utils/api/scope-utils.html#tracker-iterateesmreferences)

___

### iterateGlobalReferences

▸ **iterateGlobalReferences**<`T`\>(`traceMap`): `IterableIterator`<[`FoundReference`](src_utils_ast.ReferenceTracker.FoundReference.md)<`T`\>\>

Iterate the references that the given `traceMap` determined.
This method starts to search from global variables.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `traceMap` | [`TraceMap`](../modules/src_utils_ast.ReferenceTracker.md#tracemap)<`T`\> |

#### Returns

`IterableIterator`<[`FoundReference`](src_utils_ast.ReferenceTracker.FoundReference.md)<`T`\>\>

**`See`**

[https://eslint-community.github.io/eslint-utils/api/scope-utils.html#tracker-iterateglobalreferences](https://eslint-community.github.io/eslint-utils/api/scope-utils.html#tracker-iterateglobalreferences)

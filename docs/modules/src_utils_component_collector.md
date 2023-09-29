[eslint-plugin-react-ts](../README.md) / src/utils/component-collector

# Module: src/utils/component-collector

## Table of contents

### Functions

- [make](src_utils_component_collector.md#make)

## Functions

### make

▸ **make**(`context`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `context` | `Readonly`<`RuleContext`<`string`, readonly `unknown`[]\>\> |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `ctx` | { `getCurrentFunction`: () => [`Option`](src_lib_primitives.O.md#option)<`NonNullable`<`undefined` \| [`FunctionNode`](src_utils_ast.md#functionnode)\>\> ; `getAllComponents`: () => `Set`<[`FunctionNode`](src_utils_ast.md#functionnode)\> ; `getCurrentComponents`: () => `Set`<[`FunctionNode`](src_utils_ast.md#functionnode)\> ; `getCurrentFunctionStack`: () => [`FunctionNode`](src_utils_ast.md#functionnode)[]  } |
| `ctx.getCurrentFunction` | () => [`Option`](src_lib_primitives.O.md#option)<`NonNullable`<`undefined` \| [`FunctionNode`](src_utils_ast.md#functionnode)\>\> |
| `ctx.getAllComponents` | [object Object] |
| `ctx.getCurrentComponents` | [object Object] |
| `ctx.getCurrentFunctionStack` | [object Object] |
| `listeners` | { `ArrowFunctionExpression`: (`node`: [`FunctionNode`](src_utils_ast.md#functionnode)) => [`MutableList`](../interfaces/src_lib_primitives.MutList.MutableList.md)<[`FunctionNode`](src_utils_ast.md#functionnode)\> = onFunctionEnter; `ArrowFunctionExpression:exit`: () => `undefined` \| [`FunctionNode`](src_utils_ast.md#functionnode) = onFunctionExit; `FunctionDeclaration`: (`node`: [`FunctionNode`](src_utils_ast.md#functionnode)) => [`MutableList`](../interfaces/src_lib_primitives.MutList.MutableList.md)<[`FunctionNode`](src_utils_ast.md#functionnode)\> = onFunctionEnter; `FunctionDeclaration:exit`: () => `undefined` \| [`FunctionNode`](src_utils_ast.md#functionnode) = onFunctionExit; `FunctionExpression`: (`node`: [`FunctionNode`](src_utils_ast.md#functionnode)) => [`MutableList`](../interfaces/src_lib_primitives.MutList.MutableList.md)<[`FunctionNode`](src_utils_ast.md#functionnode)\> = onFunctionEnter; `FunctionExpression:exit`: () => `undefined` \| [`FunctionNode`](src_utils_ast.md#functionnode) = onFunctionExit; `ArrowFunctionExpression[body.type!='BlockStatement']`: (`node`: `ArrowFunctionExpression`) => `void` ; `ReturnStatement`: (`node`: `ReturnStatement`) => `void`  } |
| `listeners.ArrowFunctionExpression` | (`node`: [`FunctionNode`](src_utils_ast.md#functionnode)) => [`MutableList`](../interfaces/src_lib_primitives.MutList.MutableList.md)<[`FunctionNode`](src_utils_ast.md#functionnode)\> |
| `listeners.ArrowFunctionExpression:exit` | () => `undefined` \| [`FunctionNode`](src_utils_ast.md#functionnode) |
| `listeners.FunctionDeclaration` | (`node`: [`FunctionNode`](src_utils_ast.md#functionnode)) => [`MutableList`](../interfaces/src_lib_primitives.MutList.MutableList.md)<[`FunctionNode`](src_utils_ast.md#functionnode)\> |
| `listeners.FunctionDeclaration:exit` | () => `undefined` \| [`FunctionNode`](src_utils_ast.md#functionnode) |
| `listeners.FunctionExpression` | (`node`: [`FunctionNode`](src_utils_ast.md#functionnode)) => [`MutableList`](../interfaces/src_lib_primitives.MutList.MutableList.md)<[`FunctionNode`](src_utils_ast.md#functionnode)\> |
| `listeners.FunctionExpression:exit` | () => `undefined` \| [`FunctionNode`](src_utils_ast.md#functionnode) |
| `listeners.ArrowFunctionExpression[body.type!='BlockStatement']` | [object Object] |
| `listeners.ReturnStatement` | [object Object] |

#### Defined in

[src/utils/component-collector.ts:12](https://github.com/Rel1cx/eslint-plugin-react-ts/blob/0eee112/src/utils/component-collector.ts#L12)

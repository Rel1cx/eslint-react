[eslint-plugin-react-ts](../README.md) / src/utils/component-collector

# Module: src/utils/component-collector

## Table of contents

### Functions

- [make](src_utils_component_collector.md#make)

## Functions

### make

▸ **make**(`context`): `Object`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `context` | `Object` | - |
| `context.cwd` | `string` | The current working directory passed to Linter. It is a path to a directory that should be considered as the current working directory. **`Since`** 8.40.0 |
| `context.filename` | `string` | The filename associated with the source. **`Since`** 8.40.0 |
| `context.id` | `string` | The rule ID. |
| `context.options` | readonly `unknown`[] | An array of the configured options for this rule. This array does not include the rule severity. |
| `context.parserOptions` | `ParserOptions` | The parser options configured for this run |
| `context.parserPath` | `string` | The name of the parser from configuration. |
| `context.parserServices?` | `ParserServices` | An object containing parser-provided services for rules |
| `context.physicalFilename?` | `string` | The full path of the file on disk without any code block information (unlike `filename`). **`Since`** 8.40.0 |
| `context.settings` | `SharedConfigurationSettings` | The shared settings from configuration. We do not have any shared settings in this plugin. |
| `context.sourceCode` | `Readonly`<`SourceCode`\> | A SourceCode object that you can use to work with the source that was passed to ESLint. **`Since`** 8.40.0 |
| `context.getAncestors` | () => `Node`[] | - |
| `context.getCwd` | () => `string` | - |
| `context.getDeclaredVariables` | (`node`: `Node`) => readonly `Variable`[] | - |
| `context.getFilename` | () => `string` | - |
| `context.getPhysicalFilename?` | () => `string` | - |
| `context.getScope` | () => `Scope` | - |
| `context.getSourceCode` | () => `Readonly`<`SourceCode`\> | - |
| `context.markVariableAsUsed` | (`name`: `string`) => `boolean` | - |
| `context.report` | (`descriptor`: `ReportDescriptor`<`string`\>) => `void` | - |

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

[src/utils/component-collector.ts:12](https://github.com/Rel1cx/eslint-plugin-react-ts/blob/e82a365/src/utils/component-collector.ts#L12)

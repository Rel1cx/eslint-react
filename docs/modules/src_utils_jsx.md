[eslint-plugin-react-ts](../README.md) / src/utils/jsx

# Module: src/utils/jsx

## Table of contents

### Functions

- [findPropInAttributes](src_utils_jsx.md#findpropinattributes)
- [findPropInProperties](src_utils_jsx.md#findpropinproperties)
- [getPropName](src_utils_jsx.md#getpropname)
- [getPropNameWithNamespace](src_utils_jsx.md#getpropnamewithnamespace)
- [hasChildren](src_utils_jsx.md#haschildren)
- [isJSX](src_utils_jsx.md#isjsx)
- [isJSXElement](src_utils_jsx.md#isjsxelement)
- [isJSXFragment](src_utils_jsx.md#isjsxfragment)
- [isJSXValue](src_utils_jsx.md#isjsxvalue)
- [isJsxTagNameExpression](src_utils_jsx.md#isjsxtagnameexpression)
- [isLineBreak](src_utils_jsx.md#islinebreak)
- [isReturnStatementReturningJSX](src_utils_jsx.md#isreturnstatementreturningjsx)

## Functions

### findPropInAttributes

▸ **findPropInAttributes**(`attributes`, `context`): (`propName`: `string`) => [`Option`](src_lib_primitives.O.md#option)<`NonNullable`<`undefined` \| `JSXAttribute` \| `JSXSpreadAttribute`\>\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `attributes` | (`JSXAttribute` \| `JSXSpreadAttribute`)[] | - |
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

`fn`

▸ (`propName`): [`Option`](src_lib_primitives.O.md#option)<`NonNullable`<`undefined` \| `JSXAttribute` \| `JSXSpreadAttribute`\>\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `propName` | `string` |

##### Returns

[`Option`](src_lib_primitives.O.md#option)<`NonNullable`<`undefined` \| `JSXAttribute` \| `JSXSpreadAttribute`\>\>

#### Defined in

[src/utils/jsx.ts:175](https://github.com/Rel1cx/eslint-plugin-react-ts/blob/e82a365/src/utils/jsx.ts#L175)

___

### findPropInProperties

▸ **findPropInProperties**(`properties`, `context`, `seenProps?`): (`propName`: `string`) => [`Option`](src_lib_primitives.O.md#option)<`PropertyComputedName` \| `PropertyNonComputedName` \| `RestElement` \| `SpreadElement`\>

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `properties` | `ObjectLiteralElement`[] \| (`Property` \| `RestElement`)[] | `undefined` | - |
| `context` | `Object` | `undefined` | - |
| `context.cwd` | `string` | `undefined` | The current working directory passed to Linter. It is a path to a directory that should be considered as the current working directory. **`Since`** 8.40.0 |
| `context.filename` | `string` | `undefined` | The filename associated with the source. **`Since`** 8.40.0 |
| `context.id` | `string` | `undefined` | The rule ID. |
| `context.options` | readonly `unknown`[] | `undefined` | An array of the configured options for this rule. This array does not include the rule severity. |
| `context.parserOptions` | `ParserOptions` | `undefined` | The parser options configured for this run |
| `context.parserPath` | `string` | `undefined` | The name of the parser from configuration. |
| `context.parserServices?` | `ParserServices` | `undefined` | An object containing parser-provided services for rules |
| `context.physicalFilename?` | `string` | `undefined` | The full path of the file on disk without any code block information (unlike `filename`). **`Since`** 8.40.0 |
| `context.settings` | `SharedConfigurationSettings` | `undefined` | The shared settings from configuration. We do not have any shared settings in this plugin. |
| `context.sourceCode` | `Readonly`<`SourceCode`\> | `undefined` | A SourceCode object that you can use to work with the source that was passed to ESLint. **`Since`** 8.40.0 |
| `context.getAncestors` | () => `Node`[] | `undefined` | - |
| `context.getCwd` | () => `string` | `undefined` | - |
| `context.getDeclaredVariables` | (`node`: `Node`) => readonly `Variable`[] | `undefined` | - |
| `context.getFilename` | () => `string` | `undefined` | - |
| `context.getPhysicalFilename?` | () => `string` | `undefined` | - |
| `context.getScope` | () => `Scope` | `undefined` | - |
| `context.getSourceCode` | () => `Readonly`<`SourceCode`\> | `undefined` | - |
| `context.markVariableAsUsed` | (`name`: `string`) => `boolean` | `undefined` | - |
| `context.report` | (`descriptor`: `ReportDescriptor`<`string`\>) => `void` | `undefined` | - |
| `seenProps` | `string`[] | `[]` | - |

#### Returns

`fn`

▸ (`propName`): [`Option`](src_lib_primitives.O.md#option)<`PropertyComputedName` \| `PropertyNonComputedName` \| `RestElement` \| `SpreadElement`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `propName` | `string` |

##### Returns

[`Option`](src_lib_primitives.O.md#option)<`PropertyComputedName` \| `PropertyNonComputedName` \| `RestElement` \| `SpreadElement`\>

#### Defined in

[src/utils/jsx.ts:129](https://github.com/Rel1cx/eslint-plugin-react-ts/blob/e82a365/src/utils/jsx.ts#L129)

___

### getPropName

▸ **getPropName**(`node`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `JSXAttribute` |

#### Returns

`string`

#### Defined in

[src/utils/jsx.ts:115](https://github.com/Rel1cx/eslint-plugin-react-ts/blob/e82a365/src/utils/jsx.ts#L115)

___

### getPropNameWithNamespace

▸ **getPropNameWithNamespace**(`node`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `JSXAttribute` |

#### Returns

`string`

#### Defined in

[src/utils/jsx.ts:122](https://github.com/Rel1cx/eslint-plugin-react-ts/blob/e82a365/src/utils/jsx.ts#L122)

___

### hasChildren

▸ **hasChildren**(`node`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `JSXElement` \| `JSXFragment` |

#### Returns

`boolean`

#### Defined in

[src/utils/jsx.ts:26](https://github.com/Rel1cx/eslint-plugin-react-ts/blob/e82a365/src/utils/jsx.ts#L26)

___

### isJSX

▸ **isJSX**(`node`): node is JSXElement \| JSXFragment

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `Node` |

#### Returns

node is JSXElement \| JSXFragment

#### Defined in

[src/utils/jsx.ts:16](https://github.com/Rel1cx/eslint-plugin-react-ts/blob/e82a365/src/utils/jsx.ts#L16)

___

### isJSXElement

▸ **isJSXElement**(`node`): node is JSXElement

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `undefined` \| ``null`` \| `Node` |

#### Returns

node is JSXElement

#### Defined in

node_modules/@typescript-eslint/utils/dist/ast-utils/helpers.d.ts:2

___

### isJSXFragment

▸ **isJSXFragment**(`node`): node is JSXFragment

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `undefined` \| ``null`` \| `Node` |

#### Returns

node is JSXFragment

#### Defined in

node_modules/@typescript-eslint/utils/dist/ast-utils/helpers.d.ts:2

___

### isJSXValue

▸ **isJSXValue**(`node`, `context`, `strict`, `ignoreNull`): `boolean`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `node` | ``null`` \| `Node` | - |
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
| `strict` | `boolean` | - |
| `ignoreNull` | `boolean` | - |

#### Returns

`boolean`

#### Defined in

[src/utils/jsx.ts:31](https://github.com/Rel1cx/eslint-plugin-react-ts/blob/e82a365/src/utils/jsx.ts#L31)

___

### isJsxTagNameExpression

▸ **isJsxTagNameExpression**(`node`): node is JSXIdentifier \| JSXMemberExpression \| JSXNamespacedName

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `undefined` \| ``null`` \| `Node` |

#### Returns

node is JSXIdentifier \| JSXMemberExpression \| JSXNamespacedName

#### Defined in

node_modules/@typescript-eslint/utils/dist/ast-utils/helpers.d.ts:393

___

### isLineBreak

▸ **isLineBreak**(`node`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `Node` |

#### Returns

`boolean`

#### Defined in

[src/utils/jsx.ts:212](https://github.com/Rel1cx/eslint-plugin-react-ts/blob/e82a365/src/utils/jsx.ts#L212)

___

### isReturnStatementReturningJSX

▸ **isReturnStatementReturningJSX**(`node`, `context`, `strict?`, `ignoreNull?`): `boolean`

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `node` | `ReturnStatement` | `undefined` | - |
| `context` | `Object` | `undefined` | - |
| `context.cwd` | `string` | `undefined` | The current working directory passed to Linter. It is a path to a directory that should be considered as the current working directory. **`Since`** 8.40.0 |
| `context.filename` | `string` | `undefined` | The filename associated with the source. **`Since`** 8.40.0 |
| `context.id` | `string` | `undefined` | The rule ID. |
| `context.options` | readonly `unknown`[] | `undefined` | An array of the configured options for this rule. This array does not include the rule severity. |
| `context.parserOptions` | `ParserOptions` | `undefined` | The parser options configured for this run |
| `context.parserPath` | `string` | `undefined` | The name of the parser from configuration. |
| `context.parserServices?` | `ParserServices` | `undefined` | An object containing parser-provided services for rules |
| `context.physicalFilename?` | `string` | `undefined` | The full path of the file on disk without any code block information (unlike `filename`). **`Since`** 8.40.0 |
| `context.settings` | `SharedConfigurationSettings` | `undefined` | The shared settings from configuration. We do not have any shared settings in this plugin. |
| `context.sourceCode` | `Readonly`<`SourceCode`\> | `undefined` | A SourceCode object that you can use to work with the source that was passed to ESLint. **`Since`** 8.40.0 |
| `context.getAncestors` | () => `Node`[] | `undefined` | - |
| `context.getCwd` | () => `string` | `undefined` | - |
| `context.getDeclaredVariables` | (`node`: `Node`) => readonly `Variable`[] | `undefined` | - |
| `context.getFilename` | () => `string` | `undefined` | - |
| `context.getPhysicalFilename?` | () => `string` | `undefined` | - |
| `context.getScope` | () => `Scope` | `undefined` | - |
| `context.getSourceCode` | () => `Readonly`<`SourceCode`\> | `undefined` | - |
| `context.markVariableAsUsed` | (`name`: `string`) => `boolean` | `undefined` | - |
| `context.report` | (`descriptor`: `ReportDescriptor`<`string`\>) => `void` | `undefined` | - |
| `strict` | `boolean` | `false` | - |
| `ignoreNull` | `boolean` | `false` | - |

#### Returns

`boolean`

#### Defined in

[src/utils/jsx.ts:104](https://github.com/Rel1cx/eslint-plugin-react-ts/blob/e82a365/src/utils/jsx.ts#L104)

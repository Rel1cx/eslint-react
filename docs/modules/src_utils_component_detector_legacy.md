[eslint-plugin-react-ts](../README.md) / src/utils/component-detector-legacy

# Module: src/utils/component-detector-legacy

## Table of contents

### Functions

- [getParentES6Component](src_utils_component_detector_legacy.md#getparentes6component)
- [isES5Component](src_utils_component_detector_legacy.md#ises5component)
- [isES6Component](src_utils_component_detector_legacy.md#ises6component)
- [isPureComponent](src_utils_component_detector_legacy.md#ispurecomponent)
- [isStateMemberExpression](src_utils_component_detector_legacy.md#isstatememberexpression)

## Functions

### getParentES6Component

▸ **getParentES6Component**(`context`): ``null`` \| `ClassDeclarationWithOptionalName` \| `ClassExpression`

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

``null`` \| `ClassDeclarationWithOptionalName` \| `ClassExpression`

**`Package`**

**`Deprecated`**

Do not use this function. It will be removed in the future.

#### Defined in

[src/utils/component-detector-legacy.ts:76](https://github.com/Rel1cx/eslint-plugin-react-ts/blob/e82a365/src/utils/component-detector-legacy.ts#L76)

___

### isES5Component

▸ **isES5Component**(`node`, `context`): `boolean`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `node` | `Node` | - |
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

`boolean`

**`Package`**

**`Deprecated`**

Do not use this function. It will be removed in the future.

#### Defined in

[src/utils/component-detector-legacy.ts:14](https://github.com/Rel1cx/eslint-plugin-react-ts/blob/e82a365/src/utils/component-detector-legacy.ts#L14)

___

### isES6Component

▸ **isES6Component**(`node`, `context`): `boolean`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `node` | `Node` | - |
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

`boolean`

**`Package`**

**`Deprecated`**

Do not use this function. It will be removed in the future.

#### Defined in

[src/utils/component-detector-legacy.ts:48](https://github.com/Rel1cx/eslint-plugin-react-ts/blob/e82a365/src/utils/component-detector-legacy.ts#L48)

___

### isPureComponent

▸ **isPureComponent**(`node`, `context`): `boolean`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `node` | `Node` | - |
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

`boolean`

**`Package`**

**`Deprecated`**

Do not use this function. It will be removed in the future.

#### Defined in

[src/utils/component-detector-legacy.ts:96](https://github.com/Rel1cx/eslint-plugin-react-ts/blob/e82a365/src/utils/component-detector-legacy.ts#L96)

___

### isStateMemberExpression

▸ **isStateMemberExpression**(`node`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `Node` |

#### Returns

`boolean`

**`Package`**

**`Deprecated`**

Do not use this function. It will be removed in the future.

#### Defined in

[src/utils/component-detector-legacy.ts:115](https://github.com/Rel1cx/eslint-plugin-react-ts/blob/e82a365/src/utils/component-detector-legacy.ts#L115)

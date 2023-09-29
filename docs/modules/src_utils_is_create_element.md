[eslint-plugin-react-ts](../README.md) / src/utils/is-create-element

# Module: src/utils/is-create-element

## Table of contents

### Functions

- [isCreateElement](src_utils_is_create_element.md#iscreateelement)

## Functions

### isCreateElement

▸ **isCreateElement**(`node`, `context`): `boolean`

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

#### Defined in

[src/utils/is-create-element.ts:10](https://github.com/Rel1cx/eslint-plugin-react-ts/blob/e82a365/src/utils/is-create-element.ts#L10)

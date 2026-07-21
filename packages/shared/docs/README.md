# @eslint-react/shared

## Interfaces

| Interface                                                                    | Description                                                    |
| ---------------------------------------------------------------------------- | -------------------------------------------------------------- |
| [ESLintReactSettingsNormalized](interfaces/ESLintReactSettingsNormalized.md) | Represents the normalized ESLint React settings used by rules. |

## Type Aliases

| Type Alias                                                 | Description                                                          |
| ---------------------------------------------------------- | -------------------------------------------------------------------- |
| [ESLintReactSettings](type-aliases/ESLintReactSettings.md) | The ESLint React settings inferred from `ESLintReactSettingsSchema`. |
| [ESLintSettings](type-aliases/ESLintSettings.md)           | The ESLint settings inferred from `ESLintSettingsSchema`.            |
| [RegExpLike](type-aliases/RegExpLike.md)                   | Represents a RegExp-like object with a `test` method.                |

## Variables

| Variable                                                                            | Description                                                              |
| ----------------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| [DEFAULT\_ESLINT\_REACT\_SETTINGS](variables/DEFAULT_ESLINT_REACT_SETTINGS.md)      | The default ESLint React settings.                                       |
| [DEFAULT\_ESLINT\_SETTINGS](variables/DEFAULT_ESLINT_SETTINGS.md)                   | The default ESLint settings.                                             |
| [RE\_ANNOTATION\_JSX](variables/RE_ANNOTATION_JSX.md)                               | Regular expression for matching a `@jsx` annotation comment.             |
| [RE\_ANNOTATION\_JSX\_FRAG](variables/RE_ANNOTATION_JSX_FRAG.md)                    | Regular expression for matching a `@jsxFrag` annotation comment.         |
| [RE\_ANNOTATION\_JSX\_IMPORT\_SOURCE](variables/RE_ANNOTATION_JSX_IMPORT_SOURCE.md) | Regular expression for matching a `@jsxImportSource` annotation comment. |
| [RE\_ANNOTATION\_JSX\_RUNTIME](variables/RE_ANNOTATION_JSX_RUNTIME.md)              | Regular expression for matching a `@jsxRuntime` annotation comment.      |
| [RE\_CAMEL\_CASE](variables/RE_CAMEL_CASE.md)                                       | Regular expression for matching a camelCase string.                      |
| [RE\_COMPONENT\_NAME](variables/RE_COMPONENT_NAME.md)                               | Regular expression for matching a React component name.                  |
| [RE\_COMPONENT\_NAME\_LOOSE](variables/RE_COMPONENT_NAME_LOOSE.md)                  | Regular expression for matching a React component name (loose).          |
| [RE\_CONSTANT\_CASE](variables/RE_CONSTANT_CASE.md)                                 | Regular expression for matching a CONSTANT_CASE string.                  |
| [RE\_HOOK\_NAME](variables/RE_HOOK_NAME.md)                                         | Regular expression for matching a React Hook name.                       |
| [RE\_HTML\_TAG](variables/RE_HTML_TAG.md)                                           | Regular expression for matching an HTML tag name.                        |
| [RE\_JAVASCRIPT\_PROTOCOL](variables/RE_JAVASCRIPT_PROTOCOL.md)                     | Regular expression for matching the `javascript:` protocol.              |
| [RE\_JS\_EXT](variables/RE_JS_EXT.md)                                               | Regular expression for matching a JavaScript file extension.             |
| [RE\_JS\_IDENTIFIER](variables/RE_JS_IDENTIFIER.md)                                 | Regular expression for matching a valid JavaScript identifier.           |
| [RE\_KEBAB\_CASE](variables/RE_KEBAB_CASE.md)                                       | Regular expression for matching a kebab-case string.                     |
| [RE\_PASCAL\_CASE](variables/RE_PASCAL_CASE.md)                                     | Regular expression for matching a PascalCase string.                     |
| [RE\_REGEXP\_STR](variables/RE_REGEXP_STR.md)                                       | Regular expression for matching a RegExp string.                         |
| [RE\_SNAKE\_CASE](variables/RE_SNAKE_CASE.md)                                       | Regular expression for matching a snake_case string.                     |
| [RE\_TS\_EXT](variables/RE_TS_EXT.md)                                               | Regular expression for matching a TypeScript file extension.             |

## Functions

| Function                                                      | Description                                                                  |
| ------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| [decodeESLintSettings](functions/decodeESLintSettings.md)     | Decode the ESLint settings, falling back to the defaults when invalid.       |
| [decodeSettings](functions/decodeSettings.md)                 | Decode the ESLint React settings, falling back to the defaults when invalid. |
| [getReactVersion](functions/getReactVersion.md)               | Get the React version from the project's dependencies.                       |
| [getSettingsFromContext](functions/getSettingsFromContext.md) | Get the normalized ESLint React settings from the rule context.              |
| [isESLintReactSettings](functions/isESLintReactSettings.md)   | Check if the value is valid ESLint React settings.                           |
| [isESLintSettings](functions/isESLintSettings.md)             | Check if the value is valid ESLint settings.                                 |
| [isRegExp](functions/isRegExp.md)                             | Check if the string is a RegExp string.                                      |
| [normalizeSettings](functions/normalizeSettings.md)           | Normalize the ESLint React settings to the form used by rules.               |
| [toRegExp](functions/toRegExp.md)                             | Convert a string to a `RegExpLike` object.                                   |

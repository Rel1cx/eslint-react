# @eslint-react/shared

## Classes

| Class | Description |
| ------ | ------ |
| [IdGenerator](classes/IdGenerator.md) | A generator for unique ids. |

## Interfaces

| Interface | Description |
| ------ | ------ |
| [ESLintReactSettingsNormalized](interfaces/ESLintReactSettingsNormalized.md) | - |
| [RuleFix](interfaces/RuleFix.md) | - |
| [RuleFixer](interfaces/RuleFixer.md) | - |
| [SettingsConfig](interfaces/SettingsConfig.md) | A collection of settings. |

## Type Aliases

| Type Alias | Description |
| ------ | ------ |
| [ESLintReactSettings](type-aliases/ESLintReactSettings.md) | - |
| [ESLintSettings](type-aliases/ESLintSettings.md) | - |
| [RegExpLike](type-aliases/RegExpLike.md) | A type represents RegExp-like object with `test` method. |
| [ReportFixFunction](type-aliases/ReportFixFunction.md) | - |
| [RuleContext](type-aliases/RuleContext.md) | Rule context. |
| [RuleFeature](type-aliases/RuleFeature.md) | Rule feature. |
| [RuleSuggest](type-aliases/RuleSuggest.md) | A suggestion for fixing a reported issue. |
| [Severity](type-aliases/Severity.md) | The severity of a rule in a configuration. |
| [SeverityLevel](type-aliases/SeverityLevel.md) | The numeric severity level for a rule. |
| [SeverityName](type-aliases/SeverityName.md) | Rule severity. |

## Variables

| Variable | Description |
| ------ | ------ |
| [DEFAULT\_ESLINT\_REACT\_SETTINGS](variables/DEFAULT_ESLINT_REACT_SETTINGS.md) | - |
| [DEFAULT\_ESLINT\_SETTINGS](variables/DEFAULT_ESLINT_SETTINGS.md) | - |
| [GITHUB\_URL](variables/GITHUB_URL.md) | The GitHub repository for this project. |
| [IMPURE\_CTORS](variables/IMPURE_CTORS.md) | Known impure global constructors used with `new` |
| [IMPURE\_FUNCS](variables/IMPURE_FUNCS.md) | Known impure functions |
| [NPM\_SCOPE](variables/NPM_SCOPE.md) | The NPM scope for this project. |
| [RE\_ANNOTATION\_JSX](variables/RE_ANNOTATION_JSX.md) | Regular expression for matching a `@jsx` annotation comment. |
| [RE\_ANNOTATION\_JSX\_FRAG](variables/RE_ANNOTATION_JSX_FRAG.md) | Regular expression for matching a `@jsxFrag` annotation comment. |
| [RE\_ANNOTATION\_JSX\_IMPORT\_SOURCE](variables/RE_ANNOTATION_JSX_IMPORT_SOURCE.md) | Regular expression for matching a `@jsxImportSource` annotation comment. |
| [RE\_ANNOTATION\_JSX\_RUNTIME](variables/RE_ANNOTATION_JSX_RUNTIME.md) | Regular expression for matching a `@jsxRuntime` annotation comment. |
| [RE\_CAMEL\_CASE](variables/RE_CAMEL_CASE.md) | Regular expression for matching a camelCase string. |
| [RE\_COMPONENT\_NAME](variables/RE_COMPONENT_NAME.md) | Regular expression for matching a React component name. |
| [RE\_COMPONENT\_NAME\_LOOSE](variables/RE_COMPONENT_NAME_LOOSE.md) | Regular expression for matching a React component name (loose). |
| [RE\_CONSTANT\_CASE](variables/RE_CONSTANT_CASE.md) | Regular expression for matching a CONSTANT_CASE string. |
| [RE\_HOOK\_NAME](variables/RE_HOOK_NAME.md) | Regular expression for matching a React Hook name. |
| [RE\_HTML\_TAG](variables/RE_HTML_TAG.md) | Regular expressions for matching a HTML tag name |
| [RE\_JAVASCRIPT\_PROTOCOL](variables/RE_JAVASCRIPT_PROTOCOL.md) | - |
| [RE\_JS\_EXT](variables/RE_JS_EXT.md) | Regular expression for matching a JavaScript file extension. |
| [RE\_JS\_IDENTIFIER](variables/RE_JS_IDENTIFIER.md) | Regular expression for matching a valid JavaScript identifier. |
| [RE\_KEBAB\_CASE](variables/RE_KEBAB_CASE.md) | Regular expression for matching a kebab-case string. |
| [RE\_PASCAL\_CASE](variables/RE_PASCAL_CASE.md) | Regular expression for matching a PascalCase string. |
| [RE\_REGEXP\_STR](variables/RE_REGEXP_STR.md) | Regular expression for matching a RegExp string. |
| [RE\_SNAKE\_CASE](variables/RE_SNAKE_CASE.md) | Regular expression for matching a snake_case string. |
| [RE\_TS\_EXT](variables/RE_TS_EXT.md) | Regular expression for matching a TypeScript file extension. |
| [WEBSITE\_URL](variables/WEBSITE_URL.md) | The URL to the project's website. |

## Functions

| Function | Description |
| ------ | ------ |
| [decodeESLintSettings](functions/decodeESLintSettings.md) | - |
| [decodeSettings](functions/decodeSettings.md) | - |
| [defineRuleListener](functions/defineRuleListener.md) | Defines a rule listener by merging multiple visitor objects |
| [getReactVersion](functions/getReactVersion.md) | Gets the React version from the project's dependencies. |
| [getSettingsFromContext](functions/getSettingsFromContext.md) | - |
| [isESLintReactSettings](functions/isESLintReactSettings.md) | - |
| [isESLintSettings](functions/isESLintSettings.md) | - |
| [isRegExp](functions/isRegExp.md) | Check whether given string is regexp string |
| [normalizeSettings](functions/normalizeSettings.md) | - |
| [report](functions/report.md) | Creates a report function for the given rule context. |
| [toRegExp](functions/toRegExp.md) | Convert a string to the `RegExp`. Normal strings (e.g., `"foo"`) is converted to `/^foo$/` of `RegExp`. Strings like `"/^foo/i"` are converted to `/^foo/i` of `RegExp`. |

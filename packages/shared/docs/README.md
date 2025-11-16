# @eslint-react/shared

## Classes

| Class | Description |
| ------ | ------ |
| [IdGenerator](classes/IdGenerator.md) | A generator for unique ids. |

## Interfaces

| Interface | Description |
| ------ | ------ |
| [CompatibleConfig](interfaces/CompatibleConfig.md) | - |
| [CompatiblePlugin](interfaces/CompatiblePlugin.md) | - |
| [CompatibleRule](interfaces/CompatibleRule.md) | - |
| [ESLintReactSettingsNormalized](interfaces/ESLintReactSettingsNormalized.md) | Normalized ESLint React settings with processed values |
| [SettingsConfig](interfaces/SettingsConfig.md) | A collection of settings. |

## Type Aliases

| Type Alias | Description |
| ------ | ------ |
| [ESLintReactSettings](type-aliases/ESLintReactSettings.md) | - |
| [ESLintSettings](type-aliases/ESLintSettings.md) | - |
| [RuleContext](type-aliases/RuleContext.md) | Rule context. |
| [RuleFeature](type-aliases/RuleFeature.md) | Rule feature. |
| [RulePolicy](type-aliases/RulePolicy.md) | - |
| [RuleSuggest](type-aliases/RuleSuggest.md) | - |
| [Severity](type-aliases/Severity.md) | The severity of a rule in a configuration. |
| [SeverityLevel](type-aliases/SeverityLevel.md) | The numeric severity level for a rule. |
| [SeverityName](type-aliases/SeverityName.md) | Rule severity. |

## Variables

| Variable | Description |
| ------ | ------ |
| [DEFAULT\_ESLINT\_REACT\_SETTINGS](variables/DEFAULT_ESLINT_REACT_SETTINGS.md) | Default ESLint React settings |
| [DEFAULT\_ESLINT\_SETTINGS](variables/DEFAULT_ESLINT_SETTINGS.md) | Default ESLint settings with React settings included |
| [defineSettings](variables/defineSettings.md) | Helper function for defining typed settings for "react-x" in JavaScript files Provides type checking without runtime transformation |
| [GITHUB\_URL](variables/GITHUB_URL.md) | The GitHub repository for this project. |
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
| [coerceESLintSettings](functions/coerceESLintSettings.md) | Coerces unknown input to ESLintSettings type |
| [coerceSettings](functions/coerceSettings.md) | Coerces unknown input to ESLintReactSettings type |
| [decodeESLintSettings](functions/decodeESLintSettings.md) | Decodes and validates ESLint settings, using defaults if invalid |
| [decodeSettings](functions/decodeSettings.md) | Decodes and validates ESLint React settings, using defaults if invalid |
| [getConfigAdapters](functions/getConfigAdapters.md) | - |
| [getReactVersion](functions/getReactVersion.md) | - |
| [getSettingsFromContext](functions/getSettingsFromContext.md) | Retrieves normalized ESLint React settings from the rule context Uses caching for performance optimization |
| [isESLintReactSettings](functions/isESLintReactSettings.md) | Checks if the provided settings conform to ESLintReactSettings schema |
| [isESLintSettings](functions/isESLintSettings.md) | Checks if the provided settings conform to ESLintSettings schema |
| [isRegExp](functions/isRegExp.md) | Checks whether given string is regexp string |
| [normalizeSettings](functions/normalizeSettings.md) | Normalizes ESLint React settings to a consistent internal format Transforms component definitions and resolves version information |
| [report](functions/report.md) | - |
| [toRegExp](functions/toRegExp.md) | Convert a string to the `RegExp`. Normal strings (e.g. `"foo"`) is converted to `/^foo$/` of `RegExp`. Strings like `"/^foo/i"` are converted to `/^foo/i` of `RegExp`. |

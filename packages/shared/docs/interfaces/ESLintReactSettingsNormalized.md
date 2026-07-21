[@eslint-react/shared](../README.md) / ESLintReactSettingsNormalized

# Interface: ESLintReactSettingsNormalized

Represents the normalized ESLint React settings used by rules.

## Properties

| Property                                                            | Type                                                                           | Description                                                                 |
| ------------------------------------------------------------------- | ------------------------------------------------------------------------------ | --------------------------------------------------------------------------- |
| <a id="property-additionaleffecthooks"></a> `additionalEffectHooks` | [`RegExpLike`](../type-aliases/RegExpLike.md)                                  | Regex pattern matching custom hooks that should be treated as effect hooks. |
| <a id="property-additionalstatehooks"></a> `additionalStateHooks`   | [`RegExpLike`](../type-aliases/RegExpLike.md)                                  | Regex pattern matching custom hooks that should be treated as state hooks.  |
| <a id="property-compilationmode"></a> `compilationMode`             | `"infer"` \| `"annotation"` \| `"syntax"` \| `"all"` \| `"off"` \| `undefined` | The React Compiler compilation mode, or "off" when not used.                |
| <a id="property-importsource"></a> `importSource`                   | `string`                                                                       | The source where React is imported from.                                    |
| <a id="property-polymorphicpropname"></a> `polymorphicPropName`     | `string` \| `null`                                                             | The prop name used for polymorphic components.                              |
| <a id="property-version"></a> `version`                             | `string`                                                                       | The React version.                                                          |

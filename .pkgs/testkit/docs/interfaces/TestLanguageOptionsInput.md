[@local/testkit](../README.md) / TestLanguageOptionsInput

# Interface: TestLanguageOptionsInput

Shared input for building language options across the test kit.
`jsx` toggles JSX parsing, `sourceType` maps to the flat-config
`languageOptions.sourceType`, and `types` selects type-aware parsing:
`true` uses the project service, `{ tsconfig }` pins a tsconfig file
(resolved against `tsconfigRootDir`, which defaults to the fixtures root).

## Properties

| Property                                                 | Type                                        |
| -------------------------------------------------------- | ------------------------------------------- |
| <a id="property-jsx"></a> `jsx?`                         | `boolean`                                   |
| <a id="property-sourcetype"></a> `sourceType?`           | `"commonjs"` \| `"module"` \| `"script"`    |
| <a id="property-tsconfigrootdir"></a> `tsconfigRootDir?` | `string`                                    |
| <a id="property-types"></a> `types?`                     | \| `boolean` \| \{ `tsconfig`: `string`; \} |

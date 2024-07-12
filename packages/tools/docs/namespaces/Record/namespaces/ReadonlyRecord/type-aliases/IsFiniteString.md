[**@eslint-react/tools**](../../../../../README.md) • **Docs**

***

[@eslint-react/tools](../../../../../README.md) / [Record](../../../README.md) / [ReadonlyRecord](../README.md) / IsFiniteString

# Type Alias: IsFiniteString\<T\>

> **IsFiniteString**\<`T`\>: `T` *extends* `""` ? `true` : [`T`] *extends* [\`$\{infer Head\}$\{infer Rest\}\`] ? `string` *extends* `Head` ? `false` : \`$\{number\}\` *extends* `Head` ? `false` : `Rest` *extends* `""` ? `true` : [`IsFiniteString`](IsFiniteString.md)\<`Rest`\> : `false`

## Type Parameters

• **T** *extends* `string`

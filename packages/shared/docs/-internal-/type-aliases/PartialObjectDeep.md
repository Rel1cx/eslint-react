[**@eslint-react/shared**](../../README.md)

***

[@eslint-react/shared](../../README.md) / [\<internal\>](../README.md) / PartialObjectDeep

# Type Alias: PartialObjectDeep\<ObjectType, Options\>

> **PartialObjectDeep**\<`ObjectType`, `Options`\>: `{ [KeyType in keyof ObjectType]?: PartialDeep<ObjectType[KeyType], Options> }`

Same as `PartialDeep`, but accepts only `object`s as inputs. Internal helper for `PartialDeep`.

## Type Parameters

• **ObjectType** *extends* `object`

• **Options** *extends* [`PartialDeepOptions`](PartialDeepOptions.md)

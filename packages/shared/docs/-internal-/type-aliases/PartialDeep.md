[**@eslint-react/shared**](../../README.md)

***

[@eslint-react/shared](../../README.md) / [\<internal\>](../README.md) / PartialDeep

# Type Alias: PartialDeep\<T, Options\>

> **PartialDeep**\<`T`, `Options`\>: `T` *extends* [`BuiltIns`](BuiltIns.md) \| (...`arguments_`) => `unknown` \| (...`arguments_`) => `unknown` ? `T` : `T` *extends* [`Map`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Map)\<infer KeyType, infer ValueType\> ? [`PartialMapDeep`](PartialMapDeep.md)\<`KeyType`, `ValueType`, `Options`\> : `T` *extends* [`Set`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Set)\<infer ItemType\> ? [`PartialSetDeep`](PartialSetDeep.md)\<`ItemType`, `Options`\> : `T` *extends* `ReadonlyMap`\<infer KeyType, infer ValueType\> ? [`PartialReadonlyMapDeep`](PartialReadonlyMapDeep.md)\<`KeyType`, `ValueType`, `Options`\> : `T` *extends* `ReadonlySet`\<infer ItemType\> ? [`PartialReadonlySetDeep`](PartialReadonlySetDeep.md)\<`ItemType`, `Options`\> : `T` *extends* `object` ? `T` *extends* `ReadonlyArray`\<infer ItemType\> ? `Options`\[`"recurseIntoArrays"`\] *extends* `true` ? `ItemType`[] *extends* `T` ? readonly ... *extends* `T` ? `ReadonlyArray`\<...\> : ...[] : [`PartialObjectDeep`](PartialObjectDeep.md)\<`T`, `Options`\> : `T` : [`PartialObjectDeep`](PartialObjectDeep.md)\<`T`, `Options`\> : `unknown`

Create a type from another type with all keys and nested keys set to optional.

Use-cases:
- Merging a default settings/config object with another object, the second object would be a deep partial of the default object.
- Mocking and testing complex entities, where populating an entire object with its keys would be redundant in terms of the mock or test.

## Type Parameters

• **T**

• **Options** *extends* [`PartialDeepOptions`](PartialDeepOptions.md) = \{\}

## Example

```
import type {PartialDeep} from 'type-fest';

const settings: Settings = {
	textEditor: {
		fontSize: 14,
		fontColor: '#000000',
		fontWeight: 400
	},
	autocomplete: false,
	autosave: true
};

const applySavedSettings = (savedSettings: PartialDeep<Settings>) => {
	return {...settings, ...savedSettings};
}

settings = applySavedSettings({textEditor: {fontWeight: 500}});
```

By default, this does not affect elements in array and tuple types. You can change this by passing `{recurseIntoArrays: true}` as the second type argument:

```
import type {PartialDeep} from 'type-fest';

type Settings = {
	languages: string[];
}

const partialSettings: PartialDeep<Settings, {recurseIntoArrays: true}> = {
	languages: [undefined]
};
```

## See

[PartialDeepOptions](PartialDeepOptions.md)

[**@eslint-react/shared**](../../README.md)

***

[@eslint-react/shared](../../README.md) / [\<internal\>](../README.md) / PartialDeepOptions

# Type Alias: PartialDeepOptions

> **PartialDeepOptions**: `object`

## Type declaration

### allowUndefinedInNonTupleArrays?

> `readonly` `optional` **allowUndefinedInNonTupleArrays**: `boolean`

Allows `undefined` values in non-tuple arrays.

- When set to `true`, elements of non-tuple arrays can be `undefined`.
- When set to `false`, only explicitly defined elements are allowed in non-tuple arrays, ensuring stricter type checking.

#### Default

```ts
true
```

#### Example

You can prevent `undefined` values in non-tuple arrays by passing `{recurseIntoArrays: true; allowUndefinedInNonTupleArrays: false}` as the second type argument:

```
import type {PartialDeep} from 'type-fest';

type Settings = {
	languages: string[];
};

declare const partialSettings: PartialDeep<Settings, {recurseIntoArrays: true; allowUndefinedInNonTupleArrays: false}>;

partialSettings.languages = [undefined]; // Error
partialSettings.languages = []; // Ok
```

### recurseIntoArrays?

> `readonly` `optional` **recurseIntoArrays**: `boolean`

Whether to affect the individual elements of arrays and tuples.

#### Default

```ts
false
```

## See

[PartialDeep](PartialDeep.md)

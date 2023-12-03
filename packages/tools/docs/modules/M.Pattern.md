[@eslint-react/tools](../README.md) / [M](M.md) / Pattern

# Namespace: Pattern

[M](M.md).Pattern

## Table of contents

### Interfaces

- [unstable\_Fn](../interfaces/M.Pattern.unstable_Fn.md)

### Type Aliases

- [Pattern](M.Pattern.md#pattern)
- [infer](M.Pattern.md#infer)
- [matcher](M.Pattern.md#matcher)
- [narrow](M.Pattern.md#narrow)
- [unstable\_Matchable](M.Pattern.md#unstable_matchable)
- [unstable\_Matcher](M.Pattern.md#unstable_matcher)

### Variables

- [\_](M.Pattern.md#_)
- [any](M.Pattern.md#any)
- [bigint](M.Pattern.md#bigint)
- [boolean](M.Pattern.md#boolean)
- [matcher](M.Pattern.md#matcher-1)
- [nullish](M.Pattern.md#nullish)
- [number](M.Pattern.md#number)
- [string](M.Pattern.md#string)
- [symbol](M.Pattern.md#symbol)

### Functions

- [array](M.Pattern.md#array)
- [instanceOf](M.Pattern.md#instanceof)
- [intersection](M.Pattern.md#intersection)
- [map](M.Pattern.md#map)
- [not](M.Pattern.md#not)
- [optional](M.Pattern.md#optional)
- [select](M.Pattern.md#select)
- [set](M.Pattern.md#set)
- [shape](M.Pattern.md#shape)
- [union](M.Pattern.md#union)
- [when](M.Pattern.md#when)

## Type Aliases

### Pattern

Ƭ **Pattern**\<`a`\>: `unknown` extends `a` ? `UnknownPattern` : `KnownPattern`\<`a`\>

`Pattern<a>` is the generic type for patterns matching a value of type `a`. A pattern can be any (nested) javascript value.

They can also be wildcards, like `P._`, `P.string`, `P.number`,
or other matchers, like `P.when(predicate)`, `P.not(pattern)`, etc.

[Read the documentation for `P.Pattern` on GitHub](https://github.com/gvergnaud/ts-pattern#patterns)

**`Example`**

```ts
const pattern: P.Pattern<User> = { name: P.string };
```

#### Type parameters

| Name |
| :--- |
| `a`  |

---

### infer

Ƭ **infer**\<`pattern`\>: `InvertPattern`\<`pattern`, `unknown`\>

`P.infer<typeof somePattern>` will return the type of the value
matched by this pattern.

[Read the documentation for `P.infer` on GitHub](https://github.com/gvergnaud/ts-pattern#pinfer)

**`Example`**

```ts
const userPattern = { name: P.string };
type User = P.infer<typeof userPattern>;
```

#### Type parameters

| Name      | Type                                               |
| :-------- | :------------------------------------------------- |
| `pattern` | extends [`Pattern`](M.Pattern.md#pattern)\<`any`\> |

---

### matcher

Ƭ **matcher**: typeof [`matcher`](M.Pattern.md#matcher-1)

---

### narrow

Ƭ **narrow**\<`input`, `pattern`\>: `ExtractPreciseValue`\<`input`, `InvertPattern`\<`pattern`, `input`\>\>

`P.narrow<Input, Pattern>` will narrow the input type to only keep
the set of values that are compatible with the provided pattern type.

[Read the documentation for `P.narrow` on GitHub](https://github.com/gvergnaud/ts-pattern#pnarrow)

**`Example`**

```ts
type Input = ["a" | "b" | "c", "a" | "b" | "c"];
const Pattern = ["a", P.union("a", "b")] as const;

type Narrowed = P.narrow<Input, typeof Pattern>;
//     ^? ['a', 'a' | 'b']
```

#### Type parameters

| Name      | Type                                               |
| :-------- | :------------------------------------------------- |
| `input`   | `input`                                            |
| `pattern` | extends [`Pattern`](M.Pattern.md#pattern)\<`any`\> |

---

### unstable\_Matchable

Ƭ **unstable\_Matchable**\<`narrowedOrFn`, `input`, `pattern`\>: `CustomP`\<`input`, `pattern`, `narrowedOrFn`\>

A `Matchable` is an object implementing
the Matcher Protocol. It must have a `[P.matcher]: P.Matcher<NarrowFn>`
key, which defines how this object should be matched by TS-Pattern.

Note that this api is unstable.

**`Example`**

```ts
class Some<T> implements P.unstable_Matchable {
  [P.matcher](): P.unstable_Matcher<Some<T>>;
}
```

#### Type parameters

| Name           | Type           |
| :------------- | :------------- |
| `narrowedOrFn` | `narrowedOrFn` |
| `input`        | `unknown`      |
| `pattern`      | `never`        |

---

### unstable\_Matcher

Ƭ **unstable\_Matcher**\<`narrowedOrFn`, `input`, `pattern`\>: `ReturnType`\<`CustomP`\<`input`, `pattern`, `narrowedOrFn`\>[[`matcher`](M.Pattern.md#matcher-1)]\>

A `Matcher` is an object with `match` function, which
defines how this object should be matched by TS-Pattern.

Note that this api is unstable.

**`Example`**

```ts
class Some<T> implements P.unstable_Matchable {
  [P.matcher](): P.unstable_Matcher<Some<T>>;
}
```

#### Type parameters

| Name           | Type           |
| :------------- | :------------- |
| `narrowedOrFn` | `narrowedOrFn` |
| `input`        | `unknown`      |
| `pattern`      | `never`        |

## Variables

### \_

• `Const` **\_**: `AnyPattern`

`P._` is a wildcard pattern, matching **any value**.
It's an alias to `P.any`.

[Read the documentation for `P._` on GitHub](https://github.com/gvergnaud/ts-pattern#p_-wildcard)

**`Example`**

```ts
match(value)
  .with(P._, () => "will always match");
```

---

### any

• `Const` **any**: `AnyPattern`

`P.any` is a wildcard pattern, matching **any value**.

[Read the documentation for `P.any` on GitHub](https://github.com/gvergnaud/ts-pattern#p_-wildcard)

**`Example`**

```ts
match(value)
  .with(P.any, () => "will always match");
```

---

### bigint

• `Const` **bigint**: `BigIntPattern`

`P.bigint` is a wildcard pattern, matching any **bigint**.

[Read the documentation for `P.bigint` on GitHub](https://github.com/gvergnaud/ts-pattern#number-wildcard)

**`Example`**

```ts
.with(P.bigint, () => 'will match on bigints')
```

---

### boolean

• `Const` **boolean**: `BooleanPattern`

`P.boolean` is a wildcard pattern, matching any **boolean**.

[Read the documentation for `P.boolean` on GitHub](https://github.com/gvergnaud/ts-pattern#boolean-wildcard)

**`Example`**

```ts
.with(P.boolean, () => 'will match on booleans')
```

---

### matcher

• `Const` **matcher**: unique `symbol`

---

### nullish

• `Const` **nullish**: `NullishPattern`

`P.nullish` is a wildcard pattern, matching **null** or **undefined**.

[Read the documentation for `P.nullish` on GitHub](https://github.com/gvergnaud/ts-pattern#nullish-wildcard)

**`Example`**

```ts
.with(P.nullish, () => 'will match on null or undefined')
```

---

### number

• `Const` **number**: `NumberPattern`

`P.number` is a wildcard pattern, matching any **number**.

[Read the documentation for `P.number` on GitHub](https://github.com/gvergnaud/ts-pattern#pnumber-wildcard)

**`Example`**

```ts
match(value)
  .with(P.number, () => "will match on numbers");
```

---

### string

• `Const` **string**: `StringPattern`

`P.string` is a wildcard pattern, matching any **string**.

[Read the documentation for `P.string` on GitHub](https://github.com/gvergnaud/ts-pattern#pstring-wildcard)

**`Example`**

```ts
match(value)
  .with(P.string, () => "will match on strings");
```

---

### symbol

• `Const` **symbol**: `SymbolPattern`

`P.symbol` is a wildcard pattern, matching any **symbol**.

[Read the documentation for `P.symbol` on GitHub](https://github.com/gvergnaud/ts-pattern#symbol-wildcard)

**`Example`**

```ts
.with(P.symbol, () => 'will match on symbols')
```

## Functions

### array

▸ **array**\<`input`\>(): `ArrayChainable`\<`ArrayP`\<`input`, `unknown`\>\>

`P.array(subpattern)` takes a sub pattern and returns a pattern, which matches
arrays if all their elements match the sub pattern.

[Read the documentation for `P.array` on GitHub](https://github.com/gvergnaud/ts-pattern#parray-patterns)

#### Type parameters

| Name    |
| :------ |
| `input` |

#### Returns

`ArrayChainable`\<`ArrayP`\<`input`, `unknown`\>\>

**`Example`**

```ts
match(value)
  .with({ users: P.array({ name: P.string }) }, () => "will match { name: string }[]");
```

▸ **array**\<`input`, `pattern`\>(`pattern`): `ArrayChainable`\<`ArrayP`\<`input`, `pattern`\>\>

#### Type parameters

| Name      | Type                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| :-------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `input`   | `input`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `pattern` | extends `undefined` \| `null` \| `string` \| `number` \| `bigint` \| `boolean` \| `symbol` \| readonly [] \| readonly [`unknown`, `unknown`] \| readonly [`unknown`, `unknown`] \| \{ `[k: string]`: `unknown`; } \| `UnknownMatcher` \| readonly [`UnknownPattern`, `UnknownPattern`] \| readonly [`UnknownPattern`, `UnknownPattern`] \| `PatternMatcher`\<`WithDefault`\<`UnwrapArray`\<`input`\>, `unknown`\>\> \| \{ readonly [k in string \| number \| symbol]?: Pattern\<Readonly\<MergeUnion\<Exclude\<WithDefault\<UnwrapArray\<input\>, unknown\>, readonly any[] \| Primitives \| Map\<any, any\> \| Set\<any\>\>\>\>[k]\> } |

#### Parameters

| Name      | Type      |
| :-------- | :-------- |
| `pattern` | `pattern` |

#### Returns

`ArrayChainable`\<`ArrayP`\<`input`, `pattern`\>\>

---

### instanceOf

▸ **instanceOf**\<`T`\>(`classConstructor`): `Chainable`\<`GuardP`\<`unknown`, `InstanceType`\<`T`\>\>\>

`P.instanceOf(SomeClass)` is a pattern matching instances of a given class.

[Read the documentation for `P.instanceOf` on GitHub](https://github.com/gvergnaud/ts-pattern#pinstanceof-patterns)

#### Type parameters

| Name | Type                     |
| :--- | :----------------------- |
| `T`  | extends `AnyConstructor` |

#### Parameters

| Name               | Type |
| :----------------- | :--- |
| `classConstructor` | `T`  |

#### Returns

`Chainable`\<`GuardP`\<`unknown`, `InstanceType`\<`T`\>\>\>

**`Example`**

```ts
.with(P.instanceOf(SomeClass), () => 'will match on SomeClass instances')
```

---

### intersection

▸ **intersection**\<`input`, `patterns`\>(`...patterns`): `Chainable`\<`AndP`\<`input`, `patterns`\>\>

`P.intersection(...patterns)` returns a pattern which matches
only if **every** patterns provided in parameter match the input.

[Read the documentation for `P.intersection` on GitHub](https://github.com/gvergnaud/ts-pattern#pintersection-patterns)

#### Type parameters

| Name       | Type                                                                                                          |
| :--------- | :------------------------------------------------------------------------------------------------------------ |
| `input`    | `input`                                                                                                       |
| `patterns` | extends readonly [[`Pattern`](M.Pattern.md#pattern)\<`input`\>, [`Pattern`](M.Pattern.md#pattern)\<`input`\>] |

#### Parameters

| Name          | Type       |
| :------------ | :--------- |
| `...patterns` | `patterns` |

#### Returns

`Chainable`\<`AndP`\<`input`, `patterns`\>\>

**`Example`**

```ts
match(value)
  .with(
    {
      user: P.intersection(
        { firstname: P.string },
        { lastname: P.string },
        { age: P.when(age => age > 21) },
      ),
    },
    ({ user }) => "will match { firstname: string, lastname: string, age: number } if age > 21",
  );
```

---

### map

▸ **map**\<`input`\>(): `Chainable`\<`MapP`\<`input`, `unknown`, `unknown`\>\>

`P.set(subpattern)` takes a sub pattern and returns a pattern that matches
sets if all their elements match the sub pattern.

[Read `P.set` documentation on GitHub](https://github.com/gvergnaud/ts-pattern#pset-patterns)

#### Type parameters

| Name    |
| :------ |
| `input` |

#### Returns

`Chainable`\<`MapP`\<`input`, `unknown`, `unknown`\>\>

**`Example`**

```ts
match(value)
  .with({ users: P.set(P.string) }, () => "will match Set<string>");
```

▸ **map**\<`input`, `pkey`, `pvalue`\>(`patternKey`, `patternValue`): `Chainable`\<`MapP`\<`input`, `pkey`, `pvalue`\>\>

#### Type parameters

| Name     | Type                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| :------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `input`  | `input`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `pkey`   | extends `undefined` \| `null` \| `string` \| `number` \| `bigint` \| `boolean` \| `symbol` \| readonly [] \| readonly [`unknown`, `unknown`] \| readonly [`unknown`, `unknown`] \| \{ `[k: string]`: `unknown`; } \| `UnknownMatcher` \| readonly [`UnknownPattern`, `UnknownPattern`] \| readonly [`UnknownPattern`, `UnknownPattern`] \| `PatternMatcher`\<`WithDefault`\<`UnwrapMapKey`\<`input`\>, `unknown`\>\> \| \{ readonly [k in string \| number \| symbol]?: Pattern\<Readonly\<MergeUnion\<Exclude\<WithDefault\<UnwrapMapKey\<input\>, unknown\>, readonly any[] \| Primitives \| Map\<any, any\> \| Set\<any\>\>\>\>[k]\> }     |
| `pvalue` | extends `undefined` \| `null` \| `string` \| `number` \| `bigint` \| `boolean` \| `symbol` \| readonly [] \| readonly [`unknown`, `unknown`] \| readonly [`unknown`, `unknown`] \| \{ `[k: string]`: `unknown`; } \| `UnknownMatcher` \| readonly [`UnknownPattern`, `UnknownPattern`] \| readonly [`UnknownPattern`, `UnknownPattern`] \| `PatternMatcher`\<`WithDefault`\<`UnwrapMapValue`\<`input`\>, `unknown`\>\> \| \{ readonly [k in string \| number \| symbol]?: Pattern\<Readonly\<MergeUnion\<Exclude\<WithDefault\<UnwrapMapValue\<input\>, unknown\>, readonly any[] \| Primitives \| Map\<any, any\> \| Set\<any\>\>\>\>[k]\> } |

#### Parameters

| Name           | Type     |
| :------------- | :------- |
| `patternKey`   | `pkey`   |
| `patternValue` | `pvalue` |

#### Returns

`Chainable`\<`MapP`\<`input`, `pkey`, `pvalue`\>\>

---

### not

▸ **not**\<`input`, `pattern`\>(`pattern`): `Chainable`\<`NotP`\<`input`, `pattern`\>\>

`P.not(pattern)` returns a pattern which matches if the sub pattern
doesn't match.

[Read the documentation for `P.not` on GitHub](https://github.com/gvergnaud/ts-pattern#pnot-patterns)

#### Type parameters

| Name      | Type                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| :-------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `input`   | `input`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `pattern` | extends `undefined` \| `null` \| `string` \| `number` \| `bigint` \| `boolean` \| `symbol` \| readonly [] \| readonly [`unknown`, `unknown`] \| readonly [`unknown`, `unknown`] \| \{ `[k: string]`: `unknown`; } \| `UnknownMatcher` \| readonly [`UnknownPattern`, `UnknownPattern`] \| readonly [`UnknownPattern`, `UnknownPattern`] \| `PatternMatcher`\<`input`\> \| \{ readonly [k in string \| number \| symbol]?: Pattern\<Readonly\<MergeUnion\<Exclude\<input, readonly any[] \| Primitives \| Map\<any, any\> \| Set\<any\>\>\>\>[k]\> } |

#### Parameters

| Name      | Type      |
| :-------- | :-------- |
| `pattern` | `pattern` |

#### Returns

`Chainable`\<`NotP`\<`input`, `pattern`\>\>

**`Example`**

```ts
match<{ a: string | number }>(value)
  .with({ a: P.not(P.string) }, (x) => "will match { a: number }");
```

---

### optional

▸ **optional**\<`input`, `pattern`\>(`pattern`): `Chainable`\<`OptionalP`\<`input`, `pattern`\>, `"optional"`\>

`P.optional(subpattern)` takes a sub pattern and returns a pattern which matches if the
key is undefined or if it is defined and the sub pattern matches its value.

[Read the documentation for `P.optional` on GitHub](https://github.com/gvergnaud/ts-pattern#poptional-patterns)

#### Type parameters

| Name      | Type                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| :-------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `input`   | `input`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `pattern` | extends `undefined` \| `null` \| `string` \| `number` \| `bigint` \| `boolean` \| `symbol` \| readonly [] \| readonly [`unknown`, `unknown`] \| readonly [`unknown`, `unknown`] \| \{ `[k: string]`: `unknown`; } \| `UnknownMatcher` \| `PatternMatcher`\<`input`\> \| \{ readonly [k in string \| number \| symbol]?: Pattern\<Readonly\<MergeUnion\<Exclude\<input, readonly any[] \| Primitives \| Map\<any, any\> \| Set\<any\>\>\>\>[k]\> } \| readonly [`UnknownPattern`, `UnknownPattern`] \| readonly [`UnknownPattern`, `UnknownPattern`] |

#### Parameters

| Name      | Type      |
| :-------- | :-------- |
| `pattern` | `pattern` |

#### Returns

`Chainable`\<`OptionalP`\<`input`, `pattern`\>, `"optional"`\>

**`Example`**

```ts
match(value)
  .with({ greeting: P.optional("Hello") }, () => 'will match { greeting?: "Hello" }');
```

---

### select

▸ **select**(): `Chainable`\<`AnonymousSelectP`, `"select"` \| `"or"` \| `"and"`\>

`P.select()` is a pattern which will always match,
and will inject the selected piece of input in the handler function.

[Read the documentation for `P.select` on GitHub](https://github.com/gvergnaud/ts-pattern#pselect-patterns)

#### Returns

`Chainable`\<`AnonymousSelectP`, `"select"` \| `"or"` \| `"and"`\>

**`Example`**

```ts
match<{ age: number }>(value)
  .with({ age: P.select() }, (age) => "age: number");
```

▸ **select**\<`input`, `patternOrKey`\>(`patternOrKey`): `patternOrKey` extends `string` ? `Chainable`\<`SelectP`\<`patternOrKey`, `"select"` \| `"or"` \| `"and"`\>\> : `Chainable`\<`SelectP`\<`symbols.anonymousSelectKey`, `input`, `patternOrKey`\>, `"select"` \| `"or"` \| `"and"`\>

#### Type parameters

| Name           | Type                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| :------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `input`        | `input`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `patternOrKey` | extends `undefined` \| `null` \| `string` \| `number` \| `bigint` \| `boolean` \| `symbol` \| readonly [] \| readonly [`unknown`, `unknown`] \| readonly [`unknown`, `unknown`] \| \{ `[k: string]`: `unknown`; } \| `UnknownMatcher` \| readonly [`UnknownPattern`, `UnknownPattern`] \| readonly [`UnknownPattern`, `UnknownPattern`] \| `PatternMatcher`\<`input`\> \| \{ readonly [k in string \| number \| symbol]?: Pattern\<Readonly\<MergeUnion\<Exclude\<input, readonly any[] \| Primitives \| Map\<any, any\> \| Set\<any\>\>\>\>[k]\> } |

#### Parameters

| Name           | Type           |
| :------------- | :------------- |
| `patternOrKey` | `patternOrKey` |

#### Returns

`patternOrKey` extends `string` ? `Chainable`\<`SelectP`\<`patternOrKey`, `"select"` \| `"or"` \| `"and"`\>\> : `Chainable`\<`SelectP`\<`symbols.anonymousSelectKey`, `input`, `patternOrKey`\>, `"select"` \| `"or"` \| `"and"`\>

▸ **select**\<`input`, `pattern`, `k`\>(`key`, `pattern`): `Chainable`\<`SelectP`\<`k`, `input`, `pattern`\>, `"select"` \| `"or"` \| `"and"`\>

#### Type parameters

| Name      | Type                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| :-------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `input`   | `input`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `pattern` | extends `undefined` \| `null` \| `string` \| `number` \| `bigint` \| `boolean` \| `symbol` \| readonly [] \| readonly [`unknown`, `unknown`] \| readonly [`unknown`, `unknown`] \| \{ `[k: string]`: `unknown`; } \| `UnknownMatcher` \| readonly [`UnknownPattern`, `UnknownPattern`] \| readonly [`UnknownPattern`, `UnknownPattern`] \| `PatternMatcher`\<`input`\> \| \{ readonly [k in string \| number \| symbol]?: Pattern\<Readonly\<MergeUnion\<Exclude\<input, readonly any[] \| Primitives \| Map\<any, any\> \| Set\<any\>\>\>\>[k]\> } |
| `k`       | extends `string`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |

#### Parameters

| Name      | Type      |
| :-------- | :-------- |
| `key`     | `k`       |
| `pattern` | `pattern` |

#### Returns

`Chainable`\<`SelectP`\<`k`, `input`, `pattern`\>, `"select"` \| `"or"` \| `"and"`\>

---

### set

▸ **set**\<`input`\>(): `Chainable`\<`SetP`\<`input`, `unknown`\>\>

`P.set(subpattern)` takes a sub pattern and returns a pattern that matches
sets if all their elements match the sub pattern.

[Read `P.set` documentation on GitHub](https://github.com/gvergnaud/ts-pattern#pset-patterns)

#### Type parameters

| Name    |
| :------ |
| `input` |

#### Returns

`Chainable`\<`SetP`\<`input`, `unknown`\>\>

**`Example`**

```ts
match(value)
  .with({ users: P.set(P.string) }, () => "will match Set<string>");
```

▸ **set**\<`input`, `pattern`\>(`pattern`): `Chainable`\<`SetP`\<`input`, `pattern`\>\>

#### Type parameters

| Name      | Type                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| :-------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `input`   | `input`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `pattern` | extends `undefined` \| `null` \| `string` \| `number` \| `bigint` \| `boolean` \| `symbol` \| readonly [] \| readonly [`unknown`, `unknown`] \| readonly [`unknown`, `unknown`] \| \{ `[k: string]`: `unknown`; } \| `UnknownMatcher` \| readonly [`UnknownPattern`, `UnknownPattern`] \| readonly [`UnknownPattern`, `UnknownPattern`] \| `PatternMatcher`\<`WithDefault`\<`UnwrapSet`\<`input`\>, `unknown`\>\> \| \{ readonly [k in string \| number \| symbol]?: Pattern\<Readonly\<MergeUnion\<Exclude\<WithDefault\<UnwrapSet\<input\>, unknown\>, readonly any[] \| Primitives \| Map\<any, any\> \| Set\<any\>\>\>\>[k]\> } |

#### Parameters

| Name      | Type      |
| :-------- | :-------- |
| `pattern` | `pattern` |

#### Returns

`Chainable`\<`SetP`\<`input`, `pattern`\>\>

---

### shape

▸ **shape**\<`input`, `pattern`\>(`pattern`): `Chainable`\<`GuardP`\<`input`, `InvertPattern`\<`pattern`, `input`\>\>\>

`P.shape(somePattern)` lets you call methods like `.optional()`, `.and`, `.or` and `.select()`
On structural patterns, like objects and arrays.

[Read the documentation for `P.shape` on GitHub](https://github.com/gvergnaud/ts-pattern#pshape-patterns)

#### Type parameters

| Name      | Type                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| :-------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `input`   | `input`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `pattern` | extends `undefined` \| `null` \| `string` \| `number` \| `bigint` \| `boolean` \| `symbol` \| readonly [] \| readonly [`unknown`, `unknown`] \| readonly [`unknown`, `unknown`] \| \{ `[k: string]`: `unknown`; } \| `UnknownMatcher` \| readonly [`UnknownPattern`, `UnknownPattern`] \| readonly [`UnknownPattern`, `UnknownPattern`] \| `PatternMatcher`\<`input`\> \| \{ readonly [k in string \| number \| symbol]?: Pattern\<Readonly\<MergeUnion\<Exclude\<input, readonly any[] \| Primitives \| Map\<any, any\> \| Set\<any\>\>\>\>[k]\> } |

#### Parameters

| Name      | Type      |
| :-------- | :-------- |
| `pattern` | `pattern` |

#### Returns

`Chainable`\<`GuardP`\<`input`, `InvertPattern`\<`pattern`, `input`\>\>\>

**`Example`**

```ts
.with(
    {
      state: P.shape({ status: "success" }).optional().select()
    },
    (state) => 'match the success state, or undefined.'
  )
```

---

### union

▸ **union**\<`input`, `patterns`\>(`...patterns`): `Chainable`\<`OrP`\<`input`, `patterns`\>\>

`P.union(...patterns)` returns a pattern which matches
if **at least one** of the patterns provided in parameter match the input.

[Read the documentation for `P.union` on GitHub](https://github.com/gvergnaud/ts-pattern#punion-patterns)

#### Type parameters

| Name       | Type                                                                                                          |
| :--------- | :------------------------------------------------------------------------------------------------------------ |
| `input`    | `input`                                                                                                       |
| `patterns` | extends readonly [[`Pattern`](M.Pattern.md#pattern)\<`input`\>, [`Pattern`](M.Pattern.md#pattern)\<`input`\>] |

#### Parameters

| Name          | Type       |
| :------------ | :--------- |
| `...patterns` | `patterns` |

#### Returns

`Chainable`\<`OrP`\<`input`, `patterns`\>\>

**`Example`**

```ts
match(value)
  .with(
    { type: P.union("a", "b", "c") },
    ({ type }) => 'will match { type: "a" | "b" | "c" }',
  );
```

---

### when

▸ **when**\<`input`, `predicate`\>(`predicate`): `GuardP`\<`input`, `predicate` extends (`value`: `any`) => value is infer narrowed ? `narrowed` : `never`\>

`P.when((value) => boolean)` returns a pattern which matches
if the predicate returns true for the current input.

[Read the documentation for `P.when` on GitHub](https://github.com/gvergnaud/ts-pattern#pwhen-patterns)

#### Type parameters

| Name        | Type                                    |
| :---------- | :-------------------------------------- |
| `input`     | `input`                                 |
| `predicate` | extends (`value`: `input`) => `unknown` |

#### Parameters

| Name        | Type        |
| :---------- | :---------- |
| `predicate` | `predicate` |

#### Returns

`GuardP`\<`input`, `predicate` extends (`value`: `any`) => value is infer narrowed ? `narrowed` : `never`\>

**`Example`**

```ts
match<{ age: number }>(value)
  .with({ age: P.when(age => age > 21) }, (x) => "will match if value.age > 21");
```

▸ **when**\<`input`, `narrowed`, `excluded`\>(`predicate`): `GuardExcludeP`\<`input`, `narrowed`, `excluded`\>

#### Type parameters

| Name       |
| :--------- |
| `input`    |
| `narrowed` |
| `excluded` |

#### Parameters

| Name        | Type                                    |
| :---------- | :-------------------------------------- |
| `predicate` | (`input`: `input`) => input is narrowed |

#### Returns

`GuardExcludeP`\<`input`, `narrowed`, `excluded`\>

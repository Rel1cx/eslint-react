[eslint-plugin-react-ts](../README.md) / [src/lib/primitives](src_lib_primitives.md) / Str

# Namespace: Str

[src/lib/primitives](src_lib_primitives.md).Str

## Table of contents

### Type Aliases

- [Concat](src_lib_primitives.Str.md#concat)
- [Trim](src_lib_primitives.Str.md#trim)
- [TrimEnd](src_lib_primitives.Str.md#trimend)
- [TrimStart](src_lib_primitives.Str.md#trimstart)

### Variables

- [empty](src_lib_primitives.Str.md#empty)

### Functions

- [Equivalence](src_lib_primitives.Str.md#equivalence)
- [Order](src_lib_primitives.Str.md#order)
- [at](src_lib_primitives.Str.md#at)
- [capitalize](src_lib_primitives.Str.md#capitalize)
- [charAt](src_lib_primitives.Str.md#charat)
- [charCodeAt](src_lib_primitives.Str.md#charcodeat)
- [codePointAt](src_lib_primitives.Str.md#codepointat)
- [concat](src_lib_primitives.Str.md#concat-1)
- [endsWith](src_lib_primitives.Str.md#endswith)
- [includes](src_lib_primitives.Str.md#includes)
- [indexOf](src_lib_primitives.Str.md#indexof)
- [isEmpty](src_lib_primitives.Str.md#isempty)
- [isNonEmpty](src_lib_primitives.Str.md#isnonempty)
- [isString](src_lib_primitives.Str.md#isstring)
- [lastIndexOf](src_lib_primitives.Str.md#lastindexof)
- [length](src_lib_primitives.Str.md#length)
- [linesWithSeparators](src_lib_primitives.Str.md#lineswithseparators)
- [localeCompare](src_lib_primitives.Str.md#localecompare)
- [match](src_lib_primitives.Str.md#match)
- [matchAll](src_lib_primitives.Str.md#matchall)
- [normalize](src_lib_primitives.Str.md#normalize)
- [padEnd](src_lib_primitives.Str.md#padend)
- [padStart](src_lib_primitives.Str.md#padstart)
- [repeat](src_lib_primitives.Str.md#repeat)
- [replace](src_lib_primitives.Str.md#replace)
- [replaceAll](src_lib_primitives.Str.md#replaceall)
- [search](src_lib_primitives.Str.md#search)
- [slice](src_lib_primitives.Str.md#slice)
- [split](src_lib_primitives.Str.md#split)
- [startsWith](src_lib_primitives.Str.md#startswith)
- [stripMargin](src_lib_primitives.Str.md#stripmargin)
- [stripMarginWith](src_lib_primitives.Str.md#stripmarginwith)
- [substring](src_lib_primitives.Str.md#substring)
- [takeLeft](src_lib_primitives.Str.md#takeleft)
- [takeRight](src_lib_primitives.Str.md#takeright)
- [toLocaleLowerCase](src_lib_primitives.Str.md#tolocalelowercase)
- [toLocaleUpperCase](src_lib_primitives.Str.md#tolocaleuppercase)
- [toLowerCase](src_lib_primitives.Str.md#tolowercase)
- [toUpperCase](src_lib_primitives.Str.md#touppercase)
- [trim](src_lib_primitives.Str.md#trim-1)
- [trimEnd](src_lib_primitives.Str.md#trimend-1)
- [trimStart](src_lib_primitives.Str.md#trimstart-1)
- [uncapitalize](src_lib_primitives.Str.md#uncapitalize)

## Other

### Concat

Ƭ **Concat**<`A`, `B`\>: \`${A}${B}\`

Concatenates two strings at the type level.

**`Since`**

1.0.0

#### Type parameters

| Name | Type |
| :------ | :------ |
| `A` | extends `string` |
| `B` | extends `string` |

___

### Trim

Ƭ **Trim**<`A`\>: [`TrimEnd`](src_lib_primitives.Str.md#trimend)<[`TrimStart`](src_lib_primitives.Str.md#trimstart)<`A`\>\>

**`Since`**

1.0.0

#### Type parameters

| Name | Type |
| :------ | :------ |
| `A` | extends `string` |

___

### TrimEnd

Ƭ **TrimEnd**<`A`\>: `A` extends \`${infer B} \` ? [`TrimEnd`](src_lib_primitives.Str.md#trimend)<`B`\> : `A` extends \`${infer B}
\` ? [`TrimEnd`](src_lib_primitives.Str.md#trimend)<`B`\> : `A` extends \`${infer B}	\` ? [`TrimEnd`](src_lib_primitives.Str.md#trimend)<`B`\> : `A` extends \`${infer B}\` ? [`TrimEnd`](src_lib_primitives.Str.md#trimend)<`B`\> : `A`

**`Since`**

1.0.0

#### Type parameters

| Name | Type |
| :------ | :------ |
| `A` | extends `string` |

___

### TrimStart

Ƭ **TrimStart**<`A`\>: `A` extends \` ${infer B}\` ? [`TrimStart`](src_lib_primitives.Str.md#trimstart)<`B`\> : `A` extends \`
${infer B}\` ? [`TrimStart`](src_lib_primitives.Str.md#trimstart)<`B`\> : `A` extends \`	${infer B}\` ? [`TrimStart`](src_lib_primitives.Str.md#trimstart)<`B`\> : `A` extends \`${infer B}\` ? [`TrimStart`](src_lib_primitives.Str.md#trimstart)<`B`\> : `A`

**`Since`**

1.0.0

#### Type parameters

| Name | Type |
| :------ | :------ |
| `A` | extends `string` |

___

### empty

• `Const` **empty**: ``""``

The empty string `""`.

**`Since`**

1.0.0

___

### at

▸ **at**(`index`): (`self`: `string`) => [`Option`](src_lib_primitives.O.md#option)<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `index` | `number` |

#### Returns

`fn`

▸ (`self`): [`Option`](src_lib_primitives.O.md#option)<`string`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `string` |

##### Returns

[`Option`](src_lib_primitives.O.md#option)<`string`\>

**`Example`**

```ts
import * as S from '@effect/data/String'
import * as Option from '@effect/data/Option'
import { pipe } from '@effect/data/Function'

assert.deepStrictEqual(pipe("abc", S.at(1)), Option.some("b"))
assert.deepStrictEqual(pipe("abc", S.at(4)), Option.none())
```

**`Since`**

1.0.0

▸ **at**(`self`, `index`): [`Option`](src_lib_primitives.O.md#option)<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `string` |
| `index` | `number` |

#### Returns

[`Option`](src_lib_primitives.O.md#option)<`string`\>

**`Example`**

```ts
import * as S from '@effect/data/String'
import * as Option from '@effect/data/Option'
import { pipe } from '@effect/data/Function'

assert.deepStrictEqual(pipe("abc", S.at(1)), Option.some("b"))
assert.deepStrictEqual(pipe("abc", S.at(4)), Option.none())
```

**`Since`**

1.0.0

___

### capitalize

▸ **capitalize**<`T`\>(`self`): `Capitalize`<`T`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `string` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `T` |

#### Returns

`Capitalize`<`T`\>

**`Example`**

```ts
import * as S from '@effect/data/String'
import { pipe } from '@effect/data/Function'

assert.deepStrictEqual(pipe('abc', S.capitalize), 'Abc')
```

**`Since`**

1.0.0

___

### charAt

▸ **charAt**(`index`): (`self`: `string`) => [`Option`](src_lib_primitives.O.md#option)<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `index` | `number` |

#### Returns

`fn`

▸ (`self`): [`Option`](src_lib_primitives.O.md#option)<`string`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `string` |

##### Returns

[`Option`](src_lib_primitives.O.md#option)<`string`\>

**`Example`**

```ts
import * as S from '@effect/data/String'
import * as Option from '@effect/data/Option'
import { pipe } from '@effect/data/Function'

assert.deepStrictEqual(pipe("abc", S.charAt(1)), Option.some("b"))
assert.deepStrictEqual(pipe("abc", S.charAt(4)), Option.none())
```

**`Since`**

1.0.0

▸ **charAt**(`self`, `index`): [`Option`](src_lib_primitives.O.md#option)<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `string` |
| `index` | `number` |

#### Returns

[`Option`](src_lib_primitives.O.md#option)<`string`\>

**`Example`**

```ts
import * as S from '@effect/data/String'
import * as Option from '@effect/data/Option'
import { pipe } from '@effect/data/Function'

assert.deepStrictEqual(pipe("abc", S.charAt(1)), Option.some("b"))
assert.deepStrictEqual(pipe("abc", S.charAt(4)), Option.none())
```

**`Since`**

1.0.0

___

### charCodeAt

▸ **charCodeAt**(`index`): (`self`: `string`) => [`Option`](src_lib_primitives.O.md#option)<`number`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `index` | `number` |

#### Returns

`fn`

▸ (`self`): [`Option`](src_lib_primitives.O.md#option)<`number`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `string` |

##### Returns

[`Option`](src_lib_primitives.O.md#option)<`number`\>

**`Example`**

```ts
import * as S from '@effect/data/String'
import * as Option from '@effect/data/Option'
import { pipe } from '@effect/data/Function'

assert.deepStrictEqual(pipe("abc", S.charCodeAt(1)), Option.some(98))
assert.deepStrictEqual(pipe("abc", S.charCodeAt(4)), Option.none())
```

**`Since`**

1.0.0

▸ **charCodeAt**(`self`, `index`): [`Option`](src_lib_primitives.O.md#option)<`number`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `string` |
| `index` | `number` |

#### Returns

[`Option`](src_lib_primitives.O.md#option)<`number`\>

**`Example`**

```ts
import * as S from '@effect/data/String'
import * as Option from '@effect/data/Option'
import { pipe } from '@effect/data/Function'

assert.deepStrictEqual(pipe("abc", S.charCodeAt(1)), Option.some(98))
assert.deepStrictEqual(pipe("abc", S.charCodeAt(4)), Option.none())
```

**`Since`**

1.0.0

___

### codePointAt

▸ **codePointAt**(`index`): (`self`: `string`) => [`Option`](src_lib_primitives.O.md#option)<`number`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `index` | `number` |

#### Returns

`fn`

▸ (`self`): [`Option`](src_lib_primitives.O.md#option)<`number`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `string` |

##### Returns

[`Option`](src_lib_primitives.O.md#option)<`number`\>

**`Example`**

```ts
import * as S from '@effect/data/String'
import * as Option from '@effect/data/Option'
import { pipe } from '@effect/data/Function'

assert.deepStrictEqual(pipe("abc", S.codePointAt(1)), Option.some(98))
```

**`Since`**

1.0.0

▸ **codePointAt**(`self`, `index`): [`Option`](src_lib_primitives.O.md#option)<`number`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `string` |
| `index` | `number` |

#### Returns

[`Option`](src_lib_primitives.O.md#option)<`number`\>

**`Example`**

```ts
import * as S from '@effect/data/String'
import * as Option from '@effect/data/Option'
import { pipe } from '@effect/data/Function'

assert.deepStrictEqual(pipe("abc", S.codePointAt(1)), Option.some(98))
```

**`Since`**

1.0.0

___

### concat

▸ **concat**<`B`\>(`that`): <A\>(`self`: `A`) => \`${A}${B}\`

Concatenates two strings at runtime.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `B` | extends `string` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `that` | `B` |

#### Returns

`fn`

▸ <`A`\>(`self`): \`${A}${B}\`

##### Type parameters

| Name | Type |
| :------ | :------ |
| `A` | extends `string` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `A` |

##### Returns

\`${A}${B}\`

**`Since`**

1.0.0

▸ **concat**<`A`, `B`\>(`self`, `that`): \`${A}${B}\`

Concatenates two strings at runtime.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `A` | extends `string` |
| `B` | extends `string` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `A` |
| `that` | `B` |

#### Returns

\`${A}${B}\`

**`Since`**

1.0.0

___

### endsWith

▸ **endsWith**(`searchString`, `position?`): (`self`: `string`) => `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `searchString` | `string` |
| `position?` | `number` |

#### Returns

`fn`

▸ (`self`): `boolean`

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `string` |

##### Returns

`boolean`

**`Since`**

1.0.0

___

### includes

▸ **includes**(`searchString`, `position?`): (`self`: `string`) => `boolean`

Returns `true` if `searchString` appears as a substring of `self`, at one or more positions that are
greater than or equal to `position`; otherwise, returns `false`.

#### Parameters

| Name | Type |
| :------ | :------ |
| `searchString` | `string` |
| `position?` | `number` |

#### Returns

`fn`

▸ (`self`): `boolean`

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `string` |

##### Returns

`boolean`

**`Since`**

1.0.0

___

### indexOf

▸ **indexOf**(`searchString`): (`self`: `string`) => [`Option`](src_lib_primitives.O.md#option)<`number`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `searchString` | `string` |

#### Returns

`fn`

▸ (`self`): [`Option`](src_lib_primitives.O.md#option)<`number`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `string` |

##### Returns

[`Option`](src_lib_primitives.O.md#option)<`number`\>

**`Example`**

```ts
import * as S from '@effect/data/String'
import * as Option from '@effect/data/Option'
import { pipe } from '@effect/data/Function'

assert.deepStrictEqual(pipe("abbbc", S.indexOf("b")), Option.some(1))
```

**`Since`**

1.0.0

___

### isEmpty

▸ **isEmpty**(`self`): self is ""

Test whether a `string` is empty.

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `string` |

#### Returns

self is ""

**`Example`**

```ts
import * as S from '@effect/data/String'

assert.deepStrictEqual(S.isEmpty(''), true)
assert.deepStrictEqual(S.isEmpty('a'), false)
```

**`Since`**

1.0.0

___

### isNonEmpty

▸ **isNonEmpty**(`self`): `boolean`

Test whether a `string` is non empty.

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `string` |

#### Returns

`boolean`

**`Since`**

1.0.0

___

### lastIndexOf

▸ **lastIndexOf**(`searchString`): (`self`: `string`) => [`Option`](src_lib_primitives.O.md#option)<`number`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `searchString` | `string` |

#### Returns

`fn`

▸ (`self`): [`Option`](src_lib_primitives.O.md#option)<`number`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `string` |

##### Returns

[`Option`](src_lib_primitives.O.md#option)<`number`\>

**`Example`**

```ts
import * as S from '@effect/data/String'
import * as Option from '@effect/data/Option'
import { pipe } from '@effect/data/Function'

assert.deepStrictEqual(pipe("abbbc", S.lastIndexOf("b")), Option.some(3))
assert.deepStrictEqual(pipe("abbbc", S.lastIndexOf("d")), Option.none())
```

**`Since`**

1.0.0

___

### length

▸ **length**(`self`): `number`

Calculate the number of characters in a `string`.

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `string` |

#### Returns

`number`

**`Example`**

```ts
import * as S from '@effect/data/String'

assert.deepStrictEqual(S.length('abc'), 3)
```

**`Since`**

1.0.0

___

### linesWithSeparators

▸ **linesWithSeparators**(`s`): `LinesIterator`

Returns an `IterableIterator` which yields each line contained within the
string as well as the trailing newline character.

#### Parameters

| Name | Type |
| :------ | :------ |
| `s` | `string` |

#### Returns

`LinesIterator`

**`Since`**

1.0.0

___

### localeCompare

▸ **localeCompare**(`that`, `locales?`, `options?`): (`self`: `string`) => `Ordering`

#### Parameters

| Name | Type |
| :------ | :------ |
| `that` | `string` |
| `locales?` | `string`[] |
| `options?` | `CollatorOptions` |

#### Returns

`fn`

▸ (`self`): `Ordering`

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `string` |

##### Returns

`Ordering`

**`Example`**

```ts
import * as S from '@effect/data/String'
import { pipe } from '@effect/data/Function'

assert.deepStrictEqual(pipe("a", S.localeCompare("b")), -1)
assert.deepStrictEqual(pipe("b", S.localeCompare("a")), 1)
assert.deepStrictEqual(pipe("a", S.localeCompare("a")), 0)
```

**`Since`**

1.0.0

___

### match

▸ **match**(`regexp`): (`self`: `string`) => [`Option`](src_lib_primitives.O.md#option)<`RegExpMatchArray`\>

It is the `pipe`-able version of the native `match` method.

#### Parameters

| Name | Type |
| :------ | :------ |
| `regexp` | `string` \| `RegExp` |

#### Returns

`fn`

▸ (`self`): [`Option`](src_lib_primitives.O.md#option)<`RegExpMatchArray`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `string` |

##### Returns

[`Option`](src_lib_primitives.O.md#option)<`RegExpMatchArray`\>

**`Since`**

1.0.0

___

### matchAll

▸ **matchAll**(`regexp`): (`self`: `string`) => `IterableIterator`<`RegExpMatchArray`\>

It is the `pipe`-able version of the native `matchAll` method.

#### Parameters

| Name | Type |
| :------ | :------ |
| `regexp` | `RegExp` |

#### Returns

`fn`

▸ (`self`): `IterableIterator`<`RegExpMatchArray`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `string` |

##### Returns

`IterableIterator`<`RegExpMatchArray`\>

**`Since`**

1.0.0

___

### normalize

▸ **normalize**(`form?`): (`self`: `string`) => `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `form?` | ``"NFC"`` \| ``"NFD"`` \| ``"NFKC"`` \| ``"NFKD"`` |

#### Returns

`fn`

▸ (`self`): `string`

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `string` |

##### Returns

`string`

**`Example`**

```ts
import * as S from '@effect/data/String'
import { pipe } from '@effect/data/Function'

const str = "\u1E9B\u0323";
assert.deepStrictEqual(pipe(str, S.normalize()), "\u1E9B\u0323")
assert.deepStrictEqual(pipe(str, S.normalize("NFC")), "\u1E9B\u0323")
assert.deepStrictEqual(pipe(str, S.normalize("NFD")), "\u017F\u0323\u0307")
assert.deepStrictEqual(pipe(str, S.normalize("NFKC")), "\u1E69")
assert.deepStrictEqual(pipe(str, S.normalize("NFKD")), "\u0073\u0323\u0307")
```

**`Since`**

1.0.0

___

### padEnd

▸ **padEnd**(`maxLength`, `fillString?`): (`self`: `string`) => `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `maxLength` | `number` |
| `fillString?` | `string` |

#### Returns

`fn`

▸ (`self`): `string`

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `string` |

##### Returns

`string`

**`Example`**

```ts
import * as S from '@effect/data/String'
import { pipe } from '@effect/data/Function'

assert.deepStrictEqual(pipe("a", S.padEnd(5)), "a    ")
assert.deepStrictEqual(pipe("a", S.padEnd(5, "_")), "a____")
```

**`Since`**

1.0.0

___

### padStart

▸ **padStart**(`maxLength`, `fillString?`): (`self`: `string`) => `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `maxLength` | `number` |
| `fillString?` | `string` |

#### Returns

`fn`

▸ (`self`): `string`

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `string` |

##### Returns

`string`

**`Example`**

```ts
import * as S from '@effect/data/String'
import { pipe } from '@effect/data/Function'

assert.deepStrictEqual(pipe("a", S.padStart(5)), "    a")
assert.deepStrictEqual(pipe("a", S.padStart(5, "_")), "____a")
```

**`Since`**

1.0.0

___

### repeat

▸ **repeat**(`count`): (`self`: `string`) => `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `count` | `number` |

#### Returns

`fn`

▸ (`self`): `string`

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `string` |

##### Returns

`string`

**`Example`**

```ts
import * as S from '@effect/data/String'
import { pipe } from '@effect/data/Function'

assert.deepStrictEqual(pipe("a", S.repeat(5)), "aaaaa")
```

**`Since`**

1.0.0

___

### replace

▸ **replace**(`searchValue`, `replaceValue`): (`self`: `string`) => `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `searchValue` | `string` \| `RegExp` |
| `replaceValue` | `string` |

#### Returns

`fn`

▸ (`self`): `string`

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `string` |

##### Returns

`string`

**`Example`**

```ts
import * as S from '@effect/data/String'
import { pipe } from '@effect/data/Function'

assert.deepStrictEqual(pipe('abc', S.replace('b', 'd')), 'adc')
```

**`Since`**

1.0.0

___

### replaceAll

▸ **replaceAll**(`searchValue`, `replaceValue`): (`self`: `string`) => `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `searchValue` | `string` \| `RegExp` |
| `replaceValue` | `string` |

#### Returns

`fn`

▸ (`self`): `string`

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `string` |

##### Returns

`string`

**`Example`**

```ts
import * as S from '@effect/data/String'
import { pipe } from '@effect/data/Function'

assert.deepStrictEqual(pipe("ababb", S.replaceAll("b", "c")), "acacc")
assert.deepStrictEqual(pipe("ababb", S.replaceAll(/ba/g, "cc")), "accbb")
```

**`Since`**

1.0.0

___

### search

▸ **search**(`regexp`): (`self`: `string`) => [`Option`](src_lib_primitives.O.md#option)<`number`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `regexp` | `string` \| `RegExp` |

#### Returns

`fn`

▸ (`self`): [`Option`](src_lib_primitives.O.md#option)<`number`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `string` |

##### Returns

[`Option`](src_lib_primitives.O.md#option)<`number`\>

**`Example`**

```ts
import * as S from '@effect/data/String'
import * as Option from '@effect/data/Option'
import { pipe } from '@effect/data/Function'

assert.deepStrictEqual(pipe("ababb", S.search("b")), Option.some(1))
assert.deepStrictEqual(pipe("ababb", S.search(/abb/)), Option.some(2))
assert.deepStrictEqual(pipe("ababb", S.search("d")), Option.none())
```

**`Since`**

1.0.0

▸ **search**(`self`, `regexp`): [`Option`](src_lib_primitives.O.md#option)<`number`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `string` |
| `regexp` | `string` \| `RegExp` |

#### Returns

[`Option`](src_lib_primitives.O.md#option)<`number`\>

**`Example`**

```ts
import * as S from '@effect/data/String'
import * as Option from '@effect/data/Option'
import { pipe } from '@effect/data/Function'

assert.deepStrictEqual(pipe("ababb", S.search("b")), Option.some(1))
assert.deepStrictEqual(pipe("ababb", S.search(/abb/)), Option.some(2))
assert.deepStrictEqual(pipe("ababb", S.search("d")), Option.none())
```

**`Since`**

1.0.0

___

### slice

▸ **slice**(`start?`, `end?`): (`self`: `string`) => `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `start?` | `number` |
| `end?` | `number` |

#### Returns

`fn`

▸ (`self`): `string`

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `string` |

##### Returns

`string`

**`Example`**

```ts
import * as S from '@effect/data/String'
import { pipe } from '@effect/data/Function'

assert.deepStrictEqual(pipe('abcd', S.slice(1, 3)), 'bc')
```

**`Since`**

1.0.0

___

### split

▸ **split**(`separator`): (`self`: `string`) => [`string`, ...string[]]

#### Parameters

| Name | Type |
| :------ | :------ |
| `separator` | `string` \| `RegExp` |

#### Returns

`fn`

▸ (`self`): [`string`, ...string[]]

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `string` |

##### Returns

[`string`, ...string[]]

**`Example`**

```ts
import * as S from '@effect/data/String'
import { pipe } from '@effect/data/Function'

assert.deepStrictEqual(pipe('abc', S.split('')), ['a', 'b', 'c'])
assert.deepStrictEqual(pipe('', S.split('')), [''])
```

**`Since`**

1.0.0

▸ **split**(`self`, `separator`): [`string`, ...string[]]

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `string` |
| `separator` | `string` \| `RegExp` |

#### Returns

[`string`, ...string[]]

**`Example`**

```ts
import * as S from '@effect/data/String'
import { pipe } from '@effect/data/Function'

assert.deepStrictEqual(pipe('abc', S.split('')), ['a', 'b', 'c'])
assert.deepStrictEqual(pipe('', S.split('')), [''])
```

**`Since`**

1.0.0

___

### startsWith

▸ **startsWith**(`searchString`, `position?`): (`self`: `string`) => `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `searchString` | `string` |
| `position?` | `number` |

#### Returns

`fn`

▸ (`self`): `boolean`

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `string` |

##### Returns

`boolean`

**`Since`**

1.0.0

___

### stripMargin

▸ **stripMargin**(`self`): `string`

For every line in this string, strip a leading prefix consisting of blanks
or control characters followed by the `"|"` character from the line.

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `string` |

#### Returns

`string`

**`Since`**

1.0.0

___

### stripMarginWith

▸ **stripMarginWith**(`marginChar`): (`self`: `string`) => `string`

For every line in this string, strip a leading prefix consisting of blanks
or control characters followed by the character specified by `marginChar`
from the line.

#### Parameters

| Name | Type |
| :------ | :------ |
| `marginChar` | `string` |

#### Returns

`fn`

▸ (`self`): `string`

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `string` |

##### Returns

`string`

**`Since`**

1.0.0

▸ **stripMarginWith**(`self`, `marginChar`): `string`

For every line in this string, strip a leading prefix consisting of blanks
or control characters followed by the character specified by `marginChar`
from the line.

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `string` |
| `marginChar` | `string` |

#### Returns

`string`

**`Since`**

1.0.0

___

### substring

▸ **substring**(`start`, `end?`): (`self`: `string`) => `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `start` | `number` |
| `end?` | `number` |

#### Returns

`fn`

▸ (`self`): `string`

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `string` |

##### Returns

`string`

**`Example`**

```ts
import * as S from '@effect/data/String'
import { pipe } from '@effect/data/Function'

assert.deepStrictEqual(pipe("abcd", S.substring(1)), "bcd")
assert.deepStrictEqual(pipe("abcd", S.substring(1, 3)), "bc")
```

**`Since`**

1.0.0

___

### takeLeft

▸ **takeLeft**(`n`): (`self`: `string`) => `string`

Keep the specified number of characters from the start of a string.

If `n` is larger than the available number of characters, the string will
be returned whole.

If `n` is not a positive number, an empty string will be returned.

If `n` is a float, it will be rounded down to the nearest integer.

#### Parameters

| Name | Type |
| :------ | :------ |
| `n` | `number` |

#### Returns

`fn`

▸ (`self`): `string`

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `string` |

##### Returns

`string`

**`Example`**

```ts
import * as S from '@effect/data/String'

assert.deepStrictEqual(S.takeLeft("Hello World", 5), "Hello")
```

**`Since`**

1.0.0

▸ **takeLeft**(`self`, `n`): `string`

Keep the specified number of characters from the start of a string.

If `n` is larger than the available number of characters, the string will
be returned whole.

If `n` is not a positive number, an empty string will be returned.

If `n` is a float, it will be rounded down to the nearest integer.

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `string` |
| `n` | `number` |

#### Returns

`string`

**`Example`**

```ts
import * as S from '@effect/data/String'

assert.deepStrictEqual(S.takeLeft("Hello World", 5), "Hello")
```

**`Since`**

1.0.0

___

### takeRight

▸ **takeRight**(`n`): (`self`: `string`) => `string`

Keep the specified number of characters from the end of a string.

If `n` is larger than the available number of characters, the string will
be returned whole.

If `n` is not a positive number, an empty string will be returned.

If `n` is a float, it will be rounded down to the nearest integer.

#### Parameters

| Name | Type |
| :------ | :------ |
| `n` | `number` |

#### Returns

`fn`

▸ (`self`): `string`

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `string` |

##### Returns

`string`

**`Example`**

```ts
import * as S from '@effect/data/String'

assert.deepStrictEqual(S.takeRight("Hello World", 5), "World")
```

**`Since`**

1.0.0

▸ **takeRight**(`self`, `n`): `string`

Keep the specified number of characters from the end of a string.

If `n` is larger than the available number of characters, the string will
be returned whole.

If `n` is not a positive number, an empty string will be returned.

If `n` is a float, it will be rounded down to the nearest integer.

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `string` |
| `n` | `number` |

#### Returns

`string`

**`Example`**

```ts
import * as S from '@effect/data/String'

assert.deepStrictEqual(S.takeRight("Hello World", 5), "World")
```

**`Since`**

1.0.0

___

### toLocaleLowerCase

▸ **toLocaleLowerCase**(`locale?`): (`self`: `string`) => `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `locale?` | `string` \| `string`[] |

#### Returns

`fn`

▸ (`self`): `string`

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `string` |

##### Returns

`string`

**`Example`**

```ts
import * as S from '@effect/data/String'
import { pipe } from '@effect/data/Function'

const str = "\u0130"
assert.deepStrictEqual(pipe(str, S.toLocaleLowerCase("tr")), "i")
```

**`Since`**

1.0.0

___

### toLocaleUpperCase

▸ **toLocaleUpperCase**(`locale?`): (`self`: `string`) => `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `locale?` | `string` \| `string`[] |

#### Returns

`fn`

▸ (`self`): `string`

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `string` |

##### Returns

`string`

**`Example`**

```ts
import * as S from '@effect/data/String'
import { pipe } from '@effect/data/Function'

const str = "i\u0307"
assert.deepStrictEqual(pipe(str, S.toLocaleUpperCase("lt-LT")), "I")
```

**`Since`**

1.0.0

___

### toLowerCase

▸ **toLowerCase**<`T`\>(`self`): `Lowercase`<`T`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `string` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `T` |

#### Returns

`Lowercase`<`T`\>

**`Example`**

```ts
import * as S from '@effect/data/String'
import { pipe } from '@effect/data/Function'

assert.deepStrictEqual(pipe('A', S.toLowerCase), 'a')
```

**`Since`**

1.0.0

___

### toUpperCase

▸ **toUpperCase**<`S`\>(`self`): `Uppercase`<`S`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `S` | extends `string` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `S` |

#### Returns

`Uppercase`<`S`\>

**`Example`**

```ts
import * as S from '@effect/data/String'
import { pipe } from '@effect/data/Function'

assert.deepStrictEqual(pipe('a', S.toUpperCase), 'A')
```

**`Since`**

1.0.0

___

### trim

▸ **trim**<`A`\>(`self`): [`TrimEnd`](src_lib_primitives.Str.md#trimend)<[`TrimStart`](src_lib_primitives.Str.md#trimstart)<`A`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `A` | extends `string` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `A` |

#### Returns

[`TrimEnd`](src_lib_primitives.Str.md#trimend)<[`TrimStart`](src_lib_primitives.Str.md#trimstart)<`A`\>\>

**`Example`**

```ts
import * as S from '@effect/data/String'

assert.deepStrictEqual(S.trim(' a '), 'a')
```

**`Since`**

1.0.0

___

### trimEnd

▸ **trimEnd**<`A`\>(`self`): [`TrimEnd`](src_lib_primitives.Str.md#trimend)<`A`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `A` | extends `string` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `A` |

#### Returns

[`TrimEnd`](src_lib_primitives.Str.md#trimend)<`A`\>

**`Example`**

```ts
import * as S from '@effect/data/String'

assert.deepStrictEqual(S.trimEnd(' a '), ' a')
```

**`Since`**

1.0.0

___

### trimStart

▸ **trimStart**<`A`\>(`self`): [`TrimStart`](src_lib_primitives.Str.md#trimstart)<`A`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `A` | extends `string` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `A` |

#### Returns

[`TrimStart`](src_lib_primitives.Str.md#trimstart)<`A`\>

**`Example`**

```ts
import * as S from '@effect/data/String'

assert.deepStrictEqual(S.trimStart(' a '), 'a ')
```

**`Since`**

1.0.0

___

### uncapitalize

▸ **uncapitalize**<`T`\>(`self`): `Uncapitalize`<`T`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `string` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `T` |

#### Returns

`Uncapitalize`<`T`\>

**`Example`**

```ts
import * as S from '@effect/data/String'
import { pipe } from '@effect/data/Function'

assert.deepStrictEqual(pipe('ABC', S.uncapitalize), 'aBC')
```

**`Since`**

1.0.0

## guards

### isString

▸ **isString**(`a`): a is string

Tests if a value is a `string`.

#### Parameters

| Name | Type |
| :------ | :------ |
| `a` | `unknown` |

#### Returns

a is string

**`Example`**

```ts
import { isString } from '@effect/data/String'

assert.deepStrictEqual(isString("a"), true)
assert.deepStrictEqual(isString(1), false)
```

**`Since`**

1.0.0

## instances

### Equivalence

▸ **Equivalence**(`self`, `that`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `string` |
| `that` | `string` |

#### Returns

`boolean`

**`Since`**

1.0.0

___

### Order

▸ **Order**(`self`, `that`): ``0`` \| ``1`` \| ``-1``

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `string` |
| `that` | `string` |

#### Returns

``0`` \| ``1`` \| ``-1``

**`Since`**

1.0.0

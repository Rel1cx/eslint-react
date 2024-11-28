[**@eslint-react/tools**](../../../../../README.md)

***

[@eslint-react/tools](../../../../../README.md) / [Data](../../../README.md) / [TaggedEnum](../README.md) / GenericMatchers

# Interface: GenericMatchers\<Z\>

## Since

3.2.0

## Type Parameters

• **Z** *extends* [`WithGenerics`](WithGenerics.md)\<`number`\>

## Properties

### $is()

> `readonly` **$is**: \<`Tag`\>(`tag`) => \<`T`\>(`u`) => `u is T & { _tag: Tag }`(`u`) => `u is Extract<Kind<Z, unknown, unknown, unknown, unknown>, { _tag: Tag }>`

#### Type Parameters

• **Tag** *extends* `string`

#### Parameters

##### tag

`Tag`

#### Returns

`Function`

##### Type Parameters

• **T** *extends* `object`

##### Parameters

###### u

`T`

##### Returns

`u is T & { _tag: Tag }`

##### Parameters

###### u

`unknown`

##### Returns

`u is Extract<Kind<Z, unknown, unknown, unknown, unknown>, { _tag: Tag }>`

***

### $match()

> `readonly` **$match**: \<`A`, `B`, `C`, `D`, `Cases`\>(`cases`) => (`self`) => `Unify`\<`ReturnType`\<`Cases`\[`Z`\[`"taggedEnum"`\]\[`"_tag"`\]\]\>\>\<`A`, `B`, `C`, `D`, `Cases`\>(`self`, `cases`) => `Unify`\<`ReturnType`\<`Cases`\[`Z`\[`"taggedEnum"`\]\[`"_tag"`\]\]\>\>

#### Type Parameters

• **A**

• **B**

• **C**

• **D**

• **Cases** *extends* `{ readonly [Tag in string]: (args: Extract<Kind<Z, A, B, C, D>, { _tag: Tag }>) => any }`

#### Parameters

##### cases

`Cases`

#### Returns

`Function`

##### Parameters

###### self

[`Kind`](../type-aliases/Kind.md)\<`Z`, `A`, `B`, `C`, `D`\>

##### Returns

`Unify`\<`ReturnType`\<`Cases`\[`Z`\[`"taggedEnum"`\]\[`"_tag"`\]\]\>\>

#### Type Parameters

• **A**

• **B**

• **C**

• **D**

• **Cases** *extends* `{ readonly [Tag in string]: (args: Extract<Kind<Z, A, B, C, D>, { _tag: Tag }>) => any }`

#### Parameters

##### self

[`Kind`](../type-aliases/Kind.md)\<`Z`, `A`, `B`, `C`, `D`\>

##### cases

`Cases`

#### Returns

`Unify`\<`ReturnType`\<`Cases`\[`Z`\[`"taggedEnum"`\]\[`"_tag"`\]\]\>\>

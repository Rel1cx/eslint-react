[**@eslint-react/tools**](../../../../../README.md)

***

[@eslint-react/tools](../../../../../README.md) / [Data](../../../README.md) / [Case](../README.md) / Constructor

# Interface: Constructor()\<A, Tag\>

## Since

2.0.0

## Type Parameters

• **A**

• **Tag** *extends* keyof `A` = `never`

> **Constructor**(`args`): `A`

## Parameters

### args

`Equals`\<`Omit`\<`A`, `Tag`\>, `object`\> *extends* `true` ? `void` : \{ readonly \[P in string \| number \| symbol as P extends Tag ? never : P\]: A\[P\] \}

## Returns

`A`

## Since

2.0.0

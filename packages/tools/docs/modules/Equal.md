[@eslint-react/tools](../README.md) / Equal

# Namespace: Equal

## Table of contents

### Interfaces

- [Equal](../interfaces/Equal.Equal.md)

### Variables

- [symbol](Equal.md#symbol)

### Functions

- [equals](Equal.md#equals)
- [equivalence](Equal.md#equivalence)
- [isEqual](Equal.md#isequal)

## equality

### equals

▸ **equals**\<`B`\>(`that`): \<A\>(`self`: `A`) => `boolean`

#### Type parameters

| Name |
| :--- |
| `B`  |

#### Parameters

| Name   | Type |
| :----- | :--- |
| `that` | `B`  |

#### Returns

`fn`

▸ \<`A`\>(`self`): `boolean`

##### Type parameters

| Name |
| :--- |
| `A`  |

##### Parameters

| Name   | Type |
| :----- | :--- |
| `self` | `A`  |

##### Returns

`boolean`

**`Since`**

2.0.0

▸ **equals**\<`A`, `B`\>(`self`, `that`): `boolean`

#### Type parameters

| Name |
| :--- |
| `A`  |
| `B`  |

#### Parameters

| Name   | Type |
| :----- | :--- |
| `self` | `A`  |
| `that` | `B`  |

#### Returns

`boolean`

## guards

### isEqual

▸ **isEqual**(`u`): u is Equal

#### Parameters

| Name | Type      |
| :--- | :-------- |
| `u`  | `unknown` |

#### Returns

u is Equal

**`Since`**

2.0.0

## instances

### equivalence

▸ **equivalence**\<`A`\>(): `Equivalence`\<`A`\>

#### Type parameters

| Name |
| :--- |
| `A`  |

#### Returns

`Equivalence`\<`A`\>

**`Since`**

2.0.0

## symbols

### symbol

• `Const` **symbol**: unique `symbol`

**`Since`**

2.0.0

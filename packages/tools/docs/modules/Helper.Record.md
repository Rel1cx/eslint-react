[@eslint-react/tools](../README.md) / [Helper](Helper.md) / Record

# Namespace: Record

[Helper](Helper.md).Record

## Table of contents

### Type Aliases

- [DeepWriteable](Helper.Record.md#deepwriteable)
- [FromEntries](Helper.Record.md#fromentries)
- [FromEntriesWithReadOnly](Helper.Record.md#fromentrieswithreadonly)
- [LooseRecord](Helper.Record.md#looserecord)

### Functions

- [entries](Helper.Record.md#entries)
- [fromEntries](Helper.Record.md#fromentries-1)
- [fromEntriesWithReadOnly](Helper.Record.md#fromentrieswithreadonly-1)
- [keys](Helper.Record.md#keys)
- [values](Helper.Record.md#values)

## Type Aliases

### DeepWriteable

Ƭ **DeepWriteable**\<`T`\>: \{ -readonly [P in keyof T]: DeepWriteable\<T[P]\> }

#### Type parameters

| Name |
| :--- |
| `T`  |

---

### FromEntries

Ƭ **FromEntries**\<`T`\>: `T` extends [infer Key, `unknown`][] ? \{ [K in Cast\<Key, string\>]: Extract\<ArrayElement\<T\>, [K, unknown]\>[1] } : \{ [key in string]: unknown }

#### Type parameters

| Name |
| :--- |
| `T`  |

---

### FromEntriesWithReadOnly

Ƭ **FromEntriesWithReadOnly**\<`T`\>: [`FromEntries`](Helper.Record.md#fromentries)\<[`DeepWriteable`](Helper.Record.md#deepwriteable)\<`T`\>\>

#### Type parameters

| Name |
| :--- |
| `T`  |

---

### LooseRecord

Ƭ **LooseRecord**\<`T`\>: `Record`\<`PropertyKey`, `T`\>

A record with loose keys.

**`Since`**

0.4.0

#### Type parameters

| Name | Description             |
| :--- | :---------------------- |
| `T`  | The type of the values. |

## Functions

### entries

▸ **entries**\<`T`\>(`value`): \{ [K in string \| number \| symbol]-?: [K, T[K]] }[keyof `T`][]

type-safe version of Object.entries

#### Type parameters

| Name | Type                                                               |
| :--- | :----------------------------------------------------------------- |
| `T`  | extends [`LooseRecord`](Helper.Record.md#looserecord)\<`unknown`\> |

#### Parameters

| Name    | Type | Description                        |
| :------ | :--- | :--------------------------------- |
| `value` | `T`  | The value to get the entries from. |

#### Returns

\{ [K in string \| number \| symbol]-?: [K, T[K]] }[keyof `T`][]

The entries of the value.

**`Since`**

0.4.0

---

### fromEntries

▸ **fromEntries**\<`T`\>(`entries`): [`FromEntries`](Helper.Record.md#fromentries)\<`T`\>

type-safe version of Object.fromEntries

#### Type parameters

| Name | Type                                 |
| :--- | :----------------------------------- |
| `T`  | extends [`PropertyKey`, `unknown`][] |

#### Parameters

| Name      | Type | Description                            |
| :-------- | :--- | :------------------------------------- |
| `entries` | `T`  | The entries to create the object from. |

#### Returns

[`FromEntries`](Helper.Record.md#fromentries)\<`T`\>

The object created from the entries.

**`Since`**

0.4.0

---

### fromEntriesWithReadOnly

▸ **fromEntriesWithReadOnly**\<`T`\>(`entries`): [`FromEntries`](Helper.Record.md#fromentries)\<[`DeepWriteable`](Helper.Record.md#deepwriteable)\<`T`\>\>

type-safe version of Object.fromEntries

#### Type parameters

| Name | Type                                 |
| :--- | :----------------------------------- |
| `T`  | extends [`PropertyKey`, `unknown`][] |

#### Parameters

| Name      | Type | Description                            |
| :-------- | :--- | :------------------------------------- |
| `entries` | `T`  | The entries to create the object from. |

#### Returns

[`FromEntries`](Helper.Record.md#fromentries)\<[`DeepWriteable`](Helper.Record.md#deepwriteable)\<`T`\>\>

The object created from the entries.

**`Since`**

0.4.0

---

### keys

▸ **keys**\<`T`\>(`value`): keyof `T`[]

type-safe version of Object.keys

#### Type parameters

| Name | Type                                                               |
| :--- | :----------------------------------------------------------------- |
| `T`  | extends [`LooseRecord`](Helper.Record.md#looserecord)\<`unknown`\> |

#### Parameters

| Name    | Type | Description                     |
| :------ | :--- | :------------------------------ |
| `value` | `T`  | The value to get the keys from. |

#### Returns

keyof `T`[]

The keys of the value.

**`Since`**

0.4.0

---

### values

▸ **values**\<`T`\>(`value`): `T`[keyof `T`][]

type-safe version of Object.values

#### Type parameters

| Name | Type                                                               |
| :--- | :----------------------------------------------------------------- |
| `T`  | extends [`LooseRecord`](Helper.Record.md#looserecord)\<`unknown`\> |

#### Parameters

| Name    | Type | Description                       |
| :------ | :--- | :-------------------------------- |
| `value` | `T`  | The value to get the values from. |

#### Returns

`T`[keyof `T`][]

The values of the value.

**`Since`**

0.4.0

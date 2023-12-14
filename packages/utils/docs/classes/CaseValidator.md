[@eslint-react/shared](../README.md) / CaseValidator

# Class: CaseValidator

## Table of contents

### Constructors

- [constructor](CaseValidator.md#constructor)

### Properties

- [#expression](CaseValidator.md##expression)
- [#ignorePatterns](CaseValidator.md##ignorepatterns)
- [#recommendationBuilder](CaseValidator.md##recommendationbuilder)

### Methods

- [getRecommendedName](CaseValidator.md#getrecommendedname)
- [validate](CaseValidator.md#validate)

## Constructors

### constructor

• **new CaseValidator**(`expression`, `ignorePatterns`, `recommendationBuilder?`): [`CaseValidator`](CaseValidator.md)

#### Parameters

| Name                    | Type                    |
| :---------------------- | :---------------------- |
| `expression`            | `RegExp`                |
| `ignorePatterns`        | `RegExp`[]              |
| `recommendationBuilder` | `RecommendationBuilder` |

#### Returns

[`CaseValidator`](CaseValidator.md)

## Properties

### #expression

• `Private` `Readonly` **#expression**: `RegExp`

---

### #ignorePatterns

• `Private` `Readonly` **#ignorePatterns**: `RegExp`[]

---

### #recommendationBuilder

• `Private` `Readonly` **#recommendationBuilder**: `RecommendationBuilder`

## Methods

### getRecommendedName

▸ **getRecommendedName**(`name`): `string`

#### Parameters

| Name   | Type     |
| :----- | :------- |
| `name` | `string` |

#### Returns

`string`

---

### validate

▸ **validate**(`name`): `boolean`

#### Parameters

| Name   | Type     |
| :----- | :------- |
| `name` | `string` |

#### Returns

`boolean`

[eslint-plugin-react-ts](../README.md) / [src/lib/case-validator/case-validator](../modules/src_lib_case_validator_case_validator.md) / CaseValidator

# Class: CaseValidator

[src/lib/case-validator/case-validator](../modules/src_lib_case_validator_case_validator.md).CaseValidator

## Table of contents

### Constructors

- [constructor](src_lib_case_validator_case_validator.CaseValidator.md#constructor)

### Properties

- [#expression](src_lib_case_validator_case_validator.CaseValidator.md##expression)
- [#ignorePatterns](src_lib_case_validator_case_validator.CaseValidator.md##ignorepatterns)
- [#recommendationBuilder](src_lib_case_validator_case_validator.CaseValidator.md##recommendationbuilder)

### Methods

- [getRecommendedName](src_lib_case_validator_case_validator.CaseValidator.md#getrecommendedname)
- [validate](src_lib_case_validator_case_validator.CaseValidator.md#validate)

## Constructors

### constructor

• **new CaseValidator**(`expression`, `ignorePatterns`, `recommendationBuilder?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | `RegExp` |
| `ignorePatterns` | `RegExp`[] |
| `recommendationBuilder` | `RecommendationBuilder` |

## Properties

### #expression

• `Private` `Readonly` **#expression**: `RegExp`

___

### #ignorePatterns

• `Private` `Readonly` **#ignorePatterns**: `RegExp`[]

___

### #recommendationBuilder

• `Private` `Readonly` **#recommendationBuilder**: `RecommendationBuilder`

## Methods

### getRecommendedName

▸ **getRecommendedName**(`name`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`string`

___

### validate

▸ **validate**(`name`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`boolean`

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

#### Defined in

[src/lib/case-validator/case-validator.ts:14](https://github.com/Rel1cx/eslint-plugin-react-ts/blob/0eee112/src/lib/case-validator/case-validator.ts#L14)

## Properties

### #expression

• `Private` `Readonly` **#expression**: `RegExp`

#### Defined in

[src/lib/case-validator/case-validator.ts:8](https://github.com/Rel1cx/eslint-plugin-react-ts/blob/0eee112/src/lib/case-validator/case-validator.ts#L8)

___

### #ignorePatterns

• `Private` `Readonly` **#ignorePatterns**: `RegExp`[]

#### Defined in

[src/lib/case-validator/case-validator.ts:10](https://github.com/Rel1cx/eslint-plugin-react-ts/blob/0eee112/src/lib/case-validator/case-validator.ts#L10)

___

### #recommendationBuilder

• `Private` `Readonly` **#recommendationBuilder**: `RecommendationBuilder`

#### Defined in

[src/lib/case-validator/case-validator.ts:12](https://github.com/Rel1cx/eslint-plugin-react-ts/blob/0eee112/src/lib/case-validator/case-validator.ts#L12)

## Methods

### getRecommendedName

▸ **getRecommendedName**(`name`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`string`

#### Defined in

[src/lib/case-validator/case-validator.ts:26](https://github.com/Rel1cx/eslint-plugin-react-ts/blob/0eee112/src/lib/case-validator/case-validator.ts#L26)

___

### validate

▸ **validate**(`name`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`boolean`

#### Defined in

[src/lib/case-validator/case-validator.ts:35](https://github.com/Rel1cx/eslint-plugin-react-ts/blob/0eee112/src/lib/case-validator/case-validator.ts#L35)

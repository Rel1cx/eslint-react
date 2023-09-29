[eslint-plugin-react-ts](../README.md) / src/utils/component-detector-legacy

# Module: src/utils/component-detector-legacy

## Table of contents

### Functions

- [getParentES6Component](src_utils_component_detector_legacy.md#getparentes6component)
- [isES5Component](src_utils_component_detector_legacy.md#ises5component)
- [isES6Component](src_utils_component_detector_legacy.md#ises6component)
- [isPureComponent](src_utils_component_detector_legacy.md#ispurecomponent)
- [isStateMemberExpression](src_utils_component_detector_legacy.md#isstatememberexpression)

## Functions

### getParentES6Component

▸ **getParentES6Component**(`context`): ``null`` \| `ClassDeclarationWithOptionalName` \| `ClassExpression`

#### Parameters

| Name | Type |
| :------ | :------ |
| `context` | `Readonly`<`RuleContext`<`string`, readonly `unknown`[]\>\> |

#### Returns

``null`` \| `ClassDeclarationWithOptionalName` \| `ClassExpression`

**`Package`**

**`Deprecated`**

Do not use this function. It will be removed in the future.

#### Defined in

[src/utils/component-detector-legacy.ts:76](https://github.com/Rel1cx/eslint-plugin-react-ts/blob/0eee112/src/utils/component-detector-legacy.ts#L76)

___

### isES5Component

▸ **isES5Component**(`node`, `context`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `Node` |
| `context` | `Readonly`<`RuleContext`<`string`, readonly `unknown`[]\>\> |

#### Returns

`boolean`

**`Package`**

**`Deprecated`**

Do not use this function. It will be removed in the future.

#### Defined in

[src/utils/component-detector-legacy.ts:14](https://github.com/Rel1cx/eslint-plugin-react-ts/blob/0eee112/src/utils/component-detector-legacy.ts#L14)

___

### isES6Component

▸ **isES6Component**(`node`, `context`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `Node` |
| `context` | `Readonly`<`RuleContext`<`string`, readonly `unknown`[]\>\> |

#### Returns

`boolean`

**`Package`**

**`Deprecated`**

Do not use this function. It will be removed in the future.

#### Defined in

[src/utils/component-detector-legacy.ts:48](https://github.com/Rel1cx/eslint-plugin-react-ts/blob/0eee112/src/utils/component-detector-legacy.ts#L48)

___

### isPureComponent

▸ **isPureComponent**(`node`, `context`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `Node` |
| `context` | `Readonly`<`RuleContext`<`string`, readonly `unknown`[]\>\> |

#### Returns

`boolean`

**`Package`**

**`Deprecated`**

Do not use this function. It will be removed in the future.

#### Defined in

[src/utils/component-detector-legacy.ts:96](https://github.com/Rel1cx/eslint-plugin-react-ts/blob/0eee112/src/utils/component-detector-legacy.ts#L96)

___

### isStateMemberExpression

▸ **isStateMemberExpression**(`node`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `Node` |

#### Returns

`boolean`

**`Package`**

**`Deprecated`**

Do not use this function. It will be removed in the future.

#### Defined in

[src/utils/component-detector-legacy.ts:115](https://github.com/Rel1cx/eslint-plugin-react-ts/blob/0eee112/src/utils/component-detector-legacy.ts#L115)

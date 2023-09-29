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

Get the parent ES5 component of a node up to global scope

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `context` | `Readonly`<`RuleContext`<`string`, readonly `unknown`[]\>\> | The rule context |

#### Returns

``null`` \| `ClassDeclarationWithOptionalName` \| `ClassExpression`

**`Package`**

**`Deprecated`**

It will be removed in the future.

___

### isES5Component

▸ **isES5Component**(`node`, `context`): `boolean`

Check if a node is a React ES5 component

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `node` | `Node` | The node to check |
| `context` | `Readonly`<`RuleContext`<`string`, readonly `unknown`[]\>\> | The rule context |

#### Returns

`boolean`

**`Package`**

**`Deprecated`**

It will be removed in the future.

___

### isES6Component

▸ **isES6Component**(`node`, `context`): `boolean`

Check if a node is a React ES6 component

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `node` | `Node` | The node to check |
| `context` | `Readonly`<`RuleContext`<`string`, readonly `unknown`[]\>\> | The rule context |

#### Returns

`boolean`

**`Package`**

**`Deprecated`**

It will be removed in the future.

___

### isPureComponent

▸ **isPureComponent**(`node`, `context`): `boolean`

Check if a node is a React PureComponent

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `node` | `Node` | The node to check |
| `context` | `Readonly`<`RuleContext`<`string`, readonly `unknown`[]\>\> | The rule context |

#### Returns

`boolean`

**`Package`**

**`Deprecated`**

It will be removed in the future.

___

### isStateMemberExpression

▸ **isStateMemberExpression**(`node`): `boolean`

Check if a node is a MemberExpression of state

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `node` | `Node` | The node to check |

#### Returns

`boolean`

**`Package`**

**`Deprecated`**

It will be removed in the future.

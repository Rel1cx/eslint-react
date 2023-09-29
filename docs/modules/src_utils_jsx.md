[eslint-plugin-react-ts](../README.md) / src/utils/jsx

# Module: src/utils/jsx

## Table of contents

### Functions

- [findPropInAttributes](src_utils_jsx.md#findpropinattributes)
- [findPropInProperties](src_utils_jsx.md#findpropinproperties)
- [getPropName](src_utils_jsx.md#getpropname)
- [getPropNameWithNamespace](src_utils_jsx.md#getpropnamewithnamespace)
- [hasChildren](src_utils_jsx.md#haschildren)
- [isJSX](src_utils_jsx.md#isjsx)
- [isJSXElement](src_utils_jsx.md#isjsxelement)
- [isJSXFragment](src_utils_jsx.md#isjsxfragment)
- [isJSXValue](src_utils_jsx.md#isjsxvalue)
- [isJsxTagNameExpression](src_utils_jsx.md#isjsxtagnameexpression)
- [isLineBreak](src_utils_jsx.md#islinebreak)
- [isReturnStatementReturningJSX](src_utils_jsx.md#isreturnstatementreturningjsx)

## Functions

### findPropInAttributes

▸ **findPropInAttributes**(`attributes`, `context`): (`propName`: `string`) => [`Option`](src_lib_primitives.O.md#option)<`NonNullable`<`undefined` \| `JSXAttribute` \| `JSXSpreadAttribute`\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `attributes` | (`JSXAttribute` \| `JSXSpreadAttribute`)[] |
| `context` | `Readonly`<`RuleContext`<`string`, readonly `unknown`[]\>\> |

#### Returns

`fn`

▸ (`propName`): [`Option`](src_lib_primitives.O.md#option)<`NonNullable`<`undefined` \| `JSXAttribute` \| `JSXSpreadAttribute`\>\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `propName` | `string` |

##### Returns

[`Option`](src_lib_primitives.O.md#option)<`NonNullable`<`undefined` \| `JSXAttribute` \| `JSXSpreadAttribute`\>\>

___

### findPropInProperties

▸ **findPropInProperties**(`properties`, `context`, `seenProps?`): (`propName`: `string`) => [`Option`](src_lib_primitives.O.md#option)<`PropertyComputedName` \| `PropertyNonComputedName` \| `RestElement` \| `SpreadElement`\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `properties` | `ObjectLiteralElement`[] \| (`Property` \| `RestElement`)[] | `undefined` |
| `context` | `Readonly`<`RuleContext`<`string`, readonly `unknown`[]\>\> | `undefined` |
| `seenProps` | `string`[] | `[]` |

#### Returns

`fn`

▸ (`propName`): [`Option`](src_lib_primitives.O.md#option)<`PropertyComputedName` \| `PropertyNonComputedName` \| `RestElement` \| `SpreadElement`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `propName` | `string` |

##### Returns

[`Option`](src_lib_primitives.O.md#option)<`PropertyComputedName` \| `PropertyNonComputedName` \| `RestElement` \| `SpreadElement`\>

___

### getPropName

▸ **getPropName**(`node`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `JSXAttribute` |

#### Returns

`string`

___

### getPropNameWithNamespace

▸ **getPropNameWithNamespace**(`node`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `JSXAttribute` |

#### Returns

`string`

___

### hasChildren

▸ **hasChildren**(`node`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `JSXElement` \| `JSXFragment` |

#### Returns

`boolean`

___

### isJSX

▸ **isJSX**(`node`): node is JSXElement \| JSXFragment

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `Node` |

#### Returns

node is JSXElement \| JSXFragment

___

### isJSXElement

▸ **isJSXElement**(`node`): node is JSXElement

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `undefined` \| ``null`` \| `Node` |

#### Returns

node is JSXElement

___

### isJSXFragment

▸ **isJSXFragment**(`node`): node is JSXFragment

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `undefined` \| ``null`` \| `Node` |

#### Returns

node is JSXFragment

___

### isJSXValue

▸ **isJSXValue**(`node`, `context`, `strict`, `ignoreNull`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | ``null`` \| `Node` |
| `context` | `Readonly`<`RuleContext`<`string`, readonly `unknown`[]\>\> |
| `strict` | `boolean` |
| `ignoreNull` | `boolean` |

#### Returns

`boolean`

___

### isJsxTagNameExpression

▸ **isJsxTagNameExpression**(`node`): node is JSXIdentifier \| JSXMemberExpression \| JSXNamespacedName

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `undefined` \| ``null`` \| `Node` |

#### Returns

node is JSXIdentifier \| JSXMemberExpression \| JSXNamespacedName

___

### isLineBreak

▸ **isLineBreak**(`node`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `Node` |

#### Returns

`boolean`

___

### isReturnStatementReturningJSX

▸ **isReturnStatementReturningJSX**(`node`, `context`, `strict?`, `ignoreNull?`): `boolean`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `node` | `ReturnStatement` | `undefined` |
| `context` | `Readonly`<`RuleContext`<`string`, readonly `unknown`[]\>\> | `undefined` |
| `strict` | `boolean` | `false` |
| `ignoreNull` | `boolean` | `false` |

#### Returns

`boolean`

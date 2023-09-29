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

#### Defined in

[src/utils/jsx.ts:175](https://github.com/Rel1cx/eslint-plugin-react-ts/blob/0eee112/src/utils/jsx.ts#L175)

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

#### Defined in

[src/utils/jsx.ts:129](https://github.com/Rel1cx/eslint-plugin-react-ts/blob/0eee112/src/utils/jsx.ts#L129)

___

### getPropName

▸ **getPropName**(`node`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `JSXAttribute` |

#### Returns

`string`

#### Defined in

[src/utils/jsx.ts:115](https://github.com/Rel1cx/eslint-plugin-react-ts/blob/0eee112/src/utils/jsx.ts#L115)

___

### getPropNameWithNamespace

▸ **getPropNameWithNamespace**(`node`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `JSXAttribute` |

#### Returns

`string`

#### Defined in

[src/utils/jsx.ts:122](https://github.com/Rel1cx/eslint-plugin-react-ts/blob/0eee112/src/utils/jsx.ts#L122)

___

### hasChildren

▸ **hasChildren**(`node`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `JSXElement` \| `JSXFragment` |

#### Returns

`boolean`

#### Defined in

[src/utils/jsx.ts:26](https://github.com/Rel1cx/eslint-plugin-react-ts/blob/0eee112/src/utils/jsx.ts#L26)

___

### isJSX

▸ **isJSX**(`node`): node is JSXElement \| JSXFragment

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `Node` |

#### Returns

node is JSXElement \| JSXFragment

#### Defined in

[src/utils/jsx.ts:16](https://github.com/Rel1cx/eslint-plugin-react-ts/blob/0eee112/src/utils/jsx.ts#L16)

___

### isJSXElement

▸ **isJSXElement**(`node`): node is JSXElement

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `undefined` \| ``null`` \| `Node` |

#### Returns

node is JSXElement

#### Defined in

node_modules/@typescript-eslint/utils/dist/ast-utils/helpers.d.ts:2

___

### isJSXFragment

▸ **isJSXFragment**(`node`): node is JSXFragment

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `undefined` \| ``null`` \| `Node` |

#### Returns

node is JSXFragment

#### Defined in

node_modules/@typescript-eslint/utils/dist/ast-utils/helpers.d.ts:2

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

#### Defined in

[src/utils/jsx.ts:31](https://github.com/Rel1cx/eslint-plugin-react-ts/blob/0eee112/src/utils/jsx.ts#L31)

___

### isJsxTagNameExpression

▸ **isJsxTagNameExpression**(`node`): node is JSXIdentifier \| JSXMemberExpression \| JSXNamespacedName

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `undefined` \| ``null`` \| `Node` |

#### Returns

node is JSXIdentifier \| JSXMemberExpression \| JSXNamespacedName

#### Defined in

node_modules/@typescript-eslint/utils/dist/ast-utils/helpers.d.ts:393

___

### isLineBreak

▸ **isLineBreak**(`node`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `Node` |

#### Returns

`boolean`

#### Defined in

[src/utils/jsx.ts:212](https://github.com/Rel1cx/eslint-plugin-react-ts/blob/0eee112/src/utils/jsx.ts#L212)

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

#### Defined in

[src/utils/jsx.ts:104](https://github.com/Rel1cx/eslint-plugin-react-ts/blob/0eee112/src/utils/jsx.ts#L104)

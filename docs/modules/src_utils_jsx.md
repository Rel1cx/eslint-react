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
- [isJSXFileExt](src_utils_jsx.md#isjsxfileext)
- [isJSXFragment](src_utils_jsx.md#isjsxfragment)
- [isJSXValue](src_utils_jsx.md#isjsxvalue)
- [isJsxTagNameExpression](src_utils_jsx.md#isjsxtagnameexpression)
- [isLineBreak](src_utils_jsx.md#islinebreak)
- [isReturnStatementReturningJSX](src_utils_jsx.md#isreturnstatementreturningjsx)

## Functions

### findPropInAttributes

▸ **findPropInAttributes**(`attributes`, `context`): (`propName`: `string`) => [`Option`](src_lib_primitives.O.md#option)<`NonNullable`<`undefined` \| `JSXAttribute` \| `JSXSpreadAttribute`\>\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `attributes` | (`JSXAttribute` \| `JSXSpreadAttribute`)[] | The attributes to search in |
| `context` | `Readonly`<`RuleContext`<`string`, readonly `unknown`[]\>\> | The rule context |

#### Returns

`fn`

A function that searches for a property in the given attributes

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

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `properties` | `ObjectLiteralElement`[] \| (`Property` \| `RestElement`)[] | `undefined` | The properties to search in |
| `context` | `Readonly`<`RuleContext`<`string`, readonly `unknown`[]\>\> | `undefined` | The rule context |
| `seenProps` | `string`[] | `[]` | The properties that have already been seen |

#### Returns

`fn`

A function that searches for a property in the given properties

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

Get the name of a JSX attribute

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `node` | `JSXAttribute` | The JSX attribute node |

#### Returns

`string`

string

___

### getPropNameWithNamespace

▸ **getPropNameWithNamespace**(`node`): `string`

Get the name of a JSX attribute with namespace

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `node` | `JSXAttribute` | The JSX attribute node |

#### Returns

`string`

string

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

### isJSXFileExt

▸ **isJSXFileExt**(`ext`): ext is ".jsx" \| ".tsx"

#### Parameters

| Name | Type |
| :------ | :------ |
| `ext` | `string` |

#### Returns

ext is ".jsx" \| ".tsx"

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

Check if a node is a JSX value

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `node` | ``null`` \| `Node` | Node to check |
| `context` | `Readonly`<`RuleContext`<`string`, readonly `unknown`[]\>\> | Rule context |
| `strict` | `boolean` | Whether to check all branches of the conditional expression |
| `ignoreNull` | `boolean` | Whether to ignore null values |

#### Returns

`boolean`

boolean

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

Check if a Literal or JSXText node is a line break

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `node` | `Node` | The node to check |

#### Returns

`boolean`

boolean

___

### isReturnStatementReturningJSX

▸ **isReturnStatementReturningJSX**(`node`, `context`, `strict?`, `ignoreNull?`): `boolean`

Check if a return statement is returning JSX

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `node` | `ReturnStatement` | `undefined` | The return statement node to check |
| `context` | `Readonly`<`RuleContext`<`string`, readonly `unknown`[]\>\> | `undefined` | The rule context |
| `strict` | `boolean` | `false` | Whether to check all branches of the conditional expression |
| `ignoreNull` | `boolean` | `false` | Whether to ignore null values |

#### Returns

`boolean`

boolean

[**@eslint-react/core**](../README.md) • **Docs**

***

[@eslint-react/core](../README.md) / useComponentCollector

# Function: useComponentCollector()

> **useComponentCollector**(`context`, `hint`, `pragma`): `object`

## Parameters

• **context**: `Readonly`\<`RuleContext`\<`string`, readonly `unknown`[]\>\>

• **hint**: `bigint`= `DEFAULT_COMPONENT_HINT`

• **pragma**: `string`= `undefined`

## Returns

`object`

### ctx

> **ctx**: `object`

### ctx.getCurrentFunction()

> **getCurrentFunction**: () => `Option`\<[`TSESTreeFunction`, `boolean`, `CallExpression`[]]\>

#### Returns

`Option`\<[`TSESTreeFunction`, `boolean`, `CallExpression`[]]\>

### ctx.getAllComponents()

#### Parameters

• **\_**: `Program`

#### Returns

`Map`\<`string`, [`ERFunctionComponent`](../interfaces/ERFunctionComponent.md)\>

### ctx.getCurrentComponents()

#### Returns

`Map`\<`string`, [`ERFunctionComponent`](../interfaces/ERFunctionComponent.md)\>

### ctx.getCurrentFunctionStack()

#### Returns

[`TSESTreeFunction`, `boolean`, `CallExpression`[]][]

### listeners

> **listeners**: `object`

### listeners.:function()

> `readonly` **:function**: (`node`) => `MutableList`\<[`TSESTreeFunction`, `boolean`, `CallExpression`[]]\> = `onFunctionEnter`

#### Parameters

• **node**: `TSESTreeFunction`

#### Returns

`MutableList`\<[`TSESTreeFunction`, `boolean`, `CallExpression`[]]\>

### listeners.:function:exit()

> `readonly` **:function:exit**: () => `undefined` \| [`TSESTreeFunction`, `boolean`, `CallExpression`[]] = `onFunctionExit`

#### Returns

`undefined` \| [`TSESTreeFunction`, `boolean`, `CallExpression`[]]

### listeners.ArrowFunctionExpression[body.type!='BlockStatement']()

#### Returns

`void`

### listeners.AssignmentExpression[operator='='][left.type='MemberExpression'][left.property.name='displayName']()

#### Parameters

• **node**: `Node`

#### Returns

`void`

### listeners.CallExpression:exit()

#### Parameters

• **node**: `CallExpression`

#### Returns

`void`

### listeners.ReturnStatement()

#### Parameters

• **node**: `ReturnStatement`

#### Returns

`void`

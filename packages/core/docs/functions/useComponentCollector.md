[**@eslint-react/core**](../README.md)

***

[@eslint-react/core](../README.md) / useComponentCollector

# Function: useComponentCollector()

> **useComponentCollector**(`context`, `hint`): `object`

## Parameters

### context

`Readonly`\<`RuleContext`\<`string`, readonly `unknown`[]\>\>

### hint

`bigint` = `DEFAULT_COMPONENT_HINT`

## Returns

`object`

### ctx

> **ctx**: `object`

#### ctx.getCurrentFunction()

> **getCurrentFunction**: () => `Option`\<\[`string`, `TSESTreeFunction`, `boolean`, `CallExpression`[]\]\>

##### Returns

`Option`\<\[`string`, `TSESTreeFunction`, `boolean`, `CallExpression`[]\]\>

#### ctx.getAllComponents()

##### Parameters

###### \_

`Program`

##### Returns

`Map`\<`string`, [`ERFunctionComponent`](../interfaces/ERFunctionComponent.md)\>

#### ctx.getCurrentFunctionStack()

##### Returns

\[`string`, `TSESTreeFunction`, `boolean`, `CallExpression`[]\][]

### listeners

> **listeners**: `object`

#### listeners.:function\[type\]()

> `readonly` **:function\[type\]**: (`node`) => `void` = `onFunctionEnter`

##### Parameters

###### node

`TSESTreeFunction`

##### Returns

`void`

#### listeners.:function\[type\]:exit()

> `readonly` **:function\[type\]:exit**: () => `undefined` \| \[`string`, `TSESTreeFunction`, `boolean`, `CallExpression`[]\] = `onFunctionExit`

##### Returns

`undefined` \| \[`string`, `TSESTreeFunction`, `boolean`, `CallExpression`[]\]

#### listeners.ArrowFunctionExpression\[type\]\[body.type!='BlockStatement'\]()

##### Returns

`void`

#### listeners.AssignmentExpression\[type\]\[operator='='\]\[left.type='MemberExpression'\]\[left.property.name='displayName'\]()

##### Parameters

###### node

`Node`

##### Returns

`void`

#### listeners.CallExpression\[type\]:exit()

##### Parameters

###### node

`CallExpression`

##### Returns

`void`

#### listeners.ReturnStatement\[type\]()

##### Parameters

###### node

`ReturnStatement`

##### Returns

`void`

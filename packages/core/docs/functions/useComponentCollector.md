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

> **getCurrentFunction**: () => `Option`\<\{ `hookCalls`: `CallExpression`[]; `isComponent`: `boolean`; `key`: `string`; `node`: `TSESTreeFunction`; \}\>

##### Returns

`Option`\<\{ `hookCalls`: `CallExpression`[]; `isComponent`: `boolean`; `key`: `string`; `node`: `TSESTreeFunction`; \}\>

#### ctx.getAllComponents()

##### Parameters

###### \_

`Program`

##### Returns

`Map`\<`string`, [`ERFunctionComponent`](../interfaces/ERFunctionComponent.md)\>

#### ctx.getCurrentFunctionStack()

##### Returns

`object`[]

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

> `readonly` **:function\[type\]:exit**: () => `undefined` \| \{ `hookCalls`: `CallExpression`[]; `isComponent`: `boolean`; `key`: `string`; `node`: `TSESTreeFunction`; \} = `onFunctionExit`

##### Returns

`undefined` \| \{ `hookCalls`: `CallExpression`[]; `isComponent`: `boolean`; `key`: `string`; `node`: `TSESTreeFunction`; \}

#### listeners.ArrowFunctionExpression\[type\]\[body.type!='BlockStatement'\]()

##### Returns

`void`

#### listeners.AssignmentExpression\[type\]\[operator='='\]\[left.type='MemberExpression'\]\[left.property.name='displayName'\]()

##### Parameters

###### node

`AssignmentExpression` & `object`

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

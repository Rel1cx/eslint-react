[**@eslint-react/core**](../README.md)

***

[@eslint-react/core](../README.md) / useHookCollector

# Function: useHookCollector()

> **useHookCollector**(): `object`

## Returns

`object`

### ctx

> **ctx**: `object`

#### ctx.getAllHooks()

##### Parameters

###### node

`Program`

##### Returns

`Map`\<`string`, [`ERHook`](../interfaces/ERHook.md)\>

#### ctx.getCurrentHooks()

##### Returns

`Map`\<`string`, [`ERHook`](../interfaces/ERHook.md)\>

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

> `readonly` **:function\[type\]:exit**: () => `void` = `onFunctionExit`

##### Returns

`void`

#### listeners.CallExpression\[type\]()

##### Parameters

###### node

`never`

##### Returns

`void`

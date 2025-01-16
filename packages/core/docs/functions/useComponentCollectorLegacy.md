[**@eslint-react/core**](../README.md)

***

[@eslint-react/core](../README.md) / useComponentCollectorLegacy

# Function: useComponentCollectorLegacy()

> **useComponentCollectorLegacy**(): `object`

Get a ctx and listeners for the rule to collect class components

## Returns

`object`

The context and listeners for the rule

### ctx

> **ctx**: `object`

#### ctx.getAllComponents()

##### Parameters

###### node

`Program`

##### Returns

`Map`\<`string`, [`ERClassComponent`](../interfaces/ERClassComponent.md)\>

### listeners

> **listeners**: `object`

#### listeners.ClassDeclaration\[type\]()

> `readonly` **ClassDeclaration\[type\]**: (`node`) => `void` = `collect`

##### Parameters

###### node

`TSESTreeClass`

##### Returns

`void`

#### listeners.ClassExpression\[type\]()

> `readonly` **ClassExpression\[type\]**: (`node`) => `void` = `collect`

##### Parameters

###### node

`TSESTreeClass`

##### Returns

`void`

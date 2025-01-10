[**@eslint-react/core**](../README.md)

***

[@eslint-react/core](../README.md) / useComponentCollectorLegacy

# Function: useComponentCollectorLegacy()

> **useComponentCollectorLegacy**(): `object`

## Returns

`object`

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

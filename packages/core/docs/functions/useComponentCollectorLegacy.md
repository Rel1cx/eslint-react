[**@eslint-react/core**](../README.md) • **Docs**

***

[@eslint-react/core](../README.md) / useComponentCollectorLegacy

# Function: useComponentCollectorLegacy()

> **useComponentCollectorLegacy**(`context`): `object`

## Parameters

• **context**: `Readonly`\<`RuleContext`\<`string`, readonly `unknown`[]\>\>

## Returns

`object`

### ctx

> **ctx**: `object`

### ctx.getAllComponents()

#### Parameters

• **\_**: `Program`

#### Returns

`Map`\<`string`, [`ERClassComponent`](../interfaces/ERClassComponent.md)\>

### ctx.getCurrentComponents()

#### Returns

`Map`\<`string`, [`ERClassComponent`](../interfaces/ERClassComponent.md)\>

### listeners

> **listeners**: `object`

### listeners.ClassDeclaration()

> `readonly` **ClassDeclaration**: (`node`) => `void` = `collect`

#### Parameters

• **node**: `TSESTreeClass`

#### Returns

`void`

### listeners.ClassExpression()

> `readonly` **ClassExpression**: (`node`) => `void` = `collect`

#### Parameters

• **node**: `TSESTreeClass`

#### Returns

`void`

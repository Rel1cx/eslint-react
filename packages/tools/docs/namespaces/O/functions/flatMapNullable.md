[**@eslint-react/tools**](../../../README.md) • **Docs**

***

[@eslint-react/tools](../../../README.md) / [O](../README.md) / flatMapNullable

# Function: flatMapNullable()

This is `flatMap` + `fromNullable`, useful when working with optional values.

## Example

```ts
import { pipe, Option } from "effect"

interface Employee {
  company?: {
    address?: {
      street?: {
        name?: string
      }
    }
  }
}

const employee1: Employee = { company: { address: { street: { name: 'high street' } } } }

assert.deepStrictEqual(
  pipe(
    Option.some(employee1),
    Option.flatMapNullable(employee => employee.company?.address?.street?.name),
  ),
  Option.some('high street')
)

const employee2: Employee = { company: { address: { street: {} } } }

assert.deepStrictEqual(
  pipe(
    Option.some(employee2),
    Option.flatMapNullable(employee => employee.company?.address?.street?.name),
  ),
  Option.none()
)
```

## Since

2.0.0

## flatMapNullable(f)

> **flatMapNullable**\<`A`, `B`\>(`f`): (`self`) => [`Option`](../type-aliases/Option.md)\<`NonNullable`\<`B`\>\>

This is `flatMap` + `fromNullable`, useful when working with optional values.

### Type Parameters

• **A**

• **B**

### Parameters

• **f**

### Returns

`Function`

#### Parameters

• **self**: [`Option`](../type-aliases/Option.md)\<`A`\>

#### Returns

[`Option`](../type-aliases/Option.md)\<`NonNullable`\<`B`\>\>

### Example

```ts
import { pipe, Option } from "effect"

interface Employee {
  company?: {
    address?: {
      street?: {
        name?: string
      }
    }
  }
}

const employee1: Employee = { company: { address: { street: { name: 'high street' } } } }

assert.deepStrictEqual(
  pipe(
    Option.some(employee1),
    Option.flatMapNullable(employee => employee.company?.address?.street?.name),
  ),
  Option.some('high street')
)

const employee2: Employee = { company: { address: { street: {} } } }

assert.deepStrictEqual(
  pipe(
    Option.some(employee2),
    Option.flatMapNullable(employee => employee.company?.address?.street?.name),
  ),
  Option.none()
)
```

### Since

2.0.0

## flatMapNullable(self, f)

> **flatMapNullable**\<`A`, `B`\>(`self`, `f`): [`Option`](../type-aliases/Option.md)\<`NonNullable`\<`B`\>\>

This is `flatMap` + `fromNullable`, useful when working with optional values.

### Type Parameters

• **A**

• **B**

### Parameters

• **self**: [`Option`](../type-aliases/Option.md)\<`A`\>

• **f**

### Returns

[`Option`](../type-aliases/Option.md)\<`NonNullable`\<`B`\>\>

### Example

```ts
import { pipe, Option } from "effect"

interface Employee {
  company?: {
    address?: {
      street?: {
        name?: string
      }
    }
  }
}

const employee1: Employee = { company: { address: { street: { name: 'high street' } } } }

assert.deepStrictEqual(
  pipe(
    Option.some(employee1),
    Option.flatMapNullable(employee => employee.company?.address?.street?.name),
  ),
  Option.some('high street')
)

const employee2: Employee = { company: { address: { street: {} } } }

assert.deepStrictEqual(
  pipe(
    Option.some(employee2),
    Option.flatMapNullable(employee => employee.company?.address?.street?.name),
  ),
  Option.none()
)
```

### Since

2.0.0

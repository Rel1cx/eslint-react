[@local/eff](../README.md) / implies

# Variable: implies

```ts
const implies: {
<T>  (consequent: (data: T) => boolean): (antecedent: (data: T) => boolean) => (data: T) => boolean;
<T>  (antecedent: (data: T) => boolean, consequent: (data: T) => boolean): (data: T) => boolean;
};
```

Creates a predicate representing logical implication: if `antecedent`, then `consequent`.

**When to use**

Use when you need to encode logical implication between `Predicate` rules,
where one rule only applies when a precondition holds.

**Details**

Models constraints like "if A then B" and returns `true` when the antecedent
is `false`.

**Example** (Checking implication)

```ts
import { Predicate } from "effect"

const isAdult = (age: number) => age >= 18
const canVote = (age: number) => age >= 18
const implies = Predicate.implies(isAdult, canVote)

implies(16) // => true
```

## Call Signature

```ts
<T>(consequent: (data: T) => boolean): (antecedent: (data: T) => boolean) => (data: T) => boolean;
```

### Type Parameters

| Type Parameter |
| ------ |
| `T` |

### Parameters

| Parameter | Type |
| ------ | ------ |
| `consequent` | (`data`: `T`) => `boolean` |

### Returns

(`antecedent`: (`data`: `T`) => `boolean`) => (`data`: `T`) => `boolean`

## Call Signature

```ts
<T>(antecedent: (data: T) => boolean, consequent: (data: T) => boolean): (data: T) => boolean;
```

### Type Parameters

| Type Parameter |
| ------ |
| `T` |

### Parameters

| Parameter | Type |
| ------ | ------ |
| `antecedent` | (`data`: `T`) => `boolean` |
| `consequent` | (`data`: `T`) => `boolean` |

### Returns

(`data`: `T`) => `boolean`

## See

 - [and](and.md)
 - [or](or.md)

## Since

2.0.0

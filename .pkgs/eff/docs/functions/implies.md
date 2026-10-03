[@local/eff](../README.md) / implies

# Function: implies()

```ts
function implies<T>(antecedent: (data: T) => boolean, consequent: (data: T) => boolean): (data: T) => boolean;
```

Creates a predicate representing logical implication: if `antecedent`, then `consequent`.

## Type Parameters

| Type Parameter |
| -------------- |
| `T`            |

## Parameters

| Parameter    | Type                       | Description                                               |
| ------------ | -------------------------- | --------------------------------------------------------- |
| `antecedent` | (`data`: `T`) => `boolean` | The precondition predicate.                               |
| `consequent` | (`data`: `T`) => `boolean` | The predicate that must hold when the precondition holds. |

## Returns

A predicate that is `true` when the antecedent is `false` or the consequent is `true`.

(`data`: `T`) => `boolean`

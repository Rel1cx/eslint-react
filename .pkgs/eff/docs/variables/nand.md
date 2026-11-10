[@local/eff](../README.md) / nand

# Variable: nand

```ts
const nand: {
  <T>(b: (data: T) => boolean): (a: (data: T) => boolean) => (data: T) => boolean;
  <T>(a: (data: T) => boolean, b: (data: T) => boolean): (data: T) => boolean;
};
```

Creates a predicate that returns `true` unless both predicates are `true`.

**When to use**

Use when you want to combine two predicates with logical NAND semantics.

**Details**

Returns the negation of `and`.

**Example** (Checking NAND conditions)

```ts
import { isNumber, isString, nand } from "@local/eff";

const notBoth = nand(isString, isNumber);

notBoth("a"); // => true
```

## Call Signature

```ts
<T>(b: (data: T) => boolean): (a: (data: T) => boolean) => (data: T) => boolean;
```

### Type Parameters

| Type Parameter                          |
| --------------------------------------- |
| <a id="type-parameter-__typet"></a> `T` |

### Parameters

| Parameter | Type                       |
| --------- | -------------------------- |
| `b`       | (`data`: `T`) => `boolean` |

### Returns

(`a`: (`data`: `T`) => `boolean`) => (`data`: `T`) => `boolean`

## Call Signature

```ts
<T>(a: (data: T) => boolean, b: (data: T) => boolean): (data: T) => boolean;
```

### Type Parameters

| Type Parameter                            |
| ----------------------------------------- |
| <a id="type-parameter-__typet-1"></a> `T` |

### Parameters

| Parameter | Type                       |
| --------- | -------------------------- |
| `a`       | (`data`: `T`) => `boolean` |
| `b`       | (`data`: `T`) => `boolean` |

### Returns

(`data`: `T`) => `boolean`

## See

- [and](and.md)
- [not](../functions/not.md)

## Since

2.0.0

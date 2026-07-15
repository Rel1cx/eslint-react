[@local/eff](../README.md) / dual

# Variable: dual

```ts
const dual: {
  <DataLast, DataFirst>(arity: Parameters<DataFirst>["length"], body: DataFirst): DataLast & DataFirst;
  <DataLast, DataFirst>(isDataFirst: (args: IArguments) => boolean, body: DataFirst): DataLast & DataFirst;
};
```

Creates a function that can be called in data-first style or data-last
(`pipe`-friendly) style.

**When to use**

Use to expose one implementation through both direct and `pipe`-friendly
call styles.

**Details**

Pass either the arity of the uncurried function or a predicate that decides
whether the current call is data-first. Arity is the common case. Use a
predicate when optional arguments make arity ambiguous.

**Example** (Selecting data-first or data-last style by arity)

```ts
import { Function, pipe } from "effect";

const sum = Function.dual<
  (that: number) => (self: number) => number,
  (self: number, that: number) => number
>(2, (self, that) => self + that);

console.log(sum(2, 3)); // 5
console.log(pipe(2, sum(3))); // 5
```

**Example** (Defining overloads with call signatures)

```ts
import { Function, pipe } from "effect";

const sum: {
  (that: number): (self: number) => number;
  (self: number, that: number): number;
} = Function.dual(2, (self: number, that: number): number => self + that);

console.log(sum(2, 3)); // 5
console.log(pipe(2, sum(3))); // 5
```

**Example** (Selecting data-first or data-last style with a predicate)

```ts
import { Function, pipe } from "effect";

const sum = Function.dual<
  (that: number) => (self: number) => number,
  (self: number, that: number) => number
>(
  (args) => args.length === 2,
  (self, that) => self + that,
);

console.log(sum(2, 3)); // 5
console.log(pipe(2, sum(3))); // 5
```

## Call Signature

```ts
<DataLast, DataFirst>(arity: Parameters<DataFirst>["length"], body: DataFirst): DataLast & DataFirst;
```

### Type Parameters

| Type Parameter                                      |
| --------------------------------------------------- |
| `DataLast` _extends_ (...`args`: `any`[]) => `any`  |
| `DataFirst` _extends_ (...`args`: `any`[]) => `any` |

### Parameters

| Parameter | Type                                                                                                                        |
| --------- | --------------------------------------------------------------------------------------------------------------------------- |
| `arity`   | [`Parameters`](https://www.typescriptlang.org/docs/handbook/utility-types.html#parameterstype)\<`DataFirst`\>\[`"length"`\] |
| `body`    | `DataFirst`                                                                                                                 |

### Returns

`DataLast` & `DataFirst`

## Call Signature

```ts
<DataLast, DataFirst>(isDataFirst: (args: IArguments) => boolean, body: DataFirst): DataLast & DataFirst;
```

### Type Parameters

| Type Parameter                                      |
| --------------------------------------------------- |
| `DataLast` _extends_ (...`args`: `any`[]) => `any`  |
| `DataFirst` _extends_ (...`args`: `any`[]) => `any` |

### Parameters

| Parameter     | Type                                |
| ------------- | ----------------------------------- |
| `isDataFirst` | (`args`: `IArguments`) => `boolean` |
| `body`        | `DataFirst`                         |

### Returns

`DataLast` & `DataFirst`

## Since

2.0.0

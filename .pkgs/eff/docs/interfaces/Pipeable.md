[@local/eff](../README.md) / Pipeable

# Interface: Pipeable

Interface for values that support method-style `pipe` composition.

**When to use**

Use to type values that expose an Effect-style `.pipe(...)` method.

**Details**

Calling `value.pipe(f, g, h)` passes the value through each function from
left to right, returning the final result. Many Effect data types implement
this so operations can be chained without nesting function calls.

**Example** (Chaining operations with pipe)

```ts
import { Effect } from "effect";

// The Pipeable interface allows Effect values to be chained using the pipe method
const program = Effect.succeed(1).pipe(
  Effect.map((x) => x + 1),
  Effect.flatMap((x) => Effect.succeed(x * 2)),
  Effect.tap((x) => Effect.log(`Result: ${x}`)),
);
```

## Since

2.0.0

## Methods

### pipe()

#### Call Signature

```ts
pipe<A>(this: A): A;
```

##### Type Parameters

| Type Parameter |
| -------------- |
| `A`            |

##### Parameters

| Parameter | Type |
| --------- | ---- |
| `this`    | `A`  |

##### Returns

`A`

#### Call Signature

```ts
pipe<A, B>(this: A, ab: (_: A) => B): B;
```

##### Type Parameters

| Type Parameter | Default type |
| -------------- | ------------ |
| `A`            | -            |
| `B`            | `never`      |

##### Parameters

| Parameter | Type              |
| --------- | ----------------- |
| `this`    | `A`               |
| `ab`      | (`_`: `A`) => `B` |

##### Returns

`B`

#### Call Signature

```ts
pipe<A, B, C>(
   this: A, 
   ab: (_: A) => B, 
   bc: (_: B) => C): C;
```

##### Type Parameters

| Type Parameter | Default type |
| -------------- | ------------ |
| `A`            | -            |
| `B`            | `never`      |
| `C`            | `never`      |

##### Parameters

| Parameter | Type              |
| --------- | ----------------- |
| `this`    | `A`               |
| `ab`      | (`_`: `A`) => `B` |
| `bc`      | (`_`: `B`) => `C` |

##### Returns

`C`

#### Call Signature

```ts
pipe<A, B, C, D>(
   this: A, 
   ab: (_: A) => B, 
   bc: (_: B) => C, 
   cd: (_: C) => D): D;
```

##### Type Parameters

| Type Parameter | Default type |
| -------------- | ------------ |
| `A`            | -            |
| `B`            | `never`      |
| `C`            | `never`      |
| `D`            | `never`      |

##### Parameters

| Parameter | Type              |
| --------- | ----------------- |
| `this`    | `A`               |
| `ab`      | (`_`: `A`) => `B` |
| `bc`      | (`_`: `B`) => `C` |
| `cd`      | (`_`: `C`) => `D` |

##### Returns

`D`

#### Call Signature

```ts
pipe<A, B, C, D, E>(
   this: A, 
   ab: (_: A) => B, 
   bc: (_: B) => C, 
   cd: (_: C) => D, 
   de: (_: D) => E): E;
```

##### Type Parameters

| Type Parameter | Default type |
| -------------- | ------------ |
| `A`            | -            |
| `B`            | `never`      |
| `C`            | `never`      |
| `D`            | `never`      |
| `E`            | `never`      |

##### Parameters

| Parameter | Type              |
| --------- | ----------------- |
| `this`    | `A`               |
| `ab`      | (`_`: `A`) => `B` |
| `bc`      | (`_`: `B`) => `C` |
| `cd`      | (`_`: `C`) => `D` |
| `de`      | (`_`: `D`) => `E` |

##### Returns

`E`

#### Call Signature

```ts
pipe<A, B, C, D, E, F>(
   this: A, 
   ab: (_: A) => B, 
   bc: (_: B) => C, 
   cd: (_: C) => D, 
   de: (_: D) => E, 
   ef: (_: E) => F): F;
```

##### Type Parameters

| Type Parameter | Default type |
| -------------- | ------------ |
| `A`            | -            |
| `B`            | `never`      |
| `C`            | `never`      |
| `D`            | `never`      |
| `E`            | `never`      |
| `F`            | `never`      |

##### Parameters

| Parameter | Type              |
| --------- | ----------------- |
| `this`    | `A`               |
| `ab`      | (`_`: `A`) => `B` |
| `bc`      | (`_`: `B`) => `C` |
| `cd`      | (`_`: `C`) => `D` |
| `de`      | (`_`: `D`) => `E` |
| `ef`      | (`_`: `E`) => `F` |

##### Returns

`F`

#### Call Signature

```ts
pipe<A, B, C, D, E, F, G>(
   this: A, 
   ab: (_: A) => B, 
   bc: (_: B) => C, 
   cd: (_: C) => D, 
   de: (_: D) => E, 
   ef: (_: E) => F, 
   fg: (_: F) => G): G;
```

##### Type Parameters

| Type Parameter | Default type |
| -------------- | ------------ |
| `A`            | -            |
| `B`            | `never`      |
| `C`            | `never`      |
| `D`            | `never`      |
| `E`            | `never`      |
| `F`            | `never`      |
| `G`            | `never`      |

##### Parameters

| Parameter | Type              |
| --------- | ----------------- |
| `this`    | `A`               |
| `ab`      | (`_`: `A`) => `B` |
| `bc`      | (`_`: `B`) => `C` |
| `cd`      | (`_`: `C`) => `D` |
| `de`      | (`_`: `D`) => `E` |
| `ef`      | (`_`: `E`) => `F` |
| `fg`      | (`_`: `F`) => `G` |

##### Returns

`G`

#### Call Signature

```ts
pipe<A, B, C, D, E, F, G, H>(
   this: A, 
   ab: (_: A) => B, 
   bc: (_: B) => C, 
   cd: (_: C) => D, 
   de: (_: D) => E, 
   ef: (_: E) => F, 
   fg: (_: F) => G, 
   gh: (_: G) => H): H;
```

##### Type Parameters

| Type Parameter | Default type |
| -------------- | ------------ |
| `A`            | -            |
| `B`            | `never`      |
| `C`            | `never`      |
| `D`            | `never`      |
| `E`            | `never`      |
| `F`            | `never`      |
| `G`            | `never`      |
| `H`            | `never`      |

##### Parameters

| Parameter | Type              |
| --------- | ----------------- |
| `this`    | `A`               |
| `ab`      | (`_`: `A`) => `B` |
| `bc`      | (`_`: `B`) => `C` |
| `cd`      | (`_`: `C`) => `D` |
| `de`      | (`_`: `D`) => `E` |
| `ef`      | (`_`: `E`) => `F` |
| `fg`      | (`_`: `F`) => `G` |
| `gh`      | (`_`: `G`) => `H` |

##### Returns

`H`

#### Call Signature

```ts
pipe<A, B, C, D, E, F, G, H, I>(
   this: A, 
   ab: (_: A) => B, 
   bc: (_: B) => C, 
   cd: (_: C) => D, 
   de: (_: D) => E, 
   ef: (_: E) => F, 
   fg: (_: F) => G, 
   gh: (_: G) => H, 
   hi: (_: H) => I): I;
```

##### Type Parameters

| Type Parameter | Default type |
| -------------- | ------------ |
| `A`            | -            |
| `B`            | `never`      |
| `C`            | `never`      |
| `D`            | `never`      |
| `E`            | `never`      |
| `F`            | `never`      |
| `G`            | `never`      |
| `H`            | `never`      |
| `I`            | `never`      |

##### Parameters

| Parameter | Type              |
| --------- | ----------------- |
| `this`    | `A`               |
| `ab`      | (`_`: `A`) => `B` |
| `bc`      | (`_`: `B`) => `C` |
| `cd`      | (`_`: `C`) => `D` |
| `de`      | (`_`: `D`) => `E` |
| `ef`      | (`_`: `E`) => `F` |
| `fg`      | (`_`: `F`) => `G` |
| `gh`      | (`_`: `G`) => `H` |
| `hi`      | (`_`: `H`) => `I` |

##### Returns

`I`

#### Call Signature

```ts
pipe<A, B, C, D, E, F, G, H, I, J>(
   this: A, 
   ab: (_: A) => B, 
   bc: (_: B) => C, 
   cd: (_: C) => D, 
   de: (_: D) => E, 
   ef: (_: E) => F, 
   fg: (_: F) => G, 
   gh: (_: G) => H, 
   hi: (_: H) => I, 
   ij: (_: I) => J): J;
```

##### Type Parameters

| Type Parameter | Default type |
| -------------- | ------------ |
| `A`            | -            |
| `B`            | `never`      |
| `C`            | `never`      |
| `D`            | `never`      |
| `E`            | `never`      |
| `F`            | `never`      |
| `G`            | `never`      |
| `H`            | `never`      |
| `I`            | `never`      |
| `J`            | `never`      |

##### Parameters

| Parameter | Type              |
| --------- | ----------------- |
| `this`    | `A`               |
| `ab`      | (`_`: `A`) => `B` |
| `bc`      | (`_`: `B`) => `C` |
| `cd`      | (`_`: `C`) => `D` |
| `de`      | (`_`: `D`) => `E` |
| `ef`      | (`_`: `E`) => `F` |
| `fg`      | (`_`: `F`) => `G` |
| `gh`      | (`_`: `G`) => `H` |
| `hi`      | (`_`: `H`) => `I` |
| `ij`      | (`_`: `I`) => `J` |

##### Returns

`J`

#### Call Signature

```ts
pipe<A, B, C, D, E, F, G, H, I, J, K>(
   this: A, 
   ab: (_: A) => B, 
   bc: (_: B) => C, 
   cd: (_: C) => D, 
   de: (_: D) => E, 
   ef: (_: E) => F, 
   fg: (_: F) => G, 
   gh: (_: G) => H, 
   hi: (_: H) => I, 
   ij: (_: I) => J, 
   jk: (_: J) => K): K;
```

##### Type Parameters

| Type Parameter | Default type |
| -------------- | ------------ |
| `A`            | -            |
| `B`            | `never`      |
| `C`            | `never`      |
| `D`            | `never`      |
| `E`            | `never`      |
| `F`            | `never`      |
| `G`            | `never`      |
| `H`            | `never`      |
| `I`            | `never`      |
| `J`            | `never`      |
| `K`            | `never`      |

##### Parameters

| Parameter | Type              |
| --------- | ----------------- |
| `this`    | `A`               |
| `ab`      | (`_`: `A`) => `B` |
| `bc`      | (`_`: `B`) => `C` |
| `cd`      | (`_`: `C`) => `D` |
| `de`      | (`_`: `D`) => `E` |
| `ef`      | (`_`: `E`) => `F` |
| `fg`      | (`_`: `F`) => `G` |
| `gh`      | (`_`: `G`) => `H` |
| `hi`      | (`_`: `H`) => `I` |
| `ij`      | (`_`: `I`) => `J` |
| `jk`      | (`_`: `J`) => `K` |

##### Returns

`K`

#### Call Signature

```ts
pipe<A, B, C, D, E, F, G, H, I, J, K, L>(
   this: A, 
   ab: (_: A) => B, 
   bc: (_: B) => C, 
   cd: (_: C) => D, 
   de: (_: D) => E, 
   ef: (_: E) => F, 
   fg: (_: F) => G, 
   gh: (_: G) => H, 
   hi: (_: H) => I, 
   ij: (_: I) => J, 
   jk: (_: J) => K, 
   kl: (_: K) => L): L;
```

##### Type Parameters

| Type Parameter | Default type |
| -------------- | ------------ |
| `A`            | -            |
| `B`            | `never`      |
| `C`            | `never`      |
| `D`            | `never`      |
| `E`            | `never`      |
| `F`            | `never`      |
| `G`            | `never`      |
| `H`            | `never`      |
| `I`            | `never`      |
| `J`            | `never`      |
| `K`            | `never`      |
| `L`            | `never`      |

##### Parameters

| Parameter | Type              |
| --------- | ----------------- |
| `this`    | `A`               |
| `ab`      | (`_`: `A`) => `B` |
| `bc`      | (`_`: `B`) => `C` |
| `cd`      | (`_`: `C`) => `D` |
| `de`      | (`_`: `D`) => `E` |
| `ef`      | (`_`: `E`) => `F` |
| `fg`      | (`_`: `F`) => `G` |
| `gh`      | (`_`: `G`) => `H` |
| `hi`      | (`_`: `H`) => `I` |
| `ij`      | (`_`: `I`) => `J` |
| `jk`      | (`_`: `J`) => `K` |
| `kl`      | (`_`: `K`) => `L` |

##### Returns

`L`

#### Call Signature

```ts
pipe<A, B, C, D, E, F, G, H, I, J, K, L, M>(
   this: A, 
   ab: (_: A) => B, 
   bc: (_: B) => C, 
   cd: (_: C) => D, 
   de: (_: D) => E, 
   ef: (_: E) => F, 
   fg: (_: F) => G, 
   gh: (_: G) => H, 
   hi: (_: H) => I, 
   ij: (_: I) => J, 
   jk: (_: J) => K, 
   kl: (_: K) => L, 
   lm: (_: L) => M): M;
```

##### Type Parameters

| Type Parameter | Default type |
| -------------- | ------------ |
| `A`            | -            |
| `B`            | `never`      |
| `C`            | `never`      |
| `D`            | `never`      |
| `E`            | `never`      |
| `F`            | `never`      |
| `G`            | `never`      |
| `H`            | `never`      |
| `I`            | `never`      |
| `J`            | `never`      |
| `K`            | `never`      |
| `L`            | `never`      |
| `M`            | `never`      |

##### Parameters

| Parameter | Type              |
| --------- | ----------------- |
| `this`    | `A`               |
| `ab`      | (`_`: `A`) => `B` |
| `bc`      | (`_`: `B`) => `C` |
| `cd`      | (`_`: `C`) => `D` |
| `de`      | (`_`: `D`) => `E` |
| `ef`      | (`_`: `E`) => `F` |
| `fg`      | (`_`: `F`) => `G` |
| `gh`      | (`_`: `G`) => `H` |
| `hi`      | (`_`: `H`) => `I` |
| `ij`      | (`_`: `I`) => `J` |
| `jk`      | (`_`: `J`) => `K` |
| `kl`      | (`_`: `K`) => `L` |
| `lm`      | (`_`: `L`) => `M` |

##### Returns

`M`

#### Call Signature

```ts
pipe<A, B, C, D, E, F, G, H, I, J, K, L, M, N>(
   this: A, 
   ab: (_: A) => B, 
   bc: (_: B) => C, 
   cd: (_: C) => D, 
   de: (_: D) => E, 
   ef: (_: E) => F, 
   fg: (_: F) => G, 
   gh: (_: G) => H, 
   hi: (_: H) => I, 
   ij: (_: I) => J, 
   jk: (_: J) => K, 
   kl: (_: K) => L, 
   lm: (_: L) => M, 
   mn: (_: M) => N): N;
```

##### Type Parameters

| Type Parameter | Default type |
| -------------- | ------------ |
| `A`            | -            |
| `B`            | `never`      |
| `C`            | `never`      |
| `D`            | `never`      |
| `E`            | `never`      |
| `F`            | `never`      |
| `G`            | `never`      |
| `H`            | `never`      |
| `I`            | `never`      |
| `J`            | `never`      |
| `K`            | `never`      |
| `L`            | `never`      |
| `M`            | `never`      |
| `N`            | `never`      |

##### Parameters

| Parameter | Type              |
| --------- | ----------------- |
| `this`    | `A`               |
| `ab`      | (`_`: `A`) => `B` |
| `bc`      | (`_`: `B`) => `C` |
| `cd`      | (`_`: `C`) => `D` |
| `de`      | (`_`: `D`) => `E` |
| `ef`      | (`_`: `E`) => `F` |
| `fg`      | (`_`: `F`) => `G` |
| `gh`      | (`_`: `G`) => `H` |
| `hi`      | (`_`: `H`) => `I` |
| `ij`      | (`_`: `I`) => `J` |
| `jk`      | (`_`: `J`) => `K` |
| `kl`      | (`_`: `K`) => `L` |
| `lm`      | (`_`: `L`) => `M` |
| `mn`      | (`_`: `M`) => `N` |

##### Returns

`N`

#### Call Signature

```ts
pipe<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O>(
   this: A, 
   ab: (_: A) => B, 
   bc: (_: B) => C, 
   cd: (_: C) => D, 
   de: (_: D) => E, 
   ef: (_: E) => F, 
   fg: (_: F) => G, 
   gh: (_: G) => H, 
   hi: (_: H) => I, 
   ij: (_: I) => J, 
   jk: (_: J) => K, 
   kl: (_: K) => L, 
   lm: (_: L) => M, 
   mn: (_: M) => N, 
   no: (_: N) => O): O;
```

##### Type Parameters

| Type Parameter | Default type |
| -------------- | ------------ |
| `A`            | -            |
| `B`            | `never`      |
| `C`            | `never`      |
| `D`            | `never`      |
| `E`            | `never`      |
| `F`            | `never`      |
| `G`            | `never`      |
| `H`            | `never`      |
| `I`            | `never`      |
| `J`            | `never`      |
| `K`            | `never`      |
| `L`            | `never`      |
| `M`            | `never`      |
| `N`            | `never`      |
| `O`            | `never`      |

##### Parameters

| Parameter | Type              |
| --------- | ----------------- |
| `this`    | `A`               |
| `ab`      | (`_`: `A`) => `B` |
| `bc`      | (`_`: `B`) => `C` |
| `cd`      | (`_`: `C`) => `D` |
| `de`      | (`_`: `D`) => `E` |
| `ef`      | (`_`: `E`) => `F` |
| `fg`      | (`_`: `F`) => `G` |
| `gh`      | (`_`: `G`) => `H` |
| `hi`      | (`_`: `H`) => `I` |
| `ij`      | (`_`: `I`) => `J` |
| `jk`      | (`_`: `J`) => `K` |
| `kl`      | (`_`: `K`) => `L` |
| `lm`      | (`_`: `L`) => `M` |
| `mn`      | (`_`: `M`) => `N` |
| `no`      | (`_`: `N`) => `O` |

##### Returns

`O`

#### Call Signature

```ts
pipe<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P>(
   this: A, 
   ab: (_: A) => B, 
   bc: (_: B) => C, 
   cd: (_: C) => D, 
   de: (_: D) => E, 
   ef: (_: E) => F, 
   fg: (_: F) => G, 
   gh: (_: G) => H, 
   hi: (_: H) => I, 
   ij: (_: I) => J, 
   jk: (_: J) => K, 
   kl: (_: K) => L, 
   lm: (_: L) => M, 
   mn: (_: M) => N, 
   no: (_: N) => O, 
   op: (_: O) => P): P;
```

##### Type Parameters

| Type Parameter | Default type |
| -------------- | ------------ |
| `A`            | -            |
| `B`            | `never`      |
| `C`            | `never`      |
| `D`            | `never`      |
| `E`            | `never`      |
| `F`            | `never`      |
| `G`            | `never`      |
| `H`            | `never`      |
| `I`            | `never`      |
| `J`            | `never`      |
| `K`            | `never`      |
| `L`            | `never`      |
| `M`            | `never`      |
| `N`            | `never`      |
| `O`            | `never`      |
| `P`            | `never`      |

##### Parameters

| Parameter | Type              |
| --------- | ----------------- |
| `this`    | `A`               |
| `ab`      | (`_`: `A`) => `B` |
| `bc`      | (`_`: `B`) => `C` |
| `cd`      | (`_`: `C`) => `D` |
| `de`      | (`_`: `D`) => `E` |
| `ef`      | (`_`: `E`) => `F` |
| `fg`      | (`_`: `F`) => `G` |
| `gh`      | (`_`: `G`) => `H` |
| `hi`      | (`_`: `H`) => `I` |
| `ij`      | (`_`: `I`) => `J` |
| `jk`      | (`_`: `J`) => `K` |
| `kl`      | (`_`: `K`) => `L` |
| `lm`      | (`_`: `L`) => `M` |
| `mn`      | (`_`: `M`) => `N` |
| `no`      | (`_`: `N`) => `O` |
| `op`      | (`_`: `O`) => `P` |

##### Returns

`P`

#### Call Signature

```ts
pipe<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q>(
   this: A, 
   ab: (_: A) => B, 
   bc: (_: B) => C, 
   cd: (_: C) => D, 
   de: (_: D) => E, 
   ef: (_: E) => F, 
   fg: (_: F) => G, 
   gh: (_: G) => H, 
   hi: (_: H) => I, 
   ij: (_: I) => J, 
   jk: (_: J) => K, 
   kl: (_: K) => L, 
   lm: (_: L) => M, 
   mn: (_: M) => N, 
   no: (_: N) => O, 
   op: (_: O) => P, 
   pq: (_: P) => Q): Q;
```

##### Type Parameters

| Type Parameter | Default type |
| -------------- | ------------ |
| `A`            | -            |
| `B`            | `never`      |
| `C`            | `never`      |
| `D`            | `never`      |
| `E`            | `never`      |
| `F`            | `never`      |
| `G`            | `never`      |
| `H`            | `never`      |
| `I`            | `never`      |
| `J`            | `never`      |
| `K`            | `never`      |
| `L`            | `never`      |
| `M`            | `never`      |
| `N`            | `never`      |
| `O`            | `never`      |
| `P`            | `never`      |
| `Q`            | `never`      |

##### Parameters

| Parameter | Type              |
| --------- | ----------------- |
| `this`    | `A`               |
| `ab`      | (`_`: `A`) => `B` |
| `bc`      | (`_`: `B`) => `C` |
| `cd`      | (`_`: `C`) => `D` |
| `de`      | (`_`: `D`) => `E` |
| `ef`      | (`_`: `E`) => `F` |
| `fg`      | (`_`: `F`) => `G` |
| `gh`      | (`_`: `G`) => `H` |
| `hi`      | (`_`: `H`) => `I` |
| `ij`      | (`_`: `I`) => `J` |
| `jk`      | (`_`: `J`) => `K` |
| `kl`      | (`_`: `K`) => `L` |
| `lm`      | (`_`: `L`) => `M` |
| `mn`      | (`_`: `M`) => `N` |
| `no`      | (`_`: `N`) => `O` |
| `op`      | (`_`: `O`) => `P` |
| `pq`      | (`_`: `P`) => `Q` |

##### Returns

`Q`

#### Call Signature

```ts
pipe<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R>(
   this: A, 
   ab: (_: A) => B, 
   bc: (_: B) => C, 
   cd: (_: C) => D, 
   de: (_: D) => E, 
   ef: (_: E) => F, 
   fg: (_: F) => G, 
   gh: (_: G) => H, 
   hi: (_: H) => I, 
   ij: (_: I) => J, 
   jk: (_: J) => K, 
   kl: (_: K) => L, 
   lm: (_: L) => M, 
   mn: (_: M) => N, 
   no: (_: N) => O, 
   op: (_: O) => P, 
   pq: (_: P) => Q, 
   qr: (_: Q) => R): R;
```

##### Type Parameters

| Type Parameter | Default type |
| -------------- | ------------ |
| `A`            | -            |
| `B`            | `never`      |
| `C`            | `never`      |
| `D`            | `never`      |
| `E`            | `never`      |
| `F`            | `never`      |
| `G`            | `never`      |
| `H`            | `never`      |
| `I`            | `never`      |
| `J`            | `never`      |
| `K`            | `never`      |
| `L`            | `never`      |
| `M`            | `never`      |
| `N`            | `never`      |
| `O`            | `never`      |
| `P`            | `never`      |
| `Q`            | `never`      |
| `R`            | `never`      |

##### Parameters

| Parameter | Type              |
| --------- | ----------------- |
| `this`    | `A`               |
| `ab`      | (`_`: `A`) => `B` |
| `bc`      | (`_`: `B`) => `C` |
| `cd`      | (`_`: `C`) => `D` |
| `de`      | (`_`: `D`) => `E` |
| `ef`      | (`_`: `E`) => `F` |
| `fg`      | (`_`: `F`) => `G` |
| `gh`      | (`_`: `G`) => `H` |
| `hi`      | (`_`: `H`) => `I` |
| `ij`      | (`_`: `I`) => `J` |
| `jk`      | (`_`: `J`) => `K` |
| `kl`      | (`_`: `K`) => `L` |
| `lm`      | (`_`: `L`) => `M` |
| `mn`      | (`_`: `M`) => `N` |
| `no`      | (`_`: `N`) => `O` |
| `op`      | (`_`: `O`) => `P` |
| `pq`      | (`_`: `P`) => `Q` |
| `qr`      | (`_`: `Q`) => `R` |

##### Returns

`R`

#### Call Signature

```ts
pipe<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S>(
   this: A, 
   ab: (_: A) => B, 
   bc: (_: B) => C, 
   cd: (_: C) => D, 
   de: (_: D) => E, 
   ef: (_: E) => F, 
   fg: (_: F) => G, 
   gh: (_: G) => H, 
   hi: (_: H) => I, 
   ij: (_: I) => J, 
   jk: (_: J) => K, 
   kl: (_: K) => L, 
   lm: (_: L) => M, 
   mn: (_: M) => N, 
   no: (_: N) => O, 
   op: (_: O) => P, 
   pq: (_: P) => Q, 
   qr: (_: Q) => R, 
   rs: (_: R) => S): S;
```

##### Type Parameters

| Type Parameter | Default type |
| -------------- | ------------ |
| `A`            | -            |
| `B`            | `never`      |
| `C`            | `never`      |
| `D`            | `never`      |
| `E`            | `never`      |
| `F`            | `never`      |
| `G`            | `never`      |
| `H`            | `never`      |
| `I`            | `never`      |
| `J`            | `never`      |
| `K`            | `never`      |
| `L`            | `never`      |
| `M`            | `never`      |
| `N`            | `never`      |
| `O`            | `never`      |
| `P`            | `never`      |
| `Q`            | `never`      |
| `R`            | `never`      |
| `S`            | `never`      |

##### Parameters

| Parameter | Type              |
| --------- | ----------------- |
| `this`    | `A`               |
| `ab`      | (`_`: `A`) => `B` |
| `bc`      | (`_`: `B`) => `C` |
| `cd`      | (`_`: `C`) => `D` |
| `de`      | (`_`: `D`) => `E` |
| `ef`      | (`_`: `E`) => `F` |
| `fg`      | (`_`: `F`) => `G` |
| `gh`      | (`_`: `G`) => `H` |
| `hi`      | (`_`: `H`) => `I` |
| `ij`      | (`_`: `I`) => `J` |
| `jk`      | (`_`: `J`) => `K` |
| `kl`      | (`_`: `K`) => `L` |
| `lm`      | (`_`: `L`) => `M` |
| `mn`      | (`_`: `M`) => `N` |
| `no`      | (`_`: `N`) => `O` |
| `op`      | (`_`: `O`) => `P` |
| `pq`      | (`_`: `P`) => `Q` |
| `qr`      | (`_`: `Q`) => `R` |
| `rs`      | (`_`: `R`) => `S` |

##### Returns

`S`

#### Call Signature

```ts
pipe<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T>(
   this: A, 
   ab: (_: A) => B, 
   bc: (_: B) => C, 
   cd: (_: C) => D, 
   de: (_: D) => E, 
   ef: (_: E) => F, 
   fg: (_: F) => G, 
   gh: (_: G) => H, 
   hi: (_: H) => I, 
   ij: (_: I) => J, 
   jk: (_: J) => K, 
   kl: (_: K) => L, 
   lm: (_: L) => M, 
   mn: (_: M) => N, 
   no: (_: N) => O, 
   op: (_: O) => P, 
   pq: (_: P) => Q, 
   qr: (_: Q) => R, 
   rs: (_: R) => S, 
   st: (_: S) => T): T;
```

##### Type Parameters

| Type Parameter | Default type |
| -------------- | ------------ |
| `A`            | -            |
| `B`            | `never`      |
| `C`            | `never`      |
| `D`            | `never`      |
| `E`            | `never`      |
| `F`            | `never`      |
| `G`            | `never`      |
| `H`            | `never`      |
| `I`            | `never`      |
| `J`            | `never`      |
| `K`            | `never`      |
| `L`            | `never`      |
| `M`            | `never`      |
| `N`            | `never`      |
| `O`            | `never`      |
| `P`            | `never`      |
| `Q`            | `never`      |
| `R`            | `never`      |
| `S`            | `never`      |
| `T`            | `never`      |

##### Parameters

| Parameter | Type              |
| --------- | ----------------- |
| `this`    | `A`               |
| `ab`      | (`_`: `A`) => `B` |
| `bc`      | (`_`: `B`) => `C` |
| `cd`      | (`_`: `C`) => `D` |
| `de`      | (`_`: `D`) => `E` |
| `ef`      | (`_`: `E`) => `F` |
| `fg`      | (`_`: `F`) => `G` |
| `gh`      | (`_`: `G`) => `H` |
| `hi`      | (`_`: `H`) => `I` |
| `ij`      | (`_`: `I`) => `J` |
| `jk`      | (`_`: `J`) => `K` |
| `kl`      | (`_`: `K`) => `L` |
| `lm`      | (`_`: `L`) => `M` |
| `mn`      | (`_`: `M`) => `N` |
| `no`      | (`_`: `N`) => `O` |
| `op`      | (`_`: `O`) => `P` |
| `pq`      | (`_`: `P`) => `Q` |
| `qr`      | (`_`: `Q`) => `R` |
| `rs`      | (`_`: `R`) => `S` |
| `st`      | (`_`: `S`) => `T` |

##### Returns

`T`

#### Call Signature

```ts
pipe<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U>(
   this: A, 
   ab: (_: A) => B, 
   bc: (_: B) => C, 
   cd: (_: C) => D, 
   de: (_: D) => E, 
   ef: (_: E) => F, 
   fg: (_: F) => G, 
   gh: (_: G) => H, 
   hi: (_: H) => I, 
   ij: (_: I) => J, 
   jk: (_: J) => K, 
   kl: (_: K) => L, 
   lm: (_: L) => M, 
   mn: (_: M) => N, 
   no: (_: N) => O, 
   op: (_: O) => P, 
   pq: (_: P) => Q, 
   qr: (_: Q) => R, 
   rs: (_: R) => S, 
   st: (_: S) => T, 
   tu: (_: T) => U): U;
```

##### Type Parameters

| Type Parameter | Default type |
| -------------- | ------------ |
| `A`            | -            |
| `B`            | `never`      |
| `C`            | `never`      |
| `D`            | `never`      |
| `E`            | `never`      |
| `F`            | `never`      |
| `G`            | `never`      |
| `H`            | `never`      |
| `I`            | `never`      |
| `J`            | `never`      |
| `K`            | `never`      |
| `L`            | `never`      |
| `M`            | `never`      |
| `N`            | `never`      |
| `O`            | `never`      |
| `P`            | `never`      |
| `Q`            | `never`      |
| `R`            | `never`      |
| `S`            | `never`      |
| `T`            | `never`      |
| `U`            | `never`      |

##### Parameters

| Parameter | Type              |
| --------- | ----------------- |
| `this`    | `A`               |
| `ab`      | (`_`: `A`) => `B` |
| `bc`      | (`_`: `B`) => `C` |
| `cd`      | (`_`: `C`) => `D` |
| `de`      | (`_`: `D`) => `E` |
| `ef`      | (`_`: `E`) => `F` |
| `fg`      | (`_`: `F`) => `G` |
| `gh`      | (`_`: `G`) => `H` |
| `hi`      | (`_`: `H`) => `I` |
| `ij`      | (`_`: `I`) => `J` |
| `jk`      | (`_`: `J`) => `K` |
| `kl`      | (`_`: `K`) => `L` |
| `lm`      | (`_`: `L`) => `M` |
| `mn`      | (`_`: `M`) => `N` |
| `no`      | (`_`: `N`) => `O` |
| `op`      | (`_`: `O`) => `P` |
| `pq`      | (`_`: `P`) => `Q` |
| `qr`      | (`_`: `Q`) => `R` |
| `rs`      | (`_`: `R`) => `S` |
| `st`      | (`_`: `S`) => `T` |
| `tu`      | (`_`: `T`) => `U` |

##### Returns

`U`

#### Call Signature

```ts
pipe<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U>(
   this: A, 
   ab: (_: A) => B, 
   bc: (_: B) => C, 
   cd: (_: C) => D, 
   de: (_: D) => E, 
   ef: (_: E) => F, 
   fg: (_: F) => G, 
   gh: (_: G) => H, 
   hi: (_: H) => I, 
   ij: (_: I) => J, 
   jk: (_: J) => K, 
   kl: (_: K) => L, 
   lm: (_: L) => M, 
   mn: (_: M) => N, 
   no: (_: N) => O, 
   op: (_: O) => P, 
   pq: (_: P) => Q, 
   qr: (_: Q) => R, 
   rs: (_: R) => S, 
   st: (_: S) => T, 
   tu: (_: T) => U): U;
```

##### Type Parameters

| Type Parameter | Default type |
| -------------- | ------------ |
| `A`            | -            |
| `B`            | `never`      |
| `C`            | `never`      |
| `D`            | `never`      |
| `E`            | `never`      |
| `F`            | `never`      |
| `G`            | `never`      |
| `H`            | `never`      |
| `I`            | `never`      |
| `J`            | `never`      |
| `K`            | `never`      |
| `L`            | `never`      |
| `M`            | `never`      |
| `N`            | `never`      |
| `O`            | `never`      |
| `P`            | `never`      |
| `Q`            | `never`      |
| `R`            | `never`      |
| `S`            | `never`      |
| `T`            | `never`      |
| `U`            | `never`      |

##### Parameters

| Parameter | Type              |
| --------- | ----------------- |
| `this`    | `A`               |
| `ab`      | (`_`: `A`) => `B` |
| `bc`      | (`_`: `B`) => `C` |
| `cd`      | (`_`: `C`) => `D` |
| `de`      | (`_`: `D`) => `E` |
| `ef`      | (`_`: `E`) => `F` |
| `fg`      | (`_`: `F`) => `G` |
| `gh`      | (`_`: `G`) => `H` |
| `hi`      | (`_`: `H`) => `I` |
| `ij`      | (`_`: `I`) => `J` |
| `jk`      | (`_`: `J`) => `K` |
| `kl`      | (`_`: `K`) => `L` |
| `lm`      | (`_`: `L`) => `M` |
| `mn`      | (`_`: `M`) => `N` |
| `no`      | (`_`: `N`) => `O` |
| `op`      | (`_`: `O`) => `P` |
| `pq`      | (`_`: `P`) => `Q` |
| `qr`      | (`_`: `Q`) => `R` |
| `rs`      | (`_`: `R`) => `S` |
| `st`      | (`_`: `S`) => `T` |
| `tu`      | (`_`: `T`) => `U` |

##### Returns

`U`

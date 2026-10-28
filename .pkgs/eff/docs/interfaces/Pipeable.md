[@local/eff](../README.md) / Pipeable

# Interface: Pipeable

Interface for values that support method-style `pipe` composition.

**When to use**

Use to type values that expose a `.pipe(...)` method.

**Details**

Calling `value.pipe(f, g, h)` passes the value through each function from
left to right, returning the final result. Classes can gain this method by
extending `Class` or using `Mixin` so operations can be chained without
nesting function calls.

**Example** (Chaining operations with pipe)

```ts
import { Class } from "@local/eff";

// Classes that extend `Class` gain a `.pipe(...)` method
class NumberBox extends Class {
  constructor(readonly value: number) {
    super();
  }
}

const box = new NumberBox(1);
box.pipe((self) => self.value + 1); // => 2
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

| Type Parameter                    |
| --------------------------------- |
| <a id="type-parameter-a"></a> `A` |

##### Parameters

| Parameter | Type |
| --------- | ---- |
| `this`    | `A`  |

##### Returns

`A`

#### Call Signature

```ts
pipe<A, B = never>(this: A, ab: (_: A) => B): B;
```

##### Type Parameters

| Type Parameter                      | Default type |
| ----------------------------------- | ------------ |
| <a id="type-parameter-a-1"></a> `A` | -            |
| <a id="type-parameter-b"></a> `B`   | `never`      |

##### Parameters

| Parameter | Type              |
| --------- | ----------------- |
| `this`    | `A`               |
| `ab`      | (`_`: `A`) => `B` |

##### Returns

`B`

#### Call Signature

```ts
pipe<A, B = never, C = never>(
   this: A, 
   ab: (_: A) => B, 
   bc: (_: B) => C
): C;
```

##### Type Parameters

| Type Parameter                      | Default type |
| ----------------------------------- | ------------ |
| <a id="type-parameter-a-2"></a> `A` | -            |
| <a id="type-parameter-b-1"></a> `B` | `never`      |
| <a id="type-parameter-c"></a> `C`   | `never`      |

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
pipe<A, B = never, C = never, D = never>(
   this: A, 
   ab: (_: A) => B, 
   bc: (_: B) => C, 
   cd: (_: C) => D
): D;
```

##### Type Parameters

| Type Parameter                      | Default type |
| ----------------------------------- | ------------ |
| <a id="type-parameter-a-3"></a> `A` | -            |
| <a id="type-parameter-b-2"></a> `B` | `never`      |
| <a id="type-parameter-c-1"></a> `C` | `never`      |
| <a id="type-parameter-d"></a> `D`   | `never`      |

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
pipe<A, B = never, C = never, D = never, E = never>(
   this: A, 
   ab: (_: A) => B, 
   bc: (_: B) => C, 
   cd: (_: C) => D, 
   de: (_: D) => E
): E;
```

##### Type Parameters

| Type Parameter                      | Default type |
| ----------------------------------- | ------------ |
| <a id="type-parameter-a-4"></a> `A` | -            |
| <a id="type-parameter-b-3"></a> `B` | `never`      |
| <a id="type-parameter-c-2"></a> `C` | `never`      |
| <a id="type-parameter-d-1"></a> `D` | `never`      |
| <a id="type-parameter-e"></a> `E`   | `never`      |

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
pipe<A, B = never, C = never, D = never, E = never, F = never>(
   this: A, 
   ab: (_: A) => B, 
   bc: (_: B) => C, 
   cd: (_: C) => D, 
   de: (_: D) => E, 
   ef: (_: E) => F
): F;
```

##### Type Parameters

| Type Parameter                      | Default type |
| ----------------------------------- | ------------ |
| <a id="type-parameter-a-5"></a> `A` | -            |
| <a id="type-parameter-b-4"></a> `B` | `never`      |
| <a id="type-parameter-c-3"></a> `C` | `never`      |
| <a id="type-parameter-d-2"></a> `D` | `never`      |
| <a id="type-parameter-e-1"></a> `E` | `never`      |
| <a id="type-parameter-f"></a> `F`   | `never`      |

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
pipe<A, B = never, C = never, D = never, E = never, F = never, G = never>(
   this: A, 
   ab: (_: A) => B, 
   bc: (_: B) => C, 
   cd: (_: C) => D, 
   de: (_: D) => E, 
   ef: (_: E) => F, 
   fg: (_: F) => G
): G;
```

##### Type Parameters

| Type Parameter                      | Default type |
| ----------------------------------- | ------------ |
| <a id="type-parameter-a-6"></a> `A` | -            |
| <a id="type-parameter-b-5"></a> `B` | `never`      |
| <a id="type-parameter-c-4"></a> `C` | `never`      |
| <a id="type-parameter-d-3"></a> `D` | `never`      |
| <a id="type-parameter-e-2"></a> `E` | `never`      |
| <a id="type-parameter-f-1"></a> `F` | `never`      |
| <a id="type-parameter-g"></a> `G`   | `never`      |

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
pipe<A, B = never, C = never, D = never, E = never, F = never, G = never, H = never>(
   this: A, 
   ab: (_: A) => B, 
   bc: (_: B) => C, 
   cd: (_: C) => D, 
   de: (_: D) => E, 
   ef: (_: E) => F, 
   fg: (_: F) => G, 
   gh: (_: G) => H
): H;
```

##### Type Parameters

| Type Parameter                      | Default type |
| ----------------------------------- | ------------ |
| <a id="type-parameter-a-7"></a> `A` | -            |
| <a id="type-parameter-b-6"></a> `B` | `never`      |
| <a id="type-parameter-c-5"></a> `C` | `never`      |
| <a id="type-parameter-d-4"></a> `D` | `never`      |
| <a id="type-parameter-e-3"></a> `E` | `never`      |
| <a id="type-parameter-f-2"></a> `F` | `never`      |
| <a id="type-parameter-g-1"></a> `G` | `never`      |
| <a id="type-parameter-h"></a> `H`   | `never`      |

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
pipe<A, B = never, C = never, D = never, E = never, F = never, G = never, H = never, I = never>(
   this: A, 
   ab: (_: A) => B, 
   bc: (_: B) => C, 
   cd: (_: C) => D, 
   de: (_: D) => E, 
   ef: (_: E) => F, 
   fg: (_: F) => G, 
   gh: (_: G) => H, 
   hi: (_: H) => I
): I;
```

##### Type Parameters

| Type Parameter                      | Default type |
| ----------------------------------- | ------------ |
| <a id="type-parameter-a-8"></a> `A` | -            |
| <a id="type-parameter-b-7"></a> `B` | `never`      |
| <a id="type-parameter-c-6"></a> `C` | `never`      |
| <a id="type-parameter-d-5"></a> `D` | `never`      |
| <a id="type-parameter-e-4"></a> `E` | `never`      |
| <a id="type-parameter-f-3"></a> `F` | `never`      |
| <a id="type-parameter-g-2"></a> `G` | `never`      |
| <a id="type-parameter-h-1"></a> `H` | `never`      |
| <a id="type-parameter-i"></a> `I`   | `never`      |

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
pipe<A, B = never, C = never, D = never, E = never, F = never, G = never, H = never, I = never, J = never>(
   this: A, 
   ab: (_: A) => B, 
   bc: (_: B) => C, 
   cd: (_: C) => D, 
   de: (_: D) => E, 
   ef: (_: E) => F, 
   fg: (_: F) => G, 
   gh: (_: G) => H, 
   hi: (_: H) => I, 
   ij: (_: I) => J
): J;
```

##### Type Parameters

| Type Parameter                      | Default type |
| ----------------------------------- | ------------ |
| <a id="type-parameter-a-9"></a> `A` | -            |
| <a id="type-parameter-b-8"></a> `B` | `never`      |
| <a id="type-parameter-c-7"></a> `C` | `never`      |
| <a id="type-parameter-d-6"></a> `D` | `never`      |
| <a id="type-parameter-e-5"></a> `E` | `never`      |
| <a id="type-parameter-f-4"></a> `F` | `never`      |
| <a id="type-parameter-g-3"></a> `G` | `never`      |
| <a id="type-parameter-h-2"></a> `H` | `never`      |
| <a id="type-parameter-i-1"></a> `I` | `never`      |
| <a id="type-parameter-j"></a> `J`   | `never`      |

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
pipe<A, B = never, C = never, D = never, E = never, F = never, G = never, H = never, I = never, J = never, K = never>(
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
   jk: (_: J) => K
): K;
```

##### Type Parameters

| Type Parameter                       | Default type |
| ------------------------------------ | ------------ |
| <a id="type-parameter-a-10"></a> `A` | -            |
| <a id="type-parameter-b-9"></a> `B`  | `never`      |
| <a id="type-parameter-c-8"></a> `C`  | `never`      |
| <a id="type-parameter-d-7"></a> `D`  | `never`      |
| <a id="type-parameter-e-6"></a> `E`  | `never`      |
| <a id="type-parameter-f-5"></a> `F`  | `never`      |
| <a id="type-parameter-g-4"></a> `G`  | `never`      |
| <a id="type-parameter-h-3"></a> `H`  | `never`      |
| <a id="type-parameter-i-2"></a> `I`  | `never`      |
| <a id="type-parameter-j-1"></a> `J`  | `never`      |
| <a id="type-parameter-k"></a> `K`    | `never`      |

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
pipe<A, B = never, C = never, D = never, E = never, F = never, G = never, H = never, I = never, J = never, K = never, L = never>(
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
   kl: (_: K) => L
): L;
```

##### Type Parameters

| Type Parameter                       | Default type |
| ------------------------------------ | ------------ |
| <a id="type-parameter-a-11"></a> `A` | -            |
| <a id="type-parameter-b-10"></a> `B` | `never`      |
| <a id="type-parameter-c-9"></a> `C`  | `never`      |
| <a id="type-parameter-d-8"></a> `D`  | `never`      |
| <a id="type-parameter-e-7"></a> `E`  | `never`      |
| <a id="type-parameter-f-6"></a> `F`  | `never`      |
| <a id="type-parameter-g-5"></a> `G`  | `never`      |
| <a id="type-parameter-h-4"></a> `H`  | `never`      |
| <a id="type-parameter-i-3"></a> `I`  | `never`      |
| <a id="type-parameter-j-2"></a> `J`  | `never`      |
| <a id="type-parameter-k-1"></a> `K`  | `never`      |
| <a id="type-parameter-l"></a> `L`    | `never`      |

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
pipe<A, B = never, C = never, D = never, E = never, F = never, G = never, H = never, I = never, J = never, K = never, L = never, M = never>(
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
   lm: (_: L) => M
): M;
```

##### Type Parameters

| Type Parameter                       | Default type |
| ------------------------------------ | ------------ |
| <a id="type-parameter-a-12"></a> `A` | -            |
| <a id="type-parameter-b-11"></a> `B` | `never`      |
| <a id="type-parameter-c-10"></a> `C` | `never`      |
| <a id="type-parameter-d-9"></a> `D`  | `never`      |
| <a id="type-parameter-e-8"></a> `E`  | `never`      |
| <a id="type-parameter-f-7"></a> `F`  | `never`      |
| <a id="type-parameter-g-6"></a> `G`  | `never`      |
| <a id="type-parameter-h-5"></a> `H`  | `never`      |
| <a id="type-parameter-i-4"></a> `I`  | `never`      |
| <a id="type-parameter-j-3"></a> `J`  | `never`      |
| <a id="type-parameter-k-2"></a> `K`  | `never`      |
| <a id="type-parameter-l-1"></a> `L`  | `never`      |
| <a id="type-parameter-m"></a> `M`    | `never`      |

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
pipe<A, B = never, C = never, D = never, E = never, F = never, G = never, H = never, I = never, J = never, K = never, L = never, M = never, N = never>(
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
   mn: (_: M) => N
): N;
```

##### Type Parameters

| Type Parameter                       | Default type |
| ------------------------------------ | ------------ |
| <a id="type-parameter-a-13"></a> `A` | -            |
| <a id="type-parameter-b-12"></a> `B` | `never`      |
| <a id="type-parameter-c-11"></a> `C` | `never`      |
| <a id="type-parameter-d-10"></a> `D` | `never`      |
| <a id="type-parameter-e-9"></a> `E`  | `never`      |
| <a id="type-parameter-f-8"></a> `F`  | `never`      |
| <a id="type-parameter-g-7"></a> `G`  | `never`      |
| <a id="type-parameter-h-6"></a> `H`  | `never`      |
| <a id="type-parameter-i-5"></a> `I`  | `never`      |
| <a id="type-parameter-j-4"></a> `J`  | `never`      |
| <a id="type-parameter-k-3"></a> `K`  | `never`      |
| <a id="type-parameter-l-2"></a> `L`  | `never`      |
| <a id="type-parameter-m-1"></a> `M`  | `never`      |
| <a id="type-parameter-n"></a> `N`    | `never`      |

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
pipe<A, B = never, C = never, D = never, E = never, F = never, G = never, H = never, I = never, J = never, K = never, L = never, M = never, N = never, O = never>(
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
   no: (_: N) => O
): O;
```

##### Type Parameters

| Type Parameter                       | Default type |
| ------------------------------------ | ------------ |
| <a id="type-parameter-a-14"></a> `A` | -            |
| <a id="type-parameter-b-13"></a> `B` | `never`      |
| <a id="type-parameter-c-12"></a> `C` | `never`      |
| <a id="type-parameter-d-11"></a> `D` | `never`      |
| <a id="type-parameter-e-10"></a> `E` | `never`      |
| <a id="type-parameter-f-9"></a> `F`  | `never`      |
| <a id="type-parameter-g-8"></a> `G`  | `never`      |
| <a id="type-parameter-h-7"></a> `H`  | `never`      |
| <a id="type-parameter-i-6"></a> `I`  | `never`      |
| <a id="type-parameter-j-5"></a> `J`  | `never`      |
| <a id="type-parameter-k-4"></a> `K`  | `never`      |
| <a id="type-parameter-l-3"></a> `L`  | `never`      |
| <a id="type-parameter-m-2"></a> `M`  | `never`      |
| <a id="type-parameter-n-1"></a> `N`  | `never`      |
| <a id="type-parameter-o"></a> `O`    | `never`      |

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
pipe<A, B = never, C = never, D = never, E = never, F = never, G = never, H = never, I = never, J = never, K = never, L = never, M = never, N = never, O = never, P = never>(
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
   op: (_: O) => P
): P;
```

##### Type Parameters

| Type Parameter                       | Default type |
| ------------------------------------ | ------------ |
| <a id="type-parameter-a-15"></a> `A` | -            |
| <a id="type-parameter-b-14"></a> `B` | `never`      |
| <a id="type-parameter-c-13"></a> `C` | `never`      |
| <a id="type-parameter-d-12"></a> `D` | `never`      |
| <a id="type-parameter-e-11"></a> `E` | `never`      |
| <a id="type-parameter-f-10"></a> `F` | `never`      |
| <a id="type-parameter-g-9"></a> `G`  | `never`      |
| <a id="type-parameter-h-8"></a> `H`  | `never`      |
| <a id="type-parameter-i-7"></a> `I`  | `never`      |
| <a id="type-parameter-j-6"></a> `J`  | `never`      |
| <a id="type-parameter-k-5"></a> `K`  | `never`      |
| <a id="type-parameter-l-4"></a> `L`  | `never`      |
| <a id="type-parameter-m-3"></a> `M`  | `never`      |
| <a id="type-parameter-n-2"></a> `N`  | `never`      |
| <a id="type-parameter-o-1"></a> `O`  | `never`      |
| <a id="type-parameter-p"></a> `P`    | `never`      |

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
pipe<A, B = never, C = never, D = never, E = never, F = never, G = never, H = never, I = never, J = never, K = never, L = never, M = never, N = never, O = never, P = never, Q = never>(
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
   pq: (_: P) => Q
): Q;
```

##### Type Parameters

| Type Parameter                       | Default type |
| ------------------------------------ | ------------ |
| <a id="type-parameter-a-16"></a> `A` | -            |
| <a id="type-parameter-b-15"></a> `B` | `never`      |
| <a id="type-parameter-c-14"></a> `C` | `never`      |
| <a id="type-parameter-d-13"></a> `D` | `never`      |
| <a id="type-parameter-e-12"></a> `E` | `never`      |
| <a id="type-parameter-f-11"></a> `F` | `never`      |
| <a id="type-parameter-g-10"></a> `G` | `never`      |
| <a id="type-parameter-h-9"></a> `H`  | `never`      |
| <a id="type-parameter-i-8"></a> `I`  | `never`      |
| <a id="type-parameter-j-7"></a> `J`  | `never`      |
| <a id="type-parameter-k-6"></a> `K`  | `never`      |
| <a id="type-parameter-l-5"></a> `L`  | `never`      |
| <a id="type-parameter-m-4"></a> `M`  | `never`      |
| <a id="type-parameter-n-3"></a> `N`  | `never`      |
| <a id="type-parameter-o-2"></a> `O`  | `never`      |
| <a id="type-parameter-p-1"></a> `P`  | `never`      |
| <a id="type-parameter-q"></a> `Q`    | `never`      |

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
pipe<A, B = never, C = never, D = never, E = never, F = never, G = never, H = never, I = never, J = never, K = never, L = never, M = never, N = never, O = never, P = never, Q = never, R = never>(
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
   qr: (_: Q) => R
): R;
```

##### Type Parameters

| Type Parameter                       | Default type |
| ------------------------------------ | ------------ |
| <a id="type-parameter-a-17"></a> `A` | -            |
| <a id="type-parameter-b-16"></a> `B` | `never`      |
| <a id="type-parameter-c-15"></a> `C` | `never`      |
| <a id="type-parameter-d-14"></a> `D` | `never`      |
| <a id="type-parameter-e-13"></a> `E` | `never`      |
| <a id="type-parameter-f-12"></a> `F` | `never`      |
| <a id="type-parameter-g-11"></a> `G` | `never`      |
| <a id="type-parameter-h-10"></a> `H` | `never`      |
| <a id="type-parameter-i-9"></a> `I`  | `never`      |
| <a id="type-parameter-j-8"></a> `J`  | `never`      |
| <a id="type-parameter-k-7"></a> `K`  | `never`      |
| <a id="type-parameter-l-6"></a> `L`  | `never`      |
| <a id="type-parameter-m-5"></a> `M`  | `never`      |
| <a id="type-parameter-n-4"></a> `N`  | `never`      |
| <a id="type-parameter-o-3"></a> `O`  | `never`      |
| <a id="type-parameter-p-2"></a> `P`  | `never`      |
| <a id="type-parameter-q-1"></a> `Q`  | `never`      |
| <a id="type-parameter-r"></a> `R`    | `never`      |

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
pipe<A, B = never, C = never, D = never, E = never, F = never, G = never, H = never, I = never, J = never, K = never, L = never, M = never, N = never, O = never, P = never, Q = never, R = never, S = never>(
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
   rs: (_: R) => S
): S;
```

##### Type Parameters

| Type Parameter                       | Default type |
| ------------------------------------ | ------------ |
| <a id="type-parameter-a-18"></a> `A` | -            |
| <a id="type-parameter-b-17"></a> `B` | `never`      |
| <a id="type-parameter-c-16"></a> `C` | `never`      |
| <a id="type-parameter-d-15"></a> `D` | `never`      |
| <a id="type-parameter-e-14"></a> `E` | `never`      |
| <a id="type-parameter-f-13"></a> `F` | `never`      |
| <a id="type-parameter-g-12"></a> `G` | `never`      |
| <a id="type-parameter-h-11"></a> `H` | `never`      |
| <a id="type-parameter-i-10"></a> `I` | `never`      |
| <a id="type-parameter-j-9"></a> `J`  | `never`      |
| <a id="type-parameter-k-8"></a> `K`  | `never`      |
| <a id="type-parameter-l-7"></a> `L`  | `never`      |
| <a id="type-parameter-m-6"></a> `M`  | `never`      |
| <a id="type-parameter-n-5"></a> `N`  | `never`      |
| <a id="type-parameter-o-4"></a> `O`  | `never`      |
| <a id="type-parameter-p-3"></a> `P`  | `never`      |
| <a id="type-parameter-q-2"></a> `Q`  | `never`      |
| <a id="type-parameter-r-1"></a> `R`  | `never`      |
| <a id="type-parameter-s"></a> `S`    | `never`      |

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
pipe<A, B = never, C = never, D = never, E = never, F = never, G = never, H = never, I = never, J = never, K = never, L = never, M = never, N = never, O = never, P = never, Q = never, R = never, S = never, T = never>(
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
   st: (_: S) => T
): T;
```

##### Type Parameters

| Type Parameter                       | Default type |
| ------------------------------------ | ------------ |
| <a id="type-parameter-a-19"></a> `A` | -            |
| <a id="type-parameter-b-18"></a> `B` | `never`      |
| <a id="type-parameter-c-17"></a> `C` | `never`      |
| <a id="type-parameter-d-16"></a> `D` | `never`      |
| <a id="type-parameter-e-15"></a> `E` | `never`      |
| <a id="type-parameter-f-14"></a> `F` | `never`      |
| <a id="type-parameter-g-13"></a> `G` | `never`      |
| <a id="type-parameter-h-12"></a> `H` | `never`      |
| <a id="type-parameter-i-11"></a> `I` | `never`      |
| <a id="type-parameter-j-10"></a> `J` | `never`      |
| <a id="type-parameter-k-9"></a> `K`  | `never`      |
| <a id="type-parameter-l-8"></a> `L`  | `never`      |
| <a id="type-parameter-m-7"></a> `M`  | `never`      |
| <a id="type-parameter-n-6"></a> `N`  | `never`      |
| <a id="type-parameter-o-5"></a> `O`  | `never`      |
| <a id="type-parameter-p-4"></a> `P`  | `never`      |
| <a id="type-parameter-q-3"></a> `Q`  | `never`      |
| <a id="type-parameter-r-2"></a> `R`  | `never`      |
| <a id="type-parameter-s-1"></a> `S`  | `never`      |
| <a id="type-parameter-t"></a> `T`    | `never`      |

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
pipe<A, B = never, C = never, D = never, E = never, F = never, G = never, H = never, I = never, J = never, K = never, L = never, M = never, N = never, O = never, P = never, Q = never, R = never, S = never, T = never, U = never>(
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
   tu: (_: T) => U
): U;
```

##### Type Parameters

| Type Parameter                       | Default type |
| ------------------------------------ | ------------ |
| <a id="type-parameter-a-20"></a> `A` | -            |
| <a id="type-parameter-b-19"></a> `B` | `never`      |
| <a id="type-parameter-c-18"></a> `C` | `never`      |
| <a id="type-parameter-d-17"></a> `D` | `never`      |
| <a id="type-parameter-e-16"></a> `E` | `never`      |
| <a id="type-parameter-f-15"></a> `F` | `never`      |
| <a id="type-parameter-g-14"></a> `G` | `never`      |
| <a id="type-parameter-h-13"></a> `H` | `never`      |
| <a id="type-parameter-i-12"></a> `I` | `never`      |
| <a id="type-parameter-j-11"></a> `J` | `never`      |
| <a id="type-parameter-k-10"></a> `K` | `never`      |
| <a id="type-parameter-l-9"></a> `L`  | `never`      |
| <a id="type-parameter-m-8"></a> `M`  | `never`      |
| <a id="type-parameter-n-7"></a> `N`  | `never`      |
| <a id="type-parameter-o-6"></a> `O`  | `never`      |
| <a id="type-parameter-p-5"></a> `P`  | `never`      |
| <a id="type-parameter-q-4"></a> `Q`  | `never`      |
| <a id="type-parameter-r-3"></a> `R`  | `never`      |
| <a id="type-parameter-s-2"></a> `S`  | `never`      |
| <a id="type-parameter-t-1"></a> `T`  | `never`      |
| <a id="type-parameter-u"></a> `U`    | `never`      |

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
pipe<A, B = never, C = never, D = never, E = never, F = never, G = never, H = never, I = never, J = never, K = never, L = never, M = never, N = never, O = never, P = never, Q = never, R = never, S = never, T = never, U = never>(
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
   tu: (_: T) => U
): U;
```

##### Type Parameters

| Type Parameter                       | Default type |
| ------------------------------------ | ------------ |
| <a id="type-parameter-a-21"></a> `A` | -            |
| <a id="type-parameter-b-20"></a> `B` | `never`      |
| <a id="type-parameter-c-19"></a> `C` | `never`      |
| <a id="type-parameter-d-18"></a> `D` | `never`      |
| <a id="type-parameter-e-17"></a> `E` | `never`      |
| <a id="type-parameter-f-16"></a> `F` | `never`      |
| <a id="type-parameter-g-15"></a> `G` | `never`      |
| <a id="type-parameter-h-14"></a> `H` | `never`      |
| <a id="type-parameter-i-13"></a> `I` | `never`      |
| <a id="type-parameter-j-12"></a> `J` | `never`      |
| <a id="type-parameter-k-11"></a> `K` | `never`      |
| <a id="type-parameter-l-10"></a> `L` | `never`      |
| <a id="type-parameter-m-9"></a> `M`  | `never`      |
| <a id="type-parameter-n-8"></a> `N`  | `never`      |
| <a id="type-parameter-o-7"></a> `O`  | `never`      |
| <a id="type-parameter-p-6"></a> `P`  | `never`      |
| <a id="type-parameter-q-5"></a> `Q`  | `never`      |
| <a id="type-parameter-r-4"></a> `R`  | `never`      |
| <a id="type-parameter-s-3"></a> `S`  | `never`      |
| <a id="type-parameter-t-2"></a> `T`  | `never`      |
| <a id="type-parameter-u-1"></a> `U`  | `never`      |

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

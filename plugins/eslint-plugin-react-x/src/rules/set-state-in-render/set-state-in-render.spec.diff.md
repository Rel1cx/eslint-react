# set-state-in-render IMPL–SPEC Diff Report

## Verification metadata

- **IMPL**: `set-state-in-render.ts` + `collect.ts` + `effects.ts` + `origins.ts` + `helpers.ts` (ESLint rule)
- **SPEC**: `set-state-in-render.spec.md` (React Compiler `ValidateNoSetStateInRender`)
- **Implementation commit**: `7649b8a761385105b964f6d408e672eda2050b3d`
- **React commit**: `7c6ac13e19fef500b7f669a16bbd01ecc95965ca`
- **Last verified**: `2026-10-12`
- **React package**: `compiler/packages/babel-plugin-react-compiler`
- **Implementation sources/tests**:
  - `set-state-in-render.ts` (rule orchestration and reporting)
  - `collect.ts` (AST fact collection for calls and component early returns)
  - `effects.ts` (violation inference from collected facts)
  - `origins.ts` (setter provenance resolution for `useState`-like tuples)
  - `helpers.ts` (component/hook recognition and conditional ancestor check)
  - `set-state-in-render.spec.ts`
- **React sources/fixtures**:
  - `src/Validation/ValidateNoSetStateInRender.ts`
  - `src/Inference/DropManualMemoization.ts`
  - `src/TypeInference/InferTypes.ts`
  - `src/__tests__/fixtures/compiler/error.invalid-setState-in-useMemo.js`
  - `src/__tests__/fixtures/compiler/error.invalid-conditional-setState-in-useMemo.js`
  - `src/__tests__/fixtures/compiler/error.invalid-setState-in-useMemo-indirect-useCallback.js`
  - `src/__tests__/fixtures/compiler/use-callback-simple.js`
  - `src/__tests__/fixtures/compiler/error.invalid-unconditional-set-state-hook-return-in-render.js`
  - `src/__tests__/fixtures/compiler/error.invalid-unconditional-set-state-prop-in-render.js`
  - `src/__tests__/fixtures/compiler/error.unconditional-set-state-lambda.js`
  - `src/__tests__/fixtures/compiler/error.unconditional-set-state-nested-function-expressions.js`
  - `src/__tests__/fixtures/compiler/error.invalid-setstate-unconditional-with-keyed-state.js`

**IMPL** below means the ESLint AST rule. **SPEC** means the React Compiler's `ValidateNoSetStateInRender` pass at the verified React commit.

## 1. Underlying mechanism

The SPEC operates on HIR. It uses `computeUnconditionalBlocks` to identify blocks that execute on every normal path, propagates setter/function identities through local loads and stores, and recursively summarizes nested functions that unconditionally reach a setter.

The IMPL operates on the ESLint AST in three lightweight phases:

1. **Collect** (`collect.ts`): during AST traversal, record every `CallExpression` together with its enclosing function kind and the current component on the component-function stack; also record component-level early-return statements.
2. **Resolve** (`origins.ts`): on demand, decide whether a call's callee is a setter from a `useState`-like hook tuple.
3. **Infer** (`effects.ts`): at `Program:exit`, keep only calls that are made directly in a component/hook function body, whose callee resolves to a setter, that are not inside a conditional ancestor, and that are not positioned after an early return in the same component.

The SPEC models control flow and synchronous call chains; the IMPL is a deliberately syntactic approximation.

## 2. Component and hook boundaries

`helpers.ts` classifies functions as component/hook-like by:

- checking the function id against component/hook naming conventions, or
- detecting anonymous callbacks passed directly to `memo()` / `forwardRef()` / `React.memo()` / `React.forwardRef()` as render functions.

`collect.ts` maintains a stack of these component functions. Entering a nested component pushes onto the stack and exiting pops it, so a `setState` call that appears after a nested component declaration is still attributed to the outer component. Non-component nested functions (event handlers, callbacks, `useMemo` / `useCallback` factories, utility functions) do not push onto the stack.

## 3. Setter source detection

| Source                                                                | SPEC                                                             | IMPL                                                       |
| --------------------------------------------------------------------- | ---------------------------------------------------------------- | ---------------------------------------------------------- |
| `const [, setX] = useState()`                                         | Detected from HIR type information                               | Detected by resolving the direct hook call                 |
| Direct tuple access, such as `data[1]()` / `data.at(1)()`             | Detected when HIR preserves the setter type                      | Explicitly detected for static index `1`                   |
| `const alias = setX; alias()`                                         | Setter identity is preserved/propagated                          | Not followed through ordinary variable aliases             |
| Identifier whose name starts with `set`                               | Detected only with `enableTreatSetIdentifiersAsStateSetters`     | No equivalent name-based flag                              |
| Setter returned by a custom hook                                      | Not established by the cited fixture without its name-based flag | Detected only when the hook matches `additionalStateHooks` |
| Object-pattern numeric destructuring `const { 1: setA } = useState()` | Detected through HIR `Destructure` property typing               | Detected by matching numeric key `1`                       |
| Namespaced hook call `React.useState()`                               | Detected through HIR global hook typing                          | Detected by resolving the member-expression hook call      |

The fixture `error.invalid-unconditional-set-state-hook-return-in-render.js` is **not** evidence that HIR automatically sees through an arbitrary custom-hook tuple: it explicitly enables `@enableTreatSetIdentifiersAsStateSetters`, and `InferTypes` classifies called identifiers beginning with `set` as state setters under that flag. The generic `CallExpression` inference branch does not inspect a custom hook body by itself, but this report does not claim a universal no-inference result without a no-flag fixture. The prop fixture uses the same flag. The IMPL's `additionalStateHooks` is a different, hook-source-based opt-in.

## 4. Conditional and unconditional execution

The SPEC reports ordinary render-time calls only when their HIR block is in the post-dominator-derived unconditional set. This allows conditional calls while handling loops and nested control flow at CFG level.

The IMPL allows a setter call when any ancestor before the component function is an `if`, conditional expression, logical expression, switch statement, or switch case. It also allows calls positioned after any early return that belongs directly to the component function body. These checks are cheaper but less precise than path analysis.

A separate rule applies inside an executing `useMemo` region: the SPEC emits its memo-specific diagnostic even when the setter call is conditional, as shown by `error.invalid-conditional-setState-in-useMemo.js`.

## 5. Nested functions and transitive synchronous calls

For both `FunctionExpression` and `ObjectMethod`, the SPEC recursively checks whether the nested HIR function unconditionally calls a setter (or an already summarized function). It records that function's lvalue and can propagate the summary through further calls. Consequently, `foo → setX`, `bar → foo`, `baz → bar`, followed by an unconditional `baz()` during render is reported at the synchronously executed outer call site.

Merely defining such a function is not an error. A nested function whose setter path is conditional is not summarized as an unconditional setter function. The pass also documents a false negative when a setter is hidden in another data structure and later extracted.

The IMPL skips any setter call whose immediate enclosing function is not the component/hook function itself. This correctly excludes ordinary event handlers and unused callbacks, but it also misses synchronously-called lambdas such as:

```js
const foo = () => setX(1);
foo();
```

It does not summarize functions, so transitive chains (`foo → setX`, `bar → foo`, `baz → bar`, `baz()`) are also missed. It likewise has no recursive `ObjectMethod` summary; on the SPEC side, propagation still depends on the method identity remaining visible rather than being lost through an unsupported object/data-structure flow.

## 6. useMemo and useCallback execution semantics

`StartMemoize`/`FinishMemoize` delimit manual-memoization lowering, but the two APIs are lowered differently:

- **`useMemo`**: `DropManualMemoization` replaces the hook call with a call to the memo function. A setter reached while that function is evaluated—including a transitive call and a conditional setter—is within the active memo region and receives the dedicated `Calling setState from useMemo may trigger an infinite loop` diagnostic.
- **Standalone `useCallback`**: lowering aliases/loads the callback; it does not invoke the callback during render. Defining `useCallback(() => setCount(...))` is therefore valid, as demonstrated by `use-callback-simple.js`.
- **Later synchronous invocation**: if that callback is subsequently called during render, the SPEC's transitive function analysis reports the call. If it is called from an executing `useMemo`, the call site receives the memo-specific diagnostic, as in `error.invalid-setState-in-useMemo-indirect-useCallback.js`.

The IMPL skips setter calls inside both callback bodies because they are nested functions. It therefore correctly leaves a standalone `useCallback` definition alone, but misses executing `useMemo` setters and later synchronous calls through either callback. There is no valid gap described as “setState inside every `useCallback` callback must be reported.”

## 7. Diagnostics and feature-dependent guidance

| Aspect                    | SPEC                                                                             | IMPL                                             |
| ------------------------- | -------------------------------------------------------------------------------- | ------------------------------------------------ |
| Ordinary render error     | `Cannot call setState during render`                                             | One generic unconditional-render message         |
| Executing `useMemo` error | Dedicated message and `Found setState() within useMemo()` detail                 | No memo-specific path                            |
| Transitive call location  | Reports the synchronously invoked callee that is summarized as reaching setState | No transitive report                             |
| `enableUseKeyedState`     | Replaces reset-state guidance with `useKeyedState(initialState, key)` guidance   | No equivalent feature flag or alternate guidance |

## 8. Consolidated implementation gaps

The material behavioral gaps are: no alias/function-summary propagation comparable to the SPEC's recursive `FunctionExpression`/`ObjectMethod` handling, no execution-aware `useMemo` validation, and AST-only control-flow approximation. Setter configuration is not a strict capability gap in one direction: the SPEC's optional `set*` identifier heuristic and the IMPL's `additionalStateHooks` recognize different sources, and neither proves arbitrary custom-hook return-flow inference.

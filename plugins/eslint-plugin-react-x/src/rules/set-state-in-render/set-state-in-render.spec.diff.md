# set-state-in-render IMPL–SPEC Diff Report

## Verification metadata

- **IMPL**: `set-state-in-render.ts` + `lib.ts` (ESLint rule)
- **SPEC**: `set-state-in-render.spec.md` (React Compiler `ValidateNoSetStateInRender`)
- **Implementation commit**: `55c10db7bae04d49606792767530cc1e786dd5a0`
- **React commit**: `c0c39a6b3907eaab35f43074949e2957a2a734c1`
- **Last verified**: `2026-07-14`
- **React package**: `compiler/packages/babel-plugin-react-compiler`
- **Implementation sources/tests**:
  - `set-state-in-render.ts`
  - `lib.ts`
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

The IMPL operates on the ESLint AST. It resolves direct `useState`-like definitions, then uses ancestor checks (`isInsideConditional`, `isInsideEventHandler`) plus a component-wide early-return flag.

**Result**: the SPEC models control flow and synchronous call chains; the IMPL is a deliberately syntactic approximation.

## 2. Setter source detection

| Source                                                    | SPEC                                                             | IMPL                                                       |
| --------------------------------------------------------- | ---------------------------------------------------------------- | ---------------------------------------------------------- |
| `const [, setX] = useState()`                             | Detected from HIR type information                               | Detected by resolving the direct hook call                 |
| Direct tuple access, such as `data[1]()` / `data.at(1)()` | Detected when HIR preserves the setter type                      | Explicitly detected for static index `1`                   |
| `const alias = setX; alias()`                             | Setter identity is preserved/propagated                          | Not followed through ordinary variable aliases             |
| Identifier whose name starts with `set`                   | Detected only with `enableTreatSetIdentifiersAsStateSetters`     | No equivalent name-based flag                              |
| Setter returned by a custom hook                          | Not established by the cited fixture without its name-based flag | Detected only when the hook matches `additionalStateHooks` |

The fixture `error.invalid-unconditional-set-state-hook-return-in-render.js` is **not** evidence that HIR automatically sees through an arbitrary custom-hook tuple: it explicitly enables `@enableTreatSetIdentifiersAsStateSetters`, and `InferTypes` classifies called identifiers beginning with `set` as state setters under that flag. The generic `CallExpression` inference branch does not inspect a custom hook body by itself, but this report does not claim a universal no-inference result without a no-flag fixture. The prop fixture uses the same flag. The IMPL's `additionalStateHooks` is a different, hook-source-based opt-in.

## 3. Conditional and unconditional execution

The SPEC reports ordinary render-time calls only when their HIR block is in the post-dominator-derived unconditional set. This allows conditional calls while handling loops and nested control flow at CFG level.

The IMPL allows a setter call when any ancestor before the component is an `if`, conditional expression, logical expression, or switch; it also allows calls after its component-wide early-return flag is set. These checks are cheaper but less precise than path analysis.

A separate rule applies inside an executing `useMemo` region: the SPEC emits its memo-specific diagnostic even when the setter call is conditional, as shown by `error.invalid-conditional-setState-in-useMemo.js`.

## 4. Nested functions and transitive synchronous calls

For both `FunctionExpression` and `ObjectMethod`, the SPEC recursively checks whether the nested HIR function unconditionally calls a setter (or an already summarized function). It records that function's lvalue and can propagate the summary through further calls. Consequently, `foo → setX`, `bar → foo`, `baz → bar`, followed by an unconditional `baz()` during render is reported at the synchronously executed outer call site.

Merely defining such a function is not an error. A nested function whose setter path is conditional is not summarized as an unconditional setter function. The pass also documents a false negative when a setter is hidden in another data structure and later extracted.

The IMPL treats every nested function as an event-handler-like boundary and returns before reporting its setter body. It does not summarize the function, so a later synchronous `foo()`/`baz()` call is also missed. It likewise has no recursive `ObjectMethod` summary; on the SPEC side, propagation still depends on the method identity remaining visible rather than being lost through an unsupported object/data-structure flow.

## 5. useMemo and useCallback execution semantics

`StartMemoize`/`FinishMemoize` delimit manual-memoization lowering, but the two APIs are lowered differently:

- **`useMemo`**: `DropManualMemoization` replaces the hook call with a call to the memo function. A setter reached while that function is evaluated—including a transitive call and a conditional setter—is within the active memo region and receives the dedicated `Calling setState from useMemo may trigger an infinite loop` diagnostic.
- **Standalone `useCallback`**: lowering aliases/loads the callback; it does not invoke the callback during render. Defining `useCallback(() => setCount(...))` is therefore valid, as demonstrated by `use-callback-simple.js`.
- **Later synchronous invocation**: if that callback is subsequently called during render, the SPEC's transitive function analysis reports the call. If it is called from an executing `useMemo`, the call site receives the memo-specific diagnostic, as in `error.invalid-setState-in-useMemo-indirect-useCallback.js`.

The IMPL skips setter calls inside both callback bodies because they are nested functions. It therefore correctly leaves a standalone `useCallback` definition alone, but misses executing `useMemo` setters and later synchronous calls through either callback. There is no valid gap described as “setState inside every `useCallback` callback must be reported.”

## 6. Diagnostics and feature-dependent guidance

| Aspect                    | SPEC                                                                             | IMPL                                             |
| ------------------------- | -------------------------------------------------------------------------------- | ------------------------------------------------ |
| Ordinary render error     | `Cannot call setState during render`                                             | One generic unconditional-render message         |
| Executing `useMemo` error | Dedicated message and `Found setState() within useMemo()` detail                 | No memo-specific path                            |
| Transitive call location  | Reports the synchronously invoked callee that is summarized as reaching setState | No transitive report                             |
| `enableUseKeyedState`     | Replaces reset-state guidance with `useKeyedState(initialState, key)` guidance   | No equivalent feature flag or alternate guidance |

## 7. Consolidated implementation gaps

The material behavioral gaps are: no alias/function-summary propagation comparable to the SPEC's recursive `FunctionExpression`/`ObjectMethod` handling, no execution-aware `useMemo` validation, and AST-only control-flow approximation. Setter configuration is not a strict capability gap in one direction: the SPEC's optional `set*` identifier heuristic and the IMPL's `additionalStateHooks` recognize different sources, and neither proves arbitrary custom-hook return-flow inference.

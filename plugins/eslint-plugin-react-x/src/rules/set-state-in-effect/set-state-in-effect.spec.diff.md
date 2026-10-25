# set-state-in-effect IMPL–SPEC Diff Report

## Verification metadata

- **IMPL**: `set-state-in-effect.ts` + `collect.ts` + `origins.ts` + `effects.ts` + `helpers.ts` (ESLint rule)
- **SPEC**: `set-state-in-effect.spec.md` (React Compiler `ValidateNoSetStateInEffects`)
- **Implementation revision**: `main` @ `e95e02140` + working-tree set-state-in-effect changes
- **React commit**: `7c6ac13e19fef500b7f669a16bbd01ecc95965ca` (re-pin if upstream moved)
- **React comparison verified**: `2026-10-24`
- **IMPL description reviewed**: `2026-10-26`
- **React package**: `compiler/packages/babel-plugin-react-compiler`
- **Implementation sources/tests**:
  - `set-state-in-effect.ts`
  - `collect.ts`
  - `origins.ts`
  - `effects.ts`
  - `helpers.ts`
  - `set-state-in-effect.spec.ts`
  - `collect.test.ts`
  - `effects.test.ts`
  - `origins.test.ts`
  - `helpers.test.ts`
- **React sources/fixtures**:
  - `src/Validation/ValidateNoSetStateInEffects.ts`
  - `src/Entrypoint/Pipeline.ts`
  - `src/HIR/Environment.ts`
  - `src/__tests__/fixtures/compiler/{invalid,valid}-setState-in-useEffect*.{js,expect.md}`
  - `src/__tests__/fixtures/compiler/valid-setState-in-effect-from-ref-*.{js,expect.md}`
  - `src/__tests__/fixtures/compiler/set-state-after-await-in-effect.{js,expect.md}`

## 1. Execution model

React runs `inlineImmediatelyInvokedFunctionExpressions` before `validateNoSetStateInEffects`. The validation walks HIR, propagates a `setStateFunctions` map through `LoadLocal`/`StoreLocal`, summarizes `FunctionExpression`s with `getSetStateCall`, and recognizes the three built-in effect hook types plus `useEffectEvent` explicitly. Since React commit `d083ec1da1e5` (2026-09-22) it additionally runs `computeBlocksStartingAfterAwait` over the effect function's own CFG: a block "starts after await" only when every predecessor path passed an `Await`, and within a block an `Await` instruction flips an `isAfterAwait` flag for subsequent instructions; setState calls reached only after an await are skipped.

The IMPL collects explicit effect roots and calls grouped by their directly enclosing function. At `Program:exit`, recursive value resolution maps stable aliases and transparent wrappers to functions or setters, then a worklist follows resolvable synchronous call edges from each root. Ordinary nested callbacks are not flattened into their containing function or hook summary. Recursion is bounded by function identity and ref-call context. Parameters and imports remain unresolved so a prop function cannot attribute the component's render-phase setState to an effect (#1944).

Async functions are still skipped wholesale at the root or call edge. This deliberately preserves the existing before-await and conditional-await blind spots; the refactor does not add CodePath, CFG, or await-phase analysis. Promise/timer/event/cleanup callbacks remain outside the synchronous graph unless the implementation can resolve a direct synchronous invocation, which it does not infer for scheduler APIs.

## 2. Verified behavior boundaries

| Area                      | React Compiler                                                                              | IMPL                                                                                                                                                                                                              |
| ------------------------- | ------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Direct setup call / IIFE  | Setter calls are recognized regardless of argument count; IIFEs are inlined                 | Zero-argument and direct setters are reported; IIFEs are ordinary edges in the synchronous call graph                                                                                                             |
| Ordinary nested callbacks | Nested listeners are not summarized as synchronous effect calls                             | Only resolvable direct invocations are followed; uninvoked callbacks, timers, listeners, and cleanup remain outside the graph                                                                                     |
| Async / promise callbacks | Post-`await` setters are exempt; before-await and conditional-await paths are still checked | Async functions are skipped wholesale; `.then` callbacks are not synchronous call edges (note 1)                                                                                                                  |
| Setter aliases            | HIR propagates setters through local assignments                                            | Stable local aliases are followed recursively; dynamic/reassigned bindings are not generally evaluated                                                                                                            |
| Transitive wrappers       | Progressive summaries recognize `g → f → setState`                                          | A worklist follows multi-level functions and IIFEs, with cycle detection                                                                                                                                          |
| `useEffectEvent`          | Explicitly mapped to the summarized setter call                                             | Treated as a transparent value wrapper; only the actual returned function is analyzed                                                                                                                             |
| Ref-derived exception     | Feature-controlled HIR data flow                                                            | Always-enabled AST/scope heuristics with per-call contexts, any setter argument position, and lexical write/invocation positions (note 2)                                                                         |
| Error location            | The summary's `Place`; indirect cases point at the effect-side callee                       | Direct setters report themselves; indirect setters report the first effect-side trigger or setup argument, deduplicated by report location and setter name so every possible setter is reported once per location |
| Message mode              | Fixed reason plus optional verbose description                                              | One fixed rule message; no verbose mode                                                                                                                                                                           |

Notes:

1. Upstream `set-state-after-await-in-effect.js`, `invalid-setState-in-useEffect-before-await.js`, and `invalid-setState-in-useEffect-after-conditional-await.js` continue to define the async difference. The IMPL intentionally retains its documented limitation rather than introducing a new control-flow analyzer.
2. Ref analysis covers `useRef`-like calls (including `additionalRefHooks`), ref-like member chains and parameters, TypeScript/chain wrappers, computed member keys, local getter returns, updater functions, helper arguments, and guards propagated along synchronous call edges. Guards cover ref-gated `if`/conditional/short-circuit operands, ref-gated early exits in blocks, `try` blocks (when there is no catch or the catch terminates), `switch` cases, and terminating `else` branches, plus `while`/`for` loop tests; `break`/`continue` count as terminations. A ref-derived value in any setter call argument exempts the call. Writes in the read's own execution flow are evaluated using the nearest eligible preceding initializer/assignment within each lexical branch rather than full reaching-definitions; writes inside synchronously invoked (non-async, non-generator) IIFEs, including nested and TypeScript-wrapped ones, are located at the invocation, keep their internal branch, and are ordered before a write whose right-hand side is the same invocation; writes in deferred positions (instance class field initializers and parameter defaults) and inside other nested functions remain excluded. A later plain overwrite in the same branch removes an earlier ref exemption, while sibling-branch alternatives and captured writes remain heuristic. Compound assignments retain the preceding value's provenance. A setter located inside an `if`/conditional test cannot use that test to exempt itself.

## 3. Cleanup status

The IMPL does not currently check cleanup functions. At the verified React commit there is no dedicated fixture combining a cleanup setter with `@validateNoSetStateInEffects`, and the validation source contains no cleanup-specific handling; unrelated cleanup fixtures do not lock this validation's behavior. Cleanup is therefore **unverified on the React side** and is not classified as a definite compatibility gap.

## 4. Current actionable differences

1. React analyzes synchronous paths inside async functions before the first `await` and on paths that bypass a conditional `await`; the IMPL skips the entire async function. Both allow post-await setters, but only React makes that decision through CFG data flow.
2. React's ref exemption is feature-controlled HIR data flow. The IMPL's exemption is unconditional and heuristic, including lexical write/invocation positions and local return analysis; it is not a full control-flow or type-level model.
3. React resolves values through its HIR and progressive summaries. The IMPL deliberately limits itself to stable local bindings and supported wrappers; imports, parameters used as functions, dynamic member callees, and arbitrary higher-order calls remain unknown.
4. React has a verbose diagnostic mode; the IMPL does not.

`ValidateNoDerivedComputationsInEffects` is a separate Pipeline pass and is outside this rule comparison.

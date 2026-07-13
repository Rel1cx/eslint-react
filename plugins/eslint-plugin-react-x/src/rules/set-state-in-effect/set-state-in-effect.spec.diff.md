# set-state-in-effect IMPL–SPEC Diff Report

## Verification metadata

- **IMPL**: `set-state-in-effect.ts` + `lib.ts` (ESLint rule)
- **SPEC**: `set-state-in-effect.spec.md` (React Compiler `ValidateNoSetStateInEffects`)
- **Implementation commit**: `55c10db7bae04d49606792767530cc1e786dd5a0`
- **React commit**: `c0c39a6b3907eaab35f43074949e2957a2a734c1`
- **Last verified**: `2026-07-14`
- **React package**: `compiler/packages/babel-plugin-react-compiler`
- **Implementation sources/tests**:
  - `set-state-in-effect.ts`
  - `lib.ts`
  - `set-state-in-effect.spec.ts`
- **React sources/fixtures**:
  - `src/Validation/ValidateNoSetStateInEffects.ts`
  - `src/Entrypoint/Pipeline.ts`
  - `src/HIR/Environment.ts`
  - `src/__tests__/fixtures/compiler/{invalid,valid}-setState-in-useEffect*.{js,expect.md}`
  - `src/__tests__/fixtures/compiler/valid-setState-in-effect-from-ref-*.{js,expect.md}`

## 1. Execution model

React runs `inlineImmediatelyInvokedFunctionExpressions` before `validateNoSetStateInEffects`. The validation then walks HIR, propagates a `setStateFunctions` map through `LoadLocal`/`StoreLocal`, summarizes `FunctionExpression`s with `getSetStateCall`, and recognizes the three built-in effect hook types plus `useEffectEvent` explicitly.

The IMPL walks the ESLint AST. It reports direct setters in the effect setup immediately, treats only syntactic IIFEs as `immediate`, treats async functions and `.then` callbacks as `deferred`, and records setter calls in ordinary functions or hook initializers for resolution at `Program:exit`. It additionally supports configured state/effect hooks.

## 2. Verified behavior boundaries

| Area                      | React Compiler                                                                                                                                                                                                                                                                                        | IMPL                                                                                                                                                                                                                                                                                                                                                                                                                 |
| ------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Direct setup call / IIFE  | Recognizes a setter call without inspecting its argument count; IIFEs have already been inlined by Pipeline.                                                                                                                                                                                          | Reports direct setup calls and syntactic IIFEs only when the setter has a first argument. The local valid test `setState with no arguments in effect` locks the zero-argument omission.                                                                                                                                                                                                                              |
| Ordinary nested callbacks | A callback not synchronously invoked by the effect is not summarized as the effect's synchronous call. `valid-setState-in-useEffect-listener*.js` locks direct and transitive `setTimeout` cases as valid.                                                                                            | A normal `setTimeout`/listener callback is **not** classified as `immediate`. The local valid test `setState in transitive listener via setTimeout` locks this boundary. The IMPL does not infer scheduling semantics; it generally allows an ordinary nested callback unless its function is directly called from setup and resolved by the rule.                                                                   |
| Async / promise callbacks | Separate callback functions are not synchronous effect-body calls.                                                                                                                                                                                                                                    | Async functions and `.then` callbacks have an explicit `deferred` classification. Other callback APIs are allowed by ordinary function nesting, not by a scheduler allowlist.                                                                                                                                                                                                                                        |
| Setter aliases            | HIR `LoadLocal`/`StoreLocal` propagation follows local aliases known to `setStateFunctions`. The upstream `enableTreatSetIdentifiersAsStateSetters` option can also affect `isSetStateType`; it is not part of this validation's own configuration.                                                   | Direct `useState`-like definitions, tuple index access, and `.at(1)` are recognized. General aliases such as `const alias = setState; alias()` are not followed.                                                                                                                                                                                                                                                     |
| Transitive wrappers       | The outer HIR traversal progressively summarizes functions. `invalid-setState-in-useEffect-transitive.js` locks `g → f → setState`; the source does not justify describing `getSetStateCall` itself as recursive or claiming an unbounded depth guarantee.                                            | `getSetStateCalls` performs one `resolve` and one WeakMap lookup. A wrapper that directly contains setter calls is covered, including hook-wrapped callbacks, but wrapper-to-wrapper chains are not recursively chased.                                                                                                                                                                                              |
| `useEffectEvent`          | Explicitly maps an event returned by `useEffectEvent` to the summarized setter call. Direct invocation in an effect is invalid; passing it to `setTimeout` is valid. Both have dedicated fixtures.                                                                                                    | Support is emergent from generic `isHookDecl` tracking. Direct invocation is detected. Because nested ordinary callbacks under a hook initializer can be collected into the same hook summary, React's valid `useEffectEvent(() => setTimeout(() => setState()))` boundary is not equivalent and may be reported by the IMPL. Passing the event itself to `setTimeout` is not inspected as a synchronous invocation. |
| Ref-derived exception     | Controlled by `enableAllowSetStateFromRefsInEffects` (default `true` at the verified commit). When enabled, HIR propagation covers instruction operands, mutable effects, phi values, ref-derived arguments, and ref-controlled blocks. Ref argument/control-flow fixtures lock representative cases. | Always enabled; `RULE_FEATURES` contains no corresponding toggle. AST checks cover selected argument expressions, variables initialized from `useRef` or ref-like member access, and ref-gated `if`/conditional expressions. Name/AST heuristics and React's HIR data flow are not equivalent.                                                                                                                       |
| Error location            | Reports the `Place` returned by the summary: direct cases point at the setter, while transitive and `useEffectEvent` fixtures point at the synchronous callee in the effect (`g`, `effectEvent`).                                                                                                     | Direct cases report the setter call. Indirect cases iterate the resolved summary and report the stored internal `setStateCall`, not the wrapper invocation in the effect.                                                                                                                                                                                                                                            |
| Message mode              | Fixed reason plus optional verbose description under `enableVerboseNoSetStateInEffect`.                                                                                                                                                                                                               | One fixed rule message; no verbose mode.                                                                                                                                                                                                                                                                                                                                                                             |

## 3. Cleanup status

The IMPL has commented TODO cases and does not currently check cleanup functions. At the verified React commit there is no dedicated fixture combining a cleanup setter with `@validateNoSetStateInEffects`; unrelated cleanup fixtures do not lock this validation's behavior. Therefore cleanup is **unverified on the React side** and is not classified here as a definite compatibility gap.

## 4. Current actionable differences

1. The IMPL skips zero-argument setter calls; React's validation does not inspect setter argument count.
2. The IMPL does not provide React's HIR alias propagation or progressively summarized multi-hop wrapper chain.
3. `useEffectEvent` is generic hook tracking in the IMPL, which does not preserve every React deferred-callback boundary.
4. The IMPL's ref-derived exemption is unconditional and heuristic; React's richer data-flow exemption is feature-controlled.
5. Indirect diagnostic locations differ: React reports the synchronous effect-side callee, while the IMPL reports the resolved internal setter call.
6. React has a verbose diagnostic mode; the IMPL does not.

`ValidateNoDerivedComputationsInEffects` is a separate Pipeline pass and is outside this rule comparison.

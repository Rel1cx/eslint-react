# set-state-in-effect IMPL–SPEC Diff Report

## Verification metadata

- **IMPL**: `set-state-in-effect.ts` + `lib.ts` (ESLint rule)
- **SPEC**: `set-state-in-effect.spec.md` (React Compiler `ValidateNoSetStateInEffects`)
- **Implementation commit**: `629632d3d4bf810db428b99b604c0a90ebe8a262`
- **React commit**: `7c6ac13e19fef500b7f669a16bbd01ecc95965ca`
- **Last verified**: `2026-09-30`
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
  - `src/__tests__/fixtures/compiler/set-state-after-await-in-effect.{js,expect.md}`

## 1. Execution model

React runs `inlineImmediatelyInvokedFunctionExpressions` before `validateNoSetStateInEffects`. The validation then walks HIR, propagates a `setStateFunctions` map through `LoadLocal`/`StoreLocal`, summarizes `FunctionExpression`s with `getSetStateCall`, and recognizes the three built-in effect hook types plus `useEffectEvent` explicitly. Since React commit `d083ec1da1e5` (2026-09-22) it additionally runs `computeBlocksStartingAfterAwait` over the effect function's own CFG: a block "starts after await" only when every predecessor path passed an `Await`, and within a block an `Await` instruction flips an `isAfterAwait` flag for subsequent instructions; setState calls reached only after an await are skipped. The analysis does not recurse into nested function expressions for this check.

The IMPL walks the ESLint AST. It reports direct setters in the effect setup immediately, treats only syntactic IIFEs as `immediate`, treats async functions and `.then` callbacks as `deferred`, and records setter calls in ordinary functions or hook initializers for resolution at `Program:exit`. Resolution uses `resolveOrigin` and excludes identifiers defined as function parameters (e.g. functions received via props), so a component's own render-phase setState is not attributed to an effect that calls a prop function. It additionally supports configured state/effect hooks via `additionalStateHooks`/`additionalEffectHooks`.

## 2. Verified behavior boundaries

| Area                      | React Compiler                                                                                      | IMPL                                                                                                        |
| ------------------------- | --------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| Direct setup call / IIFE  | Setter call recognized without inspecting its argument count; IIFEs inlined by Pipeline             | Reported only when the setter has a first argument (note 1)                                                 |
| Ordinary nested callbacks | Not summarized as the effect's synchronous call (`valid-setState-in-useEffect-listener*.js`)        | Not classified as `immediate`; allowed unless the function is called from setup (note 2)                    |
| Async / promise callbacks | Post-`await` setState exempt since `d083ec1da1e5`; before-await and conditional-await still flagged | Async functions and `.then` callbacks classified `deferred`; the whole async setup body is skipped (note 3) |
| Setter aliases            | HIR `LoadLocal`/`StoreLocal` propagation follows local aliases                                      | Direct tuple forms and `.at(1)` recognized; plain aliases not followed                                      |
| Transitive wrappers       | Progressive function summaries lock `g → f → setState`                                              | One `resolveOrigin` hop plus one WeakMap lookup; wrapper-to-wrapper chains not chased (note 4)              |
| `useEffectEvent`          | Explicitly mapped to the summarized setter call; dedicated fixtures                                 | Emergent from generic `isHookDecl` tracking; deferred-callback boundary not equivalent (note 5)             |
| Ref-derived exception     | Feature-controlled (`enableAllowSetStateFromRefsInEffects`); HIR data-flow propagation              | Always enabled; name/AST heuristics; applies to direct and indirect setters alike (note 6)                  |
| Error location            | The summary's `Place`; transitive/`useEffectEvent` cases point at the effect-side callee            | Direct cases report the setter call; indirect cases report the resolved internal setter call                |
| Message mode              | Fixed reason plus optional verbose description                                                      | One fixed rule message; no verbose mode                                                                     |

Notes:

1. The local valid test `setState with no arguments in effect (invalid usage but not reported by this rule)` locks the zero-argument omission.
2. The local valid test `setState in transitive listener via setTimeout` locks this boundary. The IMPL does not infer scheduling semantics; it generally allows an ordinary nested callback unless its function is directly called from setup and resolved by the rule.
3. Locked upstream by `set-state-after-await-in-effect.js`, `invalid-setState-in-useEffect-before-await.js`, and `invalid-setState-in-useEffect-after-conditional-await.js`. The IMPL covers the post-await exemption but misses React's before-await and conditional-await cases inside an async setup; other callback APIs are allowed by ordinary function nesting, not by a scheduler allowlist.
4. Identifiers defined as function parameters are excluded from resolution, so render-phase setState is not attributed to effects calling prop functions (locked by the local valid tests `render-phase setState with an effect calling a prop function` and variants, see #1944).
5. React's valid `useEffectEvent(() => setTimeout(() => setState()))` boundary is not equivalent and may be reported by the IMPL, because nested ordinary callbacks under a hook initializer can be collected into the same hook summary. Passing the event itself to `setTimeout` is not inspected as a synchronous invocation.
6. The heuristics cover selected argument expressions: variables initialized from `useRef`-like calls (including hooks configured via the `additionalRefHooks` shared setting), member chains containing a `<ref-named>.current` link or rooted at a ref-like identifier of any depth (e.g. `containerRef.current.offsetWidth`, `popover.contentRef.current`), reads through a parameter named `ref`/`xxxRef`, and ref reads traced through intermediate expression inits (e.g. `const dv = visible - prevVisible.current`); ref-gated `if`/conditional expressions and preceding early-return sibling guards (`if (refTest) return;`) are also exempted. The exemption applies both to setters written directly in the setup body and to setters reached indirectly through a function or hook callback invoked from the setup. Name/AST heuristics and React's HIR data flow are not equivalent.

## 3. Cleanup status

The IMPL has commented TODO cases and does not currently check cleanup functions. At the verified React commit there is no dedicated fixture combining a cleanup setter with `@validateNoSetStateInEffects`, and the validation source contains no cleanup-specific handling; unrelated cleanup fixtures do not lock this validation's behavior. Therefore cleanup is **unverified on the React side** and is not classified here as a definite compatibility gap.

## 4. Current actionable differences

1. The IMPL skips zero-argument setter calls; React's validation does not inspect setter argument count.
2. The IMPL does not provide React's HIR alias propagation or progressively summarized multi-hop wrapper chain.
3. `useEffectEvent` is generic hook tracking in the IMPL, which does not preserve every React deferred-callback boundary.
4. The IMPL's ref-derived exemption is unconditional and heuristic (widened only by the `additionalRefHooks` shared setting); React's richer data-flow exemption is feature-controlled.
5. Indirect diagnostic locations differ: React reports the synchronous effect-side callee, while the IMPL reports the resolved internal setter call.
6. React has a verbose diagnostic mode; the IMPL does not.
7. Inside an async effect setup, React still flags setState positioned before the first `await` (or after a merely conditional await) since `d083ec1da1e5`; the IMPL skips the entire body of async functions and misses those cases. Both allow setState that only runs after an await, but for different reasons: React via CFG dataflow, the IMPL by classifying async functions as `deferred` wholesale.

`ValidateNoDerivedComputationsInEffects` is a separate Pipeline pass and is outside this rule comparison.

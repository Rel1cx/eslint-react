# set-state-in-effect IMPL vs. SPEC Report

**IMPL**: `set-state-in-effect.ts` + `lib.ts` (ESLint rule)\
**SPEC**: `46-validateNoSetStateInEffects.md` (React Compiler `ValidateNoSetStateInEffects`)

---

## 1. Underlying Mechanism

The SPEC operates on the React Compiler's HIR (High-level IR), analyzing instructions (`LoadLocal`, `StoreLocal`, `FunctionExpression`, `CallExpression`, etc.) within each basic block. It builds a `setStateFunctions` map that propagates through variable assignments and function expressions, and uses `createControlDominators` to identify ref-controlled blocks.

The IMPL operates on the ESLint AST. It uses a function-entry stack (`functionEntries`) to track whether code is inside an effect setup function, a deferred context (async / `.then`), or an immediate callback. It detects `setState` calls by resolving identifiers to their `useState`-like definitions via `resolve`, and tracks transitive calls through WeakMaps (`setStateCallsByFn`, `setStateInHookCallbacks`, `setStateInEffectArg`).

**Verdict**: The SPEC uses compiler-level instruction propagation and control-dominator analysis. The IMPL uses syntactic function nesting and static resolution.

---

## 2. Effect Hook Coverage

| Hook Category        | SPEC                                      | IMPL                                          |
| -------------------- | ----------------------------------------- | --------------------------------------------- |
| `useEffect`          | Detected (`isUseEffectHookType`)          | Detected (`isUseEffectLikeCall`)              |
| `useLayoutEffect`    | Detected (`isUseLayoutEffectHookType`)    | Detected (`/^use\w*Effect$/u`)                |
| `useInsertionEffect` | Detected (`isUseInsertionEffectHookType`) | Detected (`/^use\w*Effect$/u`)                |
| Custom effect hooks  | Not mentioned                             | Supported via `additionalEffectHooks` setting |

**Verdict**: Both cover the three built-in effect hooks. The IMPL adds configurability for custom effect hooks.

---

## 3. setState Source Detection & Propagation

| Pattern                                                             | SPEC                                              | IMPL                                                                      |
| ------------------------------------------------------------------- | ------------------------------------------------- | ------------------------------------------------------------------------- |
| Direct destructuring `const [_, setX] = useState()`                 | Detected via `isSetStateType`                     | Detected via `isIdFromUseStateCall`                                       |
| Array index `data[1]()`                                             | Detected                                          | Detected via `getStaticValue`                                             |
| Method call `data.at(1)()`                                          | Detected                                          | Detected via `getStaticValue`                                             |
| Aliased variable `const aliased = setX; aliased()`                  | Detected via `LoadLocal`/`StoreLocal` propagation | **Not detected** — `resolve` does not follow aliases through reassignment |
| Prop named `setXxx` with `@enableTreatSetIdentifiersAsStateSetters` | Detected                                          | **Not detected** — no equivalent feature flag                             |
| Wrapped in `useCallback`/`useMemo` passed to effect                 | Detected via HIR flow                             | Detected via `setStateInHookCallbacks` / `setStateInEffectArg`            |

**Verdict**: The SPEC has more comprehensive propagation through HIR variable instructions. The IMPL relies on direct definition tracing and explicit hook-callback tracking.

---

## 4. Transitive Detection

The SPEC recursively analyzes `FunctionExpression` lowered functions via `getSetStateCall`. If a function expression references a setState and calls it synchronously, the function itself is tracked as a setState-calling function, enabling transitive reporting through arbitrary call depth.

The IMPL records setState calls per-function in `setStateCallsByFn`, and at `Program:exit` resolves callee identifiers to their definitions. It supports transitive detection for direct function declarations, arrow functions, and hook-wrapped callbacks (`useCallback` / `useMemo`).

**Verdict**: Both support transitive detection. The SPEC's HIR-based propagation is more robust for aliases and complex assignment chains.

---

## 5. useEffectEvent Handling

The SPEC explicitly checks `isUseEffectEventType` during instruction traversal. If a `useEffectEvent` call's callback argument is tracked as calling setState, the return value of the `useEffectEvent` call itself is added to `setStateFunctions`, so that calling the effect event inside an effect is flagged.

The IMPL does **not** explicitly recognize `useEffectEvent`. However, because `isHookDecl` treats any call to a hook-named function (including `useEffectEvent`) as a hook declaration, `setState` calls inside the callback are recorded into `setStateInHookCallbacks`. When the effect event is later called inside an effect, `getSetStateCalls` resolves the callee back to the `useEffectEvent` call and reports the inner setState calls.

**Verdict**: Functionally equivalent for the common case, but the IMPL's support is emergent rather than explicit.

---

## 6. Deferred / Callback setState

The SPEC naturally allows setState in callbacks because those calls reside in separate function blocks that are not the effect's setup block. Only synchronous calls within the effect setup block itself are flagged.

The IMPL classifies functions by `getFunctionKind`:

- `deferred` — async functions or `.then` callbacks → setState allowed
- `setup` — the effect's callback → setState reported (unless exempted)
- `immediate` — IIFEs or arrow functions called synchronously → tracked and reported if inside setup

**Limitation**: The IMPL cannot distinguish `setTimeout(() => setState(), 10)` (deferred) from an immediately-invoked function that calls setState. Both are treated as "immediate" callbacks inside the setup function, so the setState is reported. The SPEC handles this correctly via block-level analysis.

**Verdict**: The SPEC's block-level analysis is more precise for deferred callbacks. The IMPL conservatively reports setState in any synchronous callback defined inside the effect, which may produce false positives for `setTimeout` / `addEventListener` patterns that are not yet assigned to an external listener.

---

## 7. Ref-Derived setState Exception

The SPEC supports `enableAllowSetStateFromRefsInEffects`. When enabled:

- Builds a `refDerivedValues` set by propagating ref values through HIR instructions (including phi nodes and mutation effects)
- Uses `createControlDominators` to determine if a block is controlled by a ref-derived condition
- Allows setState if either the argument is in `refDerivedValues` or the block is ref-controlled

The IMPL supports ref-derived exceptions through:

- `isArgumentUsingRefValue` — checks if the setState argument directly or indirectly contains a ref value (`ref.current`, `useRef()`, or variables initialized from ref)
- `isRefGatedContext` — checks if the setState call is inside an `IfStatement` or `ConditionalExpression` whose test expression contains a ref value

**Verdict**: The SPEC's HIR-based propagation is more complete (e.g., it tracks ref values through phi nodes and mutations). The IMPL's AST-based checks are a pragmatic approximation that covers the majority of real-world patterns but may miss complex ref-value propagation chains.

---

## 8. Namespace Import Support

The SPEC previously had a bug (#35419) where `React.useEffect(...)` was not detected because it checked `MethodCall.receiver` instead of `property`. This was fixed in 7.1.0.

The IMPL checks `MemberExpression.property` from the start via `isUseEffectLikeCall` / `isUseStateLikeCall`, so `React.useEffect` and `React.useState` have always been correctly recognized.

**Verdict**: Both now handle namespace imports correctly. The IMPL did not have the original bug.

---

## 9. Error Reporting

| Aspect                      | SPEC                                                                                                                                               | IMPL                                                                                      |
| --------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| Primary message             | "Calling setState synchronously within an effect can trigger cascading renders"                                                                    | "Do not call the 'set' function '{{name}}' of 'useState' synchronously in an effect..."   |
| Verbose mode                | Supported (`enableVerboseNoSetStateInEffect`) with detailed guidance for non-local derived data, derived event patterns, and force-update patterns | **Not supported** — single message only                                                   |
| Reported location           | Original setState call site                                                                                                                        | setState call site for direct calls; call site of the wrapper function for indirect calls |
| Derived computation message | Separate pass (`ValidateNoDerivedComputationsInEffects`)                                                                                           | **Not supported**                                                                         |

**Verdict**: Message intent is aligned. The SPEC provides richer contextual guidance when verbose mode is enabled, and has a dedicated pass for derived computations.

---

## 10. Key Gaps and Deviations

1. **Missing Alias Propagation**: The IMPL does not track `setState` through variable aliases (e.g., `const aliased = setX; aliased()`). The SPEC propagates this through HIR `LoadLocal`/`StoreLocal` instructions.

2. **Missing `@enableTreatSetIdentifiersAsStateSetters` Equivalent**: The SPEC can treat any prop named `setXxx` as a state setter via a feature flag. The IMPL has no equivalent.

3. **Deferred Callback False Positives**: The IMPL reports setState in any synchronous callback defined inside the effect setup function. It cannot reliably distinguish deferred callbacks (e.g., `setTimeout(() => setState(), 10)`) from immediately invoked ones without additional interprocedural analysis.

4. **Missing Verbose Error Mode**: The IMPL does not support `enableVerboseNoSetStateInEffect`. It cannot provide the detailed anti-pattern guidance that the SPEC offers.

5. **Missing Derived Computation Check**: The SPEC has a separate `ValidateNoDerivedComputationsInEffects` pass that flags effects which only compute derived state. The IMPL does not implement this.

6. **Ref-Derived Propagation Limitations**: The IMPL's `isInitializedFromRef` and `isArgumentUsingRefValue` cover common patterns but do not track ref values through mutations, phi-like merge points, or complex data-flow chains the way the SPEC's HIR propagation does.

7. **Cleanup Function Handling**: The IMPL has a TODO comment for cleanup function checks but does not currently validate them. The SPEC treats cleanup functions as part of the effect function body and would flag synchronous setState there as well.

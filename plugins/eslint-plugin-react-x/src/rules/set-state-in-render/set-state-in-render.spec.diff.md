# set-state-in-render IMPL vs. SPEC Report

**IMPL**: `set-state-in-render.ts` + `lib.ts` (ESLint rule)\
**SPEC**: `set-state-in-render.spec.md` (React Compiler `ValidateNoSetStateInRender`)

---

## 1. Underlying Mechanism

The SPEC operates on the React Compiler's HIR using post-dominator tree analysis (`computeUnconditionalBlocks`) to determine which blocks always execute during render. It tracks `setState` calls through `LoadLocal`/`StoreLocal` instruction propagation and transitive function-call analysis.

The IMPL operates on the ESLint AST. It detects `setState` calls by tracing variable definitions via `resolve` and checking if the callee identifier originates from a `useState`-like call. It uses parent-node traversal (`isInsideConditional`, `isInsideEventHandler`) and an early-return flag to decide whether a `setState` call is allowed.

**Verdict**: The SPEC uses compiler-level control-flow analysis (post-dominator tree). The IMPL uses syntactic parent-node checks.

---

## 2. setState Source Detection

| Source Category                                                     | SPEC                         | IMPL                                                                               |
| ------------------------------------------------------------------- | ---------------------------- | ---------------------------------------------------------------------------------- |
| Direct `const [_, setX] = useState()`                               | Detected                     | Detected                                                                           |
| Array-index access `data[1]()`                                      | Detected                     | Detected via `getStaticValue`                                                      |
| Method call `data.at(1)()`                                          | Detected                     | Detected via `getStaticValue`                                                      |
| Aliased variable `const aliased = setX; aliased()`                  | Detected via HIR propagation | **Not detected** — `resolve` does not follow aliases through variable reassignment |
| Prop named `setXxx` with `@enableTreatSetIdentifiersAsStateSetters` | Detected                     | **Not detected** — no equivalent feature flag                                      |
| Custom hook return `useCustomState()` → `setState`                  | Detected via HIR flow        | Only detected if hook is in `additionalStateHooks` setting                         |

**Verdict**: The SPEC has more comprehensive setState source detection through HIR variable propagation and optional feature flags. The IMPL relies on direct variable-definition tracing and explicit settings.

---

## 3. Conditional vs. Unconditional Execution

The SPEC uses `computeUnconditionalBlocks` (post-dominator tree) to determine exactly which code blocks always execute. A `setState` call is only flagged if it resides in an unconditional block.

The IMPL checks if the `setState` CallExpression is syntactically inside:

- `IfStatement`, `ConditionalExpression`, `LogicalExpression`, `SwitchStatement`, `SwitchCase` → allowed
- Any nested function (event handler, callback) → allowed
- After an early return (guarded by prior return) → allowed

**Verdict**: The SPEC's post-dominator analysis is more precise. The IMPL's parent-node checks are a pragmatic approximation but can miss cases where a nested function is synchronously invoked during render.

---

## 4. Nested Function Invocation During Render

The SPEC tracks transitive calls: if a function defined during render is unconditionally invoked and that function calls `setState`, it is flagged.

The IMPL uses `isInsideEventHandler`, which returns `true` if the `setState` call is inside **any** nested function, regardless of whether that function is actually invoked during render or passed out as a callback. This creates both false negatives (invoked lambdas are missed) and relies on the fact that most nested functions are true event handlers.

**Verdict**: The SPEC precisely models transitive invocation through HIR block analysis. The IMPL conservatively allows all `setState` inside nested functions, accepting false negatives for invoked lambdas.

---

## 5. setState inside useMemo / useCallback

The SPEC explicitly detects and reports `setState` calls inside `useMemo` and `useCallback` callbacks with a dedicated error message ("Calling setState from useMemo may trigger an infinite loop").

The IMPL does **not** check `useMemo` or `useCallback` callbacks at all. Its `componentFnRef` only tracks the outer component/hook function, and `isInsideEventHandler` treats the memo callback as a nested function (thus allowing `setState`).

**Verdict**: The SPEC has a dedicated useMemo/useCallback check. The IMPL completely misses setState inside memoization callbacks.

---

## 6. Error Reporting

| Aspect                   | SPEC                                 | IMPL                                                                         |
| ------------------------ | ------------------------------------ | ---------------------------------------------------------------------------- |
| Primary message          | "Cannot call setState during render" | "Do not call the 'set' function '{{name}}' unconditionally during render..." |
| useMemo-specific message | Yes (separate message)               | No                                                                           |
| Reported location        | CallExpression site                  | CallExpression site                                                          |

**Verdict**: Message intent is aligned, but the SPEC provides a separate, more detailed message for useMemo violations.

---

## 7. Key Gaps and Deviations

1. **Missing Alias Propagation**: The IMPL does not track `setState` through variable aliases (e.g., `const aliased = setX; aliased()`). The SPEC propagates this through HIR `StoreLocal`/`LoadLocal` instructions.
2. **Missing `@enableTreatSetIdentifiersAsStateSetters` Equivalent**: The SPEC can treat any prop named `setXxx` as a state setter via a feature flag. The IMPL has no equivalent.
3. **Invoked Lambda False Negatives**: The IMPL allows `setState` inside any nested function, even if that function is synchronously invoked during render (e.g., `const foo = () => setX(1); foo();`). The SPEC's post-dominator analysis catches these.
4. **Missing useMemo/useCallback Check**: The IMPL does not detect `setState` inside `useMemo`/`useCallback` callbacks. The SPEC has a dedicated validation pass for this.
5. **Custom Hook Return Resolution**: The IMPL only recognizes custom hooks explicitly listed in `additionalStateHooks`. The SPEC can follow the HIR to see that `useCustomState` returns a `useState` tuple.

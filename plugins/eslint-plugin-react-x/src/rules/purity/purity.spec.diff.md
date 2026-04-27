# purity IMPL vs. SPEC Report

**IMPL**: `purity.ts` (ESLint rule)\
**SPEC**: `purity.spec.md` (React Compiler `ValidateNoImpureValuesInRender`)

---

## 1. Underlying Mechanism

The SPEC operates on the React Compiler's HIR using effects (`Impure`, `Render`, `Alias`, etc.). It is value-oriented: tracking whether an impure value flows into a render context. It uses fixed-point iteration propagating impurity through phi nodes, assignments, aliases, and function returns. Its scope covers all functions called during render, including nested helpers and callbacks.

The IMPL operates on the ESLint AST with scope analysis. It is call-site-oriented: reporting whether a known-impure function or constructor is called inside a component or hook body. It evaluates each `CallExpression` / `NewExpression` in isolation with no data-flow propagation. Its scope is limited to functions identified as React components or hooks via collectors.

---

## 2. Rule: Impure Values in Render

### Detection Target

The SPEC flags an `Impure` effect flowing into a `Render` effect (e.g., JSX props, return values). In `const x = Date.now(); return <Foo x={x} />`, it reports both the JSX prop and the `Date.now()` call.

The IMPL flags a direct call to a known-impure global function or constructor (`IMPURE_FUNCS` / `IMPURE_CTORS`). In the same example, it reports only the `Date.now()` call.

**Verdict**: The SPEC is value-flow driven; the IMPL is call-site driven.

### Data Flow and Propagation

- **Variable assignment**: The SPEC propagates impurity through assignments (`Alias/Assign/Capture`). The IMPL reports the call itself regardless of how the result is used.
- **Phi nodes / control flow**: The SPEC is control-flow sensitive; if any phi operand is impure, the result is impure. The IMPL does not support this.
- **Indirect mutation**: `obj.time = Date.now(); return <Foo obj={obj} />` — the SPEC flags `obj` as impure. The IMPL does not detect this because it lacks object-level impurity tracking.
- **Helper functions**: `const now = () => Date.now(); return <div>{now()}</div>` — the SPEC reports errors at both `now()` call and `Date.now()` source. The IMPL does not detect `now()` because it is inside a nested non-component function.

**Verdict**: The IMPL lacks data-flow analysis, missing indirect impurity and helper-function indirection that the SPEC catches.

### Nested Functions and Callbacks

- **Event handlers**: Both exclude them, but for different reasons. The SPEC excludes them if not invoked during render (no `Render` effect). The IMPL excludes them because the immediate parent function is not a component or hook.
- **Effect callbacks (`useEffect`)**: The SPEC excludes them from render context. The IMPL excludes them because the callback is a nested non-component function.
- **State initializers (`useState(() => ...)`)**: The SPEC excludes them as not part of render output. The IMPL excludes them for the same nested-function reason.
- **Returned callbacks from hooks**: The SPEC flags them if actually invoked during render (data-flow dependent). The IMPL ignores them because the call is inside the returned callback, not the hook body itself.

**Verdict**: Both approaches largely agree on common cases but for different reasons. The IMPL may miss impure calls in returned callbacks that are invoked during render.

---

## 3. Error Reporting

The SPEC reports **dual-location**: (1) where the impure value is used in render, and (2) where it originates. Its category is `ImpureValues` with the message "Cannot access impure value during render".

The IMPL reports **single-location**: only the call site (`CallExpression` / `NewExpression`). Its message is "Do not call '{{name}}' during render...".

**Verdict**: The IMPL simplifies error reporting to a single location; the SPEC provides richer dual-location diagnostics.

---

## 4. Known Impurity Catalogue

The SPEC sources impurity from compiler effect inference, which marks built-ins as `Impure` (e.g., `Date.now`, `Math.random`, `performance.now`). It is open-ended — any function inferred with an `Impure` effect is checked. Alias resolution and local shadowing are naturally handled by compiler bindings.

The IMPL uses explicit deny-lists (`IMPURE_FUNCS`, `IMPURE_CTORS`) and allow-lists (`PURE_FUNCS`, `PURE_CTORS`) in `lib.ts`. Only functions/constructors in the maps are checked. Alias resolution is handled by `resolveBuiltinObjectName` following simple assignment chains (`const M = Math`) and scope analysis. Local shadowing is explicitly handled via ESLint `findVariable` / `DefinitionType` checks.

**Verdict**: The SPEC is open-ended via compiler inference; the IMPL is closed-world via explicit catalogues but includes extensive built-in coverage.

---

## 5. Special Cases

- **Refs**: The SPEC allows values stored in refs (`isUseRefType`) to be impure. The IMPL does not explicitly distinguish refs; `useRef` initializer callbacks are excluded as nested functions.
- **JSX elements**: The SPEC excludes them from impurity propagation (`isJsxType`). Not applicable in the IMPL because there is no value-flow tracking.
- **`new Date()`**: The SPEC treats `new Date()` as impure (non-deterministic). The IMPL treats `new Date()` without arguments as impure, but `new Date(arg)` with arguments as pure (deterministic) and allows it.
- **Module scope**: Not a render context in the SPEC. Ignored by the IMPL because there is no enclosing component/hook function.

**Verdict**: The IMPL adds a pragmatic exception for `new Date(arg)`; otherwise the two align on common special cases through different mechanisms.

---

## 6. Message ID Mapping

The IMPL uses a single message ID:

- `default` — Impure function/constructor call in render.

The SPEC does not use message IDs but has a single error category:

- `ImpureValues` — "Cannot access impure value during render".

Error message text is conceptually aligned but structurally different due to single vs. dual reporting.

---

## 7. Key Gaps and Deviations

1. **No Data-Flow Analysis**: The IMPL evaluates calls in isolation and cannot track impurity through variable assignments, helper functions, or object mutations. The SPEC propagates impurity through a full fixed-point data-flow analysis.
2. **No Indirect Impurity Detection**: The IMPL misses cases where an impure value is produced in a helper function or mutated into an object that is then rendered. The SPEC catches these via inter-procedural and alias analysis.
3. **Single-Location Reporting**: The IMPL reports only the call site; the SPEC reports both the usage location (render context) and the source location.
4. **Returned Callbacks**: The IMPL ignores impure calls inside callbacks returned from hooks because they are nested functions. The SPEC may still flag them if the callback is invoked during render.
5. **Closed-World Catalogue**: The IMPL relies on explicit `IMPURE_FUNCS` / `IMPURE_CTORS` lists. Any impure built-in not in the lists will be missed. The SPEC is open-ended via compiler effect inference.
6. **`new Date(arg)` Exception**: The IMPL explicitly allows `new Date(arg)` as pure, which is a pragmatic deviation not mentioned in the SPEC.

# purity: IMPL vs SPEC Diff

> IMPL: `purity.ts` — ESLint rule implementation
> SPEC: `purity.spec.md` — React Compiler `ValidateNoImpureValuesInRender.ts` specification

---

## 1. Underlying Mechanism Differences

| Dimension                      | SPEC (React Compiler)                                                                                    | IMPL (ESLint Rule)                                                                                               |
| ------------------------------ | -------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| **Analysis Layer**             | Based on HIR (High-level IR), using effects (`Impure`, `Render`, `Alias`, etc.)                          | Based on ESLint AST + Scope analysis                                                                             |
| **Detection Philosophy**       | Value-oriented: tracks whether an _impure value_ flows into a _render context_                           | Call-site-oriented: reports whether a _known-impure function/constructor is called_ inside a component/hook body |
| **Data Flow**                  | Fixed-point iteration propagating impurity through phi nodes, assignments, aliases, and function returns | No data-flow propagation; each `CallExpression` / `NewExpression` is evaluated in isolation                      |
| **Scope of Checked Functions** | All functions called during render (including nested helpers and callbacks)                              | Only functions identified as React components or hooks via `getFunctionComponentCollector` / `getHookCollector`  |

---

## 2. Rule: Impure Values in Render

### 2.1 Detection Target

| Aspect              | SPEC                                                                                                       | IMPL                                                                                             |
| ------------------- | ---------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| **What is flagged** | An `Impure` effect flowing into a `Render` effect (e.g., JSX props, return values)                         | A direct call to a known-impure global function or constructor (`IMPURE_FUNCS` / `IMPURE_CTORS`) |
| **Example**         | `const x = Date.now(); return <Foo x={x} />` — error points to both the JSX prop and the `Date.now()` call | `const x = Date.now(); return <Foo x={x} />` — error points only to the `Date.now()` call        |

**Conclusion**: SPEC is value-flow driven; IMPL is call-site driven.

### 2.2 Data Flow & Propagation (Significant Difference)

| Aspect                       | SPEC                                                                                                                    | IMPL                                                                                              |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| **Variable Assignment**      | Propagates impurity through assignments (`Alias/Assign/Capture`)                                                        | No propagation; the call itself is reported at the call site regardless of how the result is used |
| **Phi Nodes / Control Flow** | Control-flow sensitive; if any phi operand is impure, the result is impure                                              | Not supported                                                                                     |
| **Indirect Mutation**        | `obj.time = Date.now(); return <Foo obj={obj} />` — `obj` becomes impure and is flagged                                 | Not detected; no object-level impurity tracking                                                   |
| **Helper Functions**         | `const now = () => Date.now(); return <div>{now()}</div>` — error reported at both `now()` call and `Date.now()` source | Not detected; `now()` is inside a nested non-component function and is ignored                    |

**Conclusion**: IMPL lacks data-flow analysis, missing indirect impurity and helper-function indirection that SPEC catches.

### 2.3 Nested Functions & Callbacks

| Aspect                                         | SPEC                                                                            | IMPL                                                                               |
| ---------------------------------------------- | ------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| **Event Handlers**                             | Naturally excluded if not invoked during render (no `Render` effect)            | Excluded because the immediate parent function is not a component/hook             |
| **Effect Callbacks (`useEffect`)**             | Excluded from render context                                                    | Excluded because the callback is a nested non-component function                   |
| **State Initializers (`useState(() => ...)`)** | Not part of render output                                                       | Excluded because the callback is a nested non-component function                   |
| **Returned Callbacks from Hooks**              | Flagged if the callback is actually invoked during render (data-flow dependent) | Ignored because the call is inside the returned callback, not the hook body itself |

**Conclusion**: Both approaches largely agree on common cases, but for different reasons — SPEC via effect semantics, IMPL via lexical parent-function check. IMPL may miss impure calls in returned callbacks that are invoked during render.

---

## 3. Error Reporting

| Aspect              | SPEC                                                                                               | IMPL                                                                     |
| ------------------- | -------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| **Error Locations** | Dual-location: (1) where the impure value is used in render, (2) where the impure value originates | Single-location: only the call site (`CallExpression` / `NewExpression`) |
| **Error Category**  | `ImpureValues`                                                                                     | —                                                                        |
| **Error Reason**    | "Cannot access impure value during render"                                                         | "Do not call '{{name}}' during render..."                                |

**Conclusion**: IMPL simplifies error reporting to a single location; SPEC provides richer dual-location diagnostics.

---

## 4. Known Impurity Catalogue

| Aspect               | SPEC                                                                                                       | IMPL                                                                                                           |
| -------------------- | ---------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| **Source of Truth**  | Compiler effect inference marks built-ins as `Impure` (e.g., `Date.now`, `Math.random`, `performance.now`) | Explicit deny-lists (`IMPURE_FUNCS`, `IMPURE_CTORS`) and allow-lists (`PURE_FUNCS`, `PURE_CTORS`) in `lib.ts`  |
| **Coverage**         | Implicit — any function inferred with an `Impure` effect                                                   | Explicit — only functions/constructors in the maps are checked                                                 |
| **Alias Resolution** | Handled by HIR binding analysis                                                                            | Handled by `resolveBuiltinObjectName` following simple assignment chains (`const M = Math`) and scope analysis |
| **Local Shadowing**  | Naturally handled by compiler bindings                                                                     | Explicitly handled via ESLint `findVariable` / `DefinitionType` checks                                         |

**Conclusion**: SPEC is open-ended via compiler inference; IMPL is closed-world via explicit catalogues but includes extensive built-in coverage.

---

## 5. Special Cases

| Aspect           | SPEC                                                            | IMPL                                                                                                                    |
| ---------------- | --------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| **Refs**         | Values stored in refs (`isUseRefType`) are allowed to be impure | Not explicitly distinguished; `useRef` initializer callbacks are excluded as nested functions                           |
| **JSX Elements** | Excluded from impurity propagation (`isJsxType`)                | Not applicable (no value-flow tracking)                                                                                 |
| **`new Date()`** | `new Date()` is treated as impure (non-deterministic)           | `new Date()` without arguments is impure; `new Date(arg)` with arguments is considered pure (deterministic) and allowed |
| **Module Scope** | Not a render context                                            | Ignored because there is no enclosing component/hook function                                                           |

**Conclusion**: IMPL adds a pragmatic exception for `new Date(arg)`; otherwise the two align on common special cases through different mechanisms.

---

## 6. Message ID Mapping

IMPL uses a single message ID:

| MessageID | Corresponding Rule                         |
| --------- | ------------------------------------------ |
| `default` | Impure function/constructor call in render |

SPEC does not use message IDs but has a single error category:

| Category       | Description                                |
| -------------- | ------------------------------------------ |
| `ImpureValues` | "Cannot access impure value during render" |

Error message text is conceptually aligned but structurally different due to single vs. dual reporting.

---

## 7. Summary of Key Gaps / Deviations

1. **No Data-Flow Analysis**: IMPL evaluates calls in isolation and cannot track impurity through variable assignments, helper functions, or object mutations. SPEC propagates impurity through a full fixed-point data-flow analysis.
2. **No Indirect Impurity Detection**: IMPL misses cases where an impure value is produced in a helper function or mutated into an object that is then rendered. SPEC catches these via inter-procedural and alias analysis.
3. **Single-Location Reporting**: IMPL reports only the call site; SPEC reports both the usage location (render context) and the source location.
4. **Returned Callbacks**: IMPL ignores impure calls inside callbacks returned from hooks because they are nested functions. SPEC may still flag them if the callback is invoked during render.
5. **Closed-World Catalogue**: IMPL relies on explicit `IMPURE_FUNCS` / `IMPURE_CTORS` lists. Any impure built-in not in the lists will be missed. SPEC is open-ended via compiler effect inference.
6. **`new Date(arg)` Exception**: IMPL explicitly allows `new Date(arg)` as pure, which is a pragmatic deviation not mentioned in SPEC.

# use-memo: IMPL vs SPEC Diff

> IMPL: `use-memo.ts` — ESLint rule implementation
> SPEC: `use-memo.spec.md` — React Compiler `ValidateUseMemo.ts` specification

---

## 1. Underlying Mechanism Differences

| Dimension             | SPEC (React Compiler)                                                                 | IMPL (ESLint Rule)                                                                       |
| --------------------- | ------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| **Analysis Layer**    | Based on HIR (High-level IR), using instructions such as `StoreContext`, `LoadGlobal` | Based on ESLint AST + Scope analysis                                                     |
| **useMemo Detection** | Tracks `useMemo` and `React` identifier bindings via `LoadGlobal` / `PropertyLoad`    | Detects directly via `core.isUseMemoCall(context, node)`                                 |
| **Data Flow**         | Uses `unusedUseMemos` Map to track result references with precise data-flow analysis  | Determines whether the result is used by checking parent node type against an allow-list |

---

## 2. Rule 1: No Parameters

| Aspect              | SPEC                                      | IMPL                                                                                       |
| ------------------- | ----------------------------------------- | ------------------------------------------------------------------------------------------ |
| **Detection Logic** | `body.loweredFunc.func.params.length > 0` | `callback.params.length > 0`                                                               |
| **Difference**      | —                                         | Falls back to reporting on the `callback` node when the first param is not an `Identifier` |

**Conclusion**: Essentially consistent; IMPL has extra node fallback handling.

---

## 3. Rule 2: No Async or Generator Functions

| Aspect              | SPEC                                                               | IMPL                                     |
| ------------------- | ------------------------------------------------------------------ | ---------------------------------------- |
| **Detection Logic** | `body.loweredFunc.func.async \|\| body.loweredFunc.func.generator` | `callback.async \|\| callback.generator` |

**Conclusion**: Essentially consistent.

---

## 4. Rule 3: No Reassigning Outer Variables (Significant Difference)

| Aspect                          | SPEC                                                                                                       | IMPL                                                                                                                        |
| ------------------------------- | ---------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| **Detection Target**            | HIR `StoreContext` instructions where the variable is in `fn.context` (closure-captured context variables) | AST `AssignmentExpression`, distinguishing local vs. outer variables via ESLint `getScope`                                  |
| **Nested Function Exclusion**   | Not mentioned                                                                                              | **Explicitly excluded** assignments inside nested functions (`isInsideNestedFunction`)                                      |
| **Property Mutation Filtering** | Not explicitly distinguished                                                                               | **Explicitly ignored** property mutations (`ref.current = ...`), only direct identifier assignments (`x = ...`) are flagged |
| **Detection Precision**         | Compiler-level context-variable analysis                                                                   | Scope-level local / outer variable analysis                                                                                 |

**Conclusion**: IMPL is more conservative than SPEC, additionally excluding property mutations and assignments inside nested functions. SPEC naturally targets only context variables via `StoreContext`.

---

## 5. Rule 4: Must Return a Value (Behavioral Difference)

| Aspect                       | SPEC                                                                                              | IMPL                                                                                                                      |
| ---------------------------- | ------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| **Enable Condition**         | Only checked when `validateNoVoidUseMemo` config is enabled                                       | **Always enabled**, unconditional                                                                                         |
| **Detection Method**         | HIR `terminal.kind === "return"` with `returnVariant` of `Explicit` or `Implicit`                 | AST `ReturnStatement`: arrow function concise bodies always pass; block bodies are traversed to verify `argument != null` |
| **Empty Return (`return;`)** | In HIR semantics, `return;` with `returnVariant === "Explicit"` still counts as returning a value | `return;` (`argument == null`) is treated as **not returning a value** and reported                                       |

**Conclusion**: IMPL lacks the `validateNoVoidUseMemo` toggle; the handling of empty `return;` differs from HIR semantics.

---

## 6. Rule 5: Result Must Be Used (Mechanism Difference)

| Aspect               | SPEC                                                                                                                                                | IMPL                                                                                                                                    |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| **Enable Condition** | Only checked when `validateNoVoidUseMemo` config is enabled                                                                                         | **Always enabled**                                                                                                                      |
| **Detection Method** | Data-flow tracking: maintains `unusedUseMemos`, removes entries as operands are referenced across instructions, reports remaining entries as unused | Static parent-node allow-list (`VariableDeclarator`, `ReturnStatement`, `JSXExpressionContainer`, `CallExpression`, etc.)               |
| **Precision**        | High (data-flow driven)                                                                                                                             | Medium (syntax-structure driven; the allow-list may miss edge cases such as `switch` test expressions or exception-related expressions) |

**Conclusion**: IMPL lacks the configuration toggle, and degrades from data-flow analysis to a parent-node type allow-list, potentially causing false negatives or false positives in complex nested expression scenarios.

---

## 7. Message ID Mapping

IMPL `MessageID`s correspond one-to-one with SPEC error descriptions:

| MessageID                     | Corresponding Rule |
| ----------------------------- | ------------------ |
| `noParameters`                | Rule 1             |
| `noAsyncOrGeneratorFunctions` | Rule 2             |
| `noReassigningOuterVariables` | Rule 3             |
| `mustReturnAValue`            | Rule 4             |
| `resultMustBeUsed`            | Rule 5             |

Error message text is essentially consistent with SPEC.

---

## 8. Summary of Key Gaps / Deviations

1. **Missing Configuration Toggle**: IMPL does not implement the `validateNoVoidUseMemo` configuration; Rule 4 and Rule 5 are always enforced.
2. **Rule 4 Semantic Deviation**: IMPL treats `return;` as not returning a value (conventional ESLint semantics), whereas SPEC's HIR representation may count an `Explicit` return without an argument as returning a value.
3. **Rule 3 Scope Difference**: IMPL is more conservative than SPEC, excluding property mutations and assignments inside nested functions; SPEC naturally targets only context variables via `StoreContext`.
4. **Rule 5 Detection Method Change**: Degraded from data-flow analysis to a parent-node type allow-list, which may produce false negatives or false positives in certain complex expression nesting scenarios.

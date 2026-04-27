# use-memo IMPL vs. SPEC Report

**IMPL**: `use-memo.ts` (ESLint rule)\
**SPEC**: `use-memo.spec.md` (React Compiler `ValidateUseMemo.ts`)

---

## 1. Underlying Mechanism

The SPEC operates on the React Compiler's High-level IR (HIR), tracking `useMemo` and `React` identifier bindings through instructions like `StoreContext` and `LoadGlobal`, with precise data-flow analysis via an `unusedUseMemos` map.

The IMPL operates on the ESLint AST with scope analysis. It detects `useMemo` calls directly via `core.isUseMemoCall(context, node)` and determines whether the result is used by checking parent node types against an allow-list.

---

## 2. Rule-by-Rule Comparison

### Rule 1: No Parameters

Both sides check whether the callback has parameters (`callback.params.length > 0`). The IMPL adds a fallback that reports on the `callback` node when the first parameter is not an `Identifier`.

**Verdict**: Essentially consistent.

### Rule 2: No Async or Generator Functions

Both sides check `callback.async || callback.generator`.

**Verdict**: Essentially consistent.

### Rule 3: No Reassigning Outer Variables

The SPEC detects this via HIR `StoreContext` instructions targeting closure-captured context variables. The IMPL uses ESLint scope analysis on `AssignmentExpression` nodes, distinguishing local from outer variables.

Key IMPL differences:

- Assignments inside nested functions are explicitly excluded.
- Property mutations (e.g., `ref.current = ...`) are ignored; only direct identifier assignments (`x = ...`) are flagged.

**Verdict**: The IMPL is more conservative than the SPEC.

### Rule 4: Must Return a Value

The SPEC only enforces this when `validateNoVoidUseMemo` is enabled. It considers HIR returns with `returnVariant` of `Explicit` or `Implicit` as returning a value, so even `return;` may qualify under HIR semantics.

The IMPL always enforces this rule unconditionally. It treats arrow-function concise bodies as valid and traverses block bodies to verify `argument != null`. An empty `return;` is treated as not returning a value.

**Verdict**: The IMPL lacks the `validateNoVoidUseMemo` toggle and differs in empty-return semantics.

### Rule 5: Result Must Be Used

The SPEC only checks this when `validateNoVoidUseMemo` is enabled. It uses data-flow tracking: maintaining an `unusedUseMemos` map, removing entries as operands are referenced across instructions, and reporting any remaining entries.

The IMPL always enforces this rule. It uses a static parent-node allow-list (`VariableDeclarator`, `ReturnStatement`, `JSXExpressionContainer`, `CallExpression`, etc.). This syntax-driven approach may miss edge cases such as `switch` test expressions or exception-related expressions.

**Verdict**: The IMPL lacks the configuration toggle and trades data-flow precision for a simpler static check.

---

## 3. Message ID Mapping

The IMPL's `MessageID`s correspond one-to-one with the SPEC:

- `noParameters` — Rule 1
- `noAsyncOrGeneratorFunctions` — Rule 2
- `noReassigningOuterVariables` — Rule 3
- `mustReturnAValue` — Rule 4
- `resultMustBeUsed` — Rule 5

Error message text is essentially consistent with the SPEC.

---

## 4. Key Gaps and Deviations

1. **Missing Configuration Toggle**: The IMPL does not support `validateNoVoidUseMemo`; Rule 4 and Rule 5 are always enforced.
2. **Rule 4 Semantic Gap**: `return;` is treated as not returning a value (conventional ESLint semantics), whereas the SPEC's HIR representation may count an `Explicit` return without an argument as returning a value.
3. **Rule 3 Scope Difference**: The IMPL excludes property mutations and assignments inside nested functions, making it more conservative than the SPEC.
4. **Rule 5 Detection Degradation**: Data-flow analysis is replaced with a parent-node type allow-list, which may produce false negatives or false positives in complex nested expression scenarios.

# use-memo IMPL–SPEC Diff Report

## Verification metadata

- **IMPL**: `use-memo.ts` + `lib.ts` (ESLint rule)
- **SPEC**: `use-memo.spec.md` (React Compiler `ValidateUseMemo`)
- **Implementation commit**: `55c10db7bae04d49606792767530cc1e786dd5a0`
- **React commit**: `c0c39a6b3907eaab35f43074949e2957a2a734c1`
- **Last verified**: `2026-07-14`
- **React package**: `compiler/packages/babel-plugin-react-compiler`
- **Implementation sources/tests**:
  - `use-memo.ts`
  - `lib.ts`
  - `use-memo.spec.ts`
- **React sources/fixtures**:
  - `src/Validation/ValidateUseMemo.ts`
  - `src/__tests__/fixtures/compiler/useMemo-empty-return.{js,expect.md}`
  - `src/__tests__/fixtures/compiler/error.invalid-useMemo-callback-args.{js,expect.md}`
  - `src/__tests__/fixtures/compiler/error.invalid-useMemo-async-callback.{js,expect.md}`
  - `src/__tests__/fixtures/compiler/error.invalid-reassign-variable-in-usememo.{js,expect.md}`

## 1. Underlying mechanism

The SPEC operates on the React Compiler's High-level IR (HIR), tracking `useMemo` and `React` identifier bindings through instructions such as `LoadGlobal`, `PropertyLoad`, and `CallExpression`. Its unused-result check is basic operand-reference tracking: an `unusedUseMemos` entry is deleted when the result identifier later appears in an instruction or terminal operand. This is not full SSA liveness analysis.

The IMPL operates on the ESLint AST with scope analysis. It detects `useMemo` calls via `core.isUseMemoCall(context, node)` and classifies the result as used when the call's immediate parent, after type-expression unwrapping, belongs to a fixed allow-list. Callback return collection and callback-local declaration checks are implemented in `lib.ts`.

## 2. Rule-by-rule comparison

### Rule 1: No parameters

Both sides check whether the callback has parameters (`callback.params.length > 0`). The IMPL adds a fallback that reports on the `callback` node when the first parameter is not an `Identifier`.

**Verdict**: Essentially consistent.

### Rule 2: No async or generator functions

Both sides check `callback.async || callback.generator`.

**Verdict**: Essentially consistent.

### Rule 3: No reassigning outer variables

The SPEC detects this via HIR `StoreContext` instructions targeting closure-captured context variables. The IMPL uses ESLint scope analysis on `AssignmentExpression` nodes, distinguishing local from outer variables.

Key IMPL differences:

- Assignments inside nested functions are explicitly excluded.
- Property mutations (e.g., `ref.current = ...`) are ignored; only direct identifier assignments (`x = ...`) are flagged.

**Verdict**: The IMPL checks a narrower set of AST assignments; this is not equivalent to the SPEC's `StoreContext` check.

### Rule 4: Must return a value

The SPEC enforces this only when `validateNoVoidUseMemo` is enabled. At the verified React commit, `hasNonVoidReturn` returns true for a HIR return terminal whose `returnVariant` is `Explicit` or `Implicit`; it does not inspect whether the source return has a value. Therefore `useMemo(() => { return; })` passes this check. This is source-verified and fixture-verified: `useMemo-empty-return.expect.md` contains successfully compiled output with no `VoidUseMemo` diagnostic.

The IMPL always enforces this rule. It treats arrow-function concise bodies as valid and uses `getNestedReturnStatements` from `lib.ts` for block bodies, requiring at least one return whose `argument != null`. An empty `return;` is treated as not returning a value.

**Verdict**: The IMPL lacks the `validateNoVoidUseMemo` toggle and intentionally differs from the verified React empty-return behavior.

### Rule 5: Result must be used

The SPEC checks this only when `validateNoVoidUseMemo` is enabled and the callback passes `hasNonVoidReturn`. It maintains an `unusedUseMemos` map, removes entries when the result identifier appears in a later instruction or terminal operand, and reports entries that remain. The React source explicitly describes this as a basic, pre-DCE usage check; any operand reference is enough, so it is not complete SSA liveness.

The IMPL always enforces this rule. It uses a static immediate-parent allow-list (`VariableDeclarator`, `ReturnStatement`, `JSXExpressionContainer`, `CallExpression`, and others). Because that syntax classification is not equivalent to React's operand-reference tracking, it can produce false positives or false negatives relative to the SPEC. No particular unsupported construct is asserted here without a verified source or fixture case.

**Verdict**: The IMPL lacks the configuration toggle, and the two sides use different approximations of whether a result is used.

## 3. Message ID mapping

The IMPL's `MessageID`s correspond one-to-one with the SPEC:

- `noParameters` — Rule 1
- `noAsyncOrGeneratorFunctions` — Rule 2
- `noReassigningOuterVariables` — Rule 3
- `mustReturnAValue` — Rule 4
- `resultMustBeUsed` — Rule 5

Each ESLint message combines the corresponding React diagnostic reason and description, with punctuation differences. React also assigns diagnostic categories and detail messages that the ESLint rule does not model.

## 4. Key gaps and deviations

1. **Missing Configuration Toggle**: The IMPL does not support `validateNoVoidUseMemo`; Rule 4 and Rule 5 are always enforced.
2. **Verified Rule 4 Semantic Gap**: React accepts `useMemo(() => { return; })` at the verified commit, while the IMPL reports `mustReturnAValue`.
3. **Rule 3 Scope Difference**: The IMPL excludes property mutations and assignments inside nested functions; its AST check is narrower than React's `StoreContext` check.
4. **Rule 5 Detection Difference**: React performs basic operand-reference tracking, while the IMPL uses an immediate-parent allow-list. The non-equivalent checks can produce false positives or false negatives.

## 5. Verification boundaries

### Source-verified

- React gates Rules 4 and 5 on `validateNoVoidUseMemo`; the IMPL enforces both unconditionally.
- React's `hasNonVoidReturn` accepts `Explicit` and `Implicit` return variants without checking for a returned value; the IMPL requires a non-null `ReturnStatement.argument` for block-bodied callbacks.
- React's unused-result check is basic instruction/terminal operand-reference tracking, not full SSA liveness.
- The IMPL's result-use decision is a fixed immediate-parent allow-list, with type-expression wrappers skipped.

### Fixture-verified

- `useMemo-empty-return.{js,expect.md}` enables `validateNoVoidUseMemo`, contains `return;`, and compiles without a `VoidUseMemo` error.
- The three cited error fixture pairs lock the React diagnostics shown in `use-memo.spec.md` for callback parameters, async callbacks, and reassignment of a captured variable.

### Comparison boundary

The source establishes that React operand-reference tracking and the IMPL parent allow-list are non-equivalent, so either false-positive or false-negative differences are possible. No specific parent-node edge case is classified as an observed compatibility gap without a dedicated verified case.

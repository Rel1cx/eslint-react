# error-boundaries IMPL vs. SPEC Report

**IMPL**: `error-boundaries.ts` (ESLint rule)\
**SPEC**: `error-boundaries.spec.md` (React Compiler `ValidateNoJSXInTryStatement`)

---

## 1. Underlying Mechanism

The SPEC operates on the React Compiler's High-level IR (HIR), using block-based CFG traversal with an `activeTryBlocks` stack. It tracks `JsxExpression` and `JsxFragment` instructions and operates on `HIRFunction` scope with `outputMode === 'lint'`.

The IMPL operates on the ESLint AST with parent-node traversal (`Traverse.findParent`). It detects JSX-like return values via `isJsxLike(context, ret, hint)` and is explicitly scoped to function components and hooks via collectors.

---

## 2. Rule: No JSX in Try Block

### Detection Target

The SPEC flags any `JsxExpression` or `JsxFragment` instruction appearing inside a try block, including JSX assigned to variables (e.g., `el = <div />`).

The IMPL only inspects `ReturnStatement` nodes with a `TryStatement` ancestor. Intermediate variable assignments inside try blocks are missed.

**Verdict**: IMPL detection is narrower. It only catches JSX returned directly from a try/catch scope.

### Catch Block Handling

The SPEC maintains an `activeTryBlocks` stack and explicitly removes catch handler blocks from the stack at block start. JSX inside a catch block is outside the try scope when there is no enclosing outer try.

The IMPL uses `Traverse.findParent(ret, is(TryStatement))`. Any `ReturnStatement` that is a descendant of a `TryStatement` is flagged, regardless of whether it sits in the `try`, `catch`, or `finally` block.

Key behavioral difference:

- JSX in catch (no outer try): **Allowed** by SPEC; **reported** by IMPL.
- JSX in catch (nested in outer try): **Error** for both.

**Verdict**: IMPL is stricter for catch blocks because it does not distinguish `try`, `catch`, and `finally` descendants.

### Nested Try/Catch

The SPEC's `activeTryBlocks` stack naturally handles nesting depth. The IMPL's `findParent` resolves to the nearest ancestor `TryStatement`, so nested returns are still flagged.

**Verdict**: Both handle nested structures, but via different mechanisms. The IMPL lacks the fine-grained block-tracking that lets the SPEC exempt un-nested catch blocks.

---

## 3. Rule: No `use` Hook in Try/Catch

The SPEC does not include this check. The IMPL adds an extra `tryCatchWithUse` rule that reports `use()` calls inside try blocks.

Rationale: the `use` hook suspends the component; its errors can only be caught by Error Boundaries, not try/catch.

**Verdict**: IMPL extends the compiler SPEC with an extra rule that has no SPEC counterpart.

---

## 4. Finally Blocks

The SPEC explicitly marks finally blocks as TODO / unsupported (`error.todo-invalid-jsx-in-try-with-finally.js`). The IMPL provides no special handling; AST traversal treats finally as a normal descendant of `TryStatement`.

**Verdict**: IMPL provides basic coverage for finally via AST ancestry, while the SPEC documents known unsupported cases.

---

## 5. Non-Component / Non-Hook Functions

The SPEC implicitly limits scope via `HIRFunction`. The IMPL explicitly filters — only function components and hooks are collected. Utility functions (e.g., lowercase `processItems`, `fetchData`) are ignored.

**Verdict**: Both are effectively limited to component-like functions, but the IMPL achieves this explicitly via collectors.

### Nested Functions and Hook Callbacks

A corollary of the above: the IMPL does **not** inspect `ReturnStatement` nodes inside nested function expressions, arrow functions, object methods, or hook callbacks (e.g., `useMemo(() => { try { return <div />; } catch {} })`). Because these nested functions are not themselves components or hooks, their returns are never examined for JSX-in-try violations.

The SPEC, operating on the full HIR of the component, would still flag JSX constructed inside a try block regardless of whether it appears in a nested callback.

**Verdict**: IMPL misses try/catch JSX inside nested callbacks; SPEC catches them uniformly.

---

## 6. Message ID Mapping

The SPEC defines a single error message. The IMPL splits the concept into two distinct MessageIDs:

- `tryCatchWithJsx` — "Avoid constructing JSX within try/catch"\
  Maps to the SPEC's single error.
- `tryCatchWithUse` — **IMPL-only**\
  Reports `use()` hook calls inside a `TryStatement`.

Error text is aligned in intent (recommending Error Boundaries) but the IMPL adds hook-specific wording for the `use` case.

---

## 7. Key Gaps and Deviations

1. **Narrower JSX Detection**: The IMPL only catches JSX in `ReturnStatement` nodes, missing intermediate assignments such as `el = <div />` inside try blocks.
2. **Catch Block Over-Reporting**: The SPEC explicitly allows JSX in catch blocks when there is no outer try. The IMPL reports these because it does not distinguish `try`, `catch`, or `finally` descendants.
3. **`use` Hook Extension**: The IMPL adds `tryCatchWithUse`, a rule with no equivalent in the compiler SPEC.
4. **Finally Handling**: The SPEC documents TODOs for finally blocks; the IMPL provides implicit coverage via AST ancestry but does not document any gaps.

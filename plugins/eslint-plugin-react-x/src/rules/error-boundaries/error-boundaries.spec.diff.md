# error-boundaries: IMPL vs SPEC Diff

> IMPL: `error-boundaries.ts` — ESLint rule implementation
> SPEC: `error-boundaries.spec.md` — React Compiler `ValidateNoJSXInTryStatement` specification

---

## 1. Underlying Mechanism Differences

| Dimension          | SPEC (React Compiler)                                                                | IMPL (ESLint Rule)                                                                                          |
| ------------------ | ------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------- |
| **Analysis Layer** | Based on HIR (High-level IR), block-based CFG traversal with `activeTryBlocks` stack | Based on ESLint AST + parent-node traversal (`Traverse.findParent`)                                         |
| **JSX Detection**  | Tracks `JsxExpression` and `JsxFragment` instructions                                | Detects JSX-like return values via `isJsxLike(context, ret, hint)`                                          |
| **Scope**          | Operates on `HIRFunction` (pre-reactive scope inference), `outputMode === 'lint'`    | Explicitly scoped to function components and hooks via `getFunctionComponentCollector` / `getHookCollector` |

---

## 2. Rule: No JSX in Try Block

### 2.1 Detection Target

| Aspect                   | SPEC                                                                          | IMPL                                                                                |
| ------------------------ | ----------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| **What is flagged**      | Any `JsxExpression` or `JsxFragment` instruction appearing inside a try block | Only JSX-like values in `ReturnStatement` nodes that have a `TryStatement` ancestor |
| **Variable assignments** | Detects JSX assigned to variables inside try (e.g., `el = <div />`)           | **Missed** — IMPL only inspects return values, not intermediate assignments         |

**Conclusion**: IMPL detection is narrower. SPEC flags all JSX construction within try blocks; IMPL only catches JSX returned directly from a try/catch scope.

### 2.2 Catch Block Handling (Behavioral Difference)

| Aspect                                 | SPEC                                                                                                                                                       | IMPL                                                                                                                                                                                                  |
| -------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Algorithm**                          | Maintains `activeTryBlocks` stack. Catch handler blocks are explicitly removed from the stack at block start, so JSX inside catch is outside the try scope | Uses `Traverse.findParent(ret, is(TryStatement))`. Any `ReturnStatement` that is a descendant of a `TryStatement` is flagged, regardless of whether it sits in the `try`, `catch`, or `finally` block |
| **JSX in catch (no outer try)**        | **Allowed** — catch block is not in `activeTryBlocks`                                                                                                      | **Reported** — `findParent` still resolves to the enclosing `TryStatement`                                                                                                                            |
| **JSX in catch (nested in outer try)** | **Error** — catch block is still inside outer try's active scope                                                                                           | **Reported** — same behavior, but for a different reason (ancestor `TryStatement` exists)                                                                                                             |

**Conclusion**: IMPL is stricter than SPEC for catch blocks. SPEC permits JSX returned from a catch block when there is no enclosing outer try; IMPL reports it because it does not distinguish between `try`, `catch`, and `finally` descendants.

### 2.3 Nested Try/Catch

| Aspect                               | SPEC                                                    | IMPL                                                                                              |
| ------------------------------------ | ------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| **Detection**                        | `activeTryBlocks` stack naturally handles nesting depth | `findParent` resolves to the nearest ancestor `TryStatement`, so nested returns are still flagged |
| **Outer try + inner catch with JSX** | Error (catch is still within outer try scope)           | Error (ancestor `TryStatement` found)                                                             |

**Conclusion**: Both handle nested structures, but via different mechanisms. IMPL lacks the fine-grained block-tracking that lets SPEC exempt un-nested catch blocks.

---

## 3. Rule: No `use` Hook in Try/Catch (IMPL-Only Extension)

| Aspect        | SPEC                                                   | IMPL                                                                                                    |
| ------------- | ------------------------------------------------------ | ------------------------------------------------------------------------------------------------------- |
| **Existence** | **Not present** — SPEC only validates JSX construction | Additional check for `use()` calls inside try blocks (`tryCatchWithUse`)                                |
| **Detection** | N/A                                                    | `core.isUseCall(context, node)` with ancestor `TryStatement` check                                      |
| **Rationale** | N/A                                                    | The `use` hook suspends the component; its errors can only be caught by Error Boundaries, not try/catch |

**Conclusion**: IMPL extends the compiler specification with an extra rule that has no SPEC counterpart.

---

## 4. Finally Blocks

| Aspect       | SPEC                                                                                      | IMPL                                                                                       |
| ------------ | ----------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| **Support**  | Explicitly marked as TODO / unsupported (`error.todo-invalid-jsx-in-try-with-finally.js`) | No special handling; AST traversal treats finally as a normal descendant of `TryStatement` |
| **Behavior** | Known gaps in HIR-based block tracking                                                    | Would report JSX-like returns in finally blocks as being inside try scope                  |

**Conclusion**: IMPL provides basic coverage for finally via AST ancestry, while SPEC documents known unsupported cases.

---

## 5. Non-Component / Non-Hook Functions

| Aspect                | SPEC                             | IMPL                                                                                     |
| --------------------- | -------------------------------- | ---------------------------------------------------------------------------------------- |
| **Filtering**         | Implicit via `HIRFunction` scope | Explicitly filtered — only function components and hooks are collected                   |
| **Utility functions** | Not discussed / not applicable   | Ignored (confirmed by valid test cases such as lowercase `processItems` and `fetchData`) |

**Conclusion**: Both are effectively limited to component-like functions, but IMPL achieves this explicitly via collectors.

---

## 6. Message ID Mapping

SPEC defines a single error message. IMPL splits the concept into two distinct MessageIDs:

| MessageID         | SPEC Correspondence                       | Description                                         |
| ----------------- | ----------------------------------------- | --------------------------------------------------- |
| `tryCatchWithJsx` | `Avoid constructing JSX within try/catch` | JSX-like return value found inside a `TryStatement` |
| `tryCatchWithUse` | **N/A — IMPL-only**                       | `use()` hook call found inside a `TryStatement`     |

Error text is aligned in intent (recommend Error Boundaries) but IMPL adds hook-specific wording for the `use` case.

---

## 7. Summary of Key Gaps / Deviations

1. **Narrower JSX Detection**: IMPL only catches JSX in `ReturnStatement` nodes, missing intermediate assignments such as `el = <div />` inside try blocks.
2. **Catch Block Over-Reporting**: SPEC explicitly allows JSX in catch blocks when there is no outer try. IMPL reports these because it does not distinguish `try`, `catch`, or `finally` descendants.
3. **`use` Hook Extension**: IMPL adds `tryCatchWithUse`, a rule with no equivalent in the compiler SPEC.
4. **Finally Handling**: SPEC documents TODOs for finally blocks; IMPL provides implicit coverage via AST ancestry but does not document any gaps.

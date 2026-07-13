# error-boundaries IMPL–SPEC Diff Report

## Verification metadata

- **IMPL**: `error-boundaries.ts` (ESLint rule)
- **SPEC**: `error-boundaries.spec.md` (React Compiler `ValidateNoJSXInTryStatement`)
- **Implementation commit**: `55c10db7bae04d49606792767530cc1e786dd5a0`
- **React commit**: `c0c39a6b3907eaab35f43074949e2957a2a734c1`
- **Last verified**: `2026-07-14`
- **React package**: `compiler/packages/babel-plugin-react-compiler`
- **Implementation sources/tests**:
  - `error-boundaries.ts`
  - `error-boundaries.spec.ts`
- **React sources/fixtures**:
  - `src/Validation/ValidateNoJSXInTryStatement.ts`
  - `src/__tests__/fixtures/compiler/invalid-jsx-in-try-with-catch.js`
  - `src/__tests__/fixtures/compiler/invalid-jsx-in-catch-in-outer-try-with-catch.js`
  - `src/__tests__/fixtures/compiler/error.todo-invalid-jsx-in-try-with-finally.js`
  - `src/__tests__/fixtures/compiler/error.todo-invalid-jsx-in-catch-in-outer-try-with-finally.js`

“Source” below means behavior directly established by the files above; “fixture” means an explicit reviewed case; “inference” is kept separate.

## 1. Detection mechanism and breadth

**Source — React pass.** `validateNoJSXInTryStatement(fn)` iterates `fn.body.blocks`, maintains an `activeTryBlocks` stack, and reports every `JsxExpression` or `JsxFragment` instruction encountered while that stack is non-empty.

**Source — IMPL.** The rule collects function components and hooks, then checks JSX-like values from their collected `rets`. It does not visit every JSX creation site. Separately, it collects `use()` calls and reports those that are in a matching try body belonging to a collected component or hook.

**Fixture.** React's `invalid-jsx-in-try-with-catch.js` assigns `<div />` to a variable inside a try body. This is an explicit compiler error case; it is not the return-value shape inspected by the IMPL.

**Inference.** The IMPL's JSX candidate set is narrower than the pass's instruction-level JSX scan. The IMPL also adds `tryCatchWithUse`, which has no counterpart in this React pass.

## 2. Try ancestry, catch, and finally

**Source — IMPL traversal.** `getEnclosingTryBlock` uses a custom `while` parent-chain, not repeated `Traverse.findParent` calls. For each ancestor `TryStatement`, it walks from the original node toward that try and matches only if the path passes through `TryStatement.block`.

Consequently:

- a node in a try body matches that try;
- a node in that try's own `catch` or `finally` does not match that try;
- traversal continues outward, so the same node can match an outer try when its path passes through the outer `TryStatement.block`.

The IMPL's remaining `Traverse.findParent` use checks whether a matched `use()` try belongs to a collected component or hook; it is not the try-body ancestry algorithm.

**Source — React pass.** At each HIR block, the pass removes that block's ID from `activeTryBlocks` before inspecting instructions. This excludes a current try's handler while retaining any still-active outer try.

**Fixtures.** The reviewed React fixtures explicitly cover JSX in a try body with catch and JSX in an inner catch that remains inside an outer try. Together with the reviewed IMPL tests, these support alignment for those two cases.

**Source/fixtures — Finally.** The IMPL does not treat a current try's own `finally` as its try body; it can only match an enclosing outer try as described above. The React pass has no explicit finally branch, and the two reviewed finally scenarios are TODO fixtures.

**Inference.** Current source and fixtures do not establish general IMPL/compiler parity for finally-related control flow.

## 3. Function scope and nested callbacks

**Source — IMPL.** The rule's JSX checks are driven by `rets` supplied by the function-component and hook collectors, rather than by a recursive scan of all nested function bodies.

**Source — React pass.** One invocation scans only the blocks of the supplied `HIRFunction`; this pass does not recursively traverse lowered nested functions.

**Fixture boundary.** The reviewed React fixtures cover try/catch, catch inside an outer try, and the two finally TODOs. None contains a nested callback.

**Inference boundary.** Current pass source and fixtures do not prove how the compiler pipeline handles JSX inside a nested callback. In particular, this report does not assert that the compiler must report such a case; that would require pipeline/lowering evidence or a dedicated fixture.

## 4. Message mapping

- `tryCatchWithJsx` corresponds in intent to the pass diagnostic, “Avoid constructing JSX within try/catch,” though the exact text differs.
- `tryCatchWithUse` is IMPL-only and advises using an Error Boundary around `use()` rather than try/catch.

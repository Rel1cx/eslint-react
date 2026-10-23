# error-boundaries IMPL–SPEC Diff Report

## Verification metadata

- **IMPL**: `error-boundaries.ts` (ESLint rule)
- **SPEC**: `error-boundaries.spec.md` (React Compiler `ValidateNoJSXInTryStatement`)
- **Implementation commit**: `cdad818d0c2e5d5006769950cdeca71717c52950`
- **React commit**: `7c6ac13e19fef500b7f669a16bbd01ecc95965ca`
- **Last verified**: `2026-10-12`
- **Recent implementation changes**: `c02e9cd8dda91049391e733f2bb13f4367cddc99` added `Traverse.hasParent` and `Traverse.hasEnclosingTryBlock` shortcuts; this is a behavior-preserving API addition and does not affect the reported limitations. The rule now also checks every `JSXElement` / `JSXFragment` created in a try body of a collected component or hook, which closes the variable-assignment gap (#1760).
- **React package**: `compiler/packages/babel-plugin-react-compiler`
- **Implementation sources/tests**:
  - `error-boundaries.ts`
  - `error-boundaries.spec.ts`
  - `packages/ast/src/traverse.ts` (`Traverse.findEnclosingTryBlock`)
- **React sources/fixtures**:
  - `src/Validation/ValidateNoJSXInTryStatement.ts`
  - `src/__tests__/fixtures/compiler/invalid-jsx-in-try-with-catch.js`
  - `src/__tests__/fixtures/compiler/invalid-jsx-in-catch-in-outer-try-with-catch.js`
  - `src/__tests__/fixtures/compiler/error.todo-invalid-jsx-in-try-with-finally.js`
  - `src/__tests__/fixtures/compiler/error.todo-invalid-jsx-in-catch-in-outer-try-with-finally.js`

“Source” below means behavior directly established by the files above; “fixture” means an explicit reviewed case; “inference” is kept separate.

## 1. Detection mechanism and breadth

**Source — React pass.** `validateNoJSXInTryStatement(fn)` iterates `fn.body.blocks`, maintains an `activeTryBlocks` stack, and reports every `JsxExpression` or `JsxFragment` instruction encountered while that stack is non-empty. The pass is only run when `outputMode` is `'lint'` (facebook/react#35216).

**Source — IMPL.** The rule collects function components and hooks, then checks two JSX candidate sets: JSX-like values from their collected `rets`, and every `JSXElement` / `JSXFragment` node whose nearest enclosing function is a collected component or hook. Separately, it collects `use()` calls and reports those that are in a matching try body belonging to a collected component or hook.

**Fixture.** React's `invalid-jsx-in-try-with-catch.js` assigns `<div />` to a variable inside a try body, and `invalid-jsx-in-catch-in-outer-try-with-catch.js` assigns JSX in an inner catch inside an outer try. Both are covered by IMPL invalid tests.

**Inference.** For a function the collectors detect, the IMPL's JSX node scan covers the pass's instruction-level `JsxExpression` / `JsxFragment` scan, with one report per `TryStatement` instead of one per JSX instruction. The collectors are narrower than the compiler's component detection: a function such as `let el; try { el = <div /> } catch {} return el;` is not collected, so it is not reported. JSX in a `useMemo` callback is not covered either (see §3). The IMPL's candidate set is wider in one direction: through `rets`, a JSX-like value returned from a try body is reported even when the JSX was created outside the try. The IMPL also adds `try-catch-with-use`, which has no counterpart in this React pass.

## 2. Try ancestry, catch, and finally

**Source — IMPL traversal.** The rule delegates try-body ancestry to `Traverse.findEnclosingTryBlock` (extracted into `packages/ast/src/traverse.ts` from this rule). It is a recursive parent-chain walk, not repeated `Traverse.findParent` calls: walking up from the original node, a `TryStatement` matches only when the node currently being walked is directly that try's `TryStatement.block`.

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

**Source — IMPL.** The JSX node scan reports a JSX node only when its nearest enclosing function is a collected component or hook and the matched `TryStatement` belongs to that same function. JSX inside a callback or function declaration defined in a try body is therefore not reported. The `rets` check has no such boundary: a nested function that is itself collected as a component (for example `Inner = () => <div />` assigned inside the outer component's try body) is reported against the outer try.

**Source — React pass.** One invocation scans only the blocks of the supplied `HIRFunction`; this pass does not recursively traverse lowered nested functions. `Entrypoint/Pipeline.ts` calls it once, on the top-level `hir`, after the earlier passes have lowered it. JSX created in a `useMemo` callback inside a try body is reported by the compiler and not by the IMPL; an immediately invoked arrow in the same position is reported by neither (checked with `eslint-plugin-react-hooks` 7.1.1).

**Fixture boundary.** The reviewed React fixtures cover try/catch, catch inside an outer try, and the two finally TODOs. None contains a nested callback.

**Inference boundary.** Apart from `useMemo` callbacks, current pass source and fixtures do not prove how the compiler pipeline handles JSX inside a nested callback. In particular, this report does not assert that the compiler must report such a case; that would require pipeline/lowering evidence or a dedicated fixture.

## 4. Message mapping

- `try-catch-with-jsx` corresponds in intent to the pass diagnostic, “Avoid constructing JSX within try/catch,” though the exact text differs.
- `try-catch-with-use` is IMPL-only and advises using an Error Boundary around `use()` rather than try/catch.

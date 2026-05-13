#!/usr/bin/env bash
set -euo pipefail

REPO="Rel1cx/eslint-react"

echo "Creating Issue 1/8..."
cat <<'EOF' | gh issue create -R "$REPO" -t '[use-memo] Align empty return semantics with React Compiler spec' -F -
## Background
Per the analysis in `use-memo.spec.diff.md`, the current `use-memo` rule treats an empty `return;` as "does not return a value" and reports `mustReturnAValue`.

However, the React Compiler `ValidateUseMemo.ts` SPEC considers an `Explicit` return (even without an argument) as returning a value under HIR semantics.

## Current behavior
```js
// Currently flagged by the ESLint rule
useMemo(() => {
  if (condition) return; // ❌ mustReturnAValue
  return compute();
}, [condition]);
```

## Expected behavior
An empty `return;` should be treated as a valid return, aligning with React Compiler behavior and reducing false positives.

## References
- Diff report: `plugins/eslint-plugin-react-x/src/rules/use-memo/use-memo.spec.diff.md` (Rule 4)
- SPEC: `ValidateUseMemo.ts`

## Priority
P0 — very low implementation cost, high alignment benefit.
EOF

echo "Creating Issue 2/8..."
cat <<'EOF' | gh issue create -R "$REPO" -t '[purity] Remove new Date(arg) exception to align with React Compiler spec' -F -
## Background
Per `purity.spec.diff.md`, the current `purity` rule exempts `new Date(arg)` (Date constructor with arguments) from impurity detection, treating it as deterministic.

React Compiler's `ValidateNoImpureValuesInRender` treats all `new Date()` calls as impure (non-deterministic).

## Current behavior
```js
// Currently allowed by the ESLint rule (but flagged by the SPEC)
const date = new Date('2024-01-01'); // ❌ should be flagged
```

## Expected behavior
Remove the argument-length check for `new Date` so that `new Date(arg)` is treated as impure, just like `new Date()`.

## References
- Diff report: `plugins/eslint-plugin-react-x/src/rules/purity/purity.spec.diff.md` (§5 Special Cases)
- SPEC: `ValidateNoImpureValuesInRender`

## Priority
P0 — very low implementation cost (remove a conditional branch), high alignment benefit.
EOF

echo "Creating Issue 3/8..."
cat <<'EOF' | gh issue create -R "$REPO" -t '[error-boundaries] Extend JSX detection to variable assignments inside try blocks' -F -
## Background
Per `error-boundaries.spec.diff.md`, the current `error-boundaries` rule only inspects `ReturnStatement` nodes for JSX inside try blocks, missing intermediate variable assignments.

React Compiler's `ValidateNoJSXInTryStatement` flags any `JsxExpression` / `JsxFragment` instruction.

## Current behavior
```jsx
function Component() {
  try {
    const el = <div />; // ❌ currently missed
    return el;
  } catch {}
}
```

## Expected behavior
When traversing `TryStatement`, also detect JSX expressions inside `VariableDeclarator`, `AssignmentExpression`, and similar nodes.

## References
- Diff report: `plugins/eslint-plugin-react-x/src/rules/error-boundaries/error-boundaries.spec.diff.md` (§2.1 / §7)
- SPEC: `ValidateNoJSXInTryStatement`

## Priority
P0 — low implementation cost (extend existing visitor), high alignment benefit.
EOF

echo "Creating Issue 4/8..."
cat <<'EOF' | gh issue create -R "$REPO" -t '[purity] Expand IMPURE_FUNCS / IMPURE_CTORS catalog to cover more built-ins' -F -
## Background
The current `purity` rule relies on explicit `IMPURE_FUNCS` / `IMPURE_CTORS` deny-lists, while React Compiler infers impurity automatically via effect inference. This can lead to false negatives for built-ins not yet catalogued.

## Examples of potentially missing built-ins
- `performance.now()` (mentioned in the SPEC as a built-in inferred with `Impure` effect)
- Other environment-specific impure APIs not yet catalogued

## Expected behavior
Systematically audit and add common impure built-in functions / constructors to the catalog.

## References
- Diff report: `plugins/eslint-plugin-react-x/src/rules/purity/purity.spec.diff.md` (§4)
- Related files: catalog definitions in the rule implementation / shared constants

## Priority
P1 — low implementation cost (list maintenance), steadily improves coverage.
EOF

echo "Creating Issue 5/8..."
cat <<'EOF' | gh issue create -R "$REPO" -t '[static-components] Fix false positive when external component is wrapped by useMemo' -F -
## Background
Per `static-components.spec.diff.md`, when an external component is reassigned via a `useMemo` call (e.g. `useMemo(() => Component, [])`), `resolveDynamicValue` returns the `CallExpression` node without inspecting the callback's return value, causing the variable to be incorrectly flagged as dynamically created.

## Current behavior
```jsx
function Component() {
  const Memoized = useMemo(() => Message, []); // ❌ false positive
  return <Memoized />;
}
```

## Expected behavior
In `resolveDynamicValue`, recognize known memoization hooks (`useMemo`, `useCallback`, etc.) and trace the callback's return value instead of treating the call itself as a dynamic source.

## References
- Diff report: `plugins/eslint-plugin-react-x/src/rules/static-components/static-components.spec.diff.md` (§7 / Key Gaps #7)
- SPEC: `ValidateStaticComponents`

## Priority
P1 — medium implementation cost, high benefit (eliminates a common false positive).
EOF

echo "Creating Issue 6/8..."
cat <<'EOF' | gh issue create -R "$REPO" -t '[use-memo] Add validateNoVoidUseMemo option to allow disabling Rule 4 and 5' -F -
## Background
Per `use-memo.spec.diff.md`, React Compiler's `ValidateUseMemo.ts` provides a `validateNoVoidUseMemo` toggle that enables Rule 4 (must return a value) and Rule 5 (result must be used) only when turned on.

The current ESLint rule enforces both unconditionally.

## Current behavior
```js
// Always reported, even when the developer intentionally doesn't need the return value
useMemo(() => {
  doSideEffect();
}, []); // ❌ resultMustBeUsed
```

## Expected behavior
Add a `validateNoVoidUseMemo` option to the rule schema (default `true` for backward compatibility, or `false` to match the SPEC default) so users can opt out of Rule 4 and Rule 5.

## References
- Diff report: `plugins/eslint-plugin-react-x/src/rules/use-memo/use-memo.spec.diff.md` (§2.4 / §2.5 / §4)
- SPEC: `ValidateUseMemo.ts`

## Priority
P1 — medium implementation cost, aligns SPEC configurability.
EOF

echo "Creating Issue 7/8..."
cat <<'EOF' | gh issue create -R "$REPO" -t '[immutability] Detect mutations on for-of iterator variables from props/state' -F -
## Background
Per `immutability.spec.diff.md`, the current `immutability` rule does not detect mutations on `for-of` iterator variables, even when the iterated collection comes from props or state.

## Current behavior
```jsx
function Component({ items }) {
  for (const x of items) {
    x.modified = true; // ❌ currently missed
  }
}
```

## Expected behavior
When the right-hand side of a `for-of` (e.g. `items`) is identified as coming from props or state, treat the left-hand iterator variable (e.g. `x`) as an immutable object and flag mutations on it.

## References
- Diff report: `plugins/eslint-plugin-react-x/src/rules/immutability/immutability.spec.diff.md` (§8 / §9 Key Gaps #7)
- SPEC: `ValidateNoFreezingKnownMutableFunctions`

## Priority
P2 — medium implementation cost, covers a common indirect mutation pattern.
EOF

echo "Creating Issue 8/8..."
cat <<'EOF' | gh issue create -R "$REPO" -t '[meta] Support dual-location diagnostics to align with React Compiler reporting style' -F -
## Background
Across multiple diff reports (`immutability`, `purity`, `static-components`), React Compiler SPECs consistently provide **dual-location diagnostics**: reporting both the usage site (frozen/render context) and the source site (mutation / impure call / dynamic creation).

Current ESLint rules report only a **single location**.

## Example comparison
```jsx
// Compiler: reports both the useMemo call site and the Date.now() call site
// ESLint:   reports only the Date.now() call site
const now = Date.now();
return <div>{now}</div>;
```

## Expected behavior
Explore feasibility of dual-location reporting within ESLint architecture (using `context.report({ loc: [...], ... })`, `suggest`, or `data` fields), and pilot it in `purity` and `immutability` rules.

## Affected rules
- `purity`
- `immutability`

> **Note:** `static-components` is excluded because it already supports dual-location reporting (see `static-components.spec.diff.md` §6).

## References
- `purity.spec.diff.md` (§3)
- `immutability.spec.diff.md` (§5)
- `static-components.spec.diff.md` (§6)

## Priority
P3 — high implementation cost (architectural change), but significant UX improvement. Best suited for long-term planning.
EOF

echo "All 8 issues created successfully."

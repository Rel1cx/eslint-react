# Known Issues in eslint-plugin-react-x Rules

Reviewed 2026-11-02 against `main@df5da2a7f`; plugin `5.30.0-beta.22`, all 53 rules. Evidence comes from implementations, tests, docs, per-rule changelogs, the `*.spec.diff.md` IMPL–SPEC comparison reports of the compiler-port rules, and public issues/PRs.

**20 findings: 16 current (5 medium, 11 low), 4 resolved groups.** Two directly related open GitHub bugs: [#1760](https://github.com/Rel1cx/eslint-react/issues/1760) (`error-boundaries`) and [#1762](https://github.com/Rel1cx/eslint-react/issues/1762) (`static-components`). [#2005](https://github.com/Rel1cx/eslint-react/issues/2005), [#1924](https://github.com/Rel1cx/eslint-react/issues/1924), [#2025](https://github.com/Rel1cx/eslint-react/issues/2025), [#1763](https://github.com/Rel1cx/eslint-react/issues/1763), [#1765](https://github.com/Rel1cx/eslint-react/issues/1765), [#1674](https://github.com/Rel1cx/eslint-react/issues/1674), and [#1607](https://github.com/Rel1cx/eslint-react/issues/1607) are related feature proposals, not implementation defects.

## Current findings

### RX-001: JSX assigned to variables inside try blocks is missed

- **Severity:** Medium
- **Rules:** `error-boundaries`
- **Evidence:** [`error-boundaries.spec.diff.md`](../plugins/eslint-plugin-react-x/src/rules/error-boundaries/error-boundaries.spec.diff.md), open issue [#1760](https://github.com/Rel1cx/eslint-react/issues/1760)
- **Finding:** The rule checks JSX-like values only from collected component/hook `rets`, while React Compiler's `ValidateNoJSXInTryStatement` flags every `JsxExpression`/`JsxFragment` instruction inside a try block. `try { const el = <div />; return el; } catch {}` is a confirmed false negative and an explicit upstream compiler error case. General parity for `finally`-related control flow is also unverified.

### RX-002: External component wrapped in `useMemo` is reported

- **Severity:** Medium
- **Rules:** `static-components`
- **Evidence:** [`static-components.spec.diff.md`](../plugins/eslint-plugin-react-x/src/rules/static-components/static-components.spec.diff.md), open issue [#1762](https://github.com/Rel1cx/eslint-react/issues/1762)
- **Finding:** Any call result is treated as dynamic: `const Memoized = useMemo(() => Message, []); return <Memoized />` is a false positive because `resolveDynamicValue` stops at the `CallExpression` and never inspects the callback's returned component.

### RX-003: `use-memo` deviates from the compiler's void-useMemo rules

- **Severity:** Medium
- **Rules:** `use-memo`
- **Evidence:** [`use-memo.spec.diff.md`](../plugins/eslint-plugin-react-x/src/rules/use-memo/use-memo.spec.diff.md), feature request [#1763](https://github.com/Rel1cx/eslint-react/issues/1763)
- **Finding:** Three verified gaps: (1) the `validateNoVoidUseMemo` configuration toggle is unsupported, so Rules 4 and 5 are always enforced; (2) with `validateNoVoidUseMemo` enabled, React accepts `useMemo(() => { return; })` while the rule unconditionally reports `must-return-a-value` (a verified divergence); (3) result-use detection is a fixed immediate-parent allow-list rather than the compiler's operand-reference tracking, so either false positives or false negatives are possible for unusual result consumers.

### RX-004: Async functions passed to effects are skipped wholesale

- **Severity:** Medium (documented)
- **Rules:** `set-state-in-effect`
- **Evidence:** [Rule docs](../plugins/eslint-plugin-react-x/src/rules/set-state-in-effect/set-state-in-effect.mdx), [`set-state-in-effect.spec.diff.md`](../plugins/eslint-plugin-react-x/src/rules/set-state-in-effect/set-state-in-effect.spec.diff.md), [Rule spec](../plugins/eslint-plugin-react-x/src/rules/set-state-in-effect/set-state-in-effect.spec.ts)
- **Finding:** The body of an async function is skipped entirely, so a `set` call that runs synchronously before the first `await` (e.g. `const fetchData = async () => { setFullName(...); await ...; }; fetchData();`) is a false negative. React Compiler analyzes the synchronous prefix before the first `await`; the rule deliberately avoids a new control-flow analyzer.

### RX-005: Effect cleanup functions are not checked

- **Severity:** Low (documented)
- **Rules:** `set-state-in-effect`
- **Evidence:** [Rule docs](../plugins/eslint-plugin-react-x/src/rules/set-state-in-effect/set-state-in-effect.mdx), feature request [#2005](https://github.com/Rel1cx/eslint-react/issues/2005)
- **Finding:** `set` calls inside `useEffect` cleanup functions are never reported. The spec keeps three commented-out TODO cases for this. The diff report notes cleanup is unverified on the React side, so this is tracked as a feature gap rather than a compatibility defect.

### RX-006: Call-graph boundaries of the effect analysis

- **Severity:** Low
- **Rules:** `set-state-in-effect`
- **Evidence:** [Rule spec](../plugins/eslint-plugin-react-x/src/rules/set-state-in-effect/set-state-in-effect.spec.ts), [`set-state-in-effect.spec.diff.md`](../plugins/eslint-plugin-react-x/src/rules/set-state-in-effect/set-state-in-effect.spec.diff.md)
- **Finding:** Spec-pinned boundaries: (1) merely instantiating a generator (`gen()` without `.next()`) does not execute its body, but the call graph reports its setter as a synchronous effect update — a known false positive; (2) a setup referenced through a member expression (`useEffect(setups.main, [])`) is not resolved and is missed; (3) a hook name configured as both `additionalStateHooks` and `additionalEffectHooks` is classified as a state hook first.

### RX-007: Alias and origin folding is identifier-only

- **Severity:** Medium
- **Rules:** `immutability`
- **Evidence:** [Rule spec](../plugins/eslint-plugin-react-x/src/rules/immutability/immutability.spec.ts), [`immutability.spec.diff.md`](../plugins/eslint-plugin-react-x/src/rules/immutability/immutability.spec.diff.md)
- **Finding:** Origin resolution folds only identifier initializers, producing inconsistent false negatives: `let { error } = props` rebinding is reported, but `let { error } = props.nested` and `const p = props.nested; p.x = 1` escape detection. Function resolution is likewise limited: functions stored on object properties, returned from other calls, or returned in object literals from hooks are not resolved back to their definitions, so mutating closures passed to freeze sinks through those shapes are missed.

### RX-008: Global-mutation alias and method resolution is shallow

- **Severity:** Low
- **Rules:** `globals`
- **Evidence:** [`globals.spec.diff.md`](../plugins/eslint-plugin-react-x/src/rules/globals/globals.spec.diff.md)
- **Finding:** Documented remaining gaps relative to the SPEC: alias resolution is limited to stable direct `const` chains; mutating method effects use a fixed array-method set and computed method names are not resolved; dynamic calls and callback execution semantics are not inferred.

### RX-009: Ref render-time validation boundaries

- **Severity:** Low
- **Rules:** `refs`
- **Evidence:** [`refs.spec.diff.md`](../plugins/eslint-plugin-react-x/src/rules/refs/refs.spec.diff.md)
- **Finding:** Documented remaining gaps: the `await` boundary is not modeled, so a write after `await` inside an async function called during render is conservatively reported as a render-time write even though it runs in a microtask; the `ref`/`*Ref` naming heuristic is always enabled; ref identity is not propagated into arbitrary local function parameters; there is no full CFG/post-dominator analysis, so equivalent user-defined guard abstractions are not proven safe.

### RX-010: Impurity detection is call-site only

- **Severity:** Low
- **Rules:** `purity`
- **Evidence:** [`purity.spec.diff.md`](../plugins/eslint-plugin-react-x/src/rules/purity/purity.spec.diff.md), [Rule spec](../plugins/eslint-plugin-react-x/src/rules/purity/purity.spec.ts)
- **Finding:** The rule requires the call's immediate enclosing function to be a collected component or hook, so known-impure calls inside nested helpers are not reported. Impurity is not propagated through returned values, assignments, or control-flow merges, and computed member segments are not resolved, so a call like `window[fetch](1)` escapes detection.

### RX-011: Context value and provider detection boundaries

- **Severity:** Low
- **Rules:** `no-unstable-context-value`
- **Evidence:** [Rule spec](../plugins/eslint-plugin-react-x/src/rules/no-unstable-context-value/no-unstable-context-value.spec.ts), [Rule docs](../plugins/eslint-plugin-react-x/src/rules/no-unstable-context-value/no-unstable-context-value.mdx)
- **Finding:** Two documented false negatives: (1) in `value={useMemo(() => null, []) ?? fallback}` the stable hook branch hides the fresh `fallback` object, so no diagnostic is produced; (2) provider detection is name-based — any component whose name ends with `Context`/`CONTEXT` is treated as a provider, so a context that doesn't follow the convention (`const theme = createContext("")`) is missed. The docs recommend enabling `react-naming-convention/context-name` alongside.

### RX-012: Identical dynamic keys are not compared

- **Severity:** Low
- **Rules:** `no-duplicate-key`
- **Evidence:** [Rule spec](../plugins/eslint-plugin-react-x/src/rules/no-duplicate-key/no-duplicate-key.spec.ts)
- **Finding:** Expression containers are not unwrapped for comparison, so even identical dynamic keys (`[<div key={items.current} />, <div key={items.current} />]`) produce no duplicate diagnostic. This known limitation is spec-pinned as current behavior.

### RX-013: JSX stored in a variable inside a map callback is not checked

- **Severity:** Low
- **Rules:** `no-missing-key`
- **Evidence:** [Rule spec](../plugins/eslint-plugin-react-x/src/rules/no-missing-key/no-missing-key.spec.ts)
- **Finding:** A disabled `TODO: Fix this test case` covers a map callback that builds `const label = <div>{item.label}</div>` and returns `{ label, children }`. The case is commented out because the rule's behavior does not match the expected diagnostic; whether the rule or the test expectation should change remains unresolved.

### RX-014: Unused `ref` and `children` props are not reported

- **Severity:** Low (documented)
- **Rules:** `no-unused-props`
- **Evidence:** [Rule spec](../plugins/eslint-plugin-react-x/src/rules/no-unused-props/no-unused-props.spec.ts), [Rule docs](../plugins/eslint-plugin-react-x/src/rules/no-unused-props/no-unused-props.mdx)
- **Finding:** A destructured but unused `ref` prop is not reported (commented-out TODO case), and an unused `children` prop from `PropsWithChildren` is not reported either (two TODO-pinned cases). Additionally, by documented design, when a props type is shared by multiple components and one component's usage cannot be fully determined (e.g. it passes the whole props object away), all declared props are treated as used — a conservative false-negative bailout.

### RX-015: No direct type-variant inspection in JSX containers

- **Severity:** Low
- **Rules:** `no-leaked-conditional-rendering`
- **Evidence:** [Rule source](../plugins/eslint-plugin-react-x/src/rules/no-leaked-conditional-rendering/no-leaked-conditional-rendering.ts)
- **Finding:** A source TODO notes that directly inspecting the type variants of `node.expression` inside a JSX expression container could improve coverage but is currently unimplemented to reduce false positives. Left sides whose leaked-render risk depends on the unwrapped expression's type variants are therefore missed.

### RX-016: Component-collection blind spots in `static-components`

- **Severity:** Low
- **Rules:** `static-components`
- **Evidence:** [`static-components.spec.diff.md`](../plugins/eslint-plugin-react-x/src/rules/static-components/static-components.spec.diff.md)
- **Finding:** Two confirmed implementation blind spots with no verified upstream fixture: a nested component created inside a class-field arrow render helper (`_renderMessage = () => { const Message = () => ...; return <Message />; }`) is not reported because the helper is not a collected component boundary, and JSX member tags (`<Namespace.Bar />`) are skipped entirely because only `JSXIdentifier` names are analyzed.

## Resolved findings

### RX-101: Type- and chain-expression wrappers hid real violations

- **Rules:** `no-array-index-key`, `no-forward-ref`, `no-unstable-default-props`, `set-state-in-render`, `set-state-in-effect`, `refs`, `no-unused-props`, `use-memo`, `use-state`, `globals`, `immutability`, `unsupported-syntax`
- **Evidence:** Per-rule changelogs
- **Resolution:** Systematically fixed by unwrapping type expressions and chain expressions before inspecting AST node types (#1732, #1717). Previously `(this.state as any).foo = 1`-style wrappers caused false negatives across a dozen rules.

### RX-102: Ref and router false positives in `immutability`

- **Rules:** `immutability`
- **Evidence:** [Rule changelog](../plugins/eslint-plugin-react-x/src/rules/immutability/CHANGELOG.md)
- **Resolution:** Mutating `.current` on a `useRef()`-initialized variable that doesn't follow the `ref`/`*Ref` naming convention is no longer flagged (#1893); mutations of `RefObject<T>` values received as props are no longer flagged (#1751); Next.js `useRouter().push()` calls inside frozen callbacks are no longer treated as in-place mutations, including through variable-declarator aliases.

### RX-103: Key detection false positives and negatives

- **Rules:** `no-missing-key`, `no-duplicate-key`
- **Evidence:** [`no-missing-key` changelog](../plugins/eslint-plugin-react-x/src/rules/no-missing-key/CHANGELOG.md), [`no-duplicate-key` changelog](../plugins/eslint-plugin-react-x/src/rules/no-duplicate-key/CHANGELOG.md)
- **Resolution:** A computed identifier key in spread props (`{...{ [key]: item.id }}`) no longer suppresses the missing-key report; nested `Children.toArray()` tracking uses depth counting instead of a boolean; conditional/logical returns from block-bodied `.map`/`Array.from` callbacks are detected (#1766); non-map calls are no longer misdetected as map calls (#1412). Duplicate-key detection now covers `.flatMap()`/`Array.from()` callbacks, and variable keys (#746) and SVG `xlink` attributes no longer cause false positives.

### RX-104: Other false positives and unsafe autofixes

- **Rules:** `no-context-provider`, `no-forward-ref`, `no-use-context`, `error-boundaries`, `no-nested-component-definitions`, `no-class-component`, `no-array-index-key`, `no-leaked-conditional-rendering`, `use-memo`, `no-direct-mutation-state`, `no-unused-props`, `no-unnecessary-use-prefix`, `no-misused-capture-owner-stack`, `no-missing-context-display-name`, `no-create-ref`, `rules-of-hooks`, `no-unstable-default-props`, `no-nested-lazy-component-declarations`
- **Evidence:** Per-rule changelogs
- **Resolution:** Includes: third-party `Provider` components no longer flagged (#991); autofixes in `no-context-provider`, `no-forward-ref`, and `no-use-context` converted to suggestions after unsafe rewrite bugs (#984, #925, #932, #933, #1560, #1561); `error-boundaries` false positives on non-React code fixed (#1690, #1615); `useCallback`-wrapped nested components reported again (#1927); `getDerivedStateFromError` no longer warned (#531); `foo.bar.map` no longer mistaken for `React.Children.map` (#860); `use-memo` false positives fixed via reference/definition analysis (#1735, #1611); nested `this.state.foo` mutations detected; `Omit` on union props (#1578) and anonymous-callback (#1602) false positives fixed; case-insensitive hook-name detection fixed (#1053); `(process.env as any).NODE_ENV` recognized (#1813); multi-declarator autofix no longer produces invalid syntax; the incorrect `FIX` feature declaration removed from `rules-of-hooks` (#2009); `no-leaked-conditional-rendering` false negatives for empty strings (#853), object left-hand types (#568), and type-expression wrappers (#1068) fixed; `no-unstable-default-props` false negatives for logical/conditional default values fixed; same-kind errors in one component are no longer reported only once (`no-create-ref`); the rule name/message-ID key mismatch fixed (`no-nested-lazy-component-declarations`).

## Boundaries

- The compiler-port rules `globals`, `immutability`, `purity`, and `refs` carry a blanket documented caveat: they are experimental and may contain false positives or negatives that have not yet been fully audited; `no-duplicate-key`, `set-state-in-render`, `static-components`, `no-implicit-key`, `no-implicit-ref`, `no-implicit-children`, `no-misused-capture-owner-stack`, `no-unused-state`, and `no-unused-props` are marked experimental and may change or be removed. These are policy statements, not separate defects.
- `exhaustive-deps` and `rules-of-hooks` are verbatim ports of `eslint-plugin-react-hooks` (see the `exhaustive-deps` README: do not edit manually, re-port from upstream). Their inherited TODOs — optional chaining of dependency suggestions, gathering deps for unresolvable values, suggestion quality — are upstream concerns; [#1674](https://github.com/Rel1cx/eslint-react/issues/1674) (known static properties) is a feature proposal on top.
- Deliberate scoping decisions are not defects: `no-missing-component-display-name`/`no-missing-context-display-name` only target `memo`/`forwardRef`-wrapped components and intentionally skip immediately-invoked curried HOC arrows; `set-state-in-effect` does not report `setState` calls in dependency arrays (they run during render and belong to `set-state-in-render`); `use-state` treats a hole in the setter position (`const [state, , third] = ...`) as a missing setter; `no-unused-props` bails out conservatively on unanalyzable components and array-pattern parameters.
- Performance fast paths shape coverage: `set-state-in-effect` only analyzes files whose source text contains a `use…Effect` name, so an `additionalEffectHooks` pattern without the `Effect` suffix is inert in files that never mention a `use…Effect` hook (documented); `no-leaked-conditional-rendering` skips files without `&&`.
- Historical issues #95, #531, #568, #746, #853, #857, #860, #868, #896, #925, #932, #933, #984, #985, #991, #992, #1053, #1054, #1068, #1172, #1173, #1412, #1413, #1560, #1561, #1578, #1593, #1602, #1611, #1612, #1615, #1690, #1693, #1717, #1732, #1735, #1751, #1766, #1813, #1893, #1927, and #2009 are excluded and retained as regression concerns. (#879 and #1128 added features rather than fixing defects and are not listed.)

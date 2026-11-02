# Known Issues in eslint-plugin-react-dom Rules

Reviewed 2026-11-02 against `main@27c72f5e0` (the 2026-11-01 working-tree fixes landed as #2103); plugin `5.30.0-beta.21`, all 16 rules. Evidence comes from implementations, tests, docs, changelogs, and public issues/PRs. Nine temporary RuleTester cases confirmed the source-review findings and were removed after the run.

**17 findings: 12 current (7 medium, 5 low), 5 resolved.** No directly related open GitHub bug was found. [#1739](https://github.com/Rel1cx/eslint-react/issues/1739) is a related feature proposal, not an implementation defect.

## Current findings

### DOM-002: Duplicate imports and binding capture

- **Severity:** Medium
- **Rules:** `no-render`, `no-hydrate`, `no-use-form-state`
- **Evidence:** [`no-render` source](../plugins/eslint-plugin-react-dom/src/rules/no-render/no-render.ts), [`no-hydrate` source](../plugins/eslint-plugin-react-dom/src/rules/no-hydrate/no-hydrate.ts), [`no-use-form-state` source](../plugins/eslint-plugin-react-dom/src/rules/no-use-form-state/no-use-form-state.ts)
- **Finding:** All three fixes unconditionally insert a `createRoot`, `hydrateRoot`, or `useActionState` import at the start of the file without checking existing imports or bindings. An existing target API import produces a duplicate import/declaration; a same-named local binding can also be captured. The insertion is at offset 0 (`insertTextBefore(context.sourceCode.ast, …)`), so it also lands ahead of any directive prologue: in a `"use client"` module the directive is demoted to a plain string expression and silently loses its effect.

### DOM-003: Incomplete return-value usage detection

- **Severity:** Medium
- **Rules:** `no-render-return-value`
- **Evidence:** [Rule spec](../plugins/eslint-plugin-react-dom/src/rules/no-render-return-value/no-render-return-value.spec.ts)
- **Finding:** Return-value use is recognized through only five direct parent types. Call arguments, array elements, member access, logical/conditional expressions, comparisons, and `await` are accepted, so cases such as `consume(ReactDOM.render(...))` and `ReactDOM.render(...).focus()` are false negatives.

### DOM-004: Name-based callee matching

- **Severity:** Medium
- **Rules:** `no-find-dom-node`, `no-flush-sync`, `no-hydrate`, `no-render`, `no-render-return-value`, `no-use-form-state`
- **Evidence:** [`is-react-dom-call`](../plugins/eslint-plugin-react-dom/src/utils/is-react-dom-call.ts), [`create-import-lookup`](../packages/var/src/create-import-lookup.ts)
- **Finding:** Imported callees are matched by name rather than by the binding at the call site, causing false positives on shadowing parameters/variables. Only ESM imports are indexed; CommonJS, post-import aliases, and computed member access (including static `ReactDOM["render"]`) are false negatives. One name-coincidence exception: `no-render`, `no-render-return-value`, and `no-find-dom-node` pre-register `ReactDOM` (and `React` for `no-find-dom-node`) as builtin namespaces, so `const ReactDOM = require("react-dom"); ReactDOM.render(...)` still matches. `no-find-dom-node` also intentionally matches an unimported global `findDOMNode()`, which can catch an unrelated same-named function.

### DOM-005: Spread attributes are ignored

- **Severity:** Medium
- **Rules:** `no-dangerously-set-innerhtml`, `no-dangerously-set-innerhtml-with-children`, `no-script-url`, `no-string-style-prop`, `no-unsafe-iframe-sandbox`, `no-unsafe-target-blank`, `no-void-elements-with-children`
- **Evidence:** [`no-dangerously-set-innerhtml` spec](../plugins/eslint-plugin-react-dom/src/rules/no-dangerously-set-innerhtml/no-dangerously-set-innerhtml.spec.ts), [`no-script-url` spec](../plugins/eslint-plugin-react-dom/src/rules/no-script-url/no-script-url.spec.ts), [`no-unsafe-target-blank` spec](../plugins/eslint-plugin-react-dom/src/rules/no-unsafe-target-blank/no-unsafe-target-blank.spec.ts)
- **Finding:** These JSX rules inspect only direct attributes and ignore even static inline-object spreads. For example, `<a {...{ href: "https://example.com", target: "_blank" }}>` and `<img {...{ children: "x" }}>` are false negatives.

### DOM-006: Spread handling breaks missing-attribute checks

- **Severity:** Medium
- **Rules:** `no-missing-button-type`, `no-missing-iframe-sandbox`
- **Evidence:** [`no-missing-button-type` spec](../plugins/eslint-plugin-react-dom/src/rules/no-missing-button-type/no-missing-button-type.spec.ts), [`no-missing-iframe-sandbox` spec](../plugins/eslint-plugin-react-dom/src/rules/no-missing-iframe-sandbox/no-missing-iframe-sandbox.spec.ts)
- **Finding:** `type`/`sandbox` supplied through a spread is treated as missing; even `<button {...{ type: "button" }}>` is reported. The suggestion inserts immediately after the tag name, before the spread, so the suggested value can still be overridden and does not guarantee an effective explicit attribute.

### DOM-007: Dynamic sandbox values are rejected

- **Severity:** Medium (policy)
- **Rules:** `no-missing-iframe-sandbox`
- **Evidence:** [Rule spec](../plugins/eslint-plugin-react-dom/src/rules/no-missing-iframe-sandbox/no-missing-iframe-sandbox.spec.ts)
- **Finding:** The implementation requires a static-string `sandbox`, not merely the explicit attribute described by the docs. Variables that cannot be statically resolved, function results, and interpolated templates are reported even when valid at runtime; a `const` initialized to a static value is resolved through `getStaticValue` and accepted. The suggestion replaces the expression with `sandbox=""`, potentially removing permissions the iframe needs; this migration requires manual review.

### DOM-008: Limited polymorphic element resolution

- **Severity:** Low
- **Rules:** `no-missing-button-type`, `no-missing-iframe-sandbox`, `no-unsafe-iframe-sandbox`, `no-unsafe-target-blank`, `no-void-elements-with-children`
- **Evidence:** [`create-jsx-element-resolver` spec](../plugins/eslint-plugin-react-dom/src/utils/create-jsx-element-resolver.spec.ts)
- **Finding:** The shared polymorphic resolver supports only a direct static-string polymorphic prop. Spread-provided `as`, conditional values, and component references are unresolved; member components such as `<motion.iframe>` without that prop are also ignored.

### DOM-009: `rel` tokens are matched by word boundaries

- **Severity:** Medium
- **Rules:** `no-unsafe-target-blank`
- **Evidence:** [Rule helper](../plugins/eslint-plugin-react-dom/src/rules/no-unsafe-target-blank/lib.ts)
- **Finding:** `rel` is checked with `\bnoreferrer\b`/`\bnoopener\b` instead of whitespace-token parsing. The unknown token `noreferrer-extra` (and `noopener-extra` with `allowReferrer`) is incorrectly accepted as safe, causing a security-relevant false negative.

### DOM-010: `rel` suggestions discard existing tokens

- **Severity:** Low
- **Rules:** `no-unsafe-target-blank`
- **Evidence:** [Rule spec](../plugins/eslint-plugin-react-dom/src/rules/no-unsafe-target-blank/no-unsafe-target-blank.spec.ts)
- **Finding:** The suggestion for an unsafe `rel` replaces the whole attribute instead of adding the required token. For example, `rel="nofollow"` becomes `rel="noreferrer"`, dropping the existing `nofollow` semantics.

### DOM-011: `sandbox` tokens are matched by substring

- **Severity:** Low
- **Rules:** `no-unsafe-iframe-sandbox`
- **Evidence:** [Rule source](../plugins/eslint-plugin-react-dom/src/rules/no-unsafe-iframe-sandbox/no-unsafe-iframe-sandbox.ts)
- **Finding:** `sandbox` permissions are found by substring `includes`, not token parsing. `sandbox="not-allow-scripts not-allow-same-origin"` grants neither permission but is still reported.

### DOM-012: Legitimate `flushSync` uses are reported

- **Severity:** Low (documented)
- **Rules:** `no-flush-sync`
- **Evidence:** [Rule docs](../plugins/eslint-plugin-react-dom/src/rules/no-flush-sync/no-flush-sync.mdx)
- **Finding:** Legitimate uses that require synchronous DOM updates, including `beforeprint` and `startViewTransition`, are still reported. The docs explicitly recommend a line-level `eslint-disable`; this is an intentionally conservative policy.

### DOM-013: Child content is counted syntactically

- **Severity:** Low
- **Rules:** `no-dangerously-set-innerhtml-with-children`, `no-void-elements-with-children`
- **Evidence:** [`is-child-content`](../plugins/eslint-plugin-react-dom/src/utils/is-child-content.ts), [`no-void-elements-with-children` spec](../plugins/eslint-plugin-react-dom/src/rules/no-void-elements-with-children/no-void-elements-with-children.spec.ts)
- **Finding:** Child content is counted syntactically rather than by rendered output. Both rules treat `{null}`, `{false}`, and `{""}` as content, which may conflict with expectations based on what actually renders.

## Resolved findings

### DOM-001: Unsafe legacy API autofixes

- **Rules:** `no-render`, `no-hydrate`
- **Evidence:** [`no-render` spec](../plugins/eslint-plugin-react-dom/src/rules/no-render/no-render.spec.ts), [`no-hydrate` spec](../plugins/eslint-plugin-react-dom/src/rules/no-hydrate/no-hydrate.spec.ts)
- **Resolution:** Autofixes are now limited to standalone expression statements with exactly two non-spread arguments. Calls with additional callbacks, consumed return values, or spread arguments are still reported but require manual migration.

### DOM-014: Safe `rel` suggestion placement

- **Rules:** `no-unsafe-target-blank`
- **Evidence:** [Rule source](../plugins/eslint-plugin-react-dom/src/rules/no-unsafe-target-blank/no-unsafe-target-blank.ts)
- **Resolution:** When `rel` is missing, the suggestion is now inserted after the last attribute so a trailing spread cannot override it. The two rules in DOM-006 still have the analogous problem.

### DOM-015: Import-aware `flushSync` detection

- **Rules:** `no-flush-sync`
- **Evidence:** [Rule changelog](../plugins/eslint-plugin-react-dom/src/rules/no-flush-sync/CHANGELOG.md)
- **Resolution:** Only `flushSync` actually imported from `react-dom` is reported, avoiding false positives on unrelated same-named functions (#1943, #1954). Shadowing in DOM-004 remains current.

### DOM-016: `renderingIntent` is recognized

- **Rules:** `no-unknown-property`
- **Evidence:** [Rule changelog](../plugins/eslint-plugin-react-dom/src/rules/no-unknown-property/CHANGELOG.md)
- **Resolution:** React's camelCase SVG prop `renderingIntent` is no longer reported, including after the autofix for `rendering-intent`.

### DOM-017: Fragment-valued `sandbox` is reported

- **Rules:** `no-missing-iframe-sandbox`
- **Evidence:** [Rule changelog](../plugins/eslint-plugin-react-dom/src/rules/no-missing-iframe-sandbox/CHANGELOG.md)
- **Resolution:** A parser-tolerated fragment in the value position, `sandbox=<></>`, is no longer silently skipped and is reported as a non-static string value (#2048).

## Boundaries and next steps

- Dynamic-value analysis remains a general boundary: `no-script-url`, `no-string-style-prop`, `no-unsafe-iframe-sandbox`, and `no-unsafe-target-blank` skip conditionals, function results, and interpolated templates that cannot be statically evaluated. `no-missing-button-type` checks only whether a direct `type` attribute exists and deliberately accepts values such as `type={undefined}`.
- `no-string-style-prop` checks host elements only and does not use the polymorphic resolver. `no-unknown-property` checks lowercase standard HTML/SVG tags only, skipping React components, member components, and customized built-ins with `is`. These are current coverage boundaries, not separate defects.
- [#1739](https://github.com/Rel1cx/eslint-react/issues/1739) proposes banning product-code construction of `__html` objects while allowing sanitized objects to be received. This is a new-rule request with a different policy from the existing blanket `no-dangerously-set-innerhtml` ban.
- Prioritize DOM-002 to prevent `--fix` from generating invalid code. Next address the false negatives in DOM-003/005/009 and the false positives and unsafe suggestions in DOM-006/007. Shared import matching, JSX attribute resolution, and polymorphic resolution are the natural places for cross-rule fixes.
- Historical issues #700, #1163, #1247, #1262, #1789, #1802, #1943, #1954, and #2048, plus recent computed-key and member-component polymorphic fixes, are excluded and retained as regression concerns.

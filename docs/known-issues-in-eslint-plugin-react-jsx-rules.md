# Known Issues in eslint-plugin-react-jsx Rules

Reviewed 2026-11-02 against `main@27c72f5e0` (the 2026-10-31 working-tree fixes landed as #2102); plugin `5.30.0-beta.21`, all 8 rules. Evidence comes from implementations, tests, docs, changelogs, and public issues/PRs.

**10 findings: 8 current (3 medium, 5 low), 2 resolved.** No directly related open GitHub issue was found. Each finding lists its affected rules and primary evidence.

## Current findings

### JSX-002: Spread and variable props are missed

- **Severity:** Medium
- **Rules:** `no-children-prop`, `no-children-prop-with-children`
- **Evidence:** [`no-children-prop` spec](../plugins/eslint-plugin-react-jsx/src/rules/no-children-prop/no-children-prop.spec.ts), [`no-children-prop-with-children` spec](../plugins/eslint-plugin-react-jsx/src/rules/no-children-prop-with-children/no-children-prop-with-children.spec.ts)
- **Finding:** Only direct props are inspected; spread and variable props cause false negatives.

### JSX-003: Spread policy differs by compiler

- **Severity:** Medium (policy)
- **Rules:** `no-key-after-spread`
- **Evidence:** [Rule spec](../plugins/eslint-plugin-react-jsx/src/rules/no-key-after-spread/no-key-after-spread.spec.ts)
- **Finding:** TypeScript uses `_jsx` for inline object spreads without nested spreads, but Babel falls back to `createElement`; reporting all trailing spreads is correct for Babel but conservative for TypeScript.

### JSX-005: Any spread exempts a Fragment

- **Severity:** Medium
- **Rules:** `no-useless-fragment`
- **Evidence:** [Rule source](../plugins/eslint-plugin-react-jsx/src/rules/no-useless-fragment/no-useless-fragment.ts)
- **Finding:** Every spread exempts a Fragment, even a static object without `key`/`ref`.

### JSX-006: Child counting is syntactic

- **Severity:** Low
- **Rules:** `no-useless-fragment`
- **Evidence:** [Rule source](../plugins/eslint-plugin-react-jsx/src/rules/no-useless-fragment/no-useless-fragment.ts)
- **Finding:** `{null}` and `{cond && ...}` count as children even when rendering nothing.

### JSX-007: `allowEmptyFragment` has a host-element exception

- **Severity:** Low
- **Rules:** `no-useless-fragment`
- **Evidence:** [Rule spec](../plugins/eslint-plugin-react-jsx/src/rules/no-useless-fragment/no-useless-fragment.spec.ts)
- **Finding:** `allowEmptyFragment` suppresses only the child-count reason, not the independent host-element reason; docs need this exception.

### JSX-008: Duplicate Fragment diagnostics share a fix

- **Severity:** Low
- **Rules:** `no-useless-fragment`
- **Evidence:** [Rule spec](../plugins/eslint-plugin-react-jsx/src/rules/no-useless-fragment/no-useless-fragment.spec.ts)
- **Finding:** One Fragment can receive host-element and child-count diagnostics with the same fix; these reports should be combined.

### JSX-009: Intentional comment-like text is reported

- **Severity:** Low (documented)
- **Rules:** `no-comment-textnodes`
- **Evidence:** [Rule docs](../plugins/eslint-plugin-react-jsx/src/rules/no-comment-textnodes/no-comment-textnodes.mdx)
- **Finding:** Comment-like intentional text such as `//server/share` is reported; use `{"//server/share"}`. Detection is unchanged to avoid new false negatives.

### JSX-010: Currency text with expressions is reported

- **Severity:** Low (documented)
- **Rules:** `no-leaked-dollar`
- **Evidence:** [Rule docs](../plugins/eslint-plugin-react-jsx/src/rules/no-leaked-dollar/no-leaked-dollar.mdx)
- **Finding:** Isolated `${expr}` is allowed but currency text with other content is reported; use `{"$"}{expr}`. Detection is unchanged because intent is ambiguous.

## Resolved findings

### JSX-001: Spread precedence is preserved

- **Rules:** `no-children-prop`
- **Evidence:** [Rule source](../plugins/eslint-plugin-react-jsx/src/rules/no-children-prop/no-children-prop.ts)
- **Resolution:** Suggestions are suppressed when a spread follows `children`, preserving prop precedence.

### JSX-004: Same-line semicolons are detected

- **Rules:** `no-leaked-semicolon`
- **Evidence:** [Rule source](../plugins/eslint-plugin-react-jsx/src/rules/no-leaked-semicolon/no-leaked-semicolon.ts)
- **Resolution:** Same-line semicolons after a JSX child and before the closing tag are detected; standalone text and semicolons between children remain allowed.

## Boundaries and next steps

- Additional boundaries: `$` must be raw and adjacent to an expression; comment checks apply only at text-node starts; consecutive-semicolon suggestions remove one at a time; unsafe Fragment fixes are withheld; `no-namespace` checks element names only.
- Resolve JSX-003 by choosing a cross-compiler or compiler-specific policy. Consider limited static inline-object evaluation for JSX-002/005. Clarify JSX-006/007 and merge duplicate reports for JSX-008.
- Historical fixes (#1805, #2044, #2045, #1381, #1567, #1035, #850) are excluded and retained as regression concerns.

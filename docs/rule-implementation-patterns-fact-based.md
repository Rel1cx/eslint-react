# Rule Implementation Patterns Fact-Based

## What Is a Fact-Based Rule?

A fact-based rule cannot decide whether code is a violation from a single AST node — the verdict depends on correlating evidence gathered at distant sites in the file (e.g. a mutation is only a violation when the mutated binding originates from props or state). Instead of reporting directly from visitors, the rule splits the work into a pipeline: collect raw facts during traversal, resolve what each fact refers to (origins), infer typed effects from facts + origins, and report in one place at `Program:exit`. Used by `globals`, `immutability`, and `refs`.

## Directory Structure

```
src/rules/<rule-name>/
├── <rule-name>.ts       # Thin rule: wire collectors, orchestrate Program:exit, report
├── collect.ts           # Fact collector: createXCollector() -> { facts, visitor }
├── origins.ts           # Provenance: resolve facts to the bindings they refer to
├── effects.ts           # Inference: facts + origins -> typed violation/effect objects
├── lib.ts               # Pure AST helpers (no RuleContext, no rule state)
└── <rule-name>.spec.ts  # Tests
```

Only the pattern-specific files are shown; every rule directory also contains the standard `<rule-name>.mdx`, `CHANGELOG.md`, `<rule-name>.spec.md`, and `<rule-name>.spec.diff.md` files.

Add a layer only when the rule file would otherwise own that responsibility. `immutability` uses all four; `globals` needs no resolver state beyond two pure functions in `origins.ts`.

## Layer Responsibilities

### `collect.ts` — facts, no interpretation

`createXCollector()` returns `{ facts, visitor }`. Facts are plain data: AST nodes, source positions, and the `enclosingFunction` captured eagerly at visit time (`Traverse.findParent(node, Check.isFunction)`), so inference never re-walks ancestors. The collector performs only the syntactic classification needed to route a node into the right fact list.

### `origins.ts` — provenance

Answers "what does this identifier/member actually refer to?": global-or-module bindings (`globals`), props/state/shallow-copies/iterators (`immutability`), or ref-holding and callable variables (`refs`). Resolvers are keyed by ESLint `Variable`, not source names, so shadowed identifiers and sibling components cannot contaminate each other. May be a pure function (`immutability`'s `classifyFrozenOrigin`) or a stateful `createXResolver(context, facts)` that pre-builds lookup maps (`refs`'s `createBindingResolver`).

### `effects.ts` — inference, no reporting

Functions that turn facts into typed effect/violation objects (usually with a `kind` discriminant; `immutability` instead keeps its `kind` discriminants on the origin types in `origins.ts`). They take `RuleContext` where scope lookups are needed, but they never call `context.report`; they return data and let the rule file report, which keeps inference testable and makes multi-site reporting a rule-file concern.

### `<rule-name>.ts` — orchestration and reporting

The rule file merges the `@eslint-react/core` collectors with the rule's own, runs the pipeline in `Program:exit`, and reports.

## When to Use This Pattern

Reach for this pattern when a rule meets most of the following:

- The violation depends on **provenance**: where a binding came from matters as much as what happens to it (props/state origins, global-or-module bindings, ref-holding variables).
- Evidence must be **correlated across distant sites** — declarations, assignments, and uses that simple ancestor walks cannot connect.
- Reporting happens at **multiple sites** for one logical violation, so keeping `context.report` out of the inference layer avoids scattered, duplicated report logic.
- The inference logic is complex enough to deserve **isolated unit tests** against plain data (facts in, effects out).

Do not use it for rules where a single visitor with local state (term-based fast path) or one `@eslint-react/core` collector suffices — the extra layers only earn their keep when interpretation would otherwise tangle with traversal.

# Rule Implementation Patterns Fact-Based

How complex `react-x` rules separate fact collection, provenance resolution, and effect inference into layered modules.

Related: [`rule-implementation-patterns.md`](./rule-implementation-patterns.md) for the general anatomy of a rule file, [`rule-implementation-patterns-term-based.md`](./rule-implementation-patterns-term-based.md) for text prechecks.

## What Is a Fact-Based Rule?

TODO.

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

Add a layer only when the rule file would otherwise own that responsibility. `immutability` uses all four; `globals` needs no resolver state beyond two pure functions in `origins.ts`.

## Layer Responsibilities

### `collect.ts` — facts, no interpretation

`createXCollector()` returns `{ facts, visitor }`. Facts are plain data: AST nodes, source positions, and the `enclosingFunction` captured eagerly at visit time (`Traverse.findParent(node, Check.isFunction)`), so inference never re-walks ancestors. The collector performs only the syntactic classification needed to route a node into the right fact list (helpers like `getRefAccess` live in `lib.ts`).

### `origins.ts` — provenance

Answers "what does this identifier/member actually refer to?": global-or-module bindings (`globals`), props/state/shallow-copies/iterators (`immutability`), or ref-holding and callable variables (`refs`). Resolvers are keyed by ESLint `Variable`, not source names, so shadowed identifiers and sibling components cannot contaminate each other. May be a pure function (`immutability`'s `classifyFrozenOrigin`) or a stateful `createXResolver(context, facts)` that pre-builds lookup maps (`refs`'s `createBindingResolver`).

### `effects.ts` — inference, no reporting

Pure functions that turn facts into typed effect/violation objects with a `kind` discriminant. They never call `context.report`; they return data and let the rule file report, which keeps inference testable and makes multi-site reporting a rule-file concern.

### `<rule-name>.ts` — orchestration and reporting

The rule file merges the `@eslint-react/core` collectors with the rule's own, runs the pipeline in `Program:exit`, and reports.

## When to Use This Pattern

TODO.

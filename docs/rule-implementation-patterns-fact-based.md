# Rule Implementation Patterns Fact-Based

## What Is a Fact-Based Rule?

A fact-based rule cannot decide whether code is a violation from a single AST node — the verdict depends on correlating evidence gathered at distant sites in the file (e.g. a mutation is only a violation when the mutated binding originates from props or state). Instead of reporting directly from visitors, the rule splits the work into a pipeline: collect raw facts during traversal, resolve what each fact refers to (origins), infer typed effects from facts + origins, and report in one place at `Program:exit`. Used by `globals`, `immutability`, `refs`, `set-state-in-effect`, `set-state-in-render`, `static-components`, and `use-memo`.

Core ideas:

- **Diagnostics as data** — inference returns typed effect objects (often a `kind`-tagged union) instead of calling `context.report`; the rule file then reports them exhaustively in one place.
- **Resolve origins once, reuse everywhere** — _parse, don't validate_: what each fact refers to is resolved once up front and turned into typed origin data, so downstream inference consumes that resolution instead of re-deriving it at every use site.
- **Defer interpretation past traversal** — collectors only classify syntax during the walk; all semantic judgment happens afterward on plain data provenanced by resolved origins, so each layer can be read and unit-tested in isolation.

## Directory Structure

```
src/rules/<rule-name>/
├── <rule-name>.ts       # Thin rule: wire collectors, orchestrate Program:exit, report
├── collect.ts           # Fact collector: createXCollector() -> { facts, visitor }
├── origins.ts           # Provenance: resolve what each fact refers to, once per referent
├── effects.ts           # Inference: facts + origins -> typed violation/effect objects
├── helpers.ts           # Pure helpers (no rule state; usually no RuleContext either)
└── <rule-name>.spec.ts  # Tests
```

Only the pattern-specific files are shown; every rule directory also contains the standard `<rule-name>.mdx`, `CHANGELOG.md`, and `<rule-name>.spec.ts` files. Fact-based rules (and a few other complex rules) additionally carry `<rule-name>.spec.md` and `<rule-name>.spec.diff.md` snapshots, and some add unit tests for individual layers (`collect.test.ts`, `effects.test.ts`, ...) — see Testing Each Layer in Isolation below.

Add a layer only when the rule file would otherwise own that responsibility — some rules use all four layers, others stay minimal and defer judgments to later layers instead of capturing more up front.

Dependencies point one way only — `<rule-name>.ts` → `effects.ts` → `origins.ts` → `collect.ts` → `helpers.ts`, no cyclic or backward imports (enforced by the `react-x/factBasedLayerOrder` tsl rule) — so each layer builds only on an earlier pipeline stage and data flows strictly forward: facts → resolved origins → effects → the rule file's report pass, with nothing leaking back into traversal.

## Layer Responsibilities

### `collect.ts` — facts, no interpretation

`createXCollector()` returns `{ facts, visitor }`. Facts are plain data: AST nodes, source positions, and — where inference needs it — the `enclosingFunction` captured eagerly at visit time (via `Traverse.findParent(node, Check.isFunction)` or a function stack maintained by the visitor), so inference never re-walks ancestors. The collector performs only the syntactic classification needed to route a node into the right fact list.

### `origins.ts` — provenance

Answers "what does this identifier/member actually refer to?" — e.g. global-or-module bindings, props/state/shallow-copies/iterators, or ref-holding and callable variables. Each referent is resolved once, and every fact mentioning it shares that result; resolution is keyed by binding identity from scope analysis, not source names, so shadowed identifiers and sibling components cannot contaminate each other. May be a set of pure functions with `context` passed in as a parameter, or a stateful `createXResolver(context, facts)` that pre-builds lookup maps.

### `effects.ts` — inference, no reporting

Functions that turn facts into typed effect/violation objects, usually a `kind`-tagged union whose kinds may align directly with the rule's message IDs. They consume what origins already decided rather than re-deriving it, and never call `context.report`; they return data and let the rule file report, which keeps inference testable and makes multi-site reporting a rule-file concern. The layer can even stay free of `RuleContext` entirely when callers inject what it needs as parameters.

### `<rule-name>.ts` — orchestration and reporting

The rule file merges the rule's own collector (plus `@eslint-react/core` collectors where the rule needs them), runs the pipeline in `Program:exit`, and reports — typically ending in an exhaustive match over the effect kinds.

These layer responsibilities are guidelines, not contracts — a rule using this pattern may reinterpret them when a better fit exists. Split responsibilities where it clarifies the rule, not where the template says to.

## Testing Each Layer in Isolation

Because every stage is a plain function with data in and data out, no stage needs the rule itself (or `RuleTester`) to be exercised — each layer can be driven directly against a code snippet, with `@local/testkit` supplying the harness (`immutability` carries one `*.test.ts` per layer as the reference example):

- **`collect.ts`** — `runCollector(code, () => { const collector = createFactCollector(); return { api: collector.facts, visitor: collector.visitor }; }, (facts) => facts)` runs the collector's visitor through a real `Linter` and hands back the facts. Tests summarize them into plain shapes (kind, root name, source text via `getTextOf`) and assert with `toEqual`, so a collection regression surfaces as a diff on data, not as a missing downstream diagnostic.
- **`origins.ts`** — `runInRule(code, (context, program) => ...)` yields a real `RuleContext` (scope manager included); tests locate the variable under scrutiny (via `findIdentifierReferences` + `findVariable`), call the resolver, and assert on the returned origin object. Because origin functions take `context` as a parameter instead of closing over rule state, they are callable from any test.
- **`effects.ts`** — tests compose the layers: run the real collector with `runCollector`, capture the context, then call `inferX(context, facts.mutations, components)` and assert on the returned effect objects. Inference stays data-in/data-out, so each inference branch can be driven by exactly the facts meant to trigger it.
- **`helpers.ts`** — pure helpers get plain unit tests; node-shaped inputs are fabricated with `getFirstExpression` / `getFirstNodeOfType` without a linter at all.

The one-way dependency direction is what makes this practical: a layer's test only imports that layer and the ones before it, so a failing test localizes the bug to the stage under test instead of anywhere in the pipeline. The rule's `<rule-name>.spec.ts` then only needs to cover integration concerns like wiring, message mapping, and report sites, rather than re-deriving every edge case through full diagnostics.

## When to Use This Pattern

Reach for this pattern when a rule meets most of the following:

- The violation depends on **provenance**: where a binding came from matters as much as what happens to it (props/state origins, global-or-module bindings, ref-holding variables).
- Evidence must be **correlated across distant sites** — declarations, assignments, and uses that simple ancestor walks cannot connect.
- Reporting happens at **multiple sites** for one logical violation, so keeping `context.report` out of the inference layer avoids scattered, duplicated report logic.
- The inference logic is complex enough to deserve **isolated unit tests** against plain data (facts in, effects out).

Do not use it for rules where a single visitor with local state (term-based fast path) or one `@eslint-react/core` collector suffices — the extra layers only earn their keep when interpretation would otherwise tangle with traversal.

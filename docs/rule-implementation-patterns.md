# Rule Implementation Patterns

The general anatomy of an ESLint rule in this repo. For specialized implementations, see [`rule-implementation-patterns-term-based.md`](./rule-implementation-patterns-term-based.md) (text prechecks and version gating) and [`rule-implementation-patterns-fact-based.md`](./rule-implementation-patterns-fact-based.md) (collect → resolve → infer → report pipelines).

## Directory Structure

Every rule lives in its own directory under a domain plugin:

```
plugins/eslint-plugin-react-<domain>/src/rules/<rule-name>/
├── <rule-name>.ts       # The rule
├── <rule-name>.spec.ts  # Tests
├── <rule-name>.mdx      # Documentation page
├── CHANGELOG.md         # Rule-specific changelog
└── lib.ts               # Optional helpers for complex rules
```

Many rules keep shared helpers in a `lib.ts` next to the rule file (e.g. `use-state`, `no-array-index-key`, `rules-of-hooks`). Fact-based rules go further and add pattern-specific layers (`collect.ts`, `origins.ts`, ...; see the fact-based doc). Rules ported from `eslint-plugin-react-hooks` may additionally carry `<rule-name>.spec.md` and `<rule-name>.spec.diff.md` files (and, for `exhaustive-deps` / `rules-of-hooks`, a `README.md` and `LICENSE`).

`scripts/90-scaffold-rule.ts` generates the rule, spec, and mdx files and registers the rule in the plugin's `src/plugin.ts`; `scripts/20-check-rules.ts` (run via `node --run check:rules`) validates registration, presets, and docs badges against this layout.

## Rule File Skeleton

```ts
import { createRule } from "@/utils/create-rule";
import { type RuleContext, type RuleFeature, type RuleListener } from "@eslint-react/eslint";

export const RULE_NAME = "no-forward-ref";

export const RULE_FEATURES = ["MOD"] as const satisfies RuleFeature[];

export type MessageID = "default" | "replace";

export default createRule<[], MessageID>({
  meta: {
    type: "suggestion",
    docs: {
      description: "Replaces usage of 'forwardRef' with passing 'ref' as a prop.",
    },
    fixable: "code",
    hasSuggestions: true,
    messages: {
      default: "In React 19, 'forwardRef' is no longer necessary. Pass 'ref' as a prop instead.",
      replace: "Replace 'forwardRef' with passing 'ref' as a prop.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
});

export function create(context: RuleContext<MessageID, []>): RuleListener {
  if (!context.sourceCode.text.includes("forwardRef")) {
    return {};
  }
  return {
    CallExpression(node) {
      // ...check and report
    },
  };
}
```

Conventions:

- `createRule` comes from `@/utils/create-rule` inside each domain plugin (e.g. `plugins/eslint-plugin-react-x/src/utils/create-rule.ts`); it is `ESLintUtils.RuleCreator` bound to the docs URL `https://eslint-react.xyz/docs/rules/<rule-name>`. All plugins except `react-x` prefix the rule name in the URL (`debug-`, `dom-`, `jsx-`, `naming-convention-`, `rsc-`, `web-api-`).
- `RULE_NAME`, `RULE_FEATURES`, and the `MessageID` union are top-level exports — `scripts/20-check-rules.ts` imports each rule module and reads them.
- `meta.type` is `"suggestion"` for most rules; `"problem"` when the flagged code is likely a bug.
- `RuleContext` and `RuleListener` are re-exports from `@eslint-react/eslint`; typed with `RuleContext<MessageID, Options>`.
- Returning `{}` from `create` is the fast path: ESLint skips the file entirely with zero AST work. When to precheck and gate on React version is covered in the term-based doc.

## Options

Only a handful of rules take options. Convention: an `Options` tuple type, a module-level `defaultOptions` constant referenced from `meta.defaultOptions`, a JSON schema typed as `JSONSchema4`, and resolution at the top of `create`:

```ts
type Options = readonly [
  | null
  | { enforceAssignment?: boolean; enforceLazyInitialization?: boolean },
];

export const defaultOptions = [
  { enforceAssignment: true, enforceLazyInitialization: true },
] as const satisfies Options;

export default createRule<Options, MessageID>({
  meta: {
    // ...
    defaultOptions: [...defaultOptions],
    schema,
  },
  name: RULE_NAME,
  create,
});
// ...
export function create(context: RuleContext<MessageID, Options>): RuleListener {
  const options = context.options[0] ?? defaultOptions[0];
  const { enforceAssignment = true } = options;
}
```

Some rules resolve options from `create`'s second parameter and a `ResolvedOptions = Required<Options[0]>` type instead (`react-jsx/no-useless-fragment`). Rules with a non-empty schema must declare `meta.defaultOptions` (`require-meta-default-options` is enforced by this repo's own lint config), while rules without options omit `defaultOptions` entirely. Any non-empty `schema`/`defaultOptions` earns the `CFG` feature flag (see [`rule-feature-system.md`](./rule-feature-system.md)).

## Reporting

- **Single-message rules use `messageId: "default"`** — the dominant convention. Multi-message rules use descriptive kebab-case IDs (`use-state`: `"invalid-assignment" | "invalid-setterName"`; `no-forward-ref`: `"default" | "replace"`).
- **`data` interpolation** personalizes messages, e.g. `no-unstable-default-props` reports `"A/an '{{kind}}' as default prop..."` with `data: { kind: getHumanReadableKind(right) }`.
- **Auto-fixable** rules set `meta.fixable: "code"` and pass `fix(fixer) => ...` to `context.report`; they get the `FIX` feature.
- **Suggestions** (`meta.hasSuggestions: true` + a `suggest` array of `{ messageId, fix }`) are used when the transform needs user confirmation, e.g. `no-forward-ref` pairs the `"default"` report with a `"replace"` suggestion.
- Prefer reporting on the smallest precise node (`node: id ?? node` in `no-forward-ref`).

## Visitor Strategies

Ordered roughly from cheapest to heaviest:

1. **Immediate single-node visitor** — inspect the node and report inline (`no-forward-ref` on `CallExpression`, `react-dom/no-dangerously-set-innerhtml` on `JSXElement`).
2. **Ancestor lookup** — `Traverse.findParent(node, Check.isFunction)` from `@eslint-react/ast` walks up from a matched node (`use-state`, `no-unstable-default-props`).
3. **Collector + `Program:exit`** — get a collector from `@eslint-react/core` (e.g. `core.getFunctionComponentCollector(context)`), compose visitors with `merge` from `@eslint-react/eslint`, and correlate in `Program:exit`:

   ```ts
   const { api, visitor } = core.getFunctionComponentCollector(context);
   return merge(visitor, {
     "Program:exit"(program) {
       for (const { node: component } of api.getAllComponents(program)) {
         // ...validate and report
       }
     },
   });
   ```

4. **Code-path analysis** — ESLint's CFG events (`onCodePathStart`, `onCodePathSegmentStart`, ...) track control flow across branches (`rules-of-hooks`).
5. **Import-tracking** — `createImportLookup` from `@eslint-react/var` resolves imported names so rules match `hydrate(...)` and `ReactDOM.hydrate(...)` alike (all `react-dom/no-hydrate`-style rules).
6. **Type-aware** — `ESLintUtils.getParserServices(context, false)` plus `getConstrainedTypeAtLocation` from `@eslint-react/eslint` (`react-x/no-leaked-conditional-rendering`); these carry the `TSC` feature and are disabled by the `disable-type-checked` preset.

When evidence must be correlated across distant sites (provenance, multi-site reports), escalate to the fact-based pipeline documented in [`rule-implementation-patterns-fact-based.md`](./rule-implementation-patterns-fact-based.md).

## Tests

Specs sit next to the rule as `<rule-name>.spec.ts` and use the shared tester from `@local/testkit`:

```ts
import { ruleTester } from "@local/testkit";
import tsx from "dedent";
import rule, { RULE_NAME } from "./no-forward-ref";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: tsx`import { forwardRef } from 'react' ...`,
      errors: [
        { messageId: "default", suggestions: [{ messageId: "replace", output: tsx`...` }] },
      ],
      settings: { "react-x": { version: "19.0.0" } },
    },
  ],
  valid: [
    tsx`...`, // valid cases may be bare dedent strings
  ],
});
```

- `tsx` is the `dedent` template tag; `#/*` resolves to the repo root via tsconfig paths.
- React settings (`version`, `importSource`, ...) are passed per case through `settings: { "react-x": { ... } }`.
- Type-aware rules use `ruleTesterWithTypes` instead; their fixtures carry `/// <reference types="react" />` directives.
- JSX-emit-sensitive rules use `createRuleTesterForJsxEmit(jsxEmit)`.

## Registration

Each domain plugin hand-maintains a rules record in `src/plugin.ts`:

```ts
export const plugin = {
  meta: { name, version },
  rules: {
    "no-hydrate": noHydrate,
    // ...
  },
} as unknown as ESLint.Plugin;
```

The meta package `plugins/eslint-plugin/src/plugin.ts` composes all domain plugins, prefixing rule names (`jsx-`, `dom-`, ...) via `padKeysLeft` (`react-x` rules are registered both unprefixed and with the `x-` prefix). Presets are static `Linter.RulesRecord`s in `plugins/eslint-plugin/src/configs/`; `node --run check:rules` verifies that every registered rule is accounted for and that preset hierarchies hold.

## Documentation Files

- `<rule-name>.mdx` — frontmatter (`title`, `description`), full rule name in both the domain plugin and the meta package, `Features` badges matching `RULE_FEATURES` (validated by `check:rules`), `Presets` list, `Rule Details`, `Examples` with `🔴 Problem` / `🟢 Recommended` / `🔵 OK` blocks, and a `Resources` section linking to source, tests, and changelog.
- `CHANGELOG.md` — Keep-a-Changelog format scoped to the rule (`## [version] - date` with `### Added/Changed` entries); new rules end with an "Initial release of the `<rule>` rule" entry.

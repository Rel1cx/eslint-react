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

Complex rules keep shared helpers in `lib.ts`; fact-based rules add pattern-specific layers (`collect.ts`, `origins.ts`, ...). `scripts/90-scaffold-rule.ts` generates this layout and registers the rule; `scripts/20-check-rules.ts` (`node --run check:rules`) validates registration, presets, and docs badges against it.

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

- `createRule` comes from `@/utils/create-rule` in each domain plugin — `ESLintUtils.RuleCreator` bound to `https://eslint-react.xyz/docs/rules/<rule-name>` (all plugins except `react-x` prefix the rule name in the URL).
- `RULE_NAME`, `RULE_FEATURES`, and the `MessageID` union are top-level exports — `check:rules` imports each rule module and reads them.
- `meta.type` is `"suggestion"` for most rules; `"problem"` when the flagged code is likely a bug.
- Returning `{}` from `create` is the fast path: ESLint skips the file with zero AST work. Prechecks and version gating are covered in the term-based doc.

## Options

Convention: an `Options` tuple type, a module-level `defaultOptions` constant referenced from `meta.defaultOptions`, a JSON schema typed as `JSONSchema4`, and resolution at the top of `create` via `context.options[0] ?? defaultOptions[0]`. Rules with a non-empty schema must declare `meta.defaultOptions`; rules without options omit it entirely. Any non-empty `schema`/`defaultOptions` earns the `CFG` feature (see [`rule-feature-system.md`](./rule-feature-system.md)).

## Reporting

- Single-message rules use `messageId: "default"`; multi-message rules use descriptive kebab-case IDs.
- Use `data` interpolation to personalize messages.
- Auto-fixable rules set `meta.fixable: "code"` and pass `fix(fixer)` to `context.report` (`FIX` feature); transforms needing confirmation use `meta.hasSuggestions: true` + a `suggest` array.
- Report on the smallest precise node.

## Visitor Strategies

Ordered roughly from cheapest to heaviest:

1. **Immediate single-node visitor** — inspect the node and report inline (`no-forward-ref`).
2. **Ancestor lookup** — `Traverse.findParent(node, Check.isFunction)` from `@eslint-react/ast` (`use-state`).
3. **Collector + `Program:exit`** — get a collector from `@eslint-react/core`, compose visitors with `merge` from `@eslint-react/eslint`, and correlate in `Program:exit`:

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

4. **Code-path analysis** — ESLint's CFG events (`onCodePathStart`, ...) for control flow (`rules-of-hooks`).
5. **Import-tracking** — `createImportLookup` from `@eslint-react/var` to match `hydrate(...)` and `ReactDOM.hydrate(...)` alike.
6. **Type-aware** — `ESLintUtils.getParserServices` (`TSC` feature, disabled by the `disable-type-checked` preset).

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

- `tsx` is the `dedent` template tag; React settings (`version`, `importSource`, ...) are passed per case through `settings: { "react-x": { ... } }`.
- Type-aware rules use `ruleTesterWithTypes`; JSX-emit-sensitive rules use `createRuleTesterForJsxEmit(jsxEmit)`.

## Registration

Each domain plugin hand-maintains a rules record in `src/plugin.ts`. The meta package `plugins/eslint-plugin/src/plugin.ts` composes all domain plugins, prefixing rule names (`jsx-`, `dom-`, ...) via `padKeysLeft` (`react-x` rules are registered both unprefixed and with the `x-` prefix). Presets are static `Linter.RulesRecord`s in `plugins/eslint-plugin/src/configs/`; `node --run check:rules` verifies that every registered rule is accounted for and that preset hierarchies hold.

## Documentation Files

- `<rule-name>.mdx` — frontmatter (`title`, `description`), full rule name, `Features` badges matching `RULE_FEATURES` (validated by `check:rules`), `Presets` list, `Rule Details`, `Examples` with `🔴 Problem` / `🟢 Recommended` / `🔵 OK` blocks, and a `Resources` section.
- `CHANGELOG.md` — Keep-a-Changelog format scoped to the rule; new rules end with an "Initial release of the `<rule>` rule" entry.

# Rule Implementation Patterns Term-Based

How term-based rules use cheap text prechecks to skip files that cannot contain violations. Related: [`rule-implementation-patterns.md`](./rule-implementation-patterns.md) for the general anatomy of a rule file.

## What Is a Term-Based Rule?

A term-based rule targets specific React, React DOM, or Web API identifiers (hooks, lifecycle methods, global constructors, JSX attributes). A raw-text precheck can rule out most irrelevant files before any AST work, but it is best-effort: Unicode-escaped identifiers and whitespace around punctuation can defeat it. A precheck is _necessary but not sufficient_: passing it only means the term's text exists somewhere in the file; the real semantic check still happens in AST visitors via helpers like `core.isForwardRefCall`.

## Fast-Path Precheck Patterns

### Single-term check

```ts
if (!context.sourceCode.text.includes("forwardRef")) return {};
// ...full AST visitors
```

Used by:

- react-x: `no-access-state-in-setstate`, `no-children-*`, `no-class-component`, `no-clone-element`, `no-component-will-*`, `no-context-provider`, `no-create-ref`, `no-direct-mutation-state`, `no-forward-ref`, `no-implicit-*`, `no-missing-context-display-name`, `no-misused-capture-owner-stack`, `no-nested-lazy-component-declarations`, `no-set-state-in-component-*`, `no-unsafe-component-will-*`, `no-unused-class-component-members`, `no-use-context`, `use-memo`
- react-dom: `no-dangerously-set-innerhtml`, `no-dangerously-set-innerhtml-with-children`, `no-find-dom-node`, `no-flush-sync`, `no-hydrate`, `no-render`, `no-render-return-value`, `no-use-form-state`
- react-web-api: `no-leaked-event-listener` (first check), `no-leaked-fetch` (first check), `no-leaked-intersection-observer`, `no-leaked-interval`, `no-leaked-resize-observer`, `no-leaked-timeout`
- react-naming-convention: `context-name`, `id-name`

Notable term-based rules that currently omit the text precheck: `react-naming-convention/ref-name`. Other rules use tokens that are too common to be useful filters (`key`, `use`) or are gated by configuration.

### Multi-term check

When any one of several independent terms can trigger the rule, AND-combine the negated checks:

```ts
if (!context.sourceCode.text.includes("memo") && !context.sourceCode.text.includes("forwardRef")) return {};
```

Used by: `react-x/no-missing-component-display-name`, `react-rsc/function-definition`.

### Regex check (term families)

```ts
if (!/use\w*Effect/u.test(context.sourceCode.text)) return {};
```

Used by: `react-x/set-state-in-effect`, `react-web-api/no-leaked-fetch` (second check), `react-web-api/no-leaked-event-listener` (second check).

### Non-identifier substring check

```ts
if (!context.sourceCode.text.includes("$")) return {}; // no-leaked-dollar
if (!context.sourceCode.text.includes("&&")) return {}; // no-leaked-conditional-rendering
if (!context.sourceCode.text.includes("try")) return {}; // error-boundaries
if (!/\bkey\b/u.test(context.sourceCode.text)) return {}; // no-duplicate-key
if (!/key\s*=/.test(context.sourceCode.text)) return {}; // no-key-after-spread
```

### Choosing the precheck term

The precheck term is a superset filter, not necessarily the full API name. It should be a substring of every source form the AST helper can match; a false positive only costs work, while a false negative silently skips a real violation. Treat the check as best-effort: the parser decodes Unicode escapes in identifiers, and whitespace or comments can separate punctuation such as `key` and `=`, so a raw-text token cannot cover every spelling.

- **Prefer the stable family identifier over the dotted FQN.** `Extract.getFullyQualifiedName` normalizes member access, so `Children /* c */ . count` still resolves to `Children.count`, but its source text does not contain the contiguous string `Children.count`. Use `includes("Children")`, not `includes("Children.count")`.
- **Do not include call punctuation or type arguments.** `lazy(` and `lazy<` can be separated by whitespace, comments, or type parameters; use `includes("lazy")`.
- **Computed access does not constrain the token.** `isAPI` generally does not match computed access such as `React["Children"]["count"]`, because the computed FQN is the raw source text rather than a dotted name.
- **Keep the token specific enough to be useful.** `Children`, `cloneElement`, and `lazy` are distinctive; `state` or `use` would match too much to justify a precheck.
- **Keywords, punctuators, and structural names can be valid tokens.** `includes("Component")` covers the superclass names accepted by `isClassComponent`; `includes("...")` is safe for JSX spread rules.

## Version Gating

After the text precheck, some rules read the configured React version and bail out if it is too old:

```ts
if (!context.sourceCode.text.includes("forwardRef")) return {};
const { version } = getSettingsFromContext(context);
if (compare(version, "19.0.0", "<")) return {};
// ...full AST visitors
```

| Rule                          | Term           | Version gate |
| ----------------------------- | -------------- | ------------ |
| `react-x/no-forward-ref`      | `forwardRef`   | `>= 19.0.0`  |
| `react-x/no-use-context`      | `useContext`   | `>= 19.0.0`  |
| `react-x/no-context-provider` | `Provider`     | `>= 19.0.0`  |
| `react-dom/no-use-form-state` | `useFormState` | `>= 19.0.0`  |
| `react-dom/no-hydrate`        | `hydrate`      | `>= 18.0.0`  |
| `react-dom/no-render`         | `render`       | `>= 18.0.0`  |

A few rules change behavior based on version rather than bailing out:

| Rule                                      | Version-dependent behavior                                                                             |
| ----------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `react-x/no-leaked-conditional-rendering` | React 18+ treats empty strings as safe; older versions exclude `"string"` / `"falsy string"` variants. |
| `react-x/no-unstable-context-value`       | React 18 and below check `.Provider`; React 19 also checks bare `Context`.                             |

A precheck can also front a collector + `Program:exit` pipeline — see `no-class-component` (`includes("Component")` then `core.getClassComponentCollector`) and `no-nested-lazy-component-declarations` (`includes("lazy")` before three collectors), as well as the Visitor Strategies section of the general doc.

## Rule Precheck and Visitor Strategy Reference

| Rule                                         | Plugin                    | Precheck                                             | Extra gate                  | Visitor strategy                         |
| -------------------------------------------- | ------------------------- | ---------------------------------------------------- | --------------------------- | ---------------------------------------- |
| `no-access-state-in-setstate`                | `react-x`                 | `includes("setState")`                               | —                           | `MemberExpression` + ancestor lookup     |
| `no-children-map`                            | `react-x`                 | `includes("Children")`                               | —                           | `MemberExpression` immediate             |
| `no-children-count`                          | `react-x`                 | `includes("Children")`                               | —                           | `MemberExpression` immediate             |
| `no-children-for-each`                       | `react-x`                 | `includes("Children")`                               | —                           | `MemberExpression` immediate             |
| `no-children-only`                           | `react-x`                 | `includes("Children")`                               | —                           | `MemberExpression` immediate             |
| `no-children-to-array`                       | `react-x`                 | `includes("Children")`                               | —                           | `MemberExpression` immediate             |
| `no-class-component`                         | `react-x`                 | `includes("Component")`                              | —                           | Collector + `Program:exit`               |
| `no-direct-mutation-state`                   | `react-x`                 | `includes("Component")`                              | —                           | `AssignmentExpression` + ancestor lookup |
| `no-clone-element`                           | `react-x`                 | `includes("cloneElement")`                           | —                           | `CallExpression` immediate               |
| `no-component-will-mount`                    | `react-x`                 | `includes("componentWillMount")`                     | —                           | Collector + `Program:exit`               |
| `no-component-will-receive-props`            | `react-x`                 | `includes("componentWillReceiveProps")`              | —                           | Collector + `Program:exit`               |
| `no-component-will-update`                   | `react-x`                 | `includes("componentWillUpdate")`                    | —                           | Collector + `Program:exit`               |
| `no-context-provider`                        | `react-x`                 | `includes("Provider")`                               | `>= 19.0.0`                 | `JSXElement` immediate                   |
| `no-create-ref`                              | `react-x`                 | `includes("createRef")`                              | —                           | Dual collector + `Program:exit`          |
| `no-duplicate-key`                           | `react-x`                 | `/\bkey\b/`                                          | —                           | Ad-hoc collect + `Program:exit`          |
| `no-forward-ref`                             | `react-x`                 | `includes("forwardRef")`                             | `>= 19.0.0`                 | `CallExpression` immediate               |
| `no-implicit-children`                       | `react-x`                 | `includes("...")`                                    | —                           | Shared listener + type-aware             |
| `no-implicit-key`                            | `react-x`                 | `includes("...")`                                    | —                           | Shared listener + type-aware             |
| `no-implicit-ref`                            | `react-x`                 | `includes("...")`                                    | —                           | Shared listener + type-aware             |
| `no-leaked-conditional-rendering`            | `react-x`                 | `includes("&&")`                                     | —                           | Type-aware traversal                     |
| `no-missing-component-display-name`          | `react-x`                 | `!includes("memo") && !includes("forwardRef")`       | —                           | Collector + `Program:exit`               |
| `no-missing-context-display-name`            | `react-x`                 | `includes("createContext")`                          | —                           | Ad-hoc collect + `Program:exit`          |
| `no-misused-capture-owner-stack`             | `react-x`                 | `includes("captureOwnerStack")`                      | —                           | `CallExpression` + `ImportDeclaration`   |
| `no-nested-lazy-component-declarations`      | `react-x`                 | `includes("lazy")`                                   | —                           | Lazy-call collect + `Program:exit`       |
| `no-set-state-in-component-did-mount`        | `react-x`                 | `includes("componentDidMount")`                      | —                           | `CallExpression` + ancestor lookup       |
| `no-set-state-in-component-did-update`       | `react-x`                 | `includes("componentDidUpdate")`                     | —                           | `CallExpression` + ancestor lookup       |
| `no-set-state-in-component-will-update`      | `react-x`                 | `includes("componentWillUpdate")`                    | —                           | `CallExpression` + ancestor lookup       |
| `no-unsafe-component-will-mount`             | `react-x`                 | `includes("UNSAFE_componentWillMount")`              | —                           | Collector + `Program:exit`               |
| `no-unsafe-component-will-receive-props`     | `react-x`                 | `includes("UNSAFE_componentWillReceiveProps")`       | —                           | Collector + `Program:exit`               |
| `no-unsafe-component-will-update`            | `react-x`                 | `includes("UNSAFE_componentWillUpdate")`             | —                           | Collector + `Program:exit`               |
| `no-unused-class-component-members`          | `react-x`                 | `includes("Component")`                              | —                           | Ad-hoc collect + `Class*:exit`           |
| `no-use-context`                             | `react-x`                 | `includes("useContext")`                             | `>= 19.0.0`                 | `CallExpression` immediate               |
| `set-state-in-effect`                        | `react-x`                 | `/use\w*Effect/u`                                    | —                           | Fact-based pipeline                      |
| `use-memo`                                   | `react-x`                 | `includes("useMemo")`                                | —                           | Fact-based pipeline                      |
| `error-boundaries`                           | `react-x`                 | `includes("try")`                                    | —                           | Dual collector + `Program:exit`          |
| `no-leaked-event-listener`                   | `react-web-api`           | `includes("addEventListener")` + `/use\w*Effect/u`   | —                           | Web-API collect-and-match                |
| `no-leaked-fetch`                            | `react-web-api`           | `includes("fetch")` + `/use\w*Effect/u`              | —                           | Web-API collect-and-match                |
| `no-leaked-timeout`                          | `react-web-api`           | `includes("setTimeout")`                             | —                           | Web-API collect-and-match                |
| `no-leaked-interval`                         | `react-web-api`           | `includes("setInterval")`                            | —                           | Web-API collect-and-match                |
| `no-leaked-resize-observer`                  | `react-web-api`           | `includes("ResizeObserver")`                         | —                           | Web-API collect-and-match                |
| `no-leaked-intersection-observer`            | `react-web-api`           | `includes("IntersectionObserver")`                   | —                           | Web-API collect-and-match                |
| `no-dangerously-set-innerhtml`               | `react-dom`               | `includes("dangerouslySetInnerHTML")`                | —                           | `JSXElement` immediate                   |
| `no-dangerously-set-innerhtml-with-children` | `react-dom`               | `includes("dangerouslySetInnerHTML")`                | —                           | `JSXElement` immediate                   |
| `no-find-dom-node`                           | `react-dom`               | `includes("findDOMNode")`                            | —                           | Import-tracking                          |
| `no-flush-sync`                              | `react-dom`               | `includes("flushSync")`                              | —                           | Import-tracking                          |
| `no-hydrate`                                 | `react-dom`               | `includes("hydrate")`                                | `>= 18.0.0`                 | Import-tracking                          |
| `no-render`                                  | `react-dom`               | `includes("render")`                                 | `>= 18.0.0`                 | Import-tracking                          |
| `no-render-return-value`                     | `react-dom`               | `includes("render")`                                 | —                           | Import-tracking                          |
| `no-use-form-state`                          | `react-dom`               | `includes("useFormState")`                           | `>= 19.0.0`                 | Import-tracking                          |
| `no-key-after-spread`                        | `react-jsx`               | `/key\s*=/`                                          | `react-jsx(-dev)` emit only | `JSXOpeningElement` immediate            |
| `no-leaked-dollar`                           | `react-jsx`               | `includes("$")`                                      | —                           | `JSXElement`/`JSXFragment` immediate     |
| `context-name`                               | `react-naming-convention` | `includes("createContext")`                          | —                           | `CallExpression` immediate               |
| `id-name`                                    | `react-naming-convention` | `includes("useId")`                                  | —                           | `CallExpression` immediate               |
| `function-definition`                        | `react-rsc`               | `!includes("use server") && !includes("use client")` | —                           | Directive-aware traversal                |

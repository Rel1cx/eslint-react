# Rule Implementation Patterns Term-Based

How term-based rules use cheap text prechecks to skip files that cannot contain violations.

Related: [`rule-implementation-patterns.md`](./rule-implementation-patterns.md) for the general anatomy of a rule file.

## What Is a Term-Based Rule?

A term-based rule targets specific React, React DOM, or Web API identifiers (hooks, lifecycle methods, global constructors, JSX attributes). Because the term must appear verbatim in the source, a single substring scan can prove a file irrelevant before any AST work.

A precheck is _necessary but not sufficient_: passing it only means the term's text exists somewhere in the file. The real semantic check still happens in AST visitors via helpers like `core.isForwardRefCall`.

## Fast-Path Precheck Patterns

### Single-term check

```ts
export function create(context: RuleContext<MessageID, []>): RuleListener {
  if (!context.sourceCode.text.includes("forwardRef")) {
    return {};
  }
  // ...full AST visitors
}
```

Used by:

- `react-x/no-access-state-in-setstate`
- `react-x/no-class-component`
- `react-x/no-component-will-*`
- `react-x/no-context-provider`
- `react-x/no-create-ref`
- `react-x/no-forward-ref`
- `react-x/no-missing-context-display-name`
- `react-x/no-misused-capture-owner-stack`
- `react-x/no-set-state-in-component-*`
- `react-x/no-unsafe-component-will-*`
- `react-x/no-use-context`
- `react-x/use-memo`
- `react-dom/no-dangerously-set-innerhtml`
- `react-dom/no-dangerously-set-innerhtml-with-children`
- `react-dom/no-find-dom-node`
- `react-dom/no-flush-sync`
- `react-dom/no-hydrate`
- `react-dom/no-render`
- `react-dom/no-use-form-state`
- `react-web-api/no-leaked-event-listener` (first check).
- `react-web-api/no-leaked-fetch` (first check)
- `react-web-api/no-leaked-intersection-observer`
- `react-web-api/no-leaked-interval`
- `react-web-api/no-leaked-resize-observer`
- `react-web-api/no-leaked-timeout`
- `react-naming-convention/context-name`
- `react-naming-convention/id-name`

Rules that currently omit the text precheck but still use term-based visitors:

- `react-x/no-children-count`
- `react-x/no-children-for-each`
- `react-x/no-children-map`
- `react-x/no-children-only`
- `react-x/no-children-to-array`
- `react-x/no-clone-element`
- `react-x/no-direct-mutation-state`
- `react-naming-convention/ref-name`

### Multi-term check

When any one of several independent terms can trigger the rule, OR-combine the checks:

```ts
if (!context.sourceCode.text.includes("memo") && !context.sourceCode.text.includes("forwardRef")) {
  return {};
}
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
if (!context.sourceCode.text.includes("key=")) return {}; // no-duplicate-key, no-key-after-spread
```

## Version Gating

After the text precheck, some rules read the configured React version and bail out if it is too old:

```ts
export function create(context: RuleContext<MessageID, []>): RuleListener {
  if (!context.sourceCode.text.includes("forwardRef")) return {};
  const { version } = getSettingsFromContext(context);
  if (compare(version, "19.0.0", "<")) return {};
  // ...full AST visitors
}
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

Collector + `Program:exit` example:

```ts
export function create(context: RuleContext<MessageID, []>): RuleListener {
  if (!context.sourceCode.text.includes("Component")) return {};

  const { api, visitor } = core.getClassComponentCollector(context);

  return merge(visitor, {
    "Program:exit"(program) {
      for (const { node: component } of api.getAllComponents(program)) {
        // ...validate and report
      }
    },
  });
}
```

## Rule Precheck and Visitor Strategy Reference

| Rule                                         | Plugin              | Precheck                                             | Extra gate  | Visitor strategy                               |
| -------------------------------------------- | ------------------- | ---------------------------------------------------- | ----------- | ---------------------------------------------- |
| `no-children-map`                            | `react-x`           | _none_                                               | —           | `MemberExpression` immediate                   |
| `no-children-count`                          | `react-x`           | _none_                                               | —           | `MemberExpression` immediate                   |
| `no-children-for-each`                       | `react-x`           | _none_                                               | —           | `MemberExpression` immediate                   |
| `no-children-only`                           | `react-x`           | _none_                                               | —           | `MemberExpression` immediate                   |
| `no-children-to-array`                       | `react-x`           | _none_                                               | —           | `MemberExpression` immediate                   |
| `no-class-component`                         | `react-x`           | `includes("Component")`                              | —           | Collector + `Program:exit`                     |
| `no-direct-mutation-state`                   | `react-x`           | _none_                                               | —           | `AssignmentExpression` + ancestor lookup       |
| `no-clone-element`                           | `react-x`           | _none_                                               | —           | `CallExpression` immediate                     |
| `no-component-will-mount`                    | `react-x`           | `includes("componentWillMount")`                     | —           | Collector + `Program:exit`                     |
| `no-component-will-receive-props`            | `react-x`           | `includes("componentWillReceiveProps")`              | —           | Collector + `Program:exit`                     |
| `no-component-will-update`                   | `react-x`           | `includes("componentWillUpdate")`                    | —           | Collector + `Program:exit`                     |
| `no-context-provider`                        | `react-x`           | `includes("Provider")`                               | `>= 19.0.0` | `JSXElement` immediate                         |
| `no-create-ref`                              | `react-x`           | `includes("createRef")`                              | —           | Collector + `Program:exit`                     |
| `no-duplicate-key`                           | `react-x`           | `includes("key=")`                                   | —           | Ad-hoc collect + `Program:exit`                |
| `no-forward-ref`                             | `react-x`           | `includes("forwardRef")`                             | `>= 19.0.0` | `CallExpression` immediate                     |
| `no-leaked-conditional-rendering`            | `react-x`           | `includes("&&")`                                     | —           | Type-aware traversal                           |
| `no-missing-component-display-name`          | `react-x`           | `!includes("memo") && !includes("forwardRef")`       | —           | Collector + `Program:exit`                     |
| `no-missing-context-display-name`            | `react-x`           | `includes("createContext")`                          | —           | Ad-hoc collect + `Program:exit`                |
| `no-misused-capture-owner-stack`             | `react-x`           | `includes("captureOwnerStack")`                      | —           | `CallExpression` immediate                     |
| `no-set-state-in-component-did-mount`        | `react-x`           | `includes("componentDidMount")`                      | —           | `CallExpression` + ancestor lookup             |
| `no-set-state-in-component-did-update`       | `react-x`           | `includes("componentDidUpdate")`                     | —           | `CallExpression` + ancestor lookup             |
| `no-set-state-in-component-will-update`      | `react-x`           | `includes("componentWillUpdate")`                    | —           | `CallExpression` + ancestor lookup             |
| `no-unsafe-component-will-mount`             | `react-x`           | `includes("UNSAFE_componentWillMount")`              | —           | Collector + `Program:exit`                     |
| `no-unsafe-component-will-receive-props`     | `react-x`           | `includes("UNSAFE_componentWillReceiveProps")`       | —           | Collector + `Program:exit`                     |
| `no-unsafe-component-will-update`            | `react-x`           | `includes("UNSAFE_componentWillUpdate")`             | —           | Collector + `Program:exit`                     |
| `no-use-context`                             | `react-x`           | `includes("useContext")`                             | `>= 19.0.0` | `CallExpression` immediate                     |
| `use-memo`                                   | `react-x`           | `includes("useMemo")`                                | —           | `CallExpression` immediate + nested validation |
| `set-state-in-effect`                        | `react-x`           | `/use\w*Effect/u`                                    | —           | Function-phase stack + collect-and-match       |
| `error-boundaries`                           | `react-x`           | `includes("try")`                                    | —           | Dual collector + `Program:exit`                |
| `no-leaked-event-listener`                   | `react-web-api`     | `includes("addEventListener")` + `/use\w*Effect/u`   | —           | Web-API collect-and-match                      |
| `no-leaked-fetch`                            | `react-web-api`     | `includes("fetch")` + `/use\w*Effect/u`              | —           | Web-API collect-and-match                      |
| `no-leaked-timeout`                          | `react-web-api`     | `includes("setTimeout")`                             | —           | Web-API collect-and-match                      |
| `no-leaked-interval`                         | `react-web-api`     | `includes("setInterval")`                            | —           | Web-API collect-and-match                      |
| `no-leaked-resize-observer`                  | `react-web-api`     | `includes("ResizeObserver")`                         | —           | Web-API collect-and-match                      |
| `no-leaked-intersection-observer`            | `react-web-api`     | `includes("IntersectionObserver")`                   | —           | Web-API collect-and-match                      |
| `no-dangerously-set-innerhtml`               | `react-dom`         | `includes("dangerouslySetInnerHTML")`                | —           | `JSXElement` immediate                         |
| `no-dangerously-set-innerhtml-with-children` | `react-dom`         | `includes("dangerouslySetInnerHTML")`                | —           | `JSXElement` immediate                         |
| `no-find-dom-node`                           | `react-dom`         | `includes("findDOMNode")`                            | —           | Import-tracking                                |
| `no-flush-sync`                              | `react-dom`         | `includes("flushSync")`                              | —           | Import-tracking                                |
| `no-hydrate`                                 | `react-dom`         | `includes("hydrate")`                                | `>= 18.0.0` | Import-tracking                                |
| `no-render`                                  | `react-dom`         | `includes("render")`                                 | `>= 18.0.0` | Import-tracking                                |
| `no-use-form-state`                          | `react-dom`         | `includes("useFormState")`                           | `>= 19.0.0` | Import-tracking                                |
| `no-key-after-spread`                        | `react-jsx`         | `includes("key=")`                                   | —           | `JSXOpeningElement` immediate                  |
| `no-leaked-dollar`                           | `react-jsx`         | `includes("$")`                                      | —           | `JSXElement`/`JSXFragment` immediate           |
| `context-name`                               | `naming-convention` | `includes("createContext")`                          | —           | `CallExpression` immediate                     |
| `id-name`                                    | `naming-convention` | `includes("useId")`                                  | —           | `CallExpression` immediate                     |
| `function-definition`                        | `react-rsc`         | `includes("use server") \|\| includes("use client")` | —           | Directive-aware traversal                      |

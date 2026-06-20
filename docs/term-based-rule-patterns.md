# Term-Based Rule Patterns

This document describes how **term-based rules** are implemented across the
plugins in this monorepo, and how they use cheap fast-path text prechecks to
skip files that cannot contain violations.

> Related reading: [`rule-implementation-patterns.md`](./rule-implementation-patterns.md)
> covers the general anatomy of a rule file (`createRule`, `RULE_FEATURES`,
> `merge`, collectors, testing). This document focuses specifically on the
> _precheck_ and _visitor strategy_ dimensions of term-based rules.

---

## 1. What Is a Term-Based Rule?

A term-based rule targets one or more specific React, React DOM, or Web API
**terms** — usually an identifier such as a hook, a lifecycle method, a global
constructor, or a JSX attribute. Because the term is a literal string that must
appear verbatim in the source, the rule can prove a file is irrelevant with a
single substring scan before doing any AST work.

| Rule                       | Target Term                                        | Plugin              |
| -------------------------- | -------------------------------------------------- | ------------------- |
| `no-children-map`          | `Children.map` (detected via `core.isChildrenMap`) | `react-x`           |
| `no-children-count`        | `Children.count`                                   | `react-x`           |
| `no-children-for-each`     | `Children.forEach`                                 | `react-x`           |
| `no-children-only`         | `Children.only`                                    | `react-x`           |
| `no-children-to-array`     | `Children.toArray`                                 | `react-x`           |
| `no-class-component`       | `Component`                                        | `react-x`           |
| `no-direct-mutation-state` | `this.state`                                       | `react-x`           |
| `no-clone-element`         | `cloneElement`                                     | `react-x`           |
| `no-component-will-mount`  | `componentWillMount`                               | `react-x`           |
| `no-create-ref`            | `createRef`                                        | `react-x`           |
| `no-forward-ref`           | `forwardRef`                                       | `react-x`           |
| `no-leaked-event-listener` | `addEventListener` + `useEffect`                   | `react-web-api`     |
| `no-leaked-fetch`          | `fetch` + `useEffect`                              | `react-web-api`     |
| `no-leaked-timeout`        | `setTimeout`                                       | `react-web-api`     |
| `no-use-context`           | `useContext`                                       | `react-x`           |
| `no-find-dom-node`         | `findDOMNode`                                      | `react-dom`         |
| `ref-name`                 | `useRef`                                           | `naming-convention` |
| `set-state-in-effect`      | `useEffect` (regex `/use\w*Effect/u`)              | `react-x`           |

> **Note:** A term-based precheck is a _necessary-but-not-sufficient_ filter.
> Passing it only means the term's text exists somewhere in the file (including
> comments, strings, or unrelated identifiers). The real semantic check still
> happens in the AST visitors via helpers like `core.isForwardRefCall`.

---

## 2. Fast-Path Precheck Pattern

Almost every term-based rule begins `create()` with a cheap string check against
the entire file source. If the term is absent, the rule returns an empty visitor
`{}` immediately, avoiding all AST traversal, scope analysis, and collector
overhead.

### 2.1 Single-term check (`String.prototype.includes`)

```ts
export function create(context: RuleContext<MessageID, []>): RuleListener {
  // Fast path: skip if `forwardRef` is not present in the file
  if (!context.sourceCode.text.includes("forwardRef")) {
    return {};
  }
  // ...full AST visitors
}
```

**Rules using this:**

- `no-access-state-in-setstate` (`setState`)
- `no-class-component` (`Component`)
- `no-component-will-mount` (`componentWillMount`)
- `no-component-will-receive-props` (`componentWillReceiveProps`)
- `no-component-will-update` (`componentWillUpdate`)
- `no-create-ref` (`createRef`)
- `no-forward-ref` (`forwardRef`)
- `no-missing-context-display-name` (`createContext`)
- `no-misused-capture-owner-stack` (`captureOwnerStack`)
- `no-set-state-in-component-did-mount` (`componentDidMount`)
- `no-set-state-in-component-did-update` (`componentDidUpdate`)
- `no-set-state-in-component-will-update` (`componentWillUpdate`)
- `no-unsafe-component-will-mount` (`UNSAFE_componentWillMount`)
- `no-unsafe-component-will-receive-props` (`UNSAFE_componentWillReceiveProps`)
- `no-unsafe-component-will-update` (`UNSAFE_componentWillUpdate`)
- `no-use-context` (`useContext`)
- `use-memo` (`useMemo`)
- `context-name` (`createContext`, `naming-convention`)
- `id-name` (`useId`, `naming-convention`)
- `ref-name` (`useRef`, `naming-convention`)
- `no-leaked-timeout` (`setTimeout`)
- `no-leaked-interval` (`setInterval`)
- `no-leaked-resize-observer` (`ResizeObserver`)
- `no-leaked-intersection-observer` (`IntersectionObserver`)
- `no-leaked-fetch` (`fetch`, first check)
- `no-leaked-event-listener` (`addEventListener`, first check)

> **Rules that target these terms but currently omit the text precheck:**
> `no-children-count` (`Children.count`), `no-children-for-each` (`Children.forEach`),
> `no-children-only` (`Children.only`), `no-children-to-array` (`Children.toArray`),
> and `no-direct-mutation-state` (`this.state`). They still use the visitor
> strategies described later, but they do not currently short-circuit on the term
> text.

### 2.2 Multi-term check

When a rule cares about several independent terms, any one of which could
trigger it, the prechecks are OR-combined:

```ts
// Skip if neither `memo` nor `forwardRef` is present
if (!context.sourceCode.text.includes("memo") && !context.sourceCode.text.includes("forwardRef")) {
  return {};
}
```

```ts
// react-rsc/function-definition
const hasUseServer = context.sourceCode.text.includes("use server");
const hasUseClient = context.sourceCode.text.includes("use client");
if (!hasUseServer && !hasUseClient) return {};
```

**Rules using this:** `no-missing-component-display-name`, `function-definition` (`react-rsc`)

### 2.3 Regex check (term families)

When the term is a _family_ of names (e.g. any effect hook), a regex is used:

```ts
// Skip if no effect-like hook is present
if (!/use\w*Effect/u.test(context.sourceCode.text)) return {};
```

**Rules using this:**

- `set-state-in-effect`
- `no-leaked-fetch` (second check)
- `no-leaked-event-listener` (second check)

### 2.4 Non-identifier substring check

The target is not always a bare identifier. Some rules precheck on a syntactic
fragment, a directive string, or an operator. These are still plain `includes()`
calls, but the term is not a standalone identifier.

```ts
if (!context.sourceCode.text.includes("key=")) return {}; // no-duplicate-key
if (!context.sourceCode.text.includes("&&")) return {}; // no-leaked-conditional-rendering
if (!context.sourceCode.text.includes("try")) return {}; // error-boundaries
```

**Rules using this:**

- `no-duplicate-key` (`key=`)
- `no-leaked-conditional-rendering` (`&&`)
- `error-boundaries` (`try`)

---

## 3. Secondary Fast Path: Version Gating

Several term-based rules are only relevant on a given React version. After the
text precheck, these rules read the configured version from settings and bail
out with `{}` if the file's React version is too old. This is a second cheap
exit that runs before any visitors are registered.

```ts
export function create(context: RuleContext<MessageID, []>): RuleListener {
  // 1. Text precheck
  if (!context.sourceCode.text.includes("forwardRef")) return {};
  // 2. Version precheck
  const { version } = getSettingsFromContext(context);
  if (compare(version, "19.0.0", "<")) return {};
  // ...full AST visitors
}
```

| Rule                  | Term           | Version gate |
| --------------------- | -------------- | ------------ |
| `no-forward-ref`      | `forwardRef`   | `>= 19.0.0`  |
| `no-use-context`      | `useContext`   | `>= 19.0.0`  |
| `no-context-provider` | `Provider`     | `>= 19.0.0`  |
| `no-use-form-state`   | `useFormState` | `>= 19.0.0`  |
| `no-hydrate`          | `hydrate`      | `>= 18.0.0`  |
| `no-render`           | `render`       | `>= 18.0.0`  |

> Order matters: do the text precheck **first** (it's the cheapest), then the
> version check, then collector/scope initialization.

### 3.1 Behavioral version gates

A few rules do not use the version comparison as a bail-out. Instead, they change
what they consider a violation based on the configured React version:

| Rule                              | Version-dependent behavior                                                                                                                                             |
| --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `no-leaked-conditional-rendering` | React 18+ does not render empty strings, so `"string"` and `"falsy string"` are added to the safe `allowedTypeVariants`. Before React 18, those variants are excluded. |
| `no-unstable-context-value`       | React 18 and below only check `.Provider` elements. React 19 also checks bare `Context` elements because `Context.Provider` is deprecated.                             |

These gates still appear after the cheap text precheck, but they modify the rule's
logic rather than returning an empty visitor.

---

## 4. Implementation Patterns After the Fast Path

Once the prechecks pass, rules fall into one of several visitor strategies.

### 4.1 Immediate report on matching node

The simplest pattern: visit the exact AST node type and report when a helper
confirms the term.

```ts
export function create(context: RuleContext<MessageID, []>): RuleListener {
  return {
    CallExpression(node) {
      if (core.isCloneElementCall(context, node)) {
        context.report({ messageId: "default", node });
      }
    },
  };
}
```

**`CallExpression` examples:** `no-clone-element`, `no-forward-ref`,
`no-use-context`, `no-misused-capture-owner-stack`, `no-find-dom-node`,
`no-flush-sync`, `context-name`, `id-name`, `ref-name`, `use-memo` (with
additional nested validation of the memoized value)

**`MemberExpression` examples:** `no-children-map`, `no-children-count`,
`no-children-for-each`, `no-children-only`, `no-children-to-array`

**`JSXElement` examples:** `no-dangerously-set-innerhtml`,
`no-dangerously-set-innerhtml-with-children`, `no-context-provider`

### 4.2 Immediate report with ancestor lookup

A variant of §4.1: visit the matching node, then walk up to confirm it sits
inside a relevant enclosing context using `Traverse.findParent`.

```ts
export function create(context: RuleContext<MessageID, []>): RuleListener {
  if (!context.sourceCode.text.includes("componentDidMount")) return {};
  return {
    CallExpression(node) {
      if (!core.isThisSetStateCall(node)) return;
      const enclosingClassNode = Traverse.findParent(node, core.isClassComponent);
      // ...confirm the call is inside `componentDidMount`, then report
    },
  };
}
```

**Examples:** `no-set-state-in-component-did-mount`,
`no-set-state-in-component-did-update`, `no-set-state-in-component-will-update`

### 4.3 Collector + `Program:exit`

Rules that need to inspect a whole component (or class) first collect data via a
collector from `@eslint-react/core`, then validate in bulk at `Program:exit`.

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

**Class-component collector examples:** `no-class-component`,
`no-component-will-mount`, `no-component-will-receive-props`,
`no-component-will-update`, `no-unsafe-component-will-mount`,
`no-unsafe-component-will-receive-props`, `no-unsafe-component-will-update`

**Function-component collector examples:** `no-missing-component-display-name`

**Combined component + hook collector examples:** `no-create-ref` (uses both
`getFunctionComponentCollector` and `getHookCollector`, collects `createRef`
calls, then matches them against collected functions on exit), `error-boundaries`
(uses both collectors to find components and hooks that contain try/catch blocks)

### 4.4 Ad-hoc collect + `Program:exit`

Some rules do not use a `core` collector but maintain their own arrays/maps,
collecting nodes during traversal and matching them on exit.

```ts
export function create(context: RuleContext<MessageID, []>): RuleListener {
  if (!context.sourceCode.text.includes("createContext")) return {};
  const createCalls: TSESTree.CallExpression[] = [];
  const displayNameAssignments: TSESTree.AssignmentExpression[] = [];
  // ...collect in visitors, match in Program:exit
}
```

**Examples:** `no-missing-context-display-name`, `no-duplicate-key`

### 4.5 Stack-based tracking

When a violation can only happen inside a nested context (e.g. inside a
`setState` call inside a class component), the rule maintains stacks.

```ts
export function create(context: RuleContext<MessageID, []>): RuleListener {
  if (!context.sourceCode.text.includes("setState")) return {};

  const classStack: [node: ClassNode, isComponent: boolean][] = [];
  const methodStack: [node: MethodNode, isStatic: boolean][] = [];
  const setStateStack: [node: CallExpression, hasThisState: boolean][] = [];

  return {
    CallExpression(node) {
      if (core.isThisSetStateCall(node)) {
        setStateStack.push([node, false]);
      }
    },
    "CallExpression:exit"(node) {
      if (core.isThisSetStateCall(node)) setStateStack.pop();
    },
    ClassDeclaration(node) {
      classStack.push([node, core.isClassComponent(node)]);
    },
    "ClassDeclaration:exit"() {
      classStack.pop();
    },
    MemberExpression(node) {
      const [, isComponent] = classStack.at(-1) ?? [];
      const [, isStatic] = methodStack.at(-1) ?? [];
      const [setState] = setStateStack.at(-1) ?? [];
      if (!isComponent || isStatic || setState == null) return;
      if (Extract.getPropertyName(node.property) === "state") {
        context.report({ messageId: "default", node });
      }
    },
  };
}
```

**Examples:** `no-access-state-in-setstate`

A related but distinct pattern is the **function-phase stack**: rules like
`set-state-in-effect` track the current function's role (e.g. `setup` vs `cleanup`
vs `deferred`) with a single stack, then collect and match calls in
`Program:exit`. The class/method/setState stacks above are specific to class
components; the function-phase stack is the hook-era equivalent.

### 4.6 Web-API collect-and-match

`react-web-api` rules track a function stack to know the component phase
(`setup` vs `cleanup`), collect add/set/new calls and their matching
remove/clear calls, then pair them up in `Program:exit`. (See
[`rule-implementation-patterns.md` §5](./rule-implementation-patterns.md)
for the full two-phase pattern.)

```ts
export function create(context: RuleContext<MessageID, []>): RuleListener {
  if (!context.sourceCode.text.includes("setTimeout")) return {};

  const fEntries: { kind: FunctionKind; node: TSESTreeFunction }[] = [];
  const sEntries: TimerEntry[] = [];
  const rEntries: TimerEntry[] = [];

  return {
    [":function"](node) {
      fEntries.push({ kind: getPhaseKindOfFunction(node) ?? "other", node });
    },
    [":function:exit"]() {
      fEntries.pop();
    },
    CallExpression(node) {
      const fEntry = fEntries.at(-1);
      if (!ComponentPhaseRelevance.has(fEntry?.kind)) return;
      switch (getCallKind(node)) {
        case "setTimeout":
          sEntries.push({/* ... */});
          break;
        case "clearTimeout":
          rEntries.push({/* ... */});
          break;
      }
    },
    "Program:exit"() {
      for (const sEntry of sEntries) {
        if (rEntries.some((r) => isInverseEntry(sEntry, r))) continue;
        context.report({ messageId: "expectedClearTimeoutInCleanup", node: sEntry.node });
      }
    },
  };
}
```

**Examples:** `no-leaked-timeout`, `no-leaked-interval`,
`no-leaked-event-listener`, `no-leaked-fetch`, `no-leaked-resize-observer`,
`no-leaked-intersection-observer`

### 4.7 Import-tracking

Some `react-dom` rules track local import names for the React DOM API, then
match calls against those names (rather than relying solely on the call
helper). They typically also carry a version gate (§3).

**Examples:** `no-hydrate`, `no-render`, `no-use-form-state`

---

## 5. Rule Precheck and Visitor Strategy Reference

| Rule                                         | Plugin              | Precheck                                             | Extra gate  | Visitor strategy                               |
| -------------------------------------------- | ------------------- | ---------------------------------------------------- | ----------- | ---------------------------------------------- |
| `no-access-state-in-setstate`                | `react-x`           | `includes("setState")`                               | —           | Stack-based                                    |
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
| `no-find-dom-node`                           | `react-dom`         | `includes("findDOMNode")`                            | —           | `CallExpression` immediate                     |
| `no-flush-sync`                              | `react-dom`         | `includes("flushSync")`                              | —           | `CallExpression` immediate                     |
| `no-hydrate`                                 | `react-dom`         | `includes("hydrate")`                                | `>= 18.0.0` | Import-tracking                                |
| `no-render`                                  | `react-dom`         | `includes("render")`                                 | `>= 18.0.0` | Import-tracking                                |
| `no-use-form-state`                          | `react-dom`         | `includes("useFormState")`                           | `>= 19.0.0` | Import-tracking                                |
| `context-name`                               | `naming-convention` | `includes("createContext")`                          | —           | `CallExpression` immediate                     |
| `id-name`                                    | `naming-convention` | `includes("useId")`                                  | —           | `CallExpression` immediate                     |
| `ref-name`                                   | `naming-convention` | `includes("useRef")`                                 | —           | `CallExpression` immediate                     |
| `function-definition`                        | `react-rsc`         | `includes("use server") \|\| includes("use client")` | —           | Directive-aware traversal                      |

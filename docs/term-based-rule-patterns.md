# Term-Based Rule Patterns

This document describes how **term-based rules** are implemented.
It also describes how they use fast-path text prechecks to skip files that cannot contain violations.

---

## 1. What Is a Term-Based Rule?

A term-based rule targets a specific React or Web API term that appears directly in the rule name. Examples:

| Rule                       | Target Term                                        |
| -------------------------- | -------------------------------------------------- |
| `no-forward-ref`           | `forwardRef`                                       |
| `no-use-context`           | `useContext`                                       |
| `no-create-ref`            | `createRef`                                        |
| `no-clone-element`         | `cloneElement`                                     |
| `no-component-will-mount`  | `componentWillMount`                               |
| `no-class-component`       | `Component`                                        |
| `no-children-map`          | `Children.map` (detected via `core.isChildrenMap`) |
| `set-state-in-effect`      | `useEffect` (regex `/use\w*Effect/u`)              |
| `no-leaked-timeout`        | `setTimeout`                                       |
| `no-leaked-fetch`          | `fetch` + `useEffect`                              |
| `no-leaked-event-listener` | `addEventListener` + `useEffect`                   |

---

## 2. Fast-Path Precheck Pattern

Almost every term-based rule begins `create()` with a cheap string check against the entire file source.
If the term is absent, the rule returns an empty visitor `{}` immediately.
This avoids all AST traversal overhead.

### 2.1 Single-term check (`String.prototype.includes`)

```ts
export function create(context: RuleContext<MessageID, []>) {
  // Fast path: skip if `forwardRef` is not present in the file
  if (!context.sourceCode.text.includes("forwardRef")) {
    return {};
  }
  // ...full AST visitors
}
```

**Rules using this:**

- `no-forward-ref`
- `no-use-context`
- `no-create-ref`
- `no-clone-element`
- `no-class-component`
- `no-component-will-mount`
- `no-set-state-in-component-did-update`
- `no-access-state-in-setstate`
- `no-missing-context-display-name`
- `no-misused-capture-owner-stack`
- `use-memo`
- `no-duplicate-key` (`key=`)
- `no-leaked-timeout`
- `no-leaked-interval`
- `no-leaked-resize-observer`
- `no-leaked-fetch` (first check)
- `no-leaked-event-listener` (first check)

### 2.2 Multi-term check

A rule that cares about several independent terms checks them together:

```ts
// Skip if neither `memo` nor `forwardRef` is present
if (!context.sourceCode.text.includes("memo") && !context.sourceCode.text.includes("forwardRef")) {
  return {};
}
```

**Rules using this:** `no-missing-component-display-name`

### 2.3 Regex check

When the term is a family of names (for example, any effect hook), a regex is used:

```ts
// Skip if no effect-like hook is present
if (!/use\w*Effect/u.test(context.sourceCode.text)) return {};
```

**Rules using this:**

- `set-state-in-effect`
- `no-leaked-fetch` (second check)
- `no-leaked-event-listener` (second check)

---

## 3. Implementation Patterns After the Fast Path

Once the fast path is passed, rules fall into one of four visitor strategies.

### 3.1 Immediate report on matching node

The simplest pattern visits the exact AST node type and reports when a helper confirms the term.

```ts
export function create(context: RuleContext<MessageID, []>) {
  return merge({
    CallExpression(node) {
      if (core.isCloneElementCall(context, node)) {
        context.report({ messageId: "default", node });
      }
    },
  });
}
```

**Examples:** `no-clone-element`, `no-create-ref`, `no-children-map`

### 3.2 Collector + `Program:exit`

Rules that need to inspect a whole component (or class) first collect data via a collector from `@eslint-react/core`.
They validate in bulk at `Program:exit`.

```ts
export function create(context: RuleContext<MessageID, []>) {
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

**Examples:** `no-class-component`, `no-component-will-mount`, `no-forward-ref`

### 3.3 Stack-based tracking

When a violation can only happen inside a nested context (for example, inside a `setState` call inside a class component), the rule maintains stacks.

```ts
export function create(context: RuleContext<MessageID, []>) {
  if (!context.sourceCode.text.includes("setState")) return {};

  const classStack: [node: ClassNode, isComponent: boolean][] = [];
  const methodStack: [node: MethodNode, isStatic: boolean][] = [];
  const setStateStack: [node: CallExpression, hasThisState: boolean][] = [];

  return merge({
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
  });
}
```

**Examples:** `no-access-state-in-setstate`

### 3.4 Web-API collect-and-match

`react-web-api` rules collect add/set calls and remove/clear calls.
They match them in `Program:exit`.

```ts
export function create(context: RuleContext<MessageID, []>) {
  if (!context.sourceCode.text.includes("setTimeout")) return {};

  const fEntries: { kind: FunctionKind; node: TSESTreeFunction }[] = [];
  const sEntries: TimerEntry[] = [];
  const rEntries: TimerEntry[] = [];

  return merge({
    [":function"](node) {
      fEntries.push({ kind: getPhaseKindOfFunction(node) ?? "other", node });
    },
    [":function:exit"]() { fEntries.pop(); },
    CallExpression(node) {
      const fEntry = fEntries.at(-1);
      if (!ComponentPhaseRelevance.has(fEntry?.kind)) return;
      switch (getCallKind(node)) {
        case "setTimeout":
          sEntries.push({ ... });
          break;
        case "clearTimeout":
          rEntries.push({ ... });
          break;
      }
    },
    "Program:exit"() {
      for (const sEntry of sEntries) {
        if (rEntries.some((r) => isInverseEntry(sEntry, r))) continue;
        context.report({ messageId: "expectedClearTimeoutInCleanup", node: sEntry.node });
      }
    },
  });
}
```

**Examples:** `no-leaked-timeout`, `no-leaked-interval`, `no-leaked-event-listener`, `no-leaked-fetch`, `no-leaked-resize-observer`

---

## 4. Guidelines for Adding Fast-Path Checks

1. **Always precheck when the target term is rare.**
   If a rule only triggers on `forwardRef`, skipping files without that string provides significant performance benefits.
2. **Use `includes()` for literal terms.** It is the fastest JavaScript string search.
3. **Use regex only for families** (for example, `/use\w*Effect/u`).
   Keep the regex simple and anchored.
4. **Combine multiple checks when a rule needs multiple concepts.** For example, `no-leaked-fetch` checks both `fetch` and `useEffect` because a fetch outside an effect is not the rule's concern.
5. **Place the precheck as the very first statement in `create()`**, before any collector initialization or scope analysis.
6. **Do not precheck when the rule is structural.** Rules like `no-missing-key` or `no-nested-component-definitions` apply to almost every React file, so a string precheck would not help.

---

## 5. Summary Table

| Rule                          | Precheck                                           | Visitor Strategy                  |
| ----------------------------- | -------------------------------------------------- | --------------------------------- |
| `no-forward-ref`              | `includes("forwardRef")`                           | Collector + `Program:exit`        |
| `no-use-context`              | `includes("useContext")`                           | `CallExpression` immediate        |
| `no-create-ref`               | _none_                                             | `CallExpression` immediate        |
| `no-clone-element`            | _none_                                             | `CallExpression` immediate        |
| `no-class-component`          | `includes("Component")`                            | Collector + `Program:exit`        |
| `no-component-will-mount`     | `includes("componentWillMount")`                   | Collector + `Program:exit`        |
| `no-access-state-in-setstate` | `includes("setState")`                             | Stack-based                       |
| `set-state-in-effect`         | `/use\w*Effect/u`                                  | Complex tracking + `Program:exit` |
| `no-leaked-timeout`           | `includes("setTimeout")`                           | Collect-and-match                 |
| `no-leaked-fetch`             | `includes("fetch")` + `/use\w*Effect/u`            | Collect-and-match                 |
| `no-leaked-event-listener`    | `includes("addEventListener")` + `/use\w*Effect/u` | Collect-and-match                 |

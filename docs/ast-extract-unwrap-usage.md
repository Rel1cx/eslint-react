# Extract.unwrap Usage Guidelines

`Extract.unwrap` is defined in `@eslint-react/ast` and is used to strip away wrapper nodes that do not change the semantic meaning of an expression.

## Table of Contents

- [Definition](#definition)
- [When to Use](#when-to-use)
  - [Scenario 1: Inspecting `node.callee.type`](#scenario-1-inspecting-nodecalleetype)
  - [Scenario 2: Resolving a node and inspecting its type](#scenario-2-resolving-a-node-and-inspecting-its-type)
  - [Scenario 3: Inspecting `node.parent` or `node.init`](#scenario-3-inspecting-nodeparent-or-nodeinit)
- [Common Patterns That Are Already Safe](#common-patterns-that-are-already-safe)
- [Checklist Before Committing](#checklist-before-committing)

## Definition

```ts
export function unwrap(node: TSESTree.Node): Exclude<TSESTree.Node, TSESTreeTypeExpression> {
  if (Check.isTypeExpression(node) || node.type === AST.ChainExpression) {
    return unwrap(node.expression);
  }
  return node;
}
```

It recursively unwraps the following wrapper node types:

| Wrapper Type      | AST Node Type               | Example            |
| ----------------- | --------------------------- | ------------------ |
| Type assertion    | `TSAsExpression`            | `(expr as T)`      |
| Type assertion    | `TSTypeAssertion`           | `<T>expr`          |
| Type assertion    | `TSNonNullExpression`       | `expr!`            |
| Type assertion    | `TSSatisfiesExpression`     | `expr satisfies T` |
| Type assertion    | `TSInstantiationExpression` | `expr<T>`          |
| Optional chaining | `ChainExpression`           | `(expr?.method)()` |

## When to Use

Whenever you access a sub-property of a node and immediately inspect its `type`, ask yourself: **could this node be wrapped in a type expression or chain expression?**

The most common omission is inspecting `node.callee.type` without first unwrapping the callee.

### Scenario 1: Inspecting `node.callee.type`

**Always unwrap** when you check `node.callee.type` on a `CallExpression` or `NewExpression`.

```ts
// ❌ Wrong — misses (useState as any)() and (foo?.bar)()
if (node.callee.type === AST.Identifier) {
  return node.callee.name === "useState";
}

// ✅ Correct
const callee = Extract.unwrap(node.callee);
if (callee.type === AST.Identifier) {
  return callee.name === "useState";
}
```

### Scenario 2: Resolving a node and inspecting its type

Variable resolution (`resolve()`) may return a node that is itself wrapped in a type expression. Unwrap before switching on `type`.

```ts
// ❌ Wrong
const init = resolve(context, id);
if (init?.type === AST.CallExpression) { /* ... */ }

// ✅ Correct
const init = resolve(context, id);
const unwrapped = init == null ? null : Extract.unwrap(init);
if (unwrapped?.type === AST.CallExpression) { /* ... */ }
```

### Scenario 3: Inspecting `node.parent` or `node.init`

If a node comes from a parent property like `variableDeclarator.init`, it may be wrapped.

```ts
// ❌ Wrong
if (node.init.type === AST.MemberExpression) { /* ... */ }

// ✅ Correct
const init = Extract.unwrap(node.init);
if (init.type === AST.MemberExpression) { /* ... */ }
```

## Common Patterns That Are Already Safe

The following patterns **do not** need additional unwrapping because the utility already handles it internally:

- `core.isHookCall(node)` — internally unwraps `node.callee`.
- `core.isAPICall(api)(context, node)` — internally unwraps `node.callee`.
- `Compare.isEqual(a, b)` — internally unwraps type expressions on both sides.
- `Check.isIdentifier(name)(node)` — does **not** unwrap; wrap the node first if needed.

## Checklist Before Committing

When you write or review code that inspects AST node types, verify:

1. [ ] Any `node.callee.type` check is preceded by `Extract.unwrap(node.callee)`.
2. [ ] Any resolved node (`resolve()`, `findParent()`, etc.) is unwrapped before `.type` inspection.
3. [ ] Any `node.init`, `node.parent`, or similar property accessed for type inspection is unwrapped.
4. [ ] Existing helper functions (`isHookCall`, `isAPICall`, etc.) are used instead of re-implementing callee checks.

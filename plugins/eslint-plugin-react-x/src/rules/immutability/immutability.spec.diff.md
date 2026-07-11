# immutability IMPL–SPEC Diff Report

**IMPL**: `immutability.ts` + `lib.ts` (ESLint AST rule)\
**SPEC**: `immutability.spec.md` / React Compiler `ValidateNoFreezingKnownMutableFunctions`

> Scope: this report compares the validation behavior implemented by this rule with the compiler pass described by the local SPEC. The compiler pass consumes HIR operands that have already been assigned `Freeze` effects; it does not itself decide which JSX or hook syntax receives those effects. Therefore, syntax-specific sink omissions below are confirmed IMPL boundaries, but their exact compiler behavior also depends on upstream HIR/effect inference.

## 1. Summary

| Area                       | Alignment                       | Main difference                                                                                         |
| -------------------------- | ------------------------------- | ------------------------------------------------------------------------------------------------------- |
| Mutable-function model     | Same goal                       | SPEC consumes inferred aliasing effects; IMPL infers from selected AST mutation syntax                  |
| Captured variables         | Aligned for resolvable bindings | IMPL excludes unresolved globals and global/module-scope bindings                                       |
| Transitive nested closures | Covered                         | IMPL walks lexical ancestors; SPEC propagates mutation effects                                          |
| Function aliases           | Partial                         | IMPL follows variable-declarator initializer chains only                                                |
| Mutation targets           | Partial                         | IMPL follows identifier initializer aliases, but not assignments or member storage                      |
| Freeze sinks               | Core forms covered              | IMPL collects only direct JSX attributes, non-spread hook arguments, and direct hook return expressions |
| Ref exception              | Heuristic approximation         | Names and aliased `useRef()` initializers replace the SPEC's type-based check                           |
| Diagnostics                | Same two locations              | IMPL emits two ESLint problems instead of one diagnostic with two details                               |

Overall, the IMPL matches the SPEC's three principal use cases, but it is a syntax- and naming-based approximation rather than an effect-equivalent implementation.

## 2. Detection Model

### SPEC

The compiler pass operates on HIR after aliasing-effect inference:

1. A `FunctionExpression` becomes known-mutable when its inferred `Mutate` or `MutateTransitive` effect targets a function-context value that is not ref-like.
2. Known mutation effects propagate through `LoadLocal`, `StoreLocal`, and nested function effects.
3. A diagnostic is produced when a known-mutable function reaches an operand with `Effect.Freeze`.
4. Standalone conditional effects (`MutateConditionally` and `MutateTransitiveConditionally`) do not create known-mutable functions, although they can propagate an already-known mutation.

### IMPL

The ESLint rule performs one AST traversal and defers correlation until `Program:exit`:

1. It collects selected syntactic mutation sites and direct sink expressions.
2. For each mutation, it resolves the root identifier through variable-declarator initializer aliases and walks outward through enclosing functions.
3. Global/module origins are discarded. Each function before a local origin's declaring function is marked as mutating a capture. This naturally marks outer functions when the mutation is nested inside arbitrarily deep inline closures.
4. Each sink is resolved to a function and checked against the mutable-function map.

The mutable-function map stores one representative mutation per function. In the IMPL this is the first collected mutation in source traversal order; later captured-variable mutations in the same function do not produce additional diagnostics for that sink. The compiler pass likewise associates a known function value with one representative mutation effect, though the selected effect is determined by effect-inference order rather than ESLint AST traversal.

## 3. Mutation Recognition

| Mutation form                                             | IMPL behavior                                            |
| --------------------------------------------------------- | -------------------------------------------------------- |
| Captured identifier assignment (`x = value`, `x += 1`)    | Detected                                                 |
| Captured identifier update (`x++`, `--x`)                 | Detected                                                 |
| Member assignment/update (`x.foo = value`, `x[0]++`)      | Detected from the root identifier                        |
| Member deletion (`delete x.foo`)                          | Detected from the root identifier                        |
| Receiver method (`push`, `set`, `add`, etc.)              | Detected when the property name is in `MUTATING_METHODS` |
| Computed string property (`cache["set"](...)`)            | Detected                                                 |
| Optional-chain receiver (`cache?.set(...)`)               | Detected                                                 |
| Conditional syntactic mutation (`if (cond) x++`)          | Treated as definite                                      |
| Ordinary function call (`mutate(x)`, `fn()`)              | Not treated as a mutation                                |
| Receiver without a root identifier (`getItems().push(1)`) | Ignored                                                  |
| Unresolvable/implicit-global root                         | Ignored                                                  |

Important precision differences:

- **No type-driven method effects**: every matching method name is treated as mutating regardless of receiver type, so a custom `obj.push()` is a false positive. Mutators absent from `MUTATING_METHODS` are missed.
- **Initializer-only mutation-target alias propagation**: identifier aliases declared with an initializer are traced to their origin, including aliases created inside the callback. Assignment aliases (`let alias; alias = cache`), destructuring, member storage, and subsequent writes to an initialized alias are not modeled.
- **No call-effect propagation**: a wrapper such as `() => fn()` is not marked mutable merely because `fn` is known-mutable. The SPEC can represent this through inferred transitive effects.
- **Conditional over-approximation**: the IMPL has no equivalent of conditional aliasing effects, so any recognized mutation syntax is considered definite even when control-flow conditional.
- **Global/context boundary**: unresolved globals and bindings whose origin is declared in global/module scope are ignored, matching the SPEC's function-context boundary.

## 4. Function Resolution and Freeze Sinks

### Function resolution

`resolveToFunctionNode()` accepts:

- inline function expressions;
- function declarations referenced by identifier;
- recursive chains of variable-declarator initializers, including `const`, `let`, or `var` aliases;
- expressions wrapped by supported TypeScript/chain wrappers through `Extract.unwrap()`.

It does not resolve:

- assignment aliases created after declaration (`let fn2; fn2 = fn;`);
- member storage (`obj.fn`, including `{ fn }`);
- functions returned by calls (`makeFn()`);
- functions wrapped in arrays, objects, or other expressions.

Nested-closure propagation is separate from alias resolution: a syntactic mutation in a nested function marks each lexical ancestor up to the function that declares the mutated root.

### Sink collection

| Sink          | IMPL collection boundary                                                                                             |
| ------------- | -------------------------------------------------------------------------------------------------------------------- |
| JSX prop      | Every `JSXAttribute` whose value is a non-empty `JSXExpressionContainer`; host and custom elements are treated alike |
| Hook argument | Every non-spread argument of a call matched by `core.isHookCall`                                                     |
| Hook return   | Each direct explicit or implicit return expression collected for a hook definition                                   |

Hook names follow `isHookName`: exactly `use`, or `use` followed by an uppercase letter or digit. Member calls such as `React.useEffect(fn)` are included; names such as `useful` are not.

Hook return collection is naming-based. It covers named function declarations and function expressions/arrows whose resolved function ID is hook-like. Returns from nested non-hook functions are associated with those nested functions, not with the outer hook.

Confirmed IMPL sink omissions:

- JSX spread attributes (`<Foo {...{ fn }} />`);
- JSX children expression containers (`<Foo>{fn}</Foo>`);
- spread hook arguments (`useHook(...fns)`);
- returned wrappers (`return { fn }`, `return [fn]`, and similar forms).

The local SPEC describes JSX props, hook arguments, and hook returns at a semantic level. Whether each omitted syntax shape receives a `Freeze` effect in the compiler is determined before `ValidateNoFreezingKnownMutableFunctions` and is not established by this validation pass alone.

## 5. Ref Exception

The SPEC exempts mutations using `isRefOrRefLikeMutableType`, which is type-based.

The IMPL uses two non-type-based checks:

1. **Name heuristic**: `ref` or any case-sensitive name ending in `Ref`, at any identifier/property segment in a member chain.
2. **Initializer provenance check**: for member-based mutations, follow identifier-only variable-declarator aliases and exempt the root when the chain originates from a bare or namespaced `useRef()` call.

Consequences:

- `props.myRef.current = value` is exempt by name.
- `const mounted = useRef(false); mounted.current = true` is exempt by initializer.
- `const timerRef = { current: 0 }` is also exempt, causing a deliberate false negative.
- `myref.current = value` is not exempt because matching is case-sensitive.
- `const alias = mounted; alias.current = true` is exempt when `mounted` originates from `useRef()`.
- Assignment aliases, subsequent writes, custom ref-like hooks, destructured refs, and unnamed ref-like props are not modeled unless the naming heuristic happens to match.
- Direct identifier assignment/update uses only the name heuristic; the `useRef()` initializer check is applied to member-chain mutation paths.

## 6. Diagnostics

The SPEC emits one compiler diagnostic per frozen usage, with:

- the top-level reason and description;
- one detail at the freeze/usage location;
- one detail at the representative mutation location.

The IMPL emits two independent ESLint reports per sink:

- `default` at the sink expression;
- `mutates` at the representative mutation expression.

This preserves both locations but changes problem counts and grouping. If the same mutable function is used at two sinks, the IMPL emits four reports: two usage reports and two mutation reports at the same mutation location. The SPEC's reason (`Cannot modify local variables after render completes`) is not emitted as an ESLint message; `meta.docs.description` only provides a general rule description.

## 7. Test Coverage Notes

`immutability.spec.ts` pins the IMPL behavior for:

- the three core sink categories;
- assignment, update, delete, member, computed-property, optional-chain, and allow-listed method mutations;
- recursive function initializer aliases and nested lexical closures;
- conditional mutations, module-scope exclusion, initializer mutation aliases, and first-mutation selection;
- ref naming and aliased `useRef()` initializer behavior;
- unsupported assignment aliases, member/call wrappers, indirect calls, non-identifier roots, unresolved globals, and omitted sink shapes.

These tests establish ESLint-rule boundaries only. They do not independently prove how the compiler frontend assigns aliasing or `Freeze` effects to every corresponding JavaScript syntax shape.

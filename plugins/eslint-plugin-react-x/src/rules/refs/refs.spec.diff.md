# refs IMPL–SPEC Diff Report

**IMPL**: `refs.ts` + `lib.ts` (ESLint rule)\
**SPEC**: `refs.spec.md` (React Compiler `ValidateNoRefAccessInRender`)

This report tracks the remaining behavioral differences between the ESLint implementation and the
React Compiler validation pass. For change history, see `CHANGELOG.md`.

---

## 1. Underlying Mechanism

The SPEC operates on typed HIR and uses compiler control-flow information. The IMPL operates on the
ESLint AST, but mirrors the same phases:

1. collect ref, alias, function, call, and access facts;
2. propagate render-time function reachability to a fixed point;
3. validate reached ref accesses;
4. recognize null-guarded initialization and track one initialization per ref.

Bindings are keyed by ESLint `Variable` identities rather than identifier text. Binding events are
position-aware, so shadowed names, separate components, and reassignment do not share stale alias or
function state.

**Remaining difference**: the IMPL uses structured AST analysis rather than a full control-flow
graph. It recognizes enclosing guard regions and terminating sibling guards, but does not attempt
general post-dominator analysis.

---

## 2. What Constitutes a Ref

| Source category                     | SPEC                             | IMPL                                                      |
| ----------------------------------- | -------------------------------- | --------------------------------------------------------- |
| `useRef()` return value             | Detected by inferred type        | Detected via `isUseRefCall`                               |
| `createRef()` return value          | Detected by inferred type        | Detected via `isCreateRefCall`                            |
| Variable alias of a ref             | Propagated by identifier/ref IDs | Propagated by scoped binding identity and source position |
| Prop/member named `ref` or `*Ref`   | Feature/type dependent           | Always detected by naming heuristic                       |
| Identifier used in a JSX `ref` prop | Detected                         | Detected by scoped variable identity                      |

**Remaining difference**: the IMPL intentionally preserves the rule's existing `ref`/`*Ref` naming
heuristic without the compiler feature flag. This is more aggressive and can report a non-ref object
whose name looks like a ref.

---

## 3. Lazy Initialization

The IMPL allows one direct `ref.current = value` assignment in the branch proven nullish by an exact
comparison:

- `== null`, `=== null`, `!= null`, `!== null`;
- equality/inequality against the global `undefined` value or `void ...`;
- reversed operands and a negated binary comparison.

It also supports the inverted early-return form only when the non-null branch unconditionally
returns or throws. Unrelated nested conditions do not hide an outer null guard.

Truthiness checks such as `if (!ref.current)` are not treated as null guards because valid initialized
values can be falsy. Arbitrary comparison values are likewise rejected.

A second allowed initialization of the same scoped ref identity is reported as `duplicateRefInit`,
including initialization through an alias and initialization after an inverted early-return guard.

**Verdict**: behavior is aligned for the syntax representable without general HIR control-flow
analysis.

---

## 4. Nested Functions and Synchronous Callbacks

The IMPL builds a scoped call graph for:

- function expressions and function declarations;
- direct calls and IIFEs;
- simple variable aliases;
- functions assigned to simple object properties;
- synchronous array callbacks such as `.map()`, `.forEach()`, and `.reduce()`;
- render-time callbacks for `useState`, `useMemo`, and `useReducer`.

Reachability is propagated until no new function is found. Effects, event handlers, `useCallback`,
promise handlers, timers, and other deferred callbacks remain outside render unless directly called
from a reached function.

**Remaining difference**: the IMPL does not propagate a caller's ref identity into an arbitrarily
named local function parameter. Passing a ref to such a function is still reported with
`refPassedToFunction`, but accesses through a non-ref-like parameter are not independently modeled.

---

## 5. Passing Refs to Functions

Directly passing a known ref to a non-hook function during render is reported. Hook calls,
`mergeRefs`, and member calls named `render` retain their compatibility exemptions.

**Remaining difference**: without compiler type/calling-convention information, a member named
`render` or function named `mergeRefs` cannot always be proven to be the intended helper.

---

## 6. Nested Property Writes

Writes such as `ref.current.inner = value` and `ref.current.inner++` are classified as render-time
writes rather than reads. They are not accepted as lazy initialization because only a direct
assignment to `ref.current` initializes the ref container.

**Verdict**: aligned.

---

## 7. Error Reporting

| Situation                        | Message                                                        |
| -------------------------------- | -------------------------------------------------------------- |
| Read during render               | `Cannot access refs during render`                             |
| Write during render              | `Cannot update ref during render`                              |
| Ref passed to function           | `Passing a ref to a function may read its value during render` |
| Duplicate guarded initialization | `Ref is initialized more than once during render...`           |

The compiler can attach multiple locations to one diagnostic. ESLint reports the duplicate
initialization at the second initialization site.

---

## 8. Known Remaining Gaps

1. No full CFG/post-dominator analysis; complex labeled control flow, `try`/`finally`, and equivalent
   user-defined guard abstractions are not proven safe.
2. Ref identity is not propagated into arbitrary local function parameters.
3. The `ref`/`*Ref` naming heuristic is always enabled and may be more aggressive than compiler type
   inference.
4. Render-helper exemptions are based partly on callable names because ESLint does not have the
   compiler's calling-convention metadata.

# purity IMPL–SPEC Diff Report

## Verification metadata

- **IMPL**: `purity.ts` + `lib.ts` (ESLint rule)
- **SPEC**: React Compiler behavior at the pinned React commit, verified directly from the sources and fixtures below
- **Implementation commit**: `c3318d07024f01e4c869304ee638a42bbf435272`
- **React commit**: `9ffcb463b0ab01a42e781d4dc2e00f3a1b97a188`
- **Last verified**: `2026-10-23`
- **React package**: `compiler/packages/babel-plugin-react-compiler`
- **Implementation sources/tests**:
  - `purity.ts`
  - `lib.ts`
  - `purity.spec.ts`
- **React sources/fixtures**:
  - `src/Inference/InferMutationAliasingEffects.ts`
  - `src/Entrypoint/Pipeline.ts`
  - `src/Validation/ValidateNoImpureFunctionsInRender.ts`
  - `src/HIR/Globals.ts`
  - `src/HIR/ObjectShape.ts`
  - `src/__tests__/fixtures/compiler/error.invalid-impure-functions-in-render.{js,expect.md}`
  - `src/__tests__/fixtures/compiler/error.invalid-new-date-in-render.{js,expect.md}`
  - `src/__tests__/fixtures/compiler/valid-new-date-from-timestamp.{js,expect.md}`

## 1. Detection mechanism

### React Compiler

The active check is part of `inferMutationAliasingEffects`, which `Pipeline.ts` invokes. With `validateNoImpureFunctionsInRender` enabled, an impure function signature creates an `ErrorCategory.Purity` diagnostic at the call location. Since facebook/react#37576 the condition is `signature.impure && validateNoImpureFunctionsInRender && (!signature.impureIfNoArgs || args.length === 0)`: signatures flagged `impureIfNoArgs` (currently only `Date` in `Globals.ts`) are impure only for zero-argument calls. Because ordinary and constructor calls share the `Date` signature, `Date()` and `new Date()` are reported while `Date(timestamp)` and `new Date(timestamp)` are not.

`ValidateNoImpureFunctionsInRender.ts` contains a similar standalone HIR scan, but `Pipeline.ts` does not import or call it. It is an unwired alternative, not the active pass.

### ESLint rule

The rule visits `CallExpression` and `NewExpression`, records known-impure calls, and reports at `Program:exit` only when its immediate enclosing function is collected as a component or hook.

Detection is driven by `IMPURE_FUNCS` and `IMPURE_CTORS`. The pure catalogues in `lib.ts` never produce a report, but they are consulted indirectly: `isCatalogObject` (`IMPURE_FUNCS` ∪ `PURE_FUNCS`) decides how far member chains resolve (`window.Math.random`) and whether constructor member aliases (`const W = window.WebSocket`) are trusted.

**Verdict**: Both implementations report impure calls directly. React is driven by compiler function signatures during effect inference; ESLint is driven by explicit deny-lists and AST/component-hook analysis.

## 2. Catalogue and name resolution

- **React**: the active source condition is `signature.impure`, gated by `impureIfNoArgs` for zero-argument-only signatures. The verified React fixtures cover `Date.now`, `performance.now`, and `Math.random` (`error.invalid-impure-functions-in-render`), plus zero-argument `new Date()` as an error and `new Date(timestamp)` as valid (`error.invalid-new-date-in-render`, `valid-new-date-from-timestamp`). The shared `Date` signature also allows `Date(timestamp)`, although the cited fixtures do not cover that case.
- **React `IntersectionObserver`**: `Globals.ts` gives the constructor an explicit non-impure signature with a frozen callback and read-only options. Constructing an observer is therefore not rejected by this purity check; observation starts only with a later `observe()` call.
- **ESLint**: only names present in `IMPURE_FUNCS` or `IMPURE_CTORS` are candidates. `Date` is present in both the `globalThis` and `window` impure-function catalogues, so `Date()`, `Date(arg)`, and `window.Date()` are all reported.
- **ESLint aliases**: `resolveBuiltinObjectName` returns a builtin object name plus an optional property path. It follows simple variable-initializer chains to a global root (`const M = Math`), member-function aliases (`const random = Math.random`, `const { random } = Math`), and intermediate catalog objects (`window.Math.random`). Unknown-global roots are not followed through catalog object names, and constructor member aliases are trusted only for known catalog objects.
- **ESLint shadowing**: parameters, imports, function declarations, and other local definitions do not resolve as built-ins; implicit or unresolved globals do.
- **ESLint constructors**: resolved identifier constructors in `IMPURE_CTORS`, including `IntersectionObserver`, are reported, except `new Date(arg)` is allowed when at least one argument is present; zero-argument `new Date()` is reported. Direct member-expression callees such as `new window.WebSocket()` are not resolved or reported, although the equivalent identifier alias is.

**Verdict**: The `new Date(arg)` exception matches upstream behavior, but `Date(arg)` intentionally differs. JavaScript ignores arguments to non-constructor `Date` calls and returns the current time, so ESLint's report is semantically correct; upstream's shared `impureIfNoArgs` signature produces a false negative there. Conversely, upstream's non-impure `IntersectionObserver` signature better reflects construction-only semantics: creating a fresh observer does not start observation or invoke its callback, while ESLint's constructor deny-list is stricter than render-purity semantics require. The direct member-expression constructor gap is an ESLint name-resolution limitation, not a semantic distinction. Alias and shadowing behaviors remain explicit ESLint behaviors with no corresponding upstream fixture coverage.

## 3. Reporting

|                       | React Compiler                              | ESLint rule                                      |
| --------------------- | ------------------------------------------- | ------------------------------------------------ |
| Location              | One call location                           | One `CallExpression` or `NewExpression` location |
| Category / message ID | `ErrorCategory.Purity`                      | `default`                                        |
| Primary text          | `Cannot call impure function during render` | `Do not call '{{name}}' during render...`        |
| Function name         | Canonical signature name when available     | Source text of the reported AST node             |

There is no current upstream dual-location diagnostic to reproduce. The React expected output highlights only each impure call, not the later JSX use.

## 4. Scope differences

- **React** performs the active check when effect inference processes an impure signature under the compiler option.
- **ESLint** requires the call's immediate enclosing function to be a collected component or hook. Calls inside nested event handlers, effect callbacks, state initializers, and other nested non-component functions are therefore not reported by this rule.
- **ESLint** exempts async function components in modules without a `use client` directive: they are treated as Server Components that render once per request on the server, so calls like `Date.now()` or `cookieStore.get()` are valid there (`hasUseClientDirective` in `lib.ts`). Sync components in such modules and async components in `use client` modules are still reported.
- **ESLint** reports a known impure call regardless of how its result is subsequently used; it does not propagate impurity through returned values, assignments, object mutation, or control-flow merges.

**Verdict**: React uses signature-based compiler validation. ESLint uses closed-world AST call detection. Current upstream behavior is call-site validation, not the value-flow model described by the previous report.

## 5. Verification boundaries

### Source-verified

- React's active branch, option gate, `impureIfNoArgs` zero-argument gate, signature check, `Purity` category, reason, and single call location.
- React's `Date` global signature in `Globals.ts` carries `impure: true` with `impureIfNoArgs: true` and canonical name `Date`. Because the signature is shared by ordinary and constructor calls, the source condition allows both `Date(arg)` and `new Date(arg)`.
- React's `IntersectionObserver` global signature is not impure, freezes its callback for later delivery, and reads its options.
- The standalone React validator is present but not connected to `Pipeline.ts`.
- ESLint's use of `IMPURE_FUNCS` / `IMPURE_CTORS` for detection, indirect use of the pure catalogues via `isCatalogObject`, component-hook ownership check, Server Component exemption, alias resolution, shadowing handling, and `new Date(arg)` exception.
- ESLint reports `Date(arg)`, includes `IntersectionObserver` in `IMPURE_CTORS`, and skips direct member-expression constructor callees such as `new window.WebSocket()`.

### Fixture-verified

- React reports exactly one call-site error each for `Date.now`, `performance.now`, and `Math.random` in `error.invalid-impure-functions-in-render`.
- React reports zero-argument `new Date()`, `new Date().getTime()`, and `new Date().getFullYear()` in `error.invalid-new-date-in-render`, and compiles `new Date(timestamp)` without error in `valid-new-date-from-timestamp`.
- ESLint tests cover those direct calls, `Date()` and `Date(arg)` without `new`, and its own alias, shadowing, constructor, nested-function, and Server Component / `use client` behavior.

### Not locked by the cited React fixtures

- React behavior for non-constructor `Date(arg)` or `IntersectionObserver` construction
- React behavior for aliases, shadowed globals, nested helpers, or callbacks
- React's complete impure-signature catalogue beyond the `Date`, `performance`, and `Math` entries exercised by fixtures
- Behavioral equivalence between the active inference branch and the unwired standalone validator

# purity IMPL–SPEC Diff Report

## Verification metadata

- **IMPL**: `purity.ts` + `lib.ts` (ESLint rule)
- **SPEC**: `purity.spec.md` (current React Compiler behavior)
- **Implementation commit**: `629632d3d4bf810db428b99b604c0a90ebe8a262`
- **React commit**: `7c6ac13e19fef500b7f669a16bbd01ecc95965ca`
- **Last verified**: `2026-09-30`
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

The active check is part of `inferMutationAliasingEffects`, which `Pipeline.ts` invokes. With `validateNoImpureFunctionsInRender` enabled, an impure function signature creates an `ErrorCategory.Purity` diagnostic at the call location. Since facebook/react#37576 the condition is `signature.impure && validateNoImpureFunctionsInRender && (!signature.impureIfNoArgs || args.length === 0)`: signatures flagged `impureIfNoArgs` (currently only `Date` in `Globals.ts`) are impure only for zero-argument calls, so `new Date()` is reported while `new Date(timestamp)` is not.

`ValidateNoImpureFunctionsInRender.ts` contains a similar standalone HIR scan, but `Pipeline.ts` does not import or call it. It is an unwired alternative, not the active pass.

### ESLint rule

The rule visits `CallExpression` and `NewExpression`, records known-impure calls, and reports at `Program:exit` only when its immediate enclosing function is collected as a component or hook.

Detection is driven by `IMPURE_FUNCS` and `IMPURE_CTORS`. The pure catalogues in `lib.ts` never produce a report, but they are consulted indirectly: `isCatalogObject` (`IMPURE_FUNCS` ∪ `PURE_FUNCS`) decides how far member chains resolve (`window.Math.random`) and whether constructor member aliases (`const W = window.WebSocket`) are trusted.

**Verdict**: Both implementations report impure calls directly. React is driven by compiler function signatures during effect inference; ESLint is driven by explicit deny-lists and AST/component-hook analysis.

## 2. Catalogue and name resolution

- **React**: the active source condition is `signature.impure`, gated by `impureIfNoArgs` for zero-argument-only signatures. The verified React fixtures cover `Date.now`, `performance.now`, and `Math.random` (`error.invalid-impure-functions-in-render`), plus zero-argument `new Date()` as an error and `new Date(timestamp)` as valid (`error.invalid-new-date-in-render`, `valid-new-date-from-timestamp`).
- **ESLint**: only names present in `IMPURE_FUNCS` or `IMPURE_CTORS` are candidates.
- **ESLint aliases**: `resolveBuiltinObjectName` returns a builtin object name plus an optional property path. It follows simple variable-initializer chains to a global root (`const M = Math`), member-function aliases (`const random = Math.random`, `const { random } = Math`), and intermediate catalog objects (`window.Math.random`). Unknown-global roots are not followed through catalog object names, and constructor member aliases are trusted only for known catalog objects.
- **ESLint shadowing**: parameters, imports, function declarations, and other local definitions do not resolve as built-ins; implicit or unresolved globals do.
- **ESLint constructors**: constructors in `IMPURE_CTORS` are reported, except `new Date(arg)` is allowed when at least one argument is present; zero-argument `new Date()` is reported.

**Verdict**: The `new Date(arg)` exception now matches upstream behavior: since facebook/react#37576 the compiler treats zero-argument `new Date()` as impure via the `impureIfNoArgs` signature flag while allowing `new Date(timestamp)`. Alias and shadowing behaviors remain explicit ESLint behaviors with no corresponding upstream fixture coverage.

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
- React's `Date` global signature in `Globals.ts` carries `impure: true` with `impureIfNoArgs: true` and canonical name `Date`.
- The standalone React validator is present but not connected to `Pipeline.ts`.
- ESLint's use of `IMPURE_FUNCS` / `IMPURE_CTORS` for detection, indirect use of the pure catalogues via `isCatalogObject`, component-hook ownership check, Server Component exemption, alias resolution, shadowing handling, and `new Date(arg)` exception.

### Fixture-verified

- React reports exactly one call-site error each for `Date.now`, `performance.now`, and `Math.random` in `error.invalid-impure-functions-in-render`.
- React reports zero-argument `new Date()`, `new Date().getTime()`, and `new Date().getFullYear()` in `error.invalid-new-date-in-render`, and compiles `new Date(timestamp)` without error in `valid-new-date-from-timestamp`.
- ESLint tests cover those direct calls as well as its own alias, shadowing, constructor, nested-function, and Server Component / `use client` behavior.

### Not locked by the cited React fixtures

- React behavior for aliases, shadowed globals, nested helpers, or callbacks
- React's complete impure-signature catalogue beyond the `Date`, `performance`, and `Math` entries exercised by fixtures
- Behavioral equivalence between the active inference branch and the unwired standalone validator

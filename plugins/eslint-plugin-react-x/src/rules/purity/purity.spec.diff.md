# purity IMPL–SPEC Diff Report

## Verification metadata

- **IMPL**: `purity.ts` + `lib.ts` (ESLint rule)
- **SPEC**: `purity.spec.md` (current React Compiler behavior)
- **Implementation commit**: `55c10db7bae04d49606792767530cc1e786dd5a0`
- **React commit**: `c0c39a6b3907eaab35f43074949e2957a2a734c1`
- **Last verified**: `2026-07-14`
- **React package**: `compiler/packages/babel-plugin-react-compiler`
- **Implementation sources/tests**:
  - `purity.ts`
  - `lib.ts`
  - `purity.spec.ts`
- **React sources/fixtures**:
  - `src/Inference/InferMutationAliasingEffects.ts`
  - `src/Entrypoint/Pipeline.ts`
  - `src/Validation/ValidateNoImpureFunctionsInRender.ts`
  - `src/__tests__/fixtures/compiler/error.invalid-impure-functions-in-render.{js,expect.md}`

## 1. Detection mechanism

### React Compiler

The active check is part of `inferMutationAliasingEffects`, which `Pipeline.ts` invokes. With `validateNoImpureFunctionsInRender` enabled, an impure function signature creates an `ErrorCategory.Purity` diagnostic at the call location.

`ValidateNoImpureFunctionsInRender.ts` contains a similar standalone HIR scan, but `Pipeline.ts` does not import or call it. It is an unwired alternative, not the active pass.

### ESLint rule

The rule visits `CallExpression` and `NewExpression`, records known-impure calls, and reports an entry only when its immediate enclosing function is collected as a component or hook.

Detection uses only `IMPURE_FUNCS` and `IMPURE_CTORS`. Although `lib.ts` also exports pure catalogues, `purity.ts` does not import or consult them.

**Verdict**: Both implementations report impure calls directly. React is driven by compiler function signatures during effect inference; ESLint is driven by explicit deny-lists and AST/component-hook analysis.

## 2. Catalogue and name resolution

- **React**: the active source condition is `signature.impure`; the verified React fixture covers `Date.now`, `performance.now`, and `Math.random`.
- **ESLint**: only names present in `IMPURE_FUNCS` or `IMPURE_CTORS` are candidates.
- **ESLint aliases**: `resolveBuiltinObjectName` follows simple variable-initializer chains to a global root, such as `const M = Math` and `const D = Date`.
- **ESLint shadowing**: parameters, imports, function declarations, and other local definitions do not resolve as built-ins; implicit or unresolved globals do.
- **ESLint constructors**: constructors in `IMPURE_CTORS` are reported, except `new Date(arg)` is allowed when at least one argument is present; zero-argument `new Date()` is reported.

**Verdict**: Alias, shadowing, and the `new Date(arg)` exception are explicit ESLint behaviors. The cited React fixture does not establish corresponding upstream behavior.

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
- **ESLint** requires the call's immediate enclosing function to be a collected component or hook. Calls inside nested event handlers, effect callbacks, and other nested non-component functions are therefore not reported by this rule.
- **ESLint** reports a known impure call regardless of how its result is subsequently used; it does not propagate impurity through returned values, assignments, object mutation, or control-flow merges.

**Verdict**: React uses signature-based compiler validation. ESLint uses closed-world AST call detection. Current upstream behavior is call-site validation, not the value-flow model described by the previous report.

## 5. Verification boundaries

### Source-verified

- React's active branch, option gate, signature check, `Purity` category, reason, and single call location.
- The standalone React validator is present but not connected to `Pipeline.ts`.
- ESLint's exclusive use of `IMPURE_FUNCS` / `IMPURE_CTORS`, component-hook ownership check, alias resolution, shadowing handling, and `new Date(arg)` exception.

### Fixture-verified

- React reports exactly one call-site error each for `Date.now`, `performance.now`, and `Math.random` in the cited fixture.
- ESLint tests cover those direct calls as well as its own alias, shadowing, constructor, and nested-function behavior.

### Not locked by the cited React fixture

- React behavior for aliases, shadowed globals, constructors, nested helpers, or callbacks
- React's complete impure-signature catalogue
- Behavioral equivalence between the active inference branch and the unwired standalone validator

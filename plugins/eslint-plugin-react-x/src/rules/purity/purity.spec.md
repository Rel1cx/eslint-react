# Impure function calls during render

**React commit**: `c0c39a6b3907eaab35f43074949e2957a2a734c1`\
**Implementation commit**: `55c10db7bae04d49606792767530cc1e786dd5a0`\
**Last verified**: 2026-07-14\
**Sources**: React Compiler `src/Inference/InferMutationAliasingEffects.ts`, `src/Entrypoint/Pipeline.ts`, and `src/Validation/ValidateNoImpureFunctionsInRender.ts`\
**Fixtures**: React Compiler `src/__tests__/fixtures/compiler/error.invalid-impure-functions-in-render.{js,expect.md}`

## Purpose

When `validateNoImpureFunctionsInRender` is enabled, the React Compiler rejects calls whose function signature is marked `impure`. The diagnostic is created at the impure call; it does not depend on a later use of the returned value.

## Active implementation

`Pipeline.ts` calls `inferMutationAliasingEffects`. While computing effects for a legacy function signature, `InferMutationAliasingEffects.ts` checks:

```typescript
signature.impure && state.env.config.validateNoImpureFunctionsInRender;
```

When true, it creates an `Impure` effect carrying one diagnostic:

- Category: `ErrorCategory.Purity`
- Reason: `Cannot call impure function during render`
- Detail message: `Cannot call impure function`
- Location: the call location passed to effect inference
- Description: the canonical function name, when available, followed by the explanation that an impure function can produce unstable results across re-renders

This is signature-driven call validation. The source branch does not wait for the call result to be returned, placed in JSX, or otherwise consumed before creating the diagnostic.

## Fixture-verified behavior

`error.invalid-impure-functions-in-render.js` enables the option and calls:

```javascript
const date = Date.now();
const now = performance.now();
const rand = Math.random();
```

Its expected output locks in:

- three errors, one for each call;
- the reason `Cannot call impure function during render`;
- canonical names for `Date.now`, `performance.now`, and `Math.random`;
- one highlighted source location per error, at the corresponding call.

The JSX return in this fixture is not reported as a second location.

## Unwired alternative implementation

`src/Validation/ValidateNoImpureFunctionsInRender.ts` contains a standalone validator that scans HIR `MethodCall` and `CallExpression` instructions, resolves their signatures, and emits the same `ErrorCategory.Purity` diagnostic for `signature.impure === true`.

At the verified commit, `Pipeline.ts` neither imports nor calls this validator. It is therefore an unwired alternative implementation, not the active validation path described above.

## Verification boundaries

### Source-verified

- The active check is inside `InferMutationAliasingEffects.ts` and is reached through `Pipeline.ts`.
- It is gated by `validateNoImpureFunctionsInRender` and `signature.impure`.
- It creates a single call-location `Purity` diagnostic.
- The standalone validator exists but is not wired into `Pipeline.ts`.

### Fixture-verified

- Direct calls to `Date.now`, `performance.now`, and `Math.random` produce the three expected call-site errors.

### Not locked by this fixture

- Aliases and local shadowing
- Constructors such as `new Date()`
- Nested helpers or callbacks
- User-provided impure signatures
- The complete set of impure built-ins

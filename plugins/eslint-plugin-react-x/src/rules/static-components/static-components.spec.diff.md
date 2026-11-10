# static-components IMPL–SPEC Diff Report

## Verification metadata

- **IMPL**: `static-components.ts` + `collect.ts` + `origins.ts` + `effects.ts` + `helpers.ts` (ESLint rule)
- **SPEC**: `static-components.spec.md` (React Compiler `ValidateStaticComponents`)
- **Implementation commit**: `55c10db7bae04d49606792767530cc1e786dd5a0` (last full verification; the IMPL has since been restructured into the fact-based layout listed below, and the behaviors enumerated in this report were re-verified against the restructured sources)
- **React commit**: `76baa3b5434fad315ece9cfd4d20d7a8d6c34a25`
- **Last verified**: `2026-11-05`
- **Recent implementation changes**: Changes since the `2026-10-12` verification through `b094c97af6212f9445cfbc47dab78c1d66953935` are behavior-preserving and do not affect the reported limitations: `280c93156b16e9922ad22662a5c673329dbb5f4a` renamed the boundary predicate in `helpers.ts` to `Check.isFunctionOrClass`; `3ac2729d7d74aa45dc1d3565db5282c7c23369f9` restructured `origins.ts` and `static-components.ts` for readability (guard clauses and comments); `6d334cbb89baeced25d66bceffb2e6f4a06651ef` added React Compiler fixture cases to `static-components.spec.ts`; `b68cfb6b9ae7ad05855e627fe979711780a8eb41` aligned docs and comments; `b094c97af6212f9445cfbc47dab78c1d66953935` renamed detection hint constants to all-caps JSX casing. Unwrapping `useMemo` and `useCallback` so the memoized value is traced is a later behavior change: a memoized reference to a static component is no longer reported. Analyzing JSX member expression tags (ex: `<Namespace.Bar />`) by tracing the root binding's property path to the selected value — and member accesses in initializers (ex: `const C = Ns.Bar`) the same way — is a later behavior change as well.
- **React package**: `compiler/packages/babel-plugin-react-compiler`
- **Implementation sources/tests**:
  - `static-components.ts`
  - `collect.ts`
  - `origins.ts`
  - `effects.ts`
  - `helpers.ts`
  - `static-components.spec.ts`
  - `collect.test.ts`
  - `origins.test.ts`
  - `effects.test.ts`
  - `helpers.test.ts`
- **React sources/fixtures**:
  - `src/Validation/ValidateStaticComponents.ts`
  - `src/Entrypoint/Pipeline.ts`
  - `src/Inference/DropManualMemoization.ts`
  - `src/__tests__/fixtures/compiler/static-components/*.{js,expect.md}`

**IMPL** below means the ESLint AST rule. **SPEC pass** means `ValidateStaticComponents` in isolation; **React Pipeline** means the end-to-end compiler path at the verified React commit.

## 1. Execution model

The SPEC pass scans one already-lowered `HIRFunction`. It records HIR values produced by `FunctionExpression`, `NewExpression`, `MethodCall`, or `CallExpression`, propagates their source locations through `LoadLocal`, `StoreLocal`, and phi operands, and reports a tracked identifier used as a `JsxExpression` tag.

The React Pipeline is not equivalent to invoking that pass on source-shaped HIR. Before static-component validation it may run `DropManualMemoization`, then runs additional transforms including IIFE inlining, SSA conversion, redundant-phi elimination, constant propagation, dead-code elimination, and instruction-kind rewriting. Source-level behavior must therefore be established from the Pipeline output or an end-to-end fixture, not from the validator switch alone.

The IMPL scans the ESLint AST, collects uppercase `JSXIdentifier` tags and `JSXMemberExpression` tags (flattened to a root binding plus a property path), resolves bindings through ESLint scope data, and traces declarations, initializers, identifier aliases, ternary branches, both sides of logical expressions, the final element of sequence expressions, object-literal property paths of namespace bindings, simple identifier reassignments, and the value preserved by `useMemo` (the factory's return value) or `useCallback` (the callback itself). A collected function or class component supplies its syntactic render boundary.

## 2. Dynamic values and propagation

| Area                  | SPEC pass                                                                                                                                                      | IMPL                                                                                                                                                                                                                                                                                    |
| --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Direct dynamic values | Every HIR `FunctionExpression`, `NewExpression`, `MethodCall`, and `CallExpression` result is marked dynamic; the pass does not inspect call return semantics. | AST arrow/function/class expressions, calls, and `new` expressions are dynamic when resolved inside a collected render boundary. `useMemo` is traced through the factory's return value and `useCallback` through the callback, so a memoized external component is static.             |
| Declarations          | Depends on how source declarations were lowered into HIR before the pass.                                                                                      | Nested function and class declarations are explicitly dynamic.                                                                                                                                                                                                                          |
| Calls                 | HIR distinguishes `MethodCall` and `CallExpression`.                                                                                                           | ESTree represents both ordinary and member calls as `CallExpression`; this is an IR distinction, not by itself a behavior gap.                                                                                                                                                          |
| Local flow            | `LoadLocal`, `StoreLocal`, and phi operands propagate tracked identifiers.                                                                                     | Variable definitions, identifier initializer chains, ternary branches, logical-expression sides, sequence-expression final elements, object-literal property paths of namespace bindings, `useMemo`/`useCallback` memoized values, and simple assignment writes are traced recursively. |
| Control-flow evidence | The conditional upstream fixture locks one `if/else` assignment joined through HIR flow.                                                                       | Local tests lock dynamic values in either ternary branch, both sides of a logical expression, the final element of a sequence expression, and imperative reassignments including ternary right-hand sides.                                                                              |

AST `ArrowFunctionExpression`, `ClassExpression`, `FunctionDeclaration`, and `ClassDeclaration` names cannot be compared directly with the HIR `FunctionExpression` kind. Their presence on only one side's explicit list does **not** establish that the IMPL covers more source forms than React.

## 3. Detection boundary and reporting

The SPEC pass receives one `HIRFunction` and only checks `JsxExpression` tags whose lowered tag kind is `Identifier`. The IMPL accepts an uppercase `JSXIdentifier` or any `JSXMemberExpression` tag (a member tag is never an intrinsic element, so no component-name gate applies), then requires the candidate definition to be inside a function/class node recognized by the repository's component collectors. For a member tag the root binding's property path is traced to the value it selects, and that value must be dynamically created — a property holding a stable outer-scope component stays static even though the namespace object is rebuilt every render. These different entry and boundary models can diverge, but source syntax alone does not show how a JSX member tag or class-field helper reaches the SPEC pass.

Both implementations report the JSX use and the creation location. Their diagnostics are structurally aligned but not text-identical: React uses the reason/description plus a use-site detail (`This component is created during render`) and a creation-site detail; the IMPL emits its full `default` message at the JSX tag and `created-here` at the creation node.

## 4. Locally locked IMPL limitations

These behaviors are supported by the implementation and `static-components.spec.ts`, but none is locked by the five explicit React `static-components` fixtures:

1. **Non-component-named class-field arrow render helpers are missed.** The local valid test with `_renderMessage = () => { const Message = () => ...; return <Message />; }` receives no IMPL report because that helper's name is not a component name, so it is not a collected component boundary. The miss is name-dependent: the detection hint does not exclude class properties, so a component-named class-field arrow (`RenderMessage = () => ...` returning JSX) IS collected as a boundary and a component nested inside it is flagged (locked by a local invalid test). The blind spot is confirmed only for non-component-named helpers; there is no verified upstream fixture proving whether React reports the same source pattern.
2. **Accessors returning a stable component are flagged.** A property whose getter returns an outer-scope component (`get Bar() { return ExternalComponent; }`) is reported because the getter function itself is recreated with the namespace object every render, and the IMPL does not trace getter return values (locked by a local invalid test). When the getter creates the component on each access the report is semantically correct; the over-approximation only affects accessors holding stable components, which are rare. Class-declared namespaces (`class Ns { static Bar = ... }`) are likewise opaque to the property-path descent and stay unanalyzed (locked by a local valid test). No verified upstream fixture covers accessor or class namespaces.

## 5. Upstream fixture boundary

At the verified React commit there are five explicit `static-components` inputs. They cover a nested component function, direct factory call, method call, constructor call, and conditional assignment/phi propagation. They do **not** cover:

- a class-field arrow render helper containing a nested component;
- a JSX member expression used as the component tag.

`useMemo(() => ExternalComponent)` and the self-referential `useMemo` reassignment are handled by the IMPL: the memoized value is traced, so a static component stays static and a component created inside the factory is still reported. That source pattern is not locked by an upstream fixture. `DropManualMemoization` can remove the hook before `ValidateStaticComponents`, so the verified evidence still does not establish the end-to-end React result.

JSX member tags are handled by the IMPL: the tag is flattened to a root binding plus a property path, and the value the path selects is traced through object literals, namespace aliases, member expression initializers, and namespace reassignments. A property holding a stable outer-scope component is treated as static even though the namespace object is rebuilt every render; a namespace produced by a call or declared as a class is opaque and stays unanalyzed. That source pattern is likewise not locked by an upstream fixture.

Accordingly, the class-field-helper behavior above remains an actionable implementation limitation or conservatism, but it is **not an established React compatibility gap** without an end-to-end upstream fixture or compiler run under a stated configuration.

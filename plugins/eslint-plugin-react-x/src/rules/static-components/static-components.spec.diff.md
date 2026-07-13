# static-components IMPL–SPEC Diff Report

## Verification metadata

- **IMPL**: `static-components.ts` + `lib.ts` (ESLint rule)
- **SPEC**: `static-components.spec.md` (React Compiler `ValidateStaticComponents`)
- **Implementation commit**: `55c10db7bae04d49606792767530cc1e786dd5a0`
- **React commit**: `c0c39a6b3907eaab35f43074949e2957a2a734c1`
- **Last verified**: `2026-07-14`
- **React package**: `compiler/packages/babel-plugin-react-compiler`
- **Implementation sources/tests**:
  - `static-components.ts`
  - `lib.ts`
  - `static-components.spec.ts`
- **React sources/fixtures**:
  - `src/Validation/ValidateStaticComponents.ts`
  - `src/Entrypoint/Pipeline.ts`
  - `src/Inference/DropManualMemoization.ts`
  - `src/__tests__/fixtures/compiler/static-components/*.{js,expect.md}`

**IMPL** below means the ESLint AST rule. **SPEC pass** means `ValidateStaticComponents` in isolation; **React Pipeline** means the end-to-end compiler path at the verified React commit.

## 1. Execution model

The SPEC pass scans one already-lowered `HIRFunction`. It records HIR values produced by `FunctionExpression`, `NewExpression`, `MethodCall`, or `CallExpression`, propagates their source locations through `LoadLocal`, `StoreLocal`, and phi operands, and reports a tracked identifier used as a `JsxExpression` tag.

The React Pipeline is not equivalent to invoking that pass on source-shaped HIR. Before static-component validation it may run `DropManualMemoization`, then runs additional transforms including IIFE inlining, SSA conversion, redundant-phi elimination, constant propagation, dead-code elimination, and instruction-kind rewriting. Source-level behavior must therefore be established from the Pipeline output or an end-to-end fixture, not from the validator switch alone.

The IMPL scans the ESLint AST, collects uppercase `JSXIdentifier` tags, resolves bindings through ESLint scope data, and traces declarations, initializers, identifier aliases, ternary branches, and simple identifier reassignments. A collected function or class component supplies its syntactic render boundary.

## 2. Dynamic values and propagation

| Area                  | SPEC pass                                                                                                                                                      | IMPL                                                                                                                             |
| --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| Direct dynamic values | Every HIR `FunctionExpression`, `NewExpression`, `MethodCall`, and `CallExpression` result is marked dynamic; the pass does not inspect call return semantics. | AST arrow/function/class expressions, calls, and `new` expressions are dynamic when resolved inside a collected render boundary. |
| Declarations          | Depends on how source declarations were lowered into HIR before the pass.                                                                                      | Nested function and class declarations are explicitly dynamic.                                                                   |
| Calls                 | HIR distinguishes `MethodCall` and `CallExpression`.                                                                                                           | ESTree represents both ordinary and member calls as `CallExpression`; this is an IR distinction, not by itself a behavior gap.   |
| Local flow            | `LoadLocal`, `StoreLocal`, and phi operands propagate tracked identifiers.                                                                                     | Variable definitions, identifier initializer chains, ternary branches, and simple assignment writes are traced recursively.      |
| Control-flow evidence | The conditional upstream fixture locks one `if/else` assignment joined through HIR flow.                                                                       | Local tests lock dynamic values in either ternary branch and one imperative reassignment case.                                   |

AST `ArrowFunctionExpression`, `ClassExpression`, `FunctionDeclaration`, and `ClassDeclaration` names cannot be compared directly with the HIR `FunctionExpression` kind. Their presence on only one side's explicit list does **not** establish that the IMPL covers more source forms than React.

## 3. Detection boundary and reporting

The SPEC pass receives one `HIRFunction` and only checks `JsxExpression` tags whose lowered tag kind is `Identifier`. The IMPL first requires an uppercase `JSXIdentifier`, then requires the candidate definition to be inside a function/class node recognized by the repository's component collectors. These different entry and boundary models can diverge, but source syntax alone does not show how a JSX member tag or class-field helper reaches the SPEC pass.

Both implementations report the JSX use and the creation location. Their diagnostics are structurally aligned but not text-identical: React uses the reason/description plus a use-site detail (`This component is created during render`) and a creation-site detail; the IMPL emits its full `default` message at the JSX tag and `createdHere` at the creation node.

## 4. Locally locked IMPL limitations

These behaviors are supported by the implementation and `static-components.spec.ts`, but none is locked by the five explicit React `static-components` fixtures:

1. **Any call result is treated as dynamic.** The IMPL reports a component variable reassigned from `useMemo(() => Component, ...)` because it stops at the AST `CallExpression`; it does not inspect the callback's returned component. The SPEC pass would likewise mark a surviving HIR call result dynamic, but `DropManualMemoization` can run earlier in the React Pipeline. The verified evidence therefore does not establish whether this source pattern is reported end to end by React.
2. **Class-field arrow render helper is missed.** The local valid test with `_renderMessage = () => { const Message = () => ...; return <Message />; }` receives no IMPL report because that helper is not a collected component boundary. This is a confirmed IMPL blind spot; there is no verified upstream fixture proving whether React reports the same source pattern.
3. **JSX member tags are skipped.** `JSXOpeningElement` returns early unless the name is a `JSXIdentifier`, so the local `<Namespace.Bar />` case is not analyzed. This is a confirmed IMPL blind spot; the SPEC pass's `Identifier` check does not by itself prove how a source `JSXMemberExpression` is lowered, and no verified upstream fixture locks that behavior.

## 5. Upstream fixture boundary

At the verified React commit there are five explicit `static-components` inputs. They cover a nested component function, direct factory call, method call, constructor call, and conditional assignment/phi propagation. They do **not** cover:

- `useMemo(() => ExternalComponent)` or the IMPL's self-referential reassignment variant;
- a class-field arrow render helper containing a nested component;
- a JSX member expression used as the component tag.

Accordingly, the three local IMPL behaviors above remain actionable implementation limitations or conservatism, but they are **not established React compatibility gaps** without an end-to-end upstream fixture or compiler run under a stated configuration.

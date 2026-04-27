# static-components IMPL vs. SPEC Report

**IMPL**: `static-components.ts` + `lib.ts` (ESLint rule)\
**SPEC**: `static-components.spec.md` (React Compiler `ValidateStaticComponents`)

---

## 1. Underlying Mechanism

The SPEC operates on the React Compiler's HIR, iterating over blocks, phi nodes, and instructions. It uses a `knownDynamicComponents` map with phi-node propagation across control-flow joins. Component detection is via `JsxExpression` instructions on already-lowered HIR. Render boundaries are `HIRFunction` boundaries.

The IMPL operates on the ESLint AST with scope analysis (`findVariableForIdentifier`, `resolveDynamicValue`). It uses recursive variable-definition tracing through `getDynamicComponentSource`. Component detection uses `core.getFunctionComponentCollector` and `core.getClassComponentCollector` with extensive hints. Enclosing components are computed via `Traverse.findParent` against collected function/class components.

---

## 2. What Constitutes "Dynamically Created"

| Source Category                    | SPEC                  | IMPL                                                                   |
| ---------------------------------- | --------------------- | ---------------------------------------------------------------------- |
| Inline function                    | `FunctionExpression`  | `FunctionExpression`, `ArrowFunctionExpression`                        |
| Constructor call                   | `NewExpression`       | `NewExpression`                                                        |
| Function call                      | `CallExpression`      | `CallExpression`                                                       |
| Method call                        | `MethodCall`          | Covered by `CallExpression` (AST representation)                       |
| Class expression                   | Not explicitly listed | `ClassExpression`                                                      |
| Function declaration inside render | Not explicitly listed | `FunctionDeclaration` (treated as dynamic if inside another component) |
| Class declaration inside render    | Not explicitly listed | `ClassDeclaration` (treated as dynamic if inside another component)    |

**Verdict**: The IMPL covers more expression types (`ArrowFunctionExpression`, `ClassExpression`, `FunctionDeclaration`, `ClassDeclaration`) than the SPEC's explicit list.

---

## 3. Conditional / Control-Flow Handling

The SPEC uses phi nodes: if any phi operand is in `knownDynamicComponents`, the phi result is marked dynamic. This is fully conservative and precise for control-flow joins.

The IMPL handles `ConditionalExpression` by recursively resolving `consequent` first, then `alternate`, returning the first dynamic source found. It is effectively conservative for ternary expressions but does not handle imperative `if/else` branches the same way (it relies on variable re-assignment tracking instead).

**Verdict**: The SPEC uses compiler-level phi-node analysis for all control flow. The IMPL handles ternary expressions via `ConditionalExpression` recursion and imperative branches via assignment-reference tracking.

---

## 4. Variable Assignment and Propagation

The SPEC propagates assignments through `StoreLocal` and `LoadLocal` instructions in HIR. Scope resolution uses HIR identifier IDs and local stores.

The IMPL traces `VariableDeclarator.init` via `resolveDynamicValue`. Re-assignments are explicitly tracked via `variable.references` with `AssignmentExpression` write detection. Scope resolution uses ESLint `Scope.Variable` and `Scope.Definition` traversal.

**Verdict**: The SPEC's propagation is unified through HIR instructions. The IMPL manually traces assignments and re-assignments through ESLint scope/reference APIs.

---

## 5. Detection Entry Point

The SPEC triggers when it encounters a `JsxExpression` instruction where the tag identifier is in `knownDynamicComponents`. It checks any identifier in JSX component position that is tracked as dynamic.

The IMPL collects `JSXOpeningElement` candidates with component-like names (`core.isFunctionComponentName`), then validates at `Program:exit`. It only checks JSX elements with `JSXIdentifier` names; namespace/components (`<Foo.Bar />`) are ignored due to the `node.name.type !== AST.JSXIdentifier` check.

**Verdict**: The IMPL has an additional filtering layer (function-component name heuristic) before performing expensive variable tracing, whereas the SPEC checks any dynamic identifier used in JSX.

---

## 6. Error Reporting

Both sides report dual locations:

- **Primary message**: "Cannot create components during render..." (identical)
- **Secondary message**: "The component is created during render here." (IMPL uses `createdHere`)
- **Reported locations**: JSX usage site + original creation site

**Verdict**: Error messages and dual-location reporting are aligned.

---

## 7. Key Gaps and Deviations

1. **Missing MethodCall Distinction**: The IMPL does not distinguish `MethodCall` from `CallExpression` because AST-level `CallExpression` covers both. This is an architectural equivalence, not a functional gap.
2. **Additional Dynamic Sources**: The IMPL considers `ArrowFunctionExpression`, `ClassExpression`, `FunctionDeclaration`, and `ClassDeclaration` as dynamic sources, which are not explicitly listed in the SPEC's dynamic-kinds enumeration.
3. **Control-Flow Analysis Difference**: The SPEC uses phi-node conservative merging for all conditional branches. The IMPL handles ternary expressions (`ConditionalExpression`) recursively and imperative branches (`if/else` with assignments) through reference tracking — a less unified but practically similar approach.
4. **Component Detection Overhead**: The IMPL performs full function-component detection with hints (`FunctionComponentDetectionHint`) to establish render boundaries, whereas the SPEC operates directly on `HIRFunction` boundaries.
5. **JSX Namespace Filtering**: The IMPL ignores JSX member expressions (`<Foo.Bar />`) due to the `node.name.type !== AST.JSXIdentifier` check. The SPEC does not explicitly mention such filtering.
6. **Class-Field Arrow Render Helpers**: When a nested component is defined inside a class-field arrow function acting as a render helper (e.g., `_renderMessage = () => { const Message = () => ...; return <Message />; }`), the IMPL does **not** flag `Message` as dynamic. The class-field arrow is not recognized as a function-component boundary by `core.getFunctionComponentCollector`, so `getEnclosingComponent` either misses the boundary or resolves to the outer class component in a way that does not surface the violation. The SPEC's HIR-block analysis tracks dynamic components across all blocks uniformly and would flag this.
7. **CallExpression Reassignment of External Components**: If an external (non-dynamic) component is reassigned via a `CallExpression` such as `useMemo(() => Component, [Component])`, the IMPL flags the reassigned variable as dynamic because `resolveDynamicValue` returns the `CallExpression` node without inspecting the call's return value. The SPEC's HIR analysis would see through the `useMemo` to the underlying external component and not flag it.

# static-components: IMPL vs SPEC Diff

> IMPL: `static-components.ts` + `lib.ts` — ESLint rule implementation
> SPEC: `static-components.spec.md` — React Compiler `ValidateStaticComponents.ts` specification

---

## 1. Underlying Mechanism Differences

| Dimension               | SPEC (React Compiler)                                                                 | IMPL (ESLint Rule)                                                                                                                |
| ----------------------- | ------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| **Analysis Layer**      | Based on HIR (High-level IR), iterates over blocks, phi nodes, and instructions       | Based on ESLint AST + Scope analysis (`findVariableForIdentifier`, `resolveDynamicValue`)                                         |
| **Data Flow Tracking**  | Uses `knownDynamicComponents` Map with phi-node propagation across control-flow joins | Uses recursive variable-definition tracing through `getDynamicComponentSource`                                                    |
| **Component Detection** | Assumes HIR is already lowered; detects `JsxExpression` instructions                  | Uses `core.getFunctionComponentCollector` and `core.getClassComponentCollector` with extensive hints to identify React components |
| **Render Boundaries**   | Operates on HIRFunction boundaries                                                    | Computes enclosing component via `Traverse.findParent` against collected function/class components                                |

---

## 2. What Constitutes "Dynamically Created"

| Source Category                        | SPEC                  | IMPL                                                                   |
| -------------------------------------- | --------------------- | ---------------------------------------------------------------------- |
| **Inline function**                    | `FunctionExpression`  | `FunctionExpression`, `ArrowFunctionExpression`                        |
| **Constructor call**                   | `NewExpression`       | `NewExpression`                                                        |
| **Function call**                      | `CallExpression`      | `CallExpression`                                                       |
| **Method call**                        | `MethodCall`          | Covered by `CallExpression` (AST representation)                       |
| **Class expression**                   | Not explicitly listed | `ClassExpression`                                                      |
| **Function declaration inside render** | Not explicitly listed | `FunctionDeclaration` (treated as dynamic if inside another component) |
| **Class declaration inside render**    | Not explicitly listed | `ClassDeclaration` (treated as dynamic if inside another component)    |

**Conclusion**: IMPL covers more expression types (`ArrowFunctionExpression`, `ClassExpression`, `FunctionDeclaration`, `ClassDeclaration`) than the SPEC's explicit list.

---

## 3. Conditional / Control-Flow Handling

| Aspect               | SPEC                                                                                                                                                         | IMPL                                                                                                                                                                                |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Mechanism**        | **Phi nodes**: If any phi operand is in `knownDynamicComponents`, the phi result is marked dynamic. This is conservative and precise for control-flow joins. | **ConditionalExpression**: Recursively resolves `consequent` first, then `alternate`. Returns the first dynamic source found.                                                       |
| **Conservativeness** | Fully conservative — any dynamic branch makes the merged value dynamic.                                                                                      | Effectively conservative for ternary expressions (`a ? b : c`), but does not handle imperative `if/else` branches the same way (relies on variable re-assignment tracking instead). |

**Conclusion**: SPEC uses compiler-level phi-node analysis for all control flow. IMPL handles ternary expressions via `ConditionalExpression` recursion and imperative branches via assignment-reference tracking.

---

## 4. Variable Assignment & Propagation

| Aspect                 | SPEC                                                                              | IMPL                                                                                     |
| ---------------------- | --------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| **Initial assignment** | `StoreLocal` / instruction lvalue                                                 | `VariableDeclarator.init` via `resolveDynamicValue`                                      |
| **Re-assignment**      | Automatically propagated through `StoreLocal` and `LoadLocal` instructions in HIR | Explicitly tracked via `variable.references` with `AssignmentExpression` write detection |
| **Scope resolution**   | HIR identifier IDs and local stores                                               | ESLint `Scope.Variable` and `Scope.Definition` traversal                                 |

**Conclusion**: SPEC's propagation is unified through HIR instructions. IMPL manually traces assignments and re-assignments through ESLint scope/reference APIs.

---

## 5. Detection Entry Point

| Aspect        | SPEC                                                                                           | IMPL                                                                                                                                    |
| ------------- | ---------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| **Trigger**   | Encounters `JsxExpression` instruction where the tag identifier is in `knownDynamicComponents` | Collects `JSXOpeningElement` candidates with component-like names (`core.isFunctionComponentName`), then validates at `Program:exit`    |
| **Filtering** | Any identifier in JSX component position that is tracked as dynamic                            | Only JSX elements with `JSXIdentifier` names that pass `core.isFunctionComponentName`; namespace/components (`<Foo.Bar />`) are ignored |

**Conclusion**: IMPL has an additional filtering layer (function-component name heuristic) before performing expensive variable tracing, whereas SPEC checks any dynamic identifier used in JSX.

---

## 6. Error Reporting

| Aspect                 | SPEC                                                                                      | IMPL                                                             |
| ---------------------- | ----------------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| **Primary message**    | `Cannot create components during render...`                                               | `Cannot create components during render...` (identical)          |
| **Secondary message**  | `This component is created during render` / `The component is created during render here` | `The component is created during render here.` (`createdHere`)   |
| **Reported locations** | JSX usage site + original creation site                                                   | JSX usage site + `creationNode` from `getDynamicComponentSource` |

**Conclusion**: Error messages and dual-location reporting are aligned.

---

## 7. Summary of Key Gaps / Deviations

1. **Missing MethodCall Distinction**: IMPL does not distinguish `MethodCall` from `CallExpression` because AST-level `CallExpression` covers both. This is an architectural equivalence, not a functional gap.

2. **Additional Dynamic Sources**: IMPL considers `ArrowFunctionExpression`, `ClassExpression`, `FunctionDeclaration`, and `ClassDeclaration` as dynamic sources, which are not explicitly listed in SPEC's dynamic-kinds enumeration.

3. **Control-Flow Analysis Difference**: SPEC uses phi-node conservative merging for all conditional branches. IMPL handles ternary expressions (`ConditionalExpression`) recursively and imperative branches (`if/else` with assignments) through reference tracking — a less unified but practically similar approach.

4. **Component Detection Overhead**: IMPL performs full function-component detection with hints (`FunctionComponentDetectionHint`) to establish render boundaries, whereas SPEC operates directly on HIRFunction boundaries.

5. **JSX Namespace Filtering**: IMPL ignores JSX member expressions (`<Foo.Bar />`) due to the `node.name.type !== AST.JSXIdentifier` check. SPEC does not explicitly mention such filtering.

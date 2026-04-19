import type { RuleFunction } from "@eslint-react/kit";
import type { TSESTree } from "@typescript-eslint/types";
import { findVariable } from "@typescript-eslint/utils/ast-utils";
import type { Scope } from "@typescript-eslint/utils/ts-eslint";

/** Detect circular dependencies between useEffect hooks via useState setters. */
export function noCircularEffect(): RuleFunction {
  return (context, { ast, is, settings }) => {
    // Map: setter Scope.Variable → state Scope.Variable
    const setterToState = new Map<Scope.Variable, Scope.Variable>();

    // Pending useEffect-like calls to process at Program:exit
    const pendingEffects: TSESTree.CallExpression[] = [];

    return {
      CallExpression(node: TSESTree.CallExpression) {
        // 1. Register useState pairs
        if (is.useStateLikeCall(node, settings.additionalStateHooks)) {
          const unwrappedParent = ast.unwrap(node.parent);
          // If unwrap stripped a wrapper, the result is the call expression itself.
          // In that case we need to look at the wrapper's parent to find the declarator.
          const parent = unwrappedParent === node ? ast.unwrap(node.parent.parent) : unwrappedParent;
          if (
            parent.type === "VariableDeclarator"
            && parent.id.type === "ArrayPattern"
          ) {
            const [stateEl, setterEl] = parent.id.elements;
            const unwrappedStateEl = stateEl ? ast.unwrap(stateEl) : null;
            const unwrappedSetterEl = setterEl ? ast.unwrap(setterEl) : null;
            if (
              unwrappedStateEl?.type === "Identifier"
              && unwrappedSetterEl?.type === "Identifier"
            ) {
              const scope = context.sourceCode.getScope(node);
              const stateVar = findVariable(scope, unwrappedStateEl.name);
              const setterVar = findVariable(scope, unwrappedSetterEl.name);
              if (stateVar != null && setterVar != null) {
                setterToState.set(setterVar, stateVar);
              }
            }
          }
          return;
        }

        // 2. Collect useEffect-like calls
        if (is.useEffectLikeCall(node, settings.additionalEffectHooks)) {
          pendingEffects.push(node);
        }
      },

      "Program:exit"() {
        interface EffectEdge {
          deps: Scope.Variable[];
          targets: Scope.Variable[];
          node: TSESTree.CallExpression;
        }

        const stateVars = new Set(setterToState.values());
        const edges: EffectEdge[] = [];

        for (const node of pendingEffects) {
          const callback = node.arguments[0];
          const depsArg = node.arguments[1];
          if (callback == null || depsArg == null) continue;

          // Extract dependency state variables from the deps array
          const deps: Scope.Variable[] = [];
          const unwrappedDepsArg = ast.unwrap(depsArg);
          if (unwrappedDepsArg.type === "ArrayExpression") {
            for (const el of unwrappedDepsArg.elements) {
              const unwrappedEl = el ? ast.unwrap(el) : null;
              if (unwrappedEl?.type === "Identifier") {
                const scope = context.sourceCode.getScope(unwrappedEl);
                const v = findVariable(scope, unwrappedEl.name);
                if (v != null && stateVars.has(v)) {
                  deps.push(v);
                }
              }
            }
          }
          if (deps.length === 0) continue;

          // Find setter calls inside the callback body
          const targets: Scope.Variable[] = [];
          const [cbStart, cbEnd] = callback.range;
          for (const [setterVar, stateVar] of setterToState) {
            for (const ref of setterVar.references) {
              const [refStart, refEnd] = ref.identifier.range;
              if (refStart < cbStart || refEnd > cbEnd) continue;
              const parent = ref.identifier.parent ? ast.unwrap(ref.identifier.parent) : null;
              if (
                parent?.type === "CallExpression"
                && ast.unwrap(parent.callee) === ref.identifier
              ) {
                targets.push(stateVar);
                break;
              }
            }
          }
          if (targets.length === 0) continue;

          edges.push({ deps, targets, node });
        }

        // Build a directed graph: stateVar → Set<stateVar>
        // If an effect depends on A and sets B, add edge A → B
        const graph = new Map<Scope.Variable, Set<Scope.Variable>>();
        for (const { deps, targets } of edges) {
          for (const dep of deps) {
            for (const target of targets) {
              if (!graph.has(dep)) graph.set(dep, new Set());
              graph.get(dep)!.add(target);
            }
          }
        }

        // Detect cycles via DFS
        const visited = new Set<Scope.Variable>();
        const inStack = new Set<Scope.Variable>();
        const inCycle = new Set<Scope.Variable>();

        function dfs(v: Scope.Variable): boolean {
          if (inStack.has(v)) return true;
          if (visited.has(v)) return false;
          visited.add(v);
          inStack.add(v);
          let foundCycle = false;
          for (const neighbor of graph.get(v) ?? []) {
            if (dfs(neighbor)) {
              inCycle.add(v);
              inCycle.add(neighbor);
              foundCycle = true;
            }
          }
          inStack.delete(v);
          return foundCycle;
        }

        for (const v of graph.keys()) dfs(v);
        if (inCycle.size === 0) return;

        // Report each effect that participates in a cycle
        for (const { deps, targets, node } of edges) {
          const cycleDeps = deps.filter((d) => inCycle.has(d));
          const cycleTargets = targets.filter((t) => inCycle.has(t));
          if (cycleDeps.length === 0 || cycleTargets.length === 0) continue;

          const depNames = cycleDeps.map((d) => d.name).join(", ");
          const targetNames = cycleTargets.map((t) => t.name).join(", ");
          context.report({
            node,
            message:
              `Circular effect detected: this effect depends on [${depNames}] and updates [${targetNames}], creating an infinite update loop.`,
          });
        }
      },
    };
  };
}

import { Check, type TSESTreeFunction } from "@eslint-react/ast";
import type { RichContext } from "@eslint-react/core";
import type { TSESTree } from "@typescript-eslint/types";
import type { CallEdgeFact, GlobalsFacts } from "./collect";
import { resolveToFunction } from "./lib";
import { isGlobalVariable, resolveGlobalOrigin } from "./origins";

export type GlobalMutationEffect = {
  kind: "global" | "method" | "property";
  name: string;
  method: string | null;
  node: TSESTree.Node;
};

/**
 * Classify the collected writes and mutating method calls, keeping only the
 * ones that reach a global/module binding, grouped by the function that
 * performs them.
 */
export function inferGlobalMutations(context: RichContext, facts: GlobalsFacts): Map<TSESTreeFunction, GlobalMutationEffect[]> {
  const directEffects = new Map<TSESTreeFunction, GlobalMutationEffect[]>();

  function pushEffect(enclosingFunction: TSESTreeFunction, effect: GlobalMutationEffect) {
    const effects = directEffects.get(enclosingFunction) ?? [];
    effects.push(effect);
    directEffects.set(enclosingFunction, effects);
  }

  for (const write of facts.writes) {
    if (Check.isIdentifier(write.target)) {
      // Reassigning a local alias changes only the local binding. Alias
      // provenance matters only when mutating a property of the aliased value.
      if (!isGlobalVariable(context, write.target)) continue;
      pushEffect(write.enclosingFunction, {
        kind: "global",
        name: write.target.name,
        method: null,
        node: write.node,
      });
      continue;
    }
    const origin = resolveGlobalOrigin(context, write.target.object);
    if (origin == null) continue;
    pushEffect(write.enclosingFunction, {
      kind: "property",
      name: context.getText(write.target),
      method: null,
      node: write.node,
    });
  }

  for (const call of facts.methodCalls) {
    const origin = resolveGlobalOrigin(context, call.receiver);
    if (origin == null) continue;
    pushEffect(call.enclosingFunction, {
      kind: "method",
      name: origin.name,
      method: call.method,
      node: call.node,
    });
  }

  return directEffects;
}

/** Resolve the collected call edges into a function-to-function call graph. */
export function inferCallGraph(context: RichContext, callEdges: readonly CallEdgeFact[]): Map<TSESTreeFunction, Set<TSESTreeFunction>> {
  const callGraph = new Map<TSESTreeFunction, Set<TSESTreeFunction>>();
  for (const edge of callEdges) {
    const callee = resolveToFunction(context, edge.callee);
    if (callee == null) continue;
    const callees = callGraph.get(edge.caller) ?? new Set<TSESTreeFunction>();
    callees.add(callee);
    callGraph.set(edge.caller, callees);
  }
  return callGraph;
}

/**
 * Like the SPEC's function signatures, these summaries keep creation of an
 * effect separate from applying it in a component or hook render: walk the
 * call graph from each render function and gather every reachable effect once.
 */
export function collectReachableEffects(
  renderFunctions: readonly TSESTreeFunction[],
  directEffects: Map<TSESTreeFunction, GlobalMutationEffect[]>,
  callGraph: Map<TSESTreeFunction, Set<TSESTreeFunction>>,
): GlobalMutationEffect[] {
  const visited = new Set<TSESTreeFunction>();
  const reported = new Set<GlobalMutationEffect>();
  const reachable: GlobalMutationEffect[] = [];

  function applyFunctionEffects(func: TSESTreeFunction) {
    if (visited.has(func)) return;
    visited.add(func);

    for (const effect of directEffects.get(func) ?? []) {
      if (reported.has(effect)) continue;
      reported.add(effect);
      reachable.push(effect);
    }
    for (const callee of callGraph.get(func) ?? []) {
      applyFunctionEffects(callee);
    }
  }

  for (const func of renderFunctions) {
    applyFunctionEffects(func);
  }

  return reachable;
}

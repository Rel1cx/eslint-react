import { Check, Extract, type TSESTreeFunction, Traverse } from "@eslint-react/ast";
import * as core from "@eslint-react/core";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import type { CallEdgeFact, RefAccessFact } from "./collect";
import { getGuardDisposition, getSynchronousCallbackIndexes, isAfterTerminatingNonNullGuard, isGuardTestAccess, isReachedThroughFunctions } from "./lib";
import type { BindingResolver, Variable } from "./origins";

export type RefViolation = {
  kind: "duplicate-init" | "pass" | "read" | "write";
  node: TSESTree.Node;
};

/** Per render boundary, the functions each host function invokes during render. */
export type RenderCallGraph = ReadonlyMap<TSESTreeFunction, ReadonlyMap<TSESTreeFunction, ReadonlySet<TSESTreeFunction>>>;

type Reachability = ReadonlyMap<TSESTreeFunction, ReadonlySet<TSESTreeFunction>>;

/** The nearest strict ancestor of `node` that is a component or hook. */
function findBoundary(node: TSESTree.Node, boundaries: ReadonlySet<TSESTreeFunction>): TSESTreeFunction | null {
  return Traverse.findParent(node, (candidate): candidate is TSESTreeFunction => {
    return Check.isFunction(candidate) && boundaries.has(candidate);
  });
}

/** The boundary containing `node`, where `node` is the nearest enclosing function of the fact. */
function getBoundaryOf(node: TSESTreeFunction, boundaries: ReadonlySet<TSESTreeFunction>): TSESTreeFunction | null {
  return boundaries.has(node) ? node : findBoundary(node, boundaries);
}

function isReachedDuringRender(node: TSESTree.Node, boundary: TSESTreeFunction, reachability: Reachability): boolean {
  const reached = reachability.get(boundary);
  return reached != null && isReachedThroughFunctions(node, boundary, reached);
}

/**
 * Resolve the collected call edges into a per-boundary render call graph.
 * Direct calls, IIFEs, known synchronous callbacks, function declarations,
 * aliases, and simple object-property bindings all share the same
 * identity-based resolver. Each call target is resolved exactly once.
 */
export function inferCallGraph(
  boundaries: ReadonlySet<TSESTreeFunction>,
  callEdges: readonly CallEdgeFact[],
  resolveCallable: BindingResolver["resolveCallable"],
): Map<TSESTreeFunction, Map<TSESTreeFunction, Set<TSESTreeFunction>>> {
  const callGraph = new Map<TSESTreeFunction, Map<TSESTreeFunction, Set<TSESTreeFunction>>>();
  for (const edge of callEdges) {
    const boundary = getBoundaryOf(edge.caller, boundaries);
    if (boundary == null) continue;
    const targets = [resolveCallable(edge.node.callee, edge.node.range[0])];
    for (const index of getSynchronousCallbackIndexes(edge.node)) {
      const argument = edge.node.arguments[index];
      if (argument == null || argument.type === AST.SpreadElement) continue;
      targets.push(resolveCallable(argument, edge.node.range[0]));
    }
    for (const target of targets) {
      if (target == null || findBoundary(target, boundaries) !== boundary) continue;
      const hosts = callGraph.get(boundary) ?? new Map<TSESTreeFunction, Set<TSESTreeFunction>>();
      callGraph.set(boundary, hosts);
      const callees = hosts.get(edge.caller) ?? new Set<TSESTreeFunction>();
      callees.add(target);
      hosts.set(edge.caller, callees);
    }
  }
  return callGraph;
}

/**
 * Walk the call graph from each render boundary and gather every function
 * reached during that boundary's render.
 */
export function collectReachableFunctions(
  boundaries: ReadonlySet<TSESTreeFunction>,
  callGraph: RenderCallGraph,
): Map<TSESTreeFunction, Set<TSESTreeFunction>> {
  const reachedByBoundary = new Map<TSESTreeFunction, Set<TSESTreeFunction>>();
  for (const boundary of boundaries) {
    const reached = new Set<TSESTreeFunction>([boundary]);
    reachedByBoundary.set(boundary, reached);
    const hosts = callGraph.get(boundary);
    if (hosts == null) continue;
    const queue = [boundary];
    for (let host = queue.pop(); host != null; host = queue.pop()) {
      for (const target of hosts.get(host) ?? []) {
        if (reached.has(target)) continue;
        reached.add(target);
        queue.push(target);
      }
    }
  }
  return reachedByBoundary;
}

/**
 * Validate the reached `.current` accesses and track the one permitted lazy
 * initialization per ref.
 */
export function inferRefViolations(
  accesses: readonly RefAccessFact[],
  boundaries: ReadonlySet<TSESTreeFunction>,
  reachability: Reachability,
  resolver: Pick<BindingResolver, "getNullBranch" | "getRefTarget">,
): RefViolation[] {
  const violations: RefViolation[] = [];
  const initializedRefs = new Map<TSESTreeFunction, Set<Variable>>();

  for (const access of accesses.toSorted((a, b) => a.node.range[0] - b.node.range[0])) {
    const target = resolver.getRefTarget(access.node);
    if (target == null) continue;
    const boundary = getBoundaryOf(access.enclosingFunction, boundaries);
    if (boundary == null || !isReachedDuringRender(access.node, boundary, reachability)) continue;

    let isLazyInitialization = false;
    if (target.identity != null) {
      const identity = target.identity;
      const getTargetNullBranch = (test: TSESTree.Expression) => resolver.getNullBranch(test, identity);
      if (isGuardTestAccess(access.node, getTargetNullBranch)) continue;
      const guard = getGuardDisposition(access.node, getTargetNullBranch);
      if (guard != null) {
        if (guard.inNullBranch && access.isInitializationWrite) {
          isLazyInitialization = true;
        } else if (!guard.inNullBranch && !access.isWrite) {
          continue;
        }
      } else if (access.isInitializationWrite && isAfterTerminatingNonNullGuard(access.node, getTargetNullBranch)) {
        isLazyInitialization = true;
      }
    }

    if (isLazyInitialization && target.identity != null) {
      const initialized = initializedRefs.get(boundary) ?? new Set<Variable>();
      initializedRefs.set(boundary, initialized);
      if (initialized.has(target.identity)) {
        violations.push({ kind: "duplicate-init", node: access.node });
      } else {
        initialized.add(target.identity);
      }
      continue;
    }

    violations.push({ kind: access.isWrite ? "write" : "read", node: access.node });
  }

  return violations;
}

/**
 * Passing a ref to an unknown function can expose its value during render.
 * Hook callbacks, mergeRefs, and the existing render-prop compatibility case
 * remain exempt.
 */
export function inferRefPassViolations(
  callEdges: readonly CallEdgeFact[],
  boundaries: ReadonlySet<TSESTreeFunction>,
  reachability: Reachability,
  resolver: Pick<BindingResolver, "getVariable" | "resolveRef">,
): RefViolation[] {
  const violations: RefViolation[] = [];

  for (const edge of callEdges) {
    const boundary = getBoundaryOf(edge.caller, boundaries);
    if (boundary == null || !isReachedDuringRender(edge.node, boundary, reachability)) continue;
    const call = edge.node;
    const callee = Extract.unwrap(call.callee);
    const calleeName = Extract.getCalleeName(call);
    const callArguments = call.arguments;
    if (core.isHookCall(call) || calleeName === "mergeRefs" || (calleeName === "render" && callee.type === AST.MemberExpression)) continue;
    for (const argument of callArguments) {
      if (argument.type === AST.SpreadElement) continue;
      const value = Extract.unwrap(argument);
      if (!Check.isIdentifier(value)) continue;
      const variable = resolver.getVariable(value);
      if (variable == null || resolver.resolveRef(variable, value.range[0]) == null) continue;
      violations.push({ kind: "pass", node: value });
    }
  }

  return violations;
}

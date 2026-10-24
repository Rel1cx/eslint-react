import { Extract, type TSESTreeFunction } from "@eslint-react/ast";
import type { RuleContext } from "@eslint-react/eslint";
import { getOrInsertComputed } from "@local/eff";
import type { TSESTree } from "@typescript-eslint/types";
import type { SetStateInEffectFacts } from "./collect";
import { type ValueTarget, createSetStateResolver } from "./origins";

export type SetStateViolation = {
  name: string;
  node: TSESTree.Node;
};

type InvocationState = {
  fn: TSESTreeFunction;
  inheritedRefGate: boolean;
  refParams: ReadonlySet<TSESTree.Node>;
  reportNode: TSESTree.Node | null;
};

export function inferViolations(context: RuleContext, facts: SetStateInEffectFacts): SetStateViolation[] {
  if (facts.effectRoots.length === 0) return [];
  const resolver = createSetStateResolver(context, facts);
  const callsByFunction = new Map<TSESTreeFunction, TSESTree.CallExpression[]>();
  for (const fact of facts.calls) {
    getOrInsertComputed(callsByFunction, fact.enclosingFunction, () => []).push(fact.node);
  }

  const queue: InvocationState[] = [];
  const visited = new Set<string>();
  const violations = new Map<TSESTree.Node, SetStateViolation>();

  const enqueue = (state: InvocationState) => {
    if (state.fn.async) return;
    const refParamsKey = [...state.refParams]
      .map((n) => n.range[0])
      .sort((a, b) => a - b)
      .join(",");
    const key = `${String(state.fn.range[0])}:${state.inheritedRefGate ? "gated" : "plain"}:${refParamsKey}`;
    if (visited.has(key)) return;
    visited.add(key);
    queue.push(state);
  };

  const report = (sink: TSESTree.Node, setter: Extract<ValueTarget, { kind: "setter" }>, reportNode: TSESTree.Node) => {
    if (violations.has(sink)) return;
    violations.set(sink, {
      name: resolver.getSetterName(setter.node),
      node: reportNode,
    });
  };

  const isExemptCall = (call: TSESTree.CallExpression, state: InvocationState) => {
    if (state.inheritedRefGate || resolver.isRefGatedContext(call, state.refParams)) return true;
    const argument = call.arguments.at(0);
    return argument != null && resolver.isArgumentUsingRefValue(argument, state.refParams);
  };

  for (const root of [...facts.effectRoots].sort((a, b) => a.node.range[0] - b.node.range[0])) {
    const setup = root.setup;
    const unwrappedSetup = Extract.unwrap(setup);
    for (const target of resolver.resolveValues(setup)) {
      if (target.kind === "setter") {
        if (!resolver.isRefGatedContext(setup)) {
          report(target.node, target, setup);
        }
        continue;
      }
      const reportNode = unwrappedSetup === target.node ? null : setup;
      enqueue({
        fn: target.node,
        inheritedRefGate: false,
        refParams: new Set(),
        reportNode,
      });
    }
  }

  for (let index = 0; index < queue.length; index++) {
    const state = queue[index];
    if (state == null) continue;
    const calls = callsByFunction.get(state.fn) ?? [];
    for (const call of calls) {
      for (const target of resolver.resolveValues(call.callee)) {
        if (target.kind === "setter") {
          if (!isExemptCall(call, state)) {
            report(call, target, state.reportNode ?? call);
          }
          continue;
        }
        enqueue({
          fn: target.node,
          inheritedRefGate: state.inheritedRefGate || resolver.isRefGatedContext(call, state.refParams),
          refParams: resolver.getRefDerivedParams(call, target.node, state.refParams),
          reportNode: state.reportNode ?? call,
        });
      }
    }
  }

  return [...violations.values()].sort((a, b) => a.node.range[0] - b.node.range[0] || a.node.range[1] - b.node.range[1]);
}

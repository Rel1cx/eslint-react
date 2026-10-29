import { Check, Compare, Extract } from "@eslint-react/ast";
import { getFunctionId } from "@eslint-react/core";
import type { RuleContext } from "@eslint-react/eslint";
import { isProvenanceEqual } from "@eslint-react/var";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import { type EventMethodKind, isSameObject } from "./helpers";
import type { CleanupCalleeEntries, ResolvedEventEntry, ResolvedEventListenerFacts } from "./origins";

export type EventListenerViolation =
  | {
    kind: "unexpected-inline-function";
    data: { eventMethodKind: EventMethodKind };
    node: TSESTree.CallExpressionArgument;
  }
  | {
    kind: "expected-remove-event-listener-in-cleanup";
    data: { effectMethodKind: string };
    node: TSESTree.CallExpression;
  };

type IsInverseEntryParams = {
  addEntry: ResolvedEventEntry;
  cleanupCalleeEntries: CleanupCalleeEntries;
  context: RuleContext;
  remEntry: ResolvedEventEntry;
};

function isInverseEntry({ context, addEntry, remEntry, cleanupCalleeEntries }: IsInverseEntryParams): boolean {
  const { type: aType, callee: aCallee, capture: aCapture, effect: aEffect, listener: aListener, phase: aPhase } = addEntry;
  const { type: rType, callee: rCallee, capture: rCapture, effect: rEffect, listener: rListener, phase: rPhase } = remEntry;
  if (aPhase !== "setup") return false;
  if (!isSameObject(aCallee, rCallee) || !Compare.isEqual(aListener, rListener) || !isProvenanceEqual(context, aType, rType) || aCapture !== rCapture) {
    return false;
  }
  if (rPhase === "cleanup") return true;
  if (aEffect == null || aEffect !== rEffect) return false;
  const enclosingFunction = remEntry.enclosingFunction;
  if (enclosingFunction == null) return false;
  const callees = cleanupCalleeEntries.get(aEffect);
  if (callees == null) return false;
  const { functions, names } = callees;
  if (functions.has(enclosingFunction)) return true;
  const id = getFunctionId(enclosingFunction);
  return id != null && id.type === AST.Identifier && names.has(id.name);
}

export function inferEventListenerViolations(context: RuleContext, facts: ResolvedEventListenerFacts): EventListenerViolation[] {
  const violations: EventListenerViolation[] = [];
  const addEntries: ResolvedEventEntry[] = [];
  const removeEntries: ResolvedEventEntry[] = [];

  for (const entry of facts.entries) {
    if (entry.signal == null && Check.isFunction(entry.listener)) {
      violations.push({
        kind: "unexpected-inline-function",
        data: { eventMethodKind: entry.kind },
        node: entry.listener,
      });
    }
    if (entry.kind === "addEventListener") {
      addEntries.push(entry);
    } else {
      removeEntries.push(entry);
    }
  }

  for (const addEntry of addEntries) {
    if (addEntry.signal != null) continue;
    if (removeEntries.some((remEntry) => isInverseEntry({ context, addEntry, remEntry, cleanupCalleeEntries: facts.cleanupCalleeEntries }))) {
      continue;
    }
    const effect = addEntry.effect;
    const effectMethodKind = effect != null && effect.type === AST.CallExpression
      ? Extract.getCalleeName(effect) ?? "useEffect"
      : "useEffect";
    violations.push({
      kind: "expected-remove-event-listener-in-cleanup",
      data: { effectMethodKind },
      node: addEntry.node,
    });
  }

  return violations.toSorted((a, b) => a.node.range[0] - b.node.range[0] || a.node.range[1] - b.node.range[1]);
}

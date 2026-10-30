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

type ExpressionEquality = (a: TSESTree.Node, b: TSESTree.Node) => boolean;

function getStaticMemberPropertyName(node: TSESTree.MemberExpression): string | null {
  const property = Extract.unwrap(node.property);
  if (!node.computed) return Check.isIdentifier(property) ? property.name : null;
  if (property.type === AST.Literal && typeof property.value === "string") return property.value;
  if (property.type === AST.TemplateLiteral && property.expressions.length === 0) {
    return property.quasis[0]?.value.cooked ?? property.quasis[0]?.value.raw ?? null;
  }
  return null;
}

function isSameEventExpression(a: TSESTree.Node, b: TSESTree.Node, isEqual: ExpressionEquality = Compare.isEqual): boolean {
  const exprA = Extract.unwrap(a);
  const exprB = Extract.unwrap(b);
  // Non-member values keep the caller's equality semantics.
  if (exprA.type !== AST.MemberExpression) return isEqual(exprA, exprB);
  if (exprB.type !== AST.MemberExpression) return isEqual(exprA, exprB);
  // Optional and required access must remain distinct.
  if (exprA.optional !== exprB.optional) return isEqual(exprA, exprB);
  const propertyA = getStaticMemberPropertyName(exprA);
  const propertyB = getStaticMemberPropertyName(exprB);
  // Dynamic property names require the caller's equality semantics.
  if (propertyA == null) return isEqual(exprA, exprB);
  if (propertyB == null) return isEqual(exprA, exprB);
  // Different static properties cannot represent the same value.
  if (propertyA !== propertyB) return isEqual(exprA, exprB);
  return isSameEventExpression(exprA.object, exprB.object, isEqual);
}

function isInverseEntry({ context, addEntry, remEntry, cleanupCalleeEntries }: IsInverseEntryParams): boolean {
  const { type: aType, callee: aCallee, capture: aCapture, effect: aEffect, listener: aListener, phase: aPhase } = addEntry;
  const { type: rType, callee: rCallee, capture: rCapture, effect: rEffect, listener: rListener, phase: rPhase } = remEntry;
  // Only registrations made during setup need cleanup pairing.
  if (aPhase !== "setup") return false;
  // Cleanup must unregister the listener from the same event target.
  if (!isSameObject(aCallee, rCallee, isSameEventExpression)) return false;
  // Cleanup must use the same callback that was registered.
  if (!isSameEventExpression(aListener, rListener)) return false;
  // The removal must apply to the event that was registered.
  if (!isSameEventExpression(aType, rType, (a, b) => isProvenanceEqual(context, a, b))) return false;
  // Matching capture semantics are required for removal to be effective.
  if (aCapture !== rCapture) return false;
  // A direct cleanup completes the pairing once all listener facts match.
  if (rPhase === "cleanup") return true;
  // Indirect teardown must belong to the effect that registered the listener.
  if (aEffect == null || aEffect !== rEffect) return false;
  const enclosingFunction = remEntry.enclosingFunction;
  // Indirect removal needs a function that can be traced to cleanup.
  if (enclosingFunction == null) return false;
  const callees = cleanupCalleeEntries.get(aEffect);
  // The effect must offer a cleanup path for indirect removal.
  if (callees == null) return false;
  const { functions, names } = callees;
  // A cleanup-linked function completes the indirect teardown path.
  if (functions.has(enclosingFunction)) return true;
  const id = getFunctionId(enclosingFunction);
  // A named helper is required to link indirect removal to cleanup.
  if (id == null) return false;
  // Only a named helper can be matched to its cleanup call site.
  if (id.type !== AST.Identifier) return false;
  return names.has(id.name);
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

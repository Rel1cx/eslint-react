import * as ast from "@eslint-react/ast";
import type { unit } from "@eslint-react/eff";
import { or } from "@eslint-react/eff";
import { type RuleContext, type RuleFeature, defineRuleListener } from "@eslint-react/shared";
import {
  findEnclosingAssignmentTarget,
  findVariable,
  getVariableInitializer,
  isAssignmentTargetEqual,
} from "@eslint-react/var";
import type { TSESTree } from "@typescript-eslint/utils";
import { AST_NODE_TYPES as AST } from "@typescript-eslint/utils";
import { P, isMatching, match } from "ts-pattern";

import { type ComponentPhaseKind, ComponentPhaseRelevance, type ObserverEntry, getPhaseKindOfFunction } from "../types";
import { createRule } from "../utils";

// #region Rule Metadata

export const RULE_NAME = "no-leaked-resize-observer";

export const RULE_FEATURES = [] as const satisfies RuleFeature[];

export type MessageID =
  | "expectedDisconnectInControlFlow"
  | "expectedDisconnectOrUnobserveInCleanup"
  | "unexpectedFloatingInstance";

// #endregion

// #region Types

type FunctionKind = ComponentPhaseKind | "other";
type CallKind = ObserverEntry["method"] | "useEffect" | "useInsertionEffect" | "useLayoutEffect" | "other";

export type OEntry = ObserverEntry & { method: "observe" };
export type UEntry = ObserverEntry & { method: "unobserve" };
export type DEntry = ObserverEntry & { method: "disconnect" };

// #endregion

// #region Helpers

function isNewResizeObserver(node: TSESTree.Node | unit) {
  return node?.type === AST.NewExpression
    && node.callee.type === AST.Identifier
    && node.callee.name === "ResizeObserver";
}

function isFromObserver(context: RuleContext, node: TSESTree.Expression): boolean {
  switch (true) {
    case node.type === AST.Identifier: {
      const scope = context.sourceCode.getScope(node);
      const variable = findVariable(node, scope);
      const initNode = getVariableInitializer(variable, 0);
      return isNewResizeObserver(initNode);
    }
    case node.type === AST.MemberExpression:
      return isFromObserver(context, node.object);
    default:
      return false;
  }
}

function getCallKind(context: RuleContext, node: TSESTree.CallExpression): CallKind {
  switch (true) {
    case node.callee.type === AST.Identifier
      && isMatching(P.union("observe", "unobserve", "disconnect"))(node.callee.name)
      && isFromObserver(context, node.callee):
      return node.callee.name;
    case node.callee.type === AST.MemberExpression
      && node.callee.property.type === AST.Identifier
      && isMatching(P.union("observe", "unobserve", "disconnect"))(node.callee.property.name)
      && isFromObserver(context, node.callee):
      return node.callee.property.name;
    default:
      return "other";
  }
}

function getFunctionKind(node: ast.TSESTreeFunction): FunctionKind {
  return getPhaseKindOfFunction(node) ?? "other";
}

// #endregion

// #region Rule Implementation

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description:
        "Enforces that every 'ResizeObserver' created in a component or custom hook has a corresponding 'ResizeObserver.disconnect()'.",
    },
    messages: {
      expectedDisconnectInControlFlow:
        "Dynamically added 'ResizeObserver.observe' should be cleared all at once using 'ResizeObserver.disconnect' in the cleanup function.",
      expectedDisconnectOrUnobserveInCleanup:
        "A 'ResizeObserver' instance created in 'useEffect' must be disconnected in the cleanup function.",
      unexpectedFloatingInstance:
        "A 'ResizeObserver' instance created in component or custom hook must be assigned to a variable for proper cleanup.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>) {
  // Fast path: skip if `ResizeObserver` is not present in the file
  if (!context.sourceCode.text.includes("ResizeObserver")) {
    return {};
  }
  const fEntries: { kind: FunctionKind; node: ast.TSESTreeFunction }[] = [];
  const observers: {
    id: TSESTree.Node;
    node: TSESTree.NewExpression;
    phase: ComponentPhaseKind;
    phaseNode: ast.TSESTreeFunction;
  }[] = [];
  const oEntries: OEntry[] = [];
  const uEntries: UEntry[] = [];
  const dEntries: DEntry[] = [];
  return defineRuleListener(
    {
      [":function"](node: ast.TSESTreeFunction) {
        const kind = getFunctionKind(node);
        fEntries.push({ kind, node });
      },
      [":function:exit"]() {
        fEntries.pop();
      },
      ["CallExpression"](node) {
        if (node.callee.type !== AST.MemberExpression) {
          return;
        }
        const fKind = fEntries.findLast((x) => x.kind !== "other")?.kind;
        if (fKind == null || !ComponentPhaseRelevance.has(fKind)) {
          return;
        }
        const { object } = node.callee;
        match(getCallKind(context, node))
          .with("disconnect", () => {
            dEntries.push({
              kind: "ResizeObserver",
              node,
              callee: node.callee,
              method: "disconnect",
              observer: object,
              phase: fKind,
            });
          })
          .with("observe", () => {
            const [element] = node.arguments;
            if (element == null) {
              return;
            }
            oEntries.push({
              kind: "ResizeObserver",
              node,
              callee: node.callee,
              element,
              method: "observe",
              observer: object,
              phase: fKind,
            });
          })
          .with("unobserve", () => {
            const [element] = node.arguments;
            if (element == null) {
              return;
            }
            uEntries.push({
              kind: "ResizeObserver",
              node,
              callee: node.callee,
              element,
              method: "unobserve",
              observer: object,
              phase: fKind,
            });
          })
          .otherwise(() => null);
      },
      ["NewExpression"](node) {
        const fEntry = fEntries.findLast((x) => x.kind !== "other");
        if (fEntry == null) return;
        if (!ComponentPhaseRelevance.has(fEntry.kind)) {
          return;
        }
        if (!isNewResizeObserver(node)) {
          return;
        }
        const id = findEnclosingAssignmentTarget(node);
        if (id == null) {
          context.report({
            messageId: "unexpectedFloatingInstance",
            node,
          });
          return;
        }
        observers.push({
          id,
          node,
          phase: fEntry.kind,
          phaseNode: fEntry.node,
        });
      },
      ["Program:exit"]() {
        for (const { id, node, phaseNode } of observers) {
          if (dEntries.some((e) => isAssignmentTargetEqual(context, e.observer, id))) {
            continue;
          }
          const oentries = oEntries.filter((e) => isAssignmentTargetEqual(context, e.observer, id));
          const uentries = uEntries.filter((e) => isAssignmentTargetEqual(context, e.observer, id));
          const isDynamic = (node: TSESTree.Node | unit) =>
            node?.type === AST.CallExpression || ast.isConditional(node);
          const isPhaseNode = (node: TSESTree.Node | unit) => node === phaseNode;
          const hasDynamicallyAdded = oentries
            .some((e) => !isPhaseNode(ast.findParentNode(e.node, or(isDynamic, isPhaseNode))));
          if (hasDynamicallyAdded) {
            context.report({ messageId: "expectedDisconnectInControlFlow", node });
            continue;
          }
          for (const oEntry of oentries) {
            if (uentries.some((uEntry) => isAssignmentTargetEqual(context, uEntry.element, oEntry.element))) {
              continue;
            }
            context.report({ messageId: "expectedDisconnectOrUnobserveInCleanup", node: oEntry.node });
          }
        }
      },
    },
  );
}

// #endregion

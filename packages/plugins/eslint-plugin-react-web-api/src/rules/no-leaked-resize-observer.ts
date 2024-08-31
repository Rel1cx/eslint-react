/* eslint-disable @typescript-eslint/no-unused-vars */
import type { TSESTreeFunction } from "@eslint-react/ast";
import { isFunction, isNodeEqual } from "@eslint-react/ast";
import type { EREffectMethodKind, ERLifecycleMethodKind, ERPhaseKind } from "@eslint-react/core";
import { getPhaseKindOfFunction, isInversePhase, PHASE_RELEVANCE } from "@eslint-react/core";
import { Data, F, isBoolean, isObject, O } from "@eslint-react/tools";
import type { RuleContext } from "@eslint-react/types";
import { findVariable, getVariableDeclaratorID, getVariableNode, isNodeValueEqual } from "@eslint-react/var";
import type { Scope } from "@typescript-eslint/scope-manager";
import type { TSESTree } from "@typescript-eslint/utils";
import { AST_NODE_TYPES } from "@typescript-eslint/utils";
import { getStaticValue } from "@typescript-eslint/utils/ast-utils";
import type { ReportDescriptor } from "@typescript-eslint/utils/ts-eslint";
import { isMatching, match, P } from "ts-pattern";

import { createRule } from "../utils";
import type { ObserverMethod } from "./../models";
import { ObserverEntry } from "./../models";

// #region Rule Metadata

export const RULE_NAME = "no-leaked-resize-observer";

export type MessageID =
  | "noLeakedResizeObserverInEffect"
  | "noLeakedResizeObserverInLifecycle"
  | "noLeakedResizeObserverNoFloatingInstance";

// #endregion

// #region Types

/* eslint-disable perfectionist/sort-union-types */
type FunctionKind = ERPhaseKind | "other";
type CallKind = ObserverMethod | EREffectMethodKind | ERLifecycleMethodKind | "other";
/* eslint-enable perfectionist/sort-union-types */

export type OEntry = ObserverEntry & { _tag: "Observe" };
export type UEntry = ObserverEntry & { _tag: "Unobserve" };
export type DEntry = ObserverEntry & { _tag: "Disconnect" };

// #endregion

// #region Helpers

function isNewResizeObserver(node: TSESTree.Node) {
  return node.type === AST_NODE_TYPES.NewExpression
    && node.callee.type === AST_NODE_TYPES.Identifier
    && node.callee.name === "ResizeObserver";
}

function isFromObserver(node: TSESTree.Identifier | TSESTree.MemberExpression, context: RuleContext): boolean {
  const topLevelId = node.type === AST_NODE_TYPES.Identifier ? node : node.object;
  if (topLevelId.type !== AST_NODE_TYPES.Identifier) return false;
  return F.pipe(
    findVariable(topLevelId, context.sourceCode.getScope(topLevelId)),
    O.flatMap(getVariableNode(0)),
    O.exists(isNewResizeObserver),
  );
}

function getCallKind(node: TSESTree.CallExpression, context: RuleContext): CallKind {
  switch (true) {
    case node.callee.type === AST_NODE_TYPES.Identifier
      && isMatching(P.union("observe", "unobserve", "disconnect"), node.callee.name)
      && isFromObserver(node.callee, context):
      return node.callee.name;
    case node.callee.type === AST_NODE_TYPES.MemberExpression
      && node.callee.property.type === AST_NODE_TYPES.Identifier
      && isMatching(P.union("observe", "unobserve", "disconnect"), node.callee.property.name)
      && isFromObserver(node.callee, context):
      return node.callee.property.name;
    default:
      return "other";
  }
}

function getFunctionKind(node: TSESTreeFunction): FunctionKind {
  return O.getOrElse(getPhaseKindOfFunction(node), F.constant("other"));
}

// #endregion

// #region Rule Definition

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "enforce cleanup of 'ResizeObserver' instances in components and custom hooks.",
    },
    messages: {
      // eslint-disable-next-line eslint-plugin/no-unused-message-ids
      noLeakedResizeObserverInEffect: "'ResizeObserver' instance must be disconnected in the cleanup function.",
      // eslint-disable-next-line eslint-plugin/no-unused-message-ids
      noLeakedResizeObserverInLifecycle: "'ResizeObserver' instance must be disconnected in the cleanup function.",
      noLeakedResizeObserverNoFloatingInstance: "'ResizeObserver' instance must be assigned to a variable.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create(context) {
    if (!context.sourceCode.text.includes("ResizeObserver")) return {};
    const fStack: [node: TSESTreeFunction, kind: FunctionKind][] = [];
    const oEntries: OEntry[] = [];
    const uEntries: UEntry[] = [];
    const dEntries: DEntry[] = [];
    return {
      [":function"](node: TSESTreeFunction) {
        const functionKind = getFunctionKind(node);
        fStack.push([node, functionKind]);
      },
      [":function:exit"]() {
        fStack.pop();
      },
      ["CallExpression"](node) {
        const [fNode, fKind] = fStack.at(-1) ?? [];
        if (!fNode || !fKind) return;
        if (!PHASE_RELEVANCE.has(fKind)) return;
        if (node.callee.type !== AST_NODE_TYPES.MemberExpression) return;
        const object = node.callee.object;
        if (object.type !== AST_NODE_TYPES.Identifier) return;
        switch (getCallKind(node, context)) {
          case "disconnect":
            dEntries.push(
              ObserverEntry.Disconnect({
                kind: "ResizeObserver",
                node,
                callee: node.callee,
                observer: object,
                phase: fKind,
              }),
            );
            break;
          case "observe":
            {
              const [element] = node.arguments;
              if (!element) return;
              oEntries.push(
                ObserverEntry.Observe({
                  kind: "ResizeObserver",
                  node,
                  callee: node.callee,
                  element,
                  observer: object,
                  phase: fKind,
                }),
              );
            }
            break;
          case "unobserve":
            {
              const [element] = node.arguments;
              if (!element) return;
              uEntries.push(
                ObserverEntry.Unobserve({
                  kind: "ResizeObserver",
                  node,
                  callee: node.callee,
                  element,
                  observer: object,
                  phase: fKind,
                }),
              );
            }
            break;
        }
      },
      ["NewExpression"](node) {
        if (!isNewResizeObserver(node)) return;
        if (O.isSome(getVariableDeclaratorID(node))) return;
        context.report({
          messageId: "noLeakedResizeObserverNoFloatingInstance",
          node,
        });
      },
      ["Program:exit"]() {},
    };
  },
  defaultOptions: [],
});

// #endregion

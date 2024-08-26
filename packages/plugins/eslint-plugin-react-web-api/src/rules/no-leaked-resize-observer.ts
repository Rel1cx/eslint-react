/* eslint-disable @typescript-eslint/no-unused-vars */
import type { TSESTreeFunction } from "@eslint-react/ast";
import { isFunction, isNodeEqual } from "@eslint-react/ast";
import type { EREffectMethodKind, ERLifecycleMethodKind, ERPhaseKind } from "@eslint-react/core";
import { getPhaseKindOfFunction, isInversePhase, PHASE_RELEVANCE } from "@eslint-react/core";
import { Data, F, isBoolean, isObject, O } from "@eslint-react/tools";
import { isNodeValueEqual } from "@eslint-react/var";
import type { Scope } from "@typescript-eslint/scope-manager";
import type { TSESTree } from "@typescript-eslint/utils";
import { AST_NODE_TYPES } from "@typescript-eslint/utils";
import { getStaticValue } from "@typescript-eslint/utils/ast-utils";
import type { ReportDescriptor } from "@typescript-eslint/utils/ts-eslint";
import { isMatching, match, P } from "ts-pattern";

import { createRule } from "../utils";
import type { ObserverEntry, ObserverMethod } from "./../models";

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

function getCallKind(node: TSESTree.CallExpression): CallKind {
  switch (true) {
    case node.callee.type === AST_NODE_TYPES.Identifier
      && isMatching(P.union("observe", "unobserve", "disconnect"), node.callee.name):
      return node.callee.name;
    case node.callee.type === AST_NODE_TYPES.MemberExpression
      && node.callee.property.type === AST_NODE_TYPES.Identifier
      && isMatching(P.union("observe", "unobserve", "disconnect"), node.callee.property.name):
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
      noLeakedResizeObserverInEffect: "'ResizeObserver' instance must be disconnected in the cleanup function.",
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
        const callKind = getCallKind(node);
      },
      ["Program:exit"]() {},
    };
  },
  defaultOptions: [],
});

// #endregion

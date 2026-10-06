import { createRule } from "@/utils/create-rule";
import { Check, Extract, type TSESTreeFunction, Traverse } from "@eslint-react/ast";
import { isUseEffectCleanupCallback, isUseEffectSetupCallback, isUseRefLikeCall } from "@eslint-react/core";
import { type RuleContext, type RuleFeature, type RuleListener } from "@eslint-react/eslint";
import { isAssignmentTargetEqual, resolveEnclosingAssignmentTarget } from "@eslint-react/var";
import { and, or } from "@local/eff";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import { findVariable } from "@typescript-eslint/utils/ast-utils";
import { P, isMatching, match } from "ts-pattern";
import { isFromObserver, isFromRefCurrent, isNewObserver } from "./lib";

// #region Rule Metadata

export const RULE_NAME = "no-leaked-resize-observer";

export const RULE_FEATURES = [] as const satisfies RuleFeature[];

export type MessageID =
  | "expected-disconnect-in-control-flow"
  | "expected-disconnect-or-unobserve-in-cleanup"
  | "unexpected-floating-instance";

// #endregion

// #region Types

type CallKind = ObserverEntry["method"] | "other";

type ObserverEntry =
  | {
    method: "disconnect";
    node: TSESTree.CallExpression;
    observer: TSESTree.Node;
  }
  | {
    element: TSESTree.Node;
    method: "observe" | "unobserve";
    node: TSESTree.CallExpression;
    observer: TSESTree.Node;
  };

type OEntry = ObserverEntry & { method: "observe" };
type UEntry = ObserverEntry & { method: "unobserve" };
type DEntry = ObserverEntry & { method: "disconnect" };

// #endregion

// #region Helpers

const isUseEffectCallback = or(isUseEffectSetupCallback, isUseEffectCleanupCallback);

function getCallKind(context: RuleContext, node: TSESTree.CallExpression): CallKind {
  const callee = Extract.unwrap(node.callee);
  if (callee.type !== AST.MemberExpression) {
    return "other";
  }
  const name = Extract.getCalleeName(node);
  if (name != null && isMatching(P.union("observe", "unobserve", "disconnect"))(name) && isFromObserver(context, callee, "ResizeObserver")) {
    return name;
  }
  return "other";
}

// Whether the new expression initializes a ref: `useRef(new ResizeObserver(...))`
function isUseRefInitialValue(node: TSESTree.NewExpression) {
  let child: TSESTree.Node = node;
  let parent: TSESTree.Node | undefined = node.parent;
  while (parent != null && Check.isTypeExpression(parent)) {
    child = parent;
    parent = parent.parent;
  }
  return parent?.type === AST.CallExpression
    && parent.arguments.at(0) === child
    && isUseRefLikeCall(parent);
}

// #endregion

// #region Rule Implementation

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Enforces that every 'ResizeObserver' created in a component or custom hook has a corresponding 'ResizeObserver.disconnect()'.",
    },
    messages: {
      "expected-disconnect-in-control-flow":
        "Dynamically added 'ResizeObserver.observe' should be cleared all at once using 'ResizeObserver.disconnect' in the cleanup function.",
      "expected-disconnect-or-unobserve-in-cleanup": "A 'ResizeObserver' instance created in 'useEffect' must be disconnected in the cleanup function.",
      "unexpected-floating-instance": "A 'ResizeObserver' instance created in component or custom hook must be assigned to a variable for proper cleanup.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
});

export function create(context: RuleContext<MessageID, []>): RuleListener {
  // Fast path: skip if `ResizeObserver` is not present in the file
  if (!context.sourceCode.text.includes("ResizeObserver")) {
    return {};
  }
  const observers: {
    id: TSESTree.Node;
    node: TSESTree.NewExpression;
    // `null` for a ref-held instance (`useRef(new ResizeObserver(...))`), which has no
    // creation-phase callback; its entries are checked against their own enclosing effect callback
    phaseNode: TSESTreeFunction | null;
  }[] = [];
  const oEntries: OEntry[] = [];
  const uEntries: UEntry[] = [];
  const dEntries: DEntry[] = [];
  // Functions returned by an effect setup as its cleanup (`function cleanup() {...}; return cleanup;`),
  // resolved from the returned identifier; the effect predicates only recognize inline cleanups
  const returnedCleanups = new Set<TSESTree.Node>();
  // A disconnect/unobserve only counts when it runs in the cleanup phase: inside the cleanup
  // callback, or inside a named function the setup returns as its cleanup
  function isInCleanupPhase(node: TSESTree.Node) {
    if (Traverse.findParent(node, isUseEffectCleanupCallback) != null) {
      return true;
    }
    for (const fn of returnedCleanups) {
      if (Traverse.findParent(node, (n) => n === fn) != null) {
        return true;
      }
    }
    return false;
  }
  return {
    ["CallExpression"](node) {
      if (Traverse.findParent(node, isUseEffectCallback) == null) {
        return;
      }
      const callee = Extract.unwrap(node.callee);
      if (callee.type !== AST.MemberExpression) {
        return;
      }
      const { object } = callee;
      match(getCallKind(context, node))
        .with("disconnect", () => {
          dEntries.push({
            method: "disconnect",
            node,
            observer: object,
          });
        })
        .with("observe", () => {
          const [element] = node.arguments;
          if (element == null) {
            return;
          }
          oEntries.push({
            element,
            method: "observe",
            node,
            observer: object,
          });
        })
        .with("unobserve", () => {
          const [element] = node.arguments;
          if (element == null) {
            return;
          }
          uEntries.push({
            element,
            method: "unobserve",
            node,
            observer: object,
          });
        })
        .otherwise(() => null);
    },
    ["NewExpression"](node) {
      if (!isNewObserver(node, "ResizeObserver")) {
        return;
      }
      const fn = Traverse.findParent(node, and(Check.isFunction, isUseEffectCallback));
      // Outside an effect callback, only a ref initializer (`useRef(new ResizeObserver(...))`)
      // is tracked: the instance is created eagerly during render and held by the ref
      if (fn == null && !isUseRefInitialValue(node)) {
        return;
      }
      const id = resolveEnclosingAssignmentTarget(node);
      if (id == null) {
        context.report({
          messageId: "unexpected-floating-instance",
          node,
        });
        return;
      }
      observers.push({
        id,
        node,
        phaseNode: fn,
      });
    },
    ["ReturnStatement"](node) {
      const arg = node.argument == null ? null : Extract.unwrap(node.argument);
      // `return () => {...}` is already recognized as a cleanup callback by the predicates;
      // only an identifier reference (`return cleanup;`) needs resolving here
      if (arg == null || arg.type !== AST.Identifier) {
        return;
      }
      const setupFn = Traverse.findParent(node, Check.isFunction);
      if (setupFn == null || !isUseEffectSetupCallback(setupFn)) {
        return;
      }
      const variable = findVariable(context.sourceCode.getScope(node), arg);
      const defNode = variable?.defs.at(-1)?.node;
      const fn = defNode == null
        ? null
        : defNode.type === AST.FunctionDeclaration
        ? defNode
        : defNode.type === AST.VariableDeclarator && defNode.init != null
        ? Extract.unwrap(defNode.init)
        : null;
      if (fn != null && Check.isFunction(fn)) {
        returnedCleanups.add(fn);
      }
    },
    ["Program:exit"]() {
      for (const { id, node, phaseNode } of observers) {
        // A ref-held instance is referenced through `ref.current` (or a local alias of it)
        // instead of the assignment target of the creation site
        const isSameObserver = phaseNode == null
          ? (observer: TSESTree.Node) => isFromRefCurrent(context, observer, id)
          : (observer: TSESTree.Node) => isAssignmentTargetEqual(context, observer, id);
        // A disconnect inside the observer's own callback is not a reliable cleanup:
        // the callback may never run if the component unmounts before the element resizes
        const isInsideObserverCallback = (e: DEntry) => Traverse.findParent(e.node, (n) => n === node) != null;
        if (dEntries.some((e) => !isInsideObserverCallback(e) && isInCleanupPhase(e.node) && isSameObserver(e.observer))) {
          continue;
        }
        const matchedOEntries = oEntries.filter((e) => isSameObserver(e.observer));
        const matchedUEntries = uEntries.filter((e) => isSameObserver(e.observer));
        const isDynamic = (node: TSESTree.Node | null) => node?.type === AST.CallExpression || Check.isConditional(node);
        const hasDynamicallyAdded = matchedOEntries
          .some((e) => {
            const entryPhaseNode = phaseNode ?? Traverse.findParent(e.node, isUseEffectCallback);
            const isPhaseNode = (node: TSESTree.Node | null) => node === entryPhaseNode;
            return !isPhaseNode(Traverse.findParent(e.node, or(isDynamic, isPhaseNode)));
          });
        if (hasDynamicallyAdded) {
          context.report({ messageId: "expected-disconnect-in-control-flow", node });
          continue;
        }
        for (const oEntry of matchedOEntries) {
          if (
            matchedUEntries.some((uEntry) => isInCleanupPhase(uEntry.node) && isAssignmentTargetEqual(context, uEntry.element, oEntry.element))
          ) {
            continue;
          }
          context.report({ messageId: "expected-disconnect-or-unobserve-in-cleanup", node: oEntry.node });
        }
      }
    },
  };
}

// #endregion

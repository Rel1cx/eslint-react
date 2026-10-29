import { createRule } from "@/utils/create-rule";
import { Check, Extract } from "@eslint-react/ast";
import { type RuleContext, type RuleFeature, type RuleListener } from "@eslint-react/eslint";
import { isInitializedFromReactNative } from "@eslint-react/var";
import { getOrInsertComputed } from "@local/eff";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import { match } from "ts-pattern";
import {
  type CleanupCalleeEntries,
  type CleanupCallees,
  type EventEntry,
  type EventMethodKind,
  getCallKind,
  getEffectContext,
  getListenerArguments,
  isInverseEntry,
  resolveCleanupCallee,
} from "./lib";

// #region Rule Metadata

export const RULE_NAME = "no-leaked-event-listener";

export const RULE_FEATURES = [] as const satisfies RuleFeature[];

export type MessageID =
  | "unexpected-inline-function"
  | "expected-remove-event-listener-in-cleanup";

// #endregion

// #region Rule Implementation

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Enforces that every 'addEventListener' in a component or custom hook has a corresponding 'removeEventListener'.",
    },
    messages: {
      "unexpected-inline-function": "A/an '{{eventMethodKind}}' should not have an inline listener function.",
      "expected-remove-event-listener-in-cleanup":
        "An 'addEventListener' in '{{effectMethodKind}}' should have a corresponding 'removeEventListener' in its cleanup function.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
});

export function create(context: RuleContext<MessageID, []>): RuleListener {
  // Fast path: skip if `addEventListener` is not present in the file
  if (!context.sourceCode.text.includes("addEventListener")) {
    return {};
  }
  if (!/use\w*Effect/u.test(context.sourceCode.text)) {
    return {};
  }
  const aEntries: EventEntry[] = [];
  const rEntries: EventEntry[] = [];
  const cEntries: CleanupCalleeEntries = new Map();
  function reportInlineListener(listener: TSESTree.CallExpressionArgument | undefined, callKind: EventMethodKind, signal: TSESTree.Node | null) {
    if (signal != null || !Check.isFunction(listener)) {
      return;
    }
    context.report({
      data: { eventMethodKind: callKind },
      messageId: "unexpected-inline-function",
      node: listener,
    });
  }
  return {
    ["CallExpression"](node) {
      const effectContext = getEffectContext(node);
      if (effectContext == null) {
        return;
      }
      const { effect, phase } = effectContext;
      const callee = Extract.unwrap(node.callee);
      match(getCallKind(node))
        .with("addEventListener", (callKind) => {
          // https://github.com/Rel1cx/eslint-react/issues/1323
          const isFromReactNative = callee.type === AST.MemberExpression
            && Check.isIdentifier(callee.object)
            && isInitializedFromReactNative(callee.object.name, context.sourceCode.getScope(node));
          if (isFromReactNative) {
            return;
          }
          const args = getListenerArguments({ context, node });
          if (args == null) {
            return;
          }
          reportInlineListener(args.listener, callKind, args.options.signal);
          // A listener with a `signal` option is removed when the signal aborts,
          // so it needs no `removeEventListener` in the cleanup.
          if (args.options.signal != null) {
            return;
          }
          aEntries.push({
            type: args.type,
            callee,
            capture: args.options.capture,
            effect,
            listener: args.listener,
            node,
            phase,
          });
        })
        .with("removeEventListener", (callKind) => {
          const args = getListenerArguments({ context, node });
          if (args == null) {
            return;
          }
          reportInlineListener(args.listener, callKind, args.options.signal);
          rEntries.push({
            type: args.type,
            callee,
            capture: args.options.capture,
            effect,
            listener: args.listener,
            node,
            phase,
          });
        })
        .with("other", () => {
          if (phase !== "cleanup" || effect == null) {
            return;
          }
          const cleanupCallee = resolveCleanupCallee({ context, node });
          if (cleanupCallee == null) {
            return;
          }
          const { functions, names } = getOrInsertComputed(
            cEntries,
            effect,
            (): CleanupCallees => ({ functions: new Set(), names: new Set() }),
          );
          if (cleanupCallee.kind === "function") {
            functions.add(cleanupCallee.node);
          } else {
            names.add(cleanupCallee.name);
          }
        })
        .otherwise(() => null);
    },
    ["Program:exit"]() {
      for (const aEntry of aEntries) {
        if (rEntries.some((rEntry) => isInverseEntry({ context, addEntry: aEntry, removeEntry: rEntry, cleanupCalleeEntries: cEntries }))) {
          continue;
        }
        const effect = aEntry.effect;
        const effectMethodKind = effect != null && effect.type === AST.CallExpression
          ? Extract.getCalleeName(effect) ?? "useEffect"
          : "useEffect";
        context.report({
          data: { effectMethodKind },
          messageId: "expected-remove-event-listener-in-cleanup",
          node: aEntry.node,
        });
      }
    },
  };
}

// #endregion

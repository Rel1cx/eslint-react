import { Traverse, is } from "@eslint-react/ast";
import * as core from "@eslint-react/core";
import { type RuleContext, type RuleFeature, merge } from "@eslint-react/eslint";
import { JsxDetectionHint, isJsxLike } from "@eslint-react/jsx";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";

import { createRule } from "../../utils";

export const RULE_NAME = "error-boundaries";

export const RULE_FEATURES = [] as const satisfies RuleFeature[];

export type MessageID =
  | "tryCatchWithJsx"
  | "tryCatchWithUse";

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Validates usage of Error Boundaries instead of try/catch for errors in child components.",
    },
    messages: {
      tryCatchWithJsx:
        "Use an Error Boundary to catch errors in child components. Try/catch can't catch errors during React's rendering process.",
      tryCatchWithUse:
        "Use an Error Boundary instead of try/catch around the 'use' hook. The 'use' hook suspends the component, and its errors can only be caught by Error Boundaries.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>) {
  // Fast path: skip if `try` is not present in the file
  if (!context.sourceCode.text.includes("try")) return {};

  const hint = JsxDetectionHint.DoNotIncludeJsxWithNullValue
    | JsxDetectionHint.DoNotIncludeJsxWithNumberValue
    | JsxDetectionHint.DoNotIncludeJsxWithBigIntValue
    | JsxDetectionHint.DoNotIncludeJsxWithStringValue
    | JsxDetectionHint.DoNotIncludeJsxWithBooleanValue
    | JsxDetectionHint.DoNotIncludeJsxWithUndefinedValue
    | JsxDetectionHint.DoNotIncludeJsxWithEmptyArrayValue;

  const fc = core.getFunctionComponentCollector(context);
  const hc = core.getHookCollector(context);

  // Track already-reported nodes to avoid duplicate reports
  const reported = new Set<TSESTree.TryStatement>();
  const useCalls = new Set<TSESTree.CallExpression>();

  return merge(
    fc.visitor,
    hc.visitor,
    {
      CallExpression(node) {
        if (!core.isUseCall(context, node)) return;
        useCalls.add(node);
      },
      "Program:exit"(node) {
        const comps = fc.api.getAllComponents(node);
        const hooks = hc.api.getAllHooks(node);
        const funcs = [...comps, ...hooks];
        for (const call of useCalls) {
          const stmt = Traverse.findParent(call, is(AST.TryStatement));
          const func = Traverse.findParent(stmt, (n) => funcs.some((f) => f.node === n));
          if (stmt != null && func != null && !reported.has(stmt)) {
            context.report({
              messageId: "tryCatchWithUse",
              node: stmt,
            });
            reported.add(stmt);
          }
        }
        for (const { rets } of funcs) {
          for (const ret of rets) {
            if (ret == null) continue;
            // Skip non-JSX-like return values https://github.com/Rel1cx/eslint-react/issues/1614
            if (!isJsxLike(context, ret, hint)) continue;
            const stmt = Traverse.findParent(ret, is(AST.TryStatement));
            if (stmt != null && !reported.has(stmt)) {
              context.report({
                messageId: "tryCatchWithJsx",
                node: stmt,
              });
              reported.add(stmt);
            }
          }
        }
      },
    },
  );
}

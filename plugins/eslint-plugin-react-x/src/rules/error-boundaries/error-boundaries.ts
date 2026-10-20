import { createRule } from "@/utils/create-rule";
import { Traverse } from "@eslint-react/ast";
import * as core from "@eslint-react/core";
import { type RuleContext, type RuleFeature, type RuleListener, merge } from "@eslint-react/eslint";
import { type TSESTree } from "@typescript-eslint/types";

export const RULE_NAME = "error-boundaries";

export const RULE_FEATURES = [] as const satisfies RuleFeature[];

export type MessageID =
  | "try-catch-with-use"
  | "try-catch-with-jsx";

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Validates usage of Error Boundaries instead of try/catch for errors in child components.",
    },
    messages: {
      "try-catch-with-use":
        "Use an Error Boundary instead of try/catch around the 'use' hook. The 'use' hook suspends the component, and its errors can only be caught by Error Boundaries.",
      "try-catch-with-jsx": "Use an Error Boundary to catch errors in child components. Try/catch can't catch errors during React's rendering process.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
});

export function create(context: RuleContext<MessageID, []>): RuleListener {
  // Fast path: skip if `try` is not present in the file
  if (!context.sourceCode.text.includes("try")) return {};

  const hint = core.JSXDetectionHint.DoNotIncludeJSXWithNullValue
    | core.JSXDetectionHint.DoNotIncludeJSXWithNumberValue
    | core.JSXDetectionHint.DoNotIncludeJSXWithBigIntValue
    | core.JSXDetectionHint.DoNotIncludeJSXWithStringValue
    | core.JSXDetectionHint.DoNotIncludeJSXWithBooleanValue
    | core.JSXDetectionHint.DoNotIncludeJSXWithUndefinedValue
    | core.JSXDetectionHint.DoNotIncludeJSXWithEmptyArrayValue;

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
          const stmt = Traverse.findEnclosingTryBlock(call);
          const func = Traverse.findParent(stmt, (n) => funcs.some((f) => f.node === n));
          if (stmt != null && func != null && !reported.has(stmt)) {
            context.report({
              messageId: "try-catch-with-use",
              node: stmt,
            });
            reported.add(stmt);
          }
        }
        for (const { rets } of funcs) {
          for (const ret of rets) {
            if (ret == null) continue;
            // Skip non-JSX-like return values https://github.com/Rel1cx/eslint-react/issues/1614
            if (!core.isJSXLike(context, ret, hint)) continue;
            const stmt = Traverse.findEnclosingTryBlock(ret);
            if (stmt != null && !reported.has(stmt)) {
              context.report({
                messageId: "try-catch-with-jsx",
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

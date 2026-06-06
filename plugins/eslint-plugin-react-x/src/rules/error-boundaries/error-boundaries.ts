import { createRule } from "@/utils/create-rule";
import { Traverse } from "@eslint-react/ast";
import * as core from "@eslint-react/core";
import { type RuleContext, type RuleFeature, type RuleListener, merge } from "@eslint-react/eslint";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";

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

/**
 * Finds the nearest TryStatement whose `try` block (not catch/finally)
 * encloses the given node.
 * @param node The node to check.
 * @returns The enclosing TryStatement, or null if none is found.
 */
function getEnclosingTryBlock(node: TSESTree.Node): TSESTree.TryStatement | null {
  let current = node.parent;
  while (current != null) {
    if (current.type === AST.TryStatement) {
      let n: TSESTree.Node | null | undefined = node;
      while (n != null && n !== current) {
        if (n === current.block) return current;
        n = n.parent;
      }
    }
    if (current.type === AST.Program) return null;
    current = current.parent;
  }
  return null;
}

export function create(context: RuleContext<MessageID, []>): RuleListener {
  // Fast path: skip if `try` is not present in the file
  if (!context.sourceCode.text.includes("try")) return {};

  const hint = core.JsxDetectionHint.DoNotIncludeJsxWithNullValue
    | core.JsxDetectionHint.DoNotIncludeJsxWithNumberValue
    | core.JsxDetectionHint.DoNotIncludeJsxWithBigIntValue
    | core.JsxDetectionHint.DoNotIncludeJsxWithStringValue
    | core.JsxDetectionHint.DoNotIncludeJsxWithBooleanValue
    | core.JsxDetectionHint.DoNotIncludeJsxWithUndefinedValue
    | core.JsxDetectionHint.DoNotIncludeJsxWithEmptyArrayValue;

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
          const stmt = getEnclosingTryBlock(call);
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
            if (!core.isJsxLike(context, ret, hint)) continue;
            const stmt = getEnclosingTryBlock(ret);
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

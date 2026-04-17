import { Traverse } from "@eslint-react/ast";
import * as core from "@eslint-react/core";
import { type RuleContext, type RuleFeature, merge } from "@eslint-react/eslint";
import type { TSESTree } from "@typescript-eslint/types";

import { createRule } from "../../utils";

export const RULE_NAME = "no-nested-lazy-component-declarations";

export const RULE_FEATURES = [] as const satisfies RuleFeature[];

export type MessageID = "default";

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Disallows nesting lazy component declarations inside other components or hooks.",
    },
    messages: {
      default:
        "Do not declare lazy components inside other components or hooks. Instead, always declare them at the top level of your module.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>) {
  const fc = core.getFunctionComponentCollector(context);
  const cc = core.getClassComponentCollector(context);
  const hc = core.getHookCollector(context);
  const lazyCalls = new Set<TSESTree.CallExpression>();

  return merge(
    fc.visitor,
    cc.visitor,
    hc.visitor,
    {
      ImportExpression(node) {
        const lazyCall = Traverse.findParent(node, (n) => core.isLazyCall(context, n));
        if (lazyCall != null) {
          lazyCalls.add(lazyCall);
        }
      },
      "Program:exit"(program) {
        const significantParents = [
          ...fc.api.getAllComponents(program),
          ...hc.api.getAllHooks(program),
          ...cc.api.getAllComponents(program),
        ];
        for (const lazy of lazyCalls) {
          if (Traverse.findParent(lazy, (n) => significantParents.some((p) => p.node === n))) {
            context.report({
              messageId: "default",
              node: lazy,
            });
          }
        }
      },
    },
  );
}

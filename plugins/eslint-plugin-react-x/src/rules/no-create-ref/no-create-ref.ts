import { createRule } from "@/utils/create-rule";
import { Traverse } from "@eslint-react/ast";
import * as core from "@eslint-react/core";
import { type RuleContext, type RuleFeature, merge } from "@eslint-react/eslint";
import { type TSESTree } from "@typescript-eslint/types";

export const RULE_NAME = "no-create-ref";

export const RULE_FEATURES = [] as const satisfies RuleFeature[];

export type MessageID = "default";

export default createRule<[], MessageID>({
  meta: {
    type: "suggestion",
    docs: {
      description: "Disallows 'createRef' in function components and Hooks.",
    },
    messages: {
      default: "[Deprecated] Use 'useRef' instead.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>) {
  if (!context.sourceCode.text.includes("createRef")) return {};

  const fc = core.getFunctionComponentCollector(context);
  const hc = core.getHookCollector(context);

  const createRefCalls = new Set<TSESTree.CallExpression>();

  return merge(
    fc.visitor,
    hc.visitor,
    {
      CallExpression(node) {
        if (!core.isCreateRefCall(context, node)) return;
        createRefCalls.add(node);
      },
      "Program:exit"(node) {
        const comps = fc.api.getAllComponents(node);
        const hooks = hc.api.getAllHooks(node);
        const funcs = [...comps, ...hooks];
        for (const call of createRefCalls) {
          const func = Traverse.findParent(call, (n) => funcs.some((f) => f.node === n));
          if (func == null) continue;
          context.report({ messageId: "default", node: call });
        }
      },
    },
  );
}

import { createRule } from "@/utils/create-rule";
import { Traverse } from "@eslint-react/ast";
import * as core from "@eslint-react/core";
import { type RuleContext, type RuleFeature, type RuleListener, merge } from "@eslint-react/eslint";
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
      default: "Use 'useRef' instead of 'createRef' in function components and Hooks.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
});

export function create(context: RuleContext<MessageID, []>): RuleListener {
  // Fast path: skip files that never mention `createRef`
  if (!context.sourceCode.text.includes("createRef")) return {};

  const fc = core.getFunctionComponentCollector(context);
  const hc = core.getHookCollector(context);

  // `createRef` calls gathered during traversal, checked once the whole program is known
  const facts = new Set<TSESTree.CallExpression>();

  return merge(
    fc.visitor,
    hc.visitor,
    {
      CallExpression(node) {
        if (!core.isCreateRefCall(context, node)) return;
        facts.add(node);
      },
      "Program:exit"(node) {
        const comps = fc.api.getAllComponents(node);
        const hooks = hc.api.getAllHooks(node);
        const funcs = [...comps, ...hooks];
        for (const call of facts) {
          // Report only calls nested in a function component or Hook; calls in class
          // components, at module top-level, or in utility functions are allowed
          if (!Traverse.hasParent(call, (n) => funcs.some((f) => f.node === n))) continue;
          context.report({ messageId: "default", node: call });
        }
      },
    },
  );
}

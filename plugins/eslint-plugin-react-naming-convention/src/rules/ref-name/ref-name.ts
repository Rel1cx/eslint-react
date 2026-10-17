import { createRule } from "@/utils/create-rule";
import { resolveNamingTarget } from "@/utils/resolve-naming-target";
import { Check } from "@eslint-react/ast";
import * as core from "@eslint-react/core";
import { type RuleContext, type RuleFeature, type RuleListener } from "@eslint-react/eslint";
import { getSettingsFromContext } from "@eslint-react/shared";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";

export const RULE_NAME = "ref-name";

export const RULE_FEATURES = [] as const satisfies RuleFeature[];

export type MessageID = "invalid-ref-name";

export default createRule<[], MessageID>({
  meta: {
    type: "suggestion",
    docs: {
      description: "Enforces identifier names assigned from 'useRef' calls to be either 'ref' or end with 'Ref'.",
    },
    messages: {
      "invalid-ref-name": "A ref identifier must be named 'ref' or ending in 'Ref'.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
});

export function create(context: RuleContext<MessageID, []>): RuleListener {
  const { additionalRefHooks } = getSettingsFromContext(context);
  return {
    CallExpression(node: TSESTree.CallExpression) {
      if (!core.isUseRefLikeCall(node, additionalRefHooks)) return;
      // https://github.com/Rel1cx/eslint-react/issues/1375
      // Skip member access directly on the call, whether a dereference like
      // `useRef(null).current` or a computed key like `obj[useRef()]`, including
      // through TS wrappers like `useRef(null)!.current` or `(useRef(null) as T).current`
      let parent: TSESTree.Node = node.parent;
      while (Check.isTypeExpression(parent)) parent = parent.parent;
      if (parent.type === AST.MemberExpression) return;
      const target = resolveNamingTarget(node);
      if (target == null) return;
      const [id, name] = target;
      if (name.endsWith("Ref") || name === "ref") return;
      context.report({
        messageId: "invalid-ref-name",
        node: id,
      });
    },
  };
}

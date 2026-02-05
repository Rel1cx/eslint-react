import * as ast from "@eslint-react/ast";
import * as core from "@eslint-react/core";
import type { RuleContext, RuleFeature } from "@eslint-react/shared";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as AST } from "@typescript-eslint/types";
import type { RuleListener } from "@typescript-eslint/utils/ts-eslint";

import { createRule } from "../utils";

export const RULE_NAME = "no-unnecessary-use-ref";

export const RULE_FEATURES = ["EXP"] as const satisfies RuleFeature[];

export type MessageID = "default";

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Disallows unnecessary usage of 'useRef'.",
    },
    messages: {
      default: "Unnecessary use of 'useRef'. Instead, co-locate the value inside the effect that uses it.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>): RuleListener {
  if (!context.sourceCode.text.includes("useRef")) return {};
  return {
    VariableDeclarator(node) {
      const { id, init } = node;
      if (id.type !== AST.Identifier || init == null || !core.isUseRefCall(init)) {
        return;
      }
      const [ref, ...rest] = context.sourceCode.getDeclaredVariables(node);
      // Skip non-standard `useRef()` usages to prevent false positives
      if (ref == null || rest.length > 0) return;
      // Skip `previous*` refs by convention https://github.com/Rel1cx/eslint-react/issues/1406
      if (ref.name.toLowerCase().startsWith("prev")) return;
      const effects = new Set<TSESTree.Node>();
      let globalUsages = 0;
      for (const { identifier, init } of ref.references) {
        if (init != null) continue;
        const effect = ast.findParentNode(identifier, core.isUseEffectLikeCall);
        if (effect == null) {
          globalUsages++;
        } else {
          effects.add(effect);
        }
      }
      if (globalUsages > 0 || effects.size !== 1) return;
      context.report({
        messageId: "default",
        node: node.parent,
      });
    },
  };
}

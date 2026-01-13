import * as AST from "@eslint-react/ast";
import { isUseEffectLikeCall, isUseRefCall } from "@eslint-react/core";
import { type RuleContext, type RuleFeature } from "@eslint-react/shared";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";
import type { RuleListener } from "@typescript-eslint/utils/ts-eslint";
import type { CamelCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "no-unnecessary-use-ref";

export const RULE_FEATURES = [
  "EXP",
] as const satisfies RuleFeature[];

export type MessageID = CamelCase<typeof RULE_NAME>;

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Disallows unnecessary usage of 'useRef'.",
    },
    messages: {
      noUnnecessaryUseRef: "Unnecessary use of 'useRef'. Instead, co-locate the value inside the effect that uses it.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>): RuleListener {
  return {
    VariableDeclarator(node) {
      const { id, init } = node;
      if (id.type !== T.Identifier || init == null || !isUseRefCall(init)) return;
      const variable = context.sourceCode.getDeclaredVariables(node).at(0);
      if (variable == null) return;
      const effects = new Set<unknown>();
      let globalUsages = 0;
      for (const ref of variable.references) {
        if (ref.init != null) continue;
        const effect = AST.findParentNode(ref.identifier, isUseEffectLikeCall);
        if (effect == null) {
          globalUsages++;
        } else {
          effects.add(effect);
        }
      }
      if (globalUsages > 0 || effects.size !== 1) return;
      context.report({
        messageId: "noUnnecessaryUseRef",
        node: node.parent,
      });
    },
  };
}

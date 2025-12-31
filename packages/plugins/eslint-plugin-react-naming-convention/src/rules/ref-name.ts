import { getInstanceId, isUseRefCall } from "@eslint-react/core";
import { identity } from "@eslint-react/eff";
import type { RuleContext, RuleFeature } from "@eslint-react/shared";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";
import type { TSESTree } from "@typescript-eslint/types";
import type { RuleListener } from "@typescript-eslint/utils/ts-eslint";
import { P, match } from "ts-pattern";
import { createRule } from "../utils";

export const RULE_NAME = "ref-name";

export const RULE_FEATURES = [] as const satisfies RuleFeature[];

export type MessageID = "invalidRefName";

export default createRule<[], MessageID>({
  meta: {
    type: "suggestion",
    docs: {
      description: "Enforces that variables assigned from 'useRef' calls have names ending with 'Ref'.",
    },
    messages: {
      invalidRefName: "Ref variables should have names ending with 'Ref', e.g., 'inputRef'.",
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
    CallExpression(node: TSESTree.CallExpression) {
      if (!isUseRefCall(node)) return;

      const id = getInstanceId(node);
      if (id == null) return;

      const name = match(id)
        .with({ type: T.Identifier, name: P.select() }, identity)
        .otherwise(() => null);

      if (name != null && name.endsWith("Ref")) return;

      context.report({
        messageId: "invalidRefName",
        node: id,
      });
    },
  };
}

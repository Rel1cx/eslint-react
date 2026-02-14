import * as core from "@eslint-react/core";
import type { RuleContext, RuleFeature } from "@eslint-react/shared";
import { findEnclosingAssignmentTarget } from "@eslint-react/var";
import { AST_NODE_TYPES as AST } from "@typescript-eslint/types";
import type { TSESTree } from "@typescript-eslint/types";
import type { RuleListener } from "@typescript-eslint/utils/ts-eslint";
import { P, match } from "ts-pattern";

import { createRule } from "../utils";

export const RULE_NAME = "id-name";

export const RULE_FEATURES = [] as const satisfies RuleFeature[];

export type MessageID = "invalidIdName";

export default createRule<[], MessageID>({
  meta: {
    type: "suggestion",
    docs: {
      description: "Enforces identifier names assigned from 'useId' calls to be either 'id' or end with 'Id'.",
    },
    messages: {
      invalidIdName: "An identifier assigned from 'useId' must be named 'id' or end with 'Id'.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>): RuleListener {
  if (!context.sourceCode.text.includes("useId")) return {};
  return {
    CallExpression(node: TSESTree.CallExpression) {
      if (!core.isUseIdCall(node)) return;
      const [id, name] = match(findEnclosingAssignmentTarget(node))
        // for cases like: const myId = useId();
        .with({ type: AST.Identifier, name: P.string }, (id) => [id, id.name] as const)
        // for cases like: ctxs.myId = useId();
        .with({ type: AST.MemberExpression, property: { name: P.string } }, (id) => [id, id.property.name] as const)
        .otherwise(() => [null, null] as const);
      if (id == null) return;
      if (name.endsWith("Id") || name === "id") return;
      context.report({
        messageId: "invalidIdName",
        node: id,
      });
    },
  };
}

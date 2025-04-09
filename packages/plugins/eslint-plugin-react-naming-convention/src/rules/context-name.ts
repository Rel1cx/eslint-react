import type { RuleContext, RuleFeature } from "@eslint-react/kit";
import type { RuleListener } from "@typescript-eslint/utils/ts-eslint";
import * as ER from "@eslint-react/core";
import { _, identity } from "@eslint-react/eff";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";
import { match, P } from "ts-pattern";

import { createRule } from "../utils";

export const RULE_NAME = "context-name";

export const RULE_FEATURES = [] as const satisfies RuleFeature[];

export type MessageID = "invalid";

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Enforces context name to be a valid component name with the suffix `Context`.",
    },
    messages: {
      invalid: "A context name must be a valid component name with the suffix 'Context'.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>): RuleListener {
  if (!context.sourceCode.text.includes("createContext")) return {};
  return {
    CallExpression(node) {
      if (!ER.isCreateContextCall(context, node)) return;
      const id = ER.getInstanceId(node);
      if (id == null) return;
      const name = match(id)
        .with({ type: T.Identifier, name: P.select() }, identity)
        .with({ type: T.MemberExpression, property: { name: P.select(P.string) } }, identity)
        .otherwise(() => null);
      if (name != null && ER.isComponentName(name) && name.endsWith("Context")) return;
      context.report({
        messageId: "invalid",
        node: id,
      });
    },
  };
}

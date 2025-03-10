import { getInstanceId, isCreateContextCall } from "@eslint-react/core";
import { _, identity } from "@eslint-react/eff";
import type { RuleFeature } from "@eslint-react/shared";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";
import { match, P } from "ts-pattern";

import { createRule } from "../utils";

export const RULE_NAME = "context-name";

export const RULE_FEATURES = [
  "CHK",
] as const satisfies RuleFeature[];

export type MessageID = "invalid";

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "enforce context name to be a valid component name with the suffix 'Context'",
    },
    messages: {
      invalid: "A context name must be a valid component name with the suffix 'Context'.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create(context) {
    if (!context.sourceCode.text.includes("createContext")) return {};
    return {
      CallExpression(node) {
        if (!isCreateContextCall(context, node)) return;
        const id = getInstanceId(node);
        if (id == null) return;
        const name = match(id)
          .with({ type: T.Identifier, name: P.select() }, identity)
          .with({ type: T.MemberExpression, property: { name: P.select(P.string) } }, identity)
          .otherwise(() => _);
        if (name != null && /^[A-Z]/u.test(name) && name.endsWith("Context")) return;
        context.report({
          messageId: "invalid",
          node: id,
        });
      },
    };
  },
  defaultOptions: [],
});

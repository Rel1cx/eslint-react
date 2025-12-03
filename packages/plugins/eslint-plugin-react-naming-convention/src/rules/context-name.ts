import { getInstanceId, isComponentName, isCreateContextCall } from "@eslint-react/core";
import { identity } from "@eslint-react/eff";
import type { RuleContext, RuleFeature } from "@eslint-react/shared";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";
import type { RuleListener } from "@typescript-eslint/utils/ts-eslint";
import { P, match } from "ts-pattern";

import { createRule } from "../utils";

export const RULE_NAME = "context-name";

export const RULE_FEATURES = [] as const satisfies RuleFeature[];

export type MessageID = "invalidContextName";

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Enforces context name to be a valid component name with the suffix `Context`.",
      [Symbol.for("rule_features")]: RULE_FEATURES,
    },
    messages: {
      invalidContextName: "A context name must be a valid component name with the suffix 'Context'.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>): RuleListener {
  // Fast path: skip if `createContext` is not present in the file
  if (!context.sourceCode.text.includes("createContext")) return {};
  return {
    CallExpression(node) {
      if (!isCreateContextCall(context, node)) return;
      const id = getInstanceId(node);
      if (id == null) return;
      const name = match(id)
        .with({ type: T.Identifier, name: P.select() }, identity)
        .with({ type: T.MemberExpression, property: { name: P.select(P.string) } }, identity)
        .otherwise(() => null);
      if (name != null && isComponentName(name) && name.endsWith("Context")) return;
      context.report({
        messageId: "invalidContextName",
        node: id,
      });
    },
  };
}

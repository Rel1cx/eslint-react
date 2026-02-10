import type { RuleContext, RuleFeature } from "@eslint-react/shared";
import { getConstrainedTypeAtLocation } from "@typescript-eslint/type-utils";
import { ESLintUtils } from "@typescript-eslint/utils";
import type { RuleListener } from "@typescript-eslint/utils/ts-eslint";
import { unionConstituents } from "ts-api-utils";

import { createRule, getFullyQualifiedNameEx } from "../utils";

export const RULE_NAME = "no-implicit-key";

export const RULE_FEATURES = [
  "TSC",
  "EXP",
] as const satisfies RuleFeature[];

export type MessageID = "default";

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Prevents implicitly passing the 'key' prop to components.",
    },
    messages: {
      default:
        "This spread attribute implicitly passes the 'key' prop to a component, this could lead to unexpected behavior. If you intend to pass the 'key' prop, use 'key={value}'.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>): RuleListener {
  const services = ESLintUtils.getParserServices(context, false);
  const checker = services.program.getTypeChecker();
  return {
    JSXSpreadAttribute(node) {
      for (const type of unionConstituents(getConstrainedTypeAtLocation(services, node.argument))) {
        const key = type.getProperty("key");
        if (key == null) continue;
        // Allow pass-through of React internally defined keys
        // For react and react-dom the FQN is "React.Attributes.key"
        // For preact and preact/compat the FQN is "preact.Attributes.key"
        // https://github.com/Rel1cx/eslint-react/issues/1472
        if (getFullyQualifiedNameEx(checker, key).toLowerCase().endsWith("react.attributes.key")) continue;
        context.report({
          messageId: "default",
          node,
        });
      }
    },
  };
}

import type { RuleContext, RuleFeature } from "@eslint-react/shared";
import { getConstrainedTypeAtLocation } from "@typescript-eslint/type-utils";
import { ESLintUtils } from "@typescript-eslint/utils";
import type { RuleListener } from "@typescript-eslint/utils/ts-eslint";

import { createRule } from "../utils";

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
      const type = getConstrainedTypeAtLocation(services, node.argument);
      const key = type.getProperty("key");
      if (key == null) return;
      // Allow pass-through of React internally defined keys
      // https://github.com/Rel1cx/eslint-react/issues/1472
      if (checker.getFullyQualifiedName(key) === "React.Attributes.key") return;
      // https://github.com/Rel1cx/eslint-react/issues/1476
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      if (key.declarations?.at(0)?.getText().trim().startsWith("key?: Key | null | undefined")) return;
      context.report({
        messageId: "default",
        node,
      });
    },
  };
}

import * as core from "@eslint-react/core";
import { type RuleContext, type RuleFeature, defineRuleListener, getSettingsFromContext } from "@eslint-react/shared";
import { findEnclosingAssignmentTarget } from "@eslint-react/var";
import { AST_NODE_TYPES as AST } from "@typescript-eslint/types";
import { compare } from "compare-versions";
import { P, match } from "ts-pattern";

import { createRule } from "../../utils";

export const RULE_NAME = "context-name";

export const RULE_FEATURES = [] as const satisfies RuleFeature[];

export type MessageID = "invalidContextName";

export default createRule<[], MessageID>({
  meta: {
    type: "suggestion",
    docs: {
      description: "Enforces the context name to be a valid component name with the suffix 'Context'.",
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

export function create(context: RuleContext<MessageID, []>) {
  // Fast path: skip if `createContext` is not present in the file
  if (!context.sourceCode.text.includes("createContext")) return {};
  const { version } = getSettingsFromContext(context);
  // Skip if React version is less than 19.0.0
  if (compare(version, "19.0.0", "<")) return {};
  return defineRuleListener(
    {
      CallExpression(node) {
        if (!core.isCreateContextCall(context, node)) return;
        const [id, name] = match(findEnclosingAssignmentTarget(node))
          // for cases like: const ThemeContext = createContext();
          .with({ type: AST.Identifier, name: P.string }, (id) => [id, id.name] as const)
          // for cases like: ctxs.ThemeContext = createContext();
          .with({ type: AST.MemberExpression, property: { name: P.string } }, (id) => [id, id.property.name] as const)
          .otherwise(() => [null, null] as const);
        if (id == null) return;
        if (core.isComponentName(name) && name.endsWith("Context")) return;
        context.report({
          messageId: "invalidContextName",
          node: id,
        });
      },
    },
  );
}

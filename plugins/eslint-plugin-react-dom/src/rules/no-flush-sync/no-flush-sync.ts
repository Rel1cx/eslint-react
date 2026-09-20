import { createRule } from "@/utils/create-rule";
import { Check, Extract } from "@eslint-react/ast";
import { type RuleContext, type RuleFeature, type RuleListener } from "@eslint-react/eslint";
import { createImportLookup } from "@eslint-react/var";
import { AST_NODE_TYPES as AST } from "@typescript-eslint/types";

export const RULE_NAME = "no-flush-sync";

export const RULE_FEATURES = [] as const satisfies RuleFeature[];

export type MessageID = "default";

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Disallows 'flushSync'.",
    },
    messages: {
      default: "Using 'flushSync' is uncommon and can hurt the performance of your app.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>): RuleListener {
  // Fast path: skip if `flushSync` is not present in the file
  if (!context.sourceCode.text.includes("flushSync")) return {};

  // Lookup of local bindings imported from 'react-dom', used to match callees below.
  const imports = createImportLookup(context.sourceCode.ast, { source: "react-dom" });

  return {
    CallExpression(node) {
      const callee = Extract.unwrap(node.callee);
      switch (true) {
        // Case 1: Direct call to `flushSync()`
        case Check.isIdentifier(callee)
          && imports.has(callee.name, "flushSync"):
          context.report({
            messageId: "default",
            node,
          });
          return;
        // Case 2: Member call like `ReactDOM.flushSync()`
        case callee.type === AST.MemberExpression
          && Check.isIdentifier(callee.object)
          && Extract.getCalleeName(node) === "flushSync"
          && imports.hasNamespace(callee.object.name):
          context.report({
            messageId: "default",
            node,
          });
          return;
      }
    },
  };
}

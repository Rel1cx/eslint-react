import { createRule } from "@/utils/create-rule";
import { Check, Extract } from "@eslint-react/ast";
import { type RuleContext, type RuleFeature, type RuleListener } from "@eslint-react/eslint";
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

  const reactDomNames = new Set<string>();
  const flushSyncNames = new Set<string>();

  return {
    CallExpression(node) {
      const callee = Extract.unwrap(node.callee);
      if (
        Check.isIdentifier(callee)
        && flushSyncNames.has(callee.name)
      ) {
        context.report({ messageId: "default", node });
        return;
      }
      if (
        callee.type === AST.MemberExpression
        && Check.isIdentifier(callee.object)
        && Extract.getCalleeName(node) === "flushSync"
        && reactDomNames.has(callee.object.name)
      ) {
        context.report({ messageId: "default", node });
      }
    },
    ImportDeclaration(node) {
      const [baseSource] = node.source.value.split("/");
      if (baseSource !== "react-dom") return;
      for (const specifier of node.specifiers) {
        switch (specifier.type) {
          case AST.ImportSpecifier:
            if (!Check.isIdentifier(specifier.imported)) continue;
            if (specifier.imported.name === "flushSync") {
              flushSyncNames.add(specifier.local.name);
            }
            continue;
          case AST.ImportDefaultSpecifier:
          case AST.ImportNamespaceSpecifier:
            reactDomNames.add(specifier.local.name);
            continue;
        }
      }
    },
  };
}

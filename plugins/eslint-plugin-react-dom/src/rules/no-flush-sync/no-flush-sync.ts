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

  // Keep track of imports from 'react-dom'.
  const reactDomNames = new Set<string>(); // For `import ReactDOM from 'react-dom'`
  const flushSyncNames = new Set<string>(); // For `import { flushSync } from 'react-dom'`

  return {
    CallExpression(node) {
      const callee = Extract.unwrap(node.callee);
      switch (true) {
        // Case 1: Direct call to `flushSync()`.
        case Check.isIdentifier(callee)
          && flushSyncNames.has(callee.name):
          context.report({
            messageId: "default",
            node,
          });
          return;
        // Case 2: Call on a `react-dom` import, like `ReactDOM.flushSync()`
        case callee.type === AST.MemberExpression
          && Check.isIdentifier(callee.object)
          && Extract.getCalleeName(node) === "flushSync"
          && reactDomNames.has(callee.object.name):
          context.report({
            messageId: "default",
            node,
          });
          return;
      }
    },
    ImportDeclaration(node) {
      const [baseSource] = node.source.value.split("/");
      // We only care about imports from 'react-dom'
      if (baseSource !== "react-dom") return;
      for (const specifier of node.specifiers) {
        switch (specifier.type) {
          // `import { flushSync } from 'react-dom'`
          case AST.ImportSpecifier:
            if (!Check.isIdentifier(specifier.imported)) continue;
            if (specifier.imported.name === "flushSync") {
              flushSyncNames.add(specifier.local.name);
            }
            continue;
          // `import ReactDOM from 'react-dom'` or `import * as ReactDOM from 'react-dom'`
          case AST.ImportDefaultSpecifier:
          case AST.ImportNamespaceSpecifier:
            reactDomNames.add(specifier.local.name);
            continue;
        }
      }
    },
  };
}

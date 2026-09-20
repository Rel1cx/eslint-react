import { createRule } from "@/utils/create-rule";
import { Check, Extract } from "@eslint-react/ast";
import { type RuleContext, type RuleFeature, type RuleListener } from "@eslint-react/eslint";
import { createImportLookup } from "@eslint-react/var";
import { AST_NODE_TYPES as AST } from "@typescript-eslint/types";

export const RULE_NAME = "no-find-dom-node";

export const RULE_FEATURES = [] as const satisfies RuleFeature[];

export type MessageID = "default";

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Disallows 'findDOMNode'.",
    },
    messages: {
      default: "[Deprecated] Use alternatives instead.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>): RuleListener {
  // Fast path: skip if `findDOMNode` is not present in the file
  if (!context.sourceCode.text.includes("findDOMNode")) return {};

  // Lookup of local bindings imported from 'react-dom', with the 'React' and 'ReactDOM' globals pre-registered as namespace bindings.
  const imports = createImportLookup(context.sourceCode.ast, {
    builtinNamespaces: ["React", "ReactDOM"],
    source: "react-dom",
  });

  return {
    CallExpression(node) {
      const callee = Extract.unwrap(node.callee);
      switch (true) {
        // Case 1: Direct call to `findDOMNode()`, including the legacy global
        case Check.isIdentifier(callee)
          && (callee.name === "findDOMNode" || imports.has(callee.name, "findDOMNode")):
          context.report({
            messageId: "default",
            node,
          });
          return;
        // Case 2: Member call like `ReactDOM.findDOMNode()`
        case callee.type === AST.MemberExpression
          && Check.isIdentifier(callee.object)
          && Extract.getCalleeName(node) === "findDOMNode"
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

import { createRule } from "@/utils/create-rule";
import { isReactDOMCall } from "@/utils/is-react-dom-call";
import { type RuleContext, type RuleFeature, type RuleListener } from "@eslint-react/eslint";
import { createImportLookup } from "@eslint-react/var";

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
      // Also matches the legacy global `findDOMNode()` without an import.
      if (!isReactDOMCall(node, imports, "findDOMNode", true)) {
        return;
      }
      context.report({
        messageId: "default",
        node,
      });
    },
  };
}

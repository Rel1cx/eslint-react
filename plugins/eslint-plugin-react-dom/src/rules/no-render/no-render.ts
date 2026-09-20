import { createRule } from "@/utils/create-rule";
import { Check, Extract } from "@eslint-react/ast";
import { type RuleContext, type RuleFeature, type RuleFixer, type RuleListener } from "@eslint-react/eslint";
import { getSettingsFromContext } from "@eslint-react/shared";
import { createImportLookup } from "@eslint-react/var";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import { compare } from "compare-versions";

export const RULE_NAME = "no-render";

export const RULE_FEATURES = [
  "MOD",
] as const satisfies RuleFeature[];

export type MessageID = "default";

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Replaces usage of 'ReactDOM.render()' with 'createRoot(node).render()'.",
    },
    fixable: "code",
    messages: {
      default: "[Deprecated] Use 'createRoot(node).render()' instead.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>): RuleListener {
  // Fast path: skip if `render` is not present in the file
  if (!context.sourceCode.text.includes("render")) return {};

  // This rule only applies to React 18.0.0 and later
  const settings = getSettingsFromContext(context);
  if (compare(settings.version, "18.0.0", "<")) return {};

  // Lookup of local bindings imported from 'react-dom', with the 'ReactDOM' global pre-registered as a namespace binding.
  const imports = createImportLookup(context.sourceCode.ast, {
    builtinNamespaces: ["ReactDOM"],
    source: "react-dom",
  });

  return {
    CallExpression(node) {
      const callee = Extract.unwrap(node.callee);
      switch (true) {
        // Case 1: Direct call to `render()`
        case Check.isIdentifier(callee)
          && imports.has(callee.name, "render"):
          context.report({
            fix: buildFix(context, node),
            messageId: "default",
            node,
          });
          return;
        // Case 2: Member call like `ReactDOM.render()`
        case callee.type === AST.MemberExpression
          && Check.isIdentifier(callee.object)
          && Extract.getCalleeName(node) === "render"
          && imports.hasNamespace(callee.object.name):
          context.report({
            fix: buildFix(context, node),
            messageId: "default",
            node,
          });
          return;
      }
    },
  };
}

// Replaces `render(element, container)` with `createRoot(container).render(element)`
function buildFix(context: RuleContext, node: TSESTree.CallExpression) {
  const getText = (n: TSESTree.Node) => context.sourceCode.getText(n);
  return (fixer: RuleFixer) => {
    // `render` takes two arguments: component and container
    const [arg0, arg1] = node.arguments;
    if (arg0 == null || arg1 == null) return null;
    // The fix consists of two parts:
    return [
      // 1. Add the new import for `createRoot`
      fixer.insertTextBefore(context.sourceCode.ast, 'import { createRoot } from "react-dom/client";\n'),
      // 2. Replace `render(element, container)` with `createRoot(container).render(element)`; note that the arguments are swapped
      fixer.replaceText(node, `createRoot(${getText(arg1)}).render(${getText(arg0)})`),
    ];
  };
}
